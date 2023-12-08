<script>
    let energy = 0.5;
	let carbon = 0.5;
    //const energy = getEnergy();
    function test() {
        carbon = Math.random()
        energy = Math.random()
    }
    setInterval(test, 2000)
</script>

<div class="flex flex-row">
    <div class="w-2/12 h-screen bg-gray-200 grid place-items-center p-16">
        <div class="w-1/2 bg-blue-300 box-border h-24 w-24"><img src=""/>Yo</div>
        <div class="w-1/2 bg-blue-300 box-border h-24 w-24"><img src=""/>Yo</div>
        <div class="w-1/2 bg-blue-300 box-border h-24 w-24"><img src=""/>Yo</div>
        <div class="w-1/2 bg-blue-300 box-border h-24 w-24"><img src=""/>Yo</div>
        <div class="w-1/2 bg-blue-300 box-border h-24 w-24"><img src=""/>Yo</div>
        <div class="w-1/2 bg-blue-300 box-border h-24 w-24"><img src=""/>Yo</div>
    </div>
    <div class="w-8/12 h-screen bg-[url('/fond-jeu.jpg')]" style="filter: saturate({1-carbon})"> 
    </div>
    <div class="w-2/12 h-screen flex flex-row justify-around bg-gray-200">
        <div class="flex flex-col">
            <p class="text-2xl text-center">Energie</p>
            <div class="flex flex-col flex-nowrap justify-end w-5 h-72 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <div class="rounded-full overflow-hidden bg-blue-600 bg-blue-500" style="height: {energy*100}%"><progress id="energy"/></div>
            </div>
        </div>
        <div class="flex flex-col ">
            <p class="text-2xl text-center">Carbone</p>
            <div class="flex flex-col flex-nowrap justify-end w-5 h-72 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <div class="rounded-full overflow-hidden bg-blue-600 bg-blue-500" style="height: {carbon*100}%"><progress id="carbon"/></div>
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