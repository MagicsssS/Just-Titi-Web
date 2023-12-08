class Upgrade {
	constructor(name, cost, effect){
		this.name = name
		this.cost = cost
		this.effect = effect
	}
}

class Evenement {
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
	static Evenement = Evenement

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
		return this.money >= upgrade.cost * this.pib
	}

	buy(upgrade){
		if (this.money >= upgrade.cost * this.pib){
			this.current_upgrades.push(upgrade)
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
		this.mainloop = setInterval( () => {this.loop()}, this.interval)
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
			clearInterval(this.mainloop)
			this.mainloop = null
		}
	}

	end_result(){
		var obj = {}
		obj.win = this.energy > 0.5
		
		if (this.carbon > 0.5){
			obj.star = 0
		}else if (this.carbon > 0.30){
			obj.star = 1
		}else if (this.carbon > 0.15){
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
		for (var upgrade of this.current_upgrades){
			res += this.round(upgrade.effect.energy, 2)
		}
		for (var effect of this.effects){
			res += this.round(effect.energy, 2)
		}
		
		return res
	}

	get carbon(){
		var res = 0
		for (var upgrade of this.current_upgrades){
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

export default Game;