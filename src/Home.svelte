<script>
    import EventModal from "./EventModal.svelte";
    import Game from '../model.js';

    let showModal = false;
    let interval = 1;

    var events = []
    events.push(new Game.Evenement("Bombe Nucléaire", "Salut c'est la bombe", new Game.Effect(-0.01, -0.01), new Game.Effect(0.01, 0.01)))
    events.push(new Game.Evenement("Campagne de sensibilisation", "Souhaitez vous accepter la campagne de sensibilisation sur la surconsommation d'énergie ? ", new Game.Effect(-0.1, -0.2), new Game.Effect(0.2, 0.2)))
    events.push(new Game.Evenement("Révolte", "Souhaitez vous empecher la manifestation contre l'augmentation de la pollution", new Game.Effect(0.3, 0.4), new Game.Effect(-0.3, -0.2)))
    events.push(new Game.Evenement("Instauration d'une loi", "Souhaitez vous voter en faveur de la loi pour lutter contre la pollution", new Game.Effect(-0.3, 0.3), new Game.Effect(0.0, 0.0)))
    events.push(new Game.Evenement("Ralentissement des transitions", "", new Game.Effect(-0.01, -0.01), new Game.Effect(0.01, 0.01)))
    events.push(new Game.Evenement("Déforestation contrôléee", "Une entreprise propose un projet de déforestation contrôlée dans une région critique pour le climat.Acceptez vous ?", new Game.Effect(0.2, 0.2), new Game.Effect(-0.2, -0.2)))
    events.push(new Game.Evenement("Modernisation des transports urbains", "Une entreprise propose l'introduction de véhicules électriques, mais elle nécessite l'expansion des infrastructures de recharge, ce qui pourrait entraîner la démolition de certains espaces verts. Acceptez vous ?", new Game.Effect(0.3, 0.1), new Game.Effect(-0.2, -0.1)))
    events.push(new Game.Evenement("Développement Ferme éolienne", "Une entreprise propose la construction d'une ferme éolienne en plein cœur de la ville pour promouvoir les énergies renouvelables. Cependant, cela pourrait entraîner des perturbations visuelles et sonores pour les habitants. Acceptez-vous ?", new Game.Effect(0.2, -0.4), new Game.Effect(-0.3, 0.2)))

    var upgrades = []
    upgrades.push(new Game.Upgrade("Usine de Traitement de déchets", 0.7, new Game.Effect(0.2, -0.1)))
    upgrades.push(new Game.Upgrade("Agriculture bio", 0.6, new Game.Effect(0.2, -0.1)))

    upgrades.push(new Game.Upgrade("Désinstallation Climatisation", 0.3, new Game.Effect(0.1, -0.2)))
    upgrades.push(new Game.Upgrade("Centrale Nucléaire", 0.8, new Game.Effect(0.6, -0.3)))
    upgrades.push(new Game.Upgrade("Barrage", 0.4, new Game.Effect(0.4, -0.5)))
    upgrades.push(new Game.Upgrade("Eolienne", 0.5, new Game.Effect(0.3, -0.7)))
    upgrades.push(new Game.Upgrade("Bioénergie", 0.3, new Game.Effect(0.3, -0.7)))

    var jeu = new Game(100, 1, upgrades, events, new Game.Effect(0.5, 1), showEvent, onEnd, interval)

    let energy = jeu.energy;
    let carbon = jeu.carbon;
    let money = jeu.money;
    let date = jeu.date;

    jeu.start()

    function showEvent(event) {
        document.getElementById("title").innerHTML = event.name
        document.getElementById("text").innerHTML = event.description
        showModal = true;
        jeu.pause();
    }

    function onEnd(obj){
        if (obj.win){
            document.getElementById("title").innerHTML = "Bien joué ! Vous avez gagné !"
            document.getElementById("text").innerHTML = "Votre score carbone : " + obj.star + " étoiles !"
        }else{
            document.getElementById("title").innerHTML = "Vous avez perdu, vous êtes en déficit..."
            document.getElementById("text").innerHTML = "Votre score carbone : " + obj.star + " étoiles !"
        }
        document.getElementById("accept_modal_button").style.display = "None"
        document.getElementById("refuse_modal_button").style.display = "None"
        showModal = true;

    }

    setInterval( () => {
        energy = jeu.energy;
        carbon = jeu.carbon; 
        money = jeu.money;
        date = jeu.date;
    }, interval)
</script>

<EventModal bind:showModal {...{ rejectButton: "Non", acceptButton: "Oui", acceptFunction: ()=>{jeu.accept(); jeu.resume();}, rejectFunction: ()=>{jeu.refuse(); jeu.resume();} }}>
    <h2 slot="header" id="title"></h2>

    <div class="w-96 min-w-full">
        <p id="text"></p>
    </div>
</EventModal>

<div class="flex flex-row">
    <div class="w-2/12 h-screen bg-gray-200 grid place-items-center p-14">
        <div class="w-1/2 bg-white box-border h-18 w-18" on:click|preventDefault|stopPropagation|capture|nonpassive={() => jeu.buy(upgrades[0])}><img src="usine-dechets.jpg" alt="Usine à déchets"/></div>
        <div class="w-1/2 bg-white box-border h-18 w-18" on:click|preventDefault|stopPropagation|capture|nonpassive={() => jeu.buy(upgrades[1])}><img src="bio-logo.jpg" alt="Bio"/></div>
        <div class="w-1/2 bg-white box-border h-18 w-18" on:click|preventDefault|stopPropagation|capture|nonpassive={() => jeu.buy(upgrades[2])}><img src="climatisation.png" alt="Climatisation"/></div>
        <div class="w-1/2 bg-white box-border h-18 w-18" on:click|preventDefault|stopPropagation|capture|nonpassive={() => jeu.buy(upgrades[3])}><img src="centrale-nucleaire.png" alt="Usine à charbon"/></div>
        <div class="w-1/2 bg-white box-border h-18 w-18" on:click|preventDefault|stopPropagation|capture|nonpassive={() => jeu.buy(upgrades[4])}><img src="barrage.jpg" alt="Barrage"/></div>
        <div class="w-1/2 bg-white box-border h-18 w-18" on:click|preventDefault|stopPropagation|capture|nonpassive={() => jeu.buy(upgrades[5])}><img src="eolienne logo.avif" alt="Eolienne"/></div>
        <div class="w-1/2 bg-white box-border h-18 w-18" on:click|preventDefault|stopPropagation|capture|nonpassive={() => jeu.buy(upgrades[6])}><img src="bioenergie.jpg" alt="Bioenergie"/></div>
    </div>
    <div
        class="w-8/12 h-screen bg-[url('/fond-jeu.jpg')]"
        style="filter: saturate({1 - carbon})"
    ></div>
    <div class="w-2/12 h-screen flex flex-col bg-gray-200 justify-between">
        <div class="h-5/12 flex flex-row justify-around">
            <div class="flex flex-col">
                <p class="text-2xl text-center">Energie</p>
                <div
                    class="flex flex-col flex-nowrap justify-end w-5 h-72 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        class="rounded-full overflow-hidden bg-blue-600 bg-blue-500"
                        style="height: {energy * 100}%"
                    >
                        <progress id="energy" />
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <p class="text-2xl text-center">Carbone</p>
                <div
                    class="flex flex-col flex-nowrap justify-end w-5 h-72 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        class="rounded-full overflow-hidden bg-blue-600 bg-blue-500"
                        style="height: {carbon * 100}%"
                    >
                        <progress id="carbon" />
                    </div>
                </div>
            </div>
        </div>
        <div class="h-7/12 flex flex-col text-center bg-gray-200 mb-5">
            <p class = "text-2xl text-center mt-10">Money: {money} $</p>
            <p class = "text-2xl text-center mb-5">Time: {date}</p>
        </div>
    </div>
</div>

<style>
    #energy {
        display: block;
        transform: rotate(-90deg);
    }
    #carbon {
        display: block;
        transform: rotate(-90deg);
    }
</style>