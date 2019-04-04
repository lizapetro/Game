//Открытие карточки
function open_card(card){
	if (card.classList.contains('close')){
		card.classList.remove('close');
		card.classList.add('open');
	}
}

//Закрытие карточки
function close_card(card){
	if (card.classList.contains('open')){
		card.classList.remove('open');
		card.classList.add('close');
	}
}

//Перемешивание карточек
function mix_cards(cards){
	for (i=0; i<cards.length;i++){
		var ind=Math.round(Math.random()*(cards.length-1));
		var card=cards[i];
		cards[i]=cards[ind];
		cards[ind]=card;
	}
	return cards;
}

//Проверка карточек
function check_cards(first_card,second_card){
	var result='error';
	if (first_card.dataset.image===second_card.dataset.image){
		result='ok';
		count_open_cards=count_open_cards+2;
	}
	first_card.classList.add(result);
	second_card.classList.add(result);
}

//Сброс ошибок
function correct_error(card){
	if (card.classList.contains('error')){
		card.classList.remove('error');
		close_card(card);
	}
}
//Расперделение картинок
function distribution_pictures(pictures){
	var i=0;
	cards.forEach(function(elem){
		elem.dataset.image=pictures[i];
		if (elem.classList.contains('error')){
			elem.classList.remove('error');
		}
		if (elem.classList.contains('ok')){
			elem.classList.remove('ok');
		}
		close_card(elem);
		timer_game.dataset.time='01:00';
		i++;
	})
}

//Финал игры
function finish_game(result){
	
	var window=document.getElementById('window');
	
	window.classList.remove('close');
	var form=document.querySelector('.'+result);
	form.classList.remove('close');
	window.addEventListener('click',function(event){
		if (event.target.tagName==='INPUT'){
			window.classList.add('close');
			form.classList.add('close');
			new_game();
		}
	},false);

}
//Реализация игры
function init_game(event){
	if (event.tagName==='DIV'){
		if (event.classList.contains('close')){
			open_card(event);
			if (first_card===''){
				first_card=event;
			}else{
				if (second_card===''){
					second_card=event;
					check_cards(first_card,second_card);
					if (count_open_cards===cards.length){
						clearInterval(timer);
						finish_game('win');
					}
				}else{
					correct_error(first_card);
					correct_error(second_card);
					first_card=event;
					second_card='';
				}
				
			}
		}
	}

}

//Новая игра
function new_game(){
	pictures=mix_cards(pictures);
	distribution_pictures(pictures);
	count_open_cards=0;
	time=60;
	first_card='';
	second_card='';
	state_game='stop';
	game.addEventListener('click',function(event){

		if (state_game==='stop'){
			state_game='run';
			var timer=setInterval(change_time,1000);
			function change_time(){
					time--;
					if (time>9){
						timer_game.dataset.time='00:'+time;
					}else{
						timer_game.dataset.time='00:0'+time;
					}
					if (time===30){
						clearInterval(timer);
						finish_game('lose');

					}
				}
		}
		init_game(event.target)
	},false);


	

	
}

var time=60;
var first_card='';
var second_card='';
var state_game='stop';
var count_open_cards=0;
var pictures=['🐷','🐷','🦄','🦄','🦀','🦀','🐹','🐹','🐰','🐰','🐵','🐵'];
var cards=Array.from(document.querySelectorAll('.emotion'));
var game=document.getElementById('emotions');
var timer_game=document.getElementById('timer');
new_game();





