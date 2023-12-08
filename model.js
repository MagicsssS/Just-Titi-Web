class Upgrade {
	constructor(name, cost, effect){
		this.name = name
		this.cost = cost
		this.effect = effect
	}
}

class Event {
	constructor(name, description, yes_effect, no_effect){
		this.name = name
		this.description = description
		this.yes_effect = yes_effect
		this.no_effect = no_effect
	}
}

class Effect {
	constructor(energy, carbon){
		this.energy = energy
		this.carbon = carbon
	}
}

class Game {
	static Effect = Effect
	static Upgrade = Upgrade
	static Event = Event

	constructor(pib, money, upgrades, events, init_effect, event_callback, end_callback, interval){
		this.pib = pib
		this.money = pib*money // FLOAT
		this.timer = 324 // INT
		this.upgrades = upgrades // Upgrades[]

		this.current_upgrades = []

		this.events = events // Events[]

		this.event_delay = 60
		this.event_counter = this.event_delay

		this.effects = [init_effect]
		
		this.current_event = null

		this.event_callback = event_callback // Function
		this.end_callback = end_callback // Function

		this.mainloop = null

		this.interval = interval
	}

	can_buy(upgrade){
		return this.money > upgrade.cost * this.pib
	}

	buy(upgrade){
		if (this.money > upgrade.cost * this.pib){
			this.upgrades.push(upgrade)
			this.money -= upgrade.cost * this.pib
			return true
		}else{
			return false
		}
	}

	round(nb, after_comma){
		return Number(nb.toFixed(after_comma))
	}

	start(){
		this.mainloop = setInterval( () => {this.loop()}, interval)
	}

	pause(){
		clearInterval(this.mainloop)
	}

	resume(){
		this.start()
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
			this.money += this.round(coef*this.pib)

		}else{
			this.end_callback(this.end_result())
		}
	}

	end_result(){
		obj = {}
		obj.win = this.energy > 0.5
		
		if (carbon > 0.5){
			obj.star = 0
		}else if (carbon > 0.30){
			obj.star = 1
		}else if (carbon > 0.15){
			obj.star = 2
		}else{
			obj.star = 3
		}

		return obj
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
			res += this.round(upgrade.effect.energy, 2)
		}
		for (var effect of this.effects){
			res += this.round(effect.energy, 2)
		}
		return res
	}

	get carbon(){
		var res = 0
		for (var upgrade of this.upgrades){
			res += this.round(upgrade.effect.carbon, 2)
		}
		for (var effect of this.effects){
			res += this.round(effect.carbon, 2)
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


var upgrades = []
upgrades.push(new Upgrade("Usine de Traitement de déchets", 0.7, new Effect(0.2, -0.1)))
upgrades.push(new Upgrade("Agriculture bio", 0.6, new Effect(0.2, -0.1)))


upgrades.push(new Upgrade("Désinstallation Climatisation", 0.3, new Effect(0.1, -0.2)))
upgrades.push(new Upgrade("Centrale Nucléaire", 0.8, new Effect(0.6, -0.3)))
upgrades.push(new Upgrade("Barrage", 0.4, new Effect(0.4, -0.5)))
upgrades.push(new Upgrade("Eolienne", 0.5, new Effect(0.3, -0.7)))
upgrades.push(new Upgrade("Bioénergie", 0.3, new Effect(0.3, -0.7)))

var interval = 20

var jeu = new Game(100, 1, [], events, new Effect(0.5, 0.5), event_callback, () => {}, interval)

jeu.start()

setInterval( () => {
	console.log(`${jeu.date} : ${jeu.money} / ${jeu.energy} énergie / ${jeu.carbon} CO² émis`)
}, interval)

export default Game