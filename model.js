class Game {
	constructor(pib, money, upgrades, events, init_effect, event_callback, end_callback){
		this.pib = pib
		this.money = pib*money // FLOAT
		this.timer = 324 // INT
		this.upgrades = upgrades // Upgrades[]
		this.events = events // Events[]

		this.event_delay = 60
		this.event_counter = this.event_delay

		this.effects = [init_effect]
		
		this.current_event = null

		this.event_callback = event_callback // Function
		this.end_callback = end_callback // Function
	}

	endgame_result(){

	}

	start(){
		setInterval( () => {this.loop()}, 20)
	}

	get_random_event(){
		if (this.events.length > 0){
			return this.events[this.randint(0, this.events.length)]
		}else{
			return null
		}
	}

	randint(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}

	loop(){
		if (this.timer > 0){
			this.timer -= 1

			this.event_counter -= 1
			if (this.event_counter == 0){
				//event
				this.current_event = this.get_random_event()
				if (this.current_event){
					this.event_callback(this.current_event)
				}
				this.event_counter = this.event_delay

				
			}

			var coef = (this.energy*2)-1
			this.money += Math.round(coef*this.pib)

		}else{
			this.end_callback(this.endgame_result())
		}
		//event_callback
	}

	accept(){
		console.log(`EVENT : ${this.current_event.name} : YES !`)
		console.log(`EFFECT : ${this.current_event.yes_effect.energy} energy / ${this.current_event.yes_effect.carbon} carbon`)
		this.effects.push(this.current_event.yes_effect)
		this.current_event = null
	}

	refuse(){
		console.log(`EVENT : ${this.current_event.name} : NO !`)
		console.log(`EFFECT : ${this.current_event.yes_effect.energy} energy / ${this.current_event.yes_effect.carbon} carbon`)
		this.effects.push(this.current_event.no_effect)
		this.current_event = null
	}

	get energy(){
		var res = 0
		for (var upgrade of this.upgrades){
			res += upgrade.effect.energy
		}
		for (var effect of this.effects){
			res += effect.energy
		}
		return res
	}

	get carbon(){
		var res = 0
		for (var upgrade of this.upgrades){
			res += upgrade.effect.carbon
		}
		for (var effect of this.effects){
			res += effect.carbon
		}
		return res
	}

	get date(){
		var revert_timer = (324 - this.timer)
		var year = parseInt(revert_timer/12)+2023
		var month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"][revert_timer % 12]
		return month + " " + year
	}
}

class Upgrade {
	constructor(name, cost, effect, event=null){
		this.name = name
		this.cost = cost
		this.effect = effect
		this.event = event
	}
}

class Event {
	constructor(name, description, yes_effect, no_effect){
		this.name = name
		this.description = description
		this.yes_effect = yes_effect
		this.no_effect = no_effect
	}

	accept(){
		return this.yes_effect
	}

	refuse(){
		return this.no_effect
	}
}

class Effect {
	constructor(energy, carbon){
		this.energy = energy
		this.carbon = carbon
	}
}


function event_callback(event){
	console.log(`EVENT : ${event.name} : YES / NO ?`)

	if (jeu.randint(0, 1) == 0){
		jeu.accept()
	}else{
		jeu.refuse()
	}
}

var events = []
events.push(new Event("Bombe Nucléaire", "", new Effect(-0.01, -0.01), new Effect(0.01, 0.01)))

var jeu = new Game(100, 1, [], events, new Effect(0.4, 0.5), event_callback, () => {})

jeu.start()

setInterval( () => {
	console.log(`${jeu.date} : ${jeu.money} / ${jeu.energy} énergie / ${jeu.carbon} CO² émis`)
}, 1500)