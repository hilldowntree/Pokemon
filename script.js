//variables used throughout the game
var pokemon = {}
	pokemon.time
	pokemon.weather
	pokemon.caught;
	pokemon.type

var $grassIcon = $('#wildGrass');
	$wildText = $('#wildText')
	$AButton = $('.AButton')


//variables used only in Professor Oak's panel
var oak = {};
	oak.displayed = false;

//variables used when catching pokemon
var wildPokemon = {};
	wildPokemon.type;
	wildPokemon.caught = false;

//Finds the current time and adds the relevant styling. When Professor Oak override occurs, changes the theme
pokemon.getTime = function(){
	var currentDate = new Date()
	var currentHour = currentDate.getHours()
	if (currentHour > 6 && currentHour < 20){
		pokemon.time = 'day'
		pokemon.changeTime('day')
	}
	else{
		pokemon.time = 'night'
		pokemon.changeTime('night');
	}
}

pokemon.changeTime = function(time){
	if (time === 'day'){
		$('body').css('background-image', 'url("images/swirl_pattern.png")')
	}
	else if (time === 'night'){
		$('body').css('background-image', 'url("images/dark_wall.png")')
	}
}

//Finds the current weather
pokemon.getWeather = function(){
	$.ajax({
		url:'http://api.wunderground.com/api/b9d637521ed85e6d/conditions/q/Ontario/Toronto.json',
		type: 'GET',
		dataType: 'json',
	}).then(function(res){
		if (res.current_observation.weather === "Rain"){
			pokemon.weather = 'rain'
		}
		else if(res.current_observation.temp_c < 10){
			pokemon.weather = 'cold'
		}
		else if(res.current_observation.temp_c > 25){
			pokemon.weather = 'hot'
		}
		else{
			pokemon.weather = 'average'
		}
	})
}

//When Professor Oak is selected, it opens a modal where the user can override day/night and weather selectors
oak.display = function(){
	$('.pOak').on('click',function(){
		if (oak.displayed === false){
			$('.hiddenSettings').removeClass('hide');
			oak.displayed = true;
			oak.override();
		}
		else{
			$('.hiddenSettings').addClass('hide');
			oak.displayed = false;
		}
	});
}

//User overrides time and weather selectors
oak.override = function(){
	$('#day').on('click', function(){
		wildPokemon.caught = false;
		pokemon.time = 'day';
		pokemon.changeTime('day')
		wildPokemon.tallGrass();
	})
	$('#night').on('click', function(){
		wildPokemon.caught = false;
		pokemon.time = 'night';
		pokemon.changeTime('night');
		wildPokemon.tallGrass();
	})
	$('#rain').on('click',function(){
		wildPokemon.caught = false;
		pokemon.weather = 'rain';
		wildPokemon.tallGrass()
	})
	$('#fire').on('click',function(){
		wildPokemon.caught = false;
		pokemon.weather = 'hot';
		wildPokemon.tallGrass()
	})
	$('#snow').on('click',function(){
		wildPokemon.caught = false;
		pokemon.weather = 'cold';
		wildPokemon.tallGrass()
	})
	$('#grass').on('click',function(){
		wildPokemon.caught = false;
		pokemon.weather = 'average';
		wildPokemon.tallGrass()
	})
	$('#catchMore').on('click', function(){
		wildPokemon.caught = false;
		wildPokemon.tallGrass();
	})
}

//Finds the current weather and displays the related tall grass icon. When Professor Oak override occurs, changes the tall grass icon
wildPokemon.tallGrass = function(){
	if (pokemon.weather === 'rain'){
		$grassIcon.attr('src','images/rain.png')
		wildPokemon.shakeGrass();
	}
	else if (pokemon.weather === 'hot'){
		$grassIcon.attr('src','images/fire.png')
		wildPokemon.shakeGrass();
	}
	else if (pokemon.weather === 'cold'){
		$grassIcon.attr('src','images/snow.png')
		wildPokemon.shakeGrass();
	}
	else if (pokemon.weather === 'average'){
		$grassIcon.attr('src','images/grass.png')
		wildPokemon.shakeGrass();
	}
	$wildText.text('A wild pokemon appeared!')
}

wildPokemon.shakeGrass = function(){
	$grassIcon.addClass('shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
		$grassIcon.removeClass('shake')
	});
}

wildPokemon.throwBall = function(){
	$AButton.on('click', function(){
		if (!wildPokemon.caught) {
			wildPokemon.selectType()
			wildPokemon.caught = true;
			wildPokemon.displayInfo();
		}
		else {
			$wildText.text(`You've already caught a pokemon today! Come back tomorrow`)
			$grassIcon.attr('src','')
		}
	})
}

//Based on the weather and time of day, randomly decides pokemon type based off a pre-determined list
wildPokemon.selectType = function(){
	//Normal:1, Fighting: 2, Flying: 3, Poison: 4, Ground: 5, Rock: 6, Bug: 7, Ghost: 8, 
	//Steel: 9, Fire: 10, Water: 11, Grass: 12, Electric: 13, Physic: 14, Ice: 15
	//Dragon: 16, Dark: 17, Fairy: 18
	if (pokemon.weather === 'average' && pokemon.time === 'day'){
		typeOptions = [1,3,12]
		wildPokemon.type = typeOptions[Math.round(Math.random()*2)]
	}
	else if(pokemon.weather === 'average' && pokemon.time === 'night'){
		typeOptions = [2,4,8]
		wildPokemon.type = typeOptions[Math.round(Math.random()*2)]
	}
	else if(pokemon.weather ==='rain' && pokemon.time ==='day'){
		typeOptions = [11,7]
		wildPokemon.type = typeOptions[Math.round(Math.random()*1)]
	}
	else if(pokemon.weather ==='rain' && pokemon.time ==='night'){
		typeOptions = [17,18]
		wildPokemon.type = typeOptions[Math.round(Math.random()*1)]
	}
	else if(pokemon.weather ==='hot' && pokemon.time ==='day'){
		typeOptions = [6,10]
		wildPokemon.type = typeOptions[Math.round(Math.random()*1)]
	}
	else if(pokemon.weather ==='hot' && pokemon.time ==='night'){
		typeOptions = [5,9]
		wildPokemon.type = typeOptions[Math.round(Math.random()*1)]
	}
	else if(pokemon.weather ==='cold' && pokemon.time ==='day'){
		typeOptions = [14,15]
		wildPokemon.type = typeOptions[Math.round(Math.random()*1)]
	}
	else if(pokemon.weather ==='cold' && pokemon.time ==='night'){
		typeOptions = [13,16]
		wildPokemon.type = typeOptions[Math.round(Math.random()*1)]
	}
	wildPokemon.catchPokemon()
}

//When the user clicks on the tall grass, grass animation occurs and then Pokemon is generated based on time and weather selectors, pokemon is always new
wildPokemon.catchPokemon = function(){
	$.ajax({
		url:'http:pokeapi.co/api/v2/type/' + wildPokemon.type + '/',
		type: 'GET',
		dataType:'json',
	}).then(function(res){
		pokemon.caught = res.pokemon[(Math.round(Math.random()*res.pokemon.length))]
		wildPokemon.showSprite()
	})
}

//loads the sprite from the pokemon API based on which pokemon was returned
wildPokemon.showSprite = function(){
	$.ajax({
		url: pokemon.caught.pokemon.url,
		type: 'GET',
		dataType:'json'
	}).then(function(res){
		$grassIcon.attr('src',res.sprites.front_default)
		$wildText.text('You caught a ' + pokemon.caught.pokemon.name + '!')
		pokemon.type = res.types[0].type.name

	})
}

wildPokemon.displayInfo = function(){
	$('.BButton').on('click', function(){
		console.log('clicked')
		$grassIcon.attr('src','');
		$wildText.text(`${pokemon.caught.pokemon.name} is a ${pokemon.type} pokemon. You were able to catch it because it is ${pokemon.time} time and ${pokemon.weather} outside!`)
	})
}

pokemon.init = function(){
	pokemon.getTime();
	pokemon.getWeather();
	oak.display();
	wildPokemon.tallGrass();
	wildPokemon.shakeGrass();
	wildPokemon.throwBall();
}

$(function(){
	pokemon.init()
})
