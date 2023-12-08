<script>
    import EventModal from "./EventModal.svelte";
    import Game from '../model.js';

    let showModal = false;

    var events = []
    events.push(new Game.Event("Bombe Nucléaire", "", new Game.Effect(-0.01, -0.01), new Game.Effect(0.01, 0.01)))


    var upgrades = []
    upgrades.push(new Game.Upgrade("Usine de Traitement de déchets", 0.7, new Game.Effect(0.2, -0.1)))
    upgrades.push(new Game.Upgrade("Agriculture bio", 0.6, new Game.Effect(0.2, -0.1)))


    /*upgrades.push(new Upgrade("Désinstallation Climatisation", 0.3, new Effect(0.1, -0.2)))
    upgrades.push(new Upgrade("Centrale Nucléaire", 0.8, new Effect(0.6, -0.3)))
    upgrades.push(new Upgrade("Barrage", 0.4, new Effect(0.4, -0.5)))
    upgrades.push(new Upgrade("Eolienne", 0.5, new Effect(0.3, -0.7)))
    upgrades.push(new Upgrade("Bioénergie", 0.3, new Effect(0.3, -0.7)))*/


    var jeu = new Game(100, 1, upgrades, events, new Game.Effect(0.5, 1), showEvent, () => {}, 1000)


    let energy = jeu.energy;
    let carbon = jeu.carbon;

    jeu.start()


    function showEvent() {
        showModal = true;
        jeu.pause();
    }
</script>

<button
    on:click={() => {
        showEvent();
    }}
>
    Show modal
</button>

<EventModal bind:showModal {...{ rejectButton: "Non", acceptButton: "Oui" }}>
    <h2 slot="header">Titre</h2>

    <div class="w-96 min-w-full">
        <p>Text</p>
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
    <div class="w-2/12 h-screen flex flex-row justify-around bg-gray-200">
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