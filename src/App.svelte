<script>
	import { writable } from 'svelte/store';

    var energy = writable(0.5);
	var carbon = writable(0.5);
    //const progressEnergy = writable(getEnergy());
    function test() {
        carbon = writable(Math.random())
    }
    setInterval(test, 2000)
</script>

<div class="flex flex-row">
    <div class="w-2/12 h-screen">Yo</div>
    <div class="w-8/12 bg-gray-400 h-screen">Yo</div>
    <div class="w-2/12 h-screen flex flex-row justify-around">
        <div class="flex flex-col">
            <p class="text-2xl text-center">Energie</p>
            <div class="flex flex-col flex-nowrap justify-end w-5 h-72 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700" role="progressbar" aria-valuenow={$energy} aria-valuemin="0" aria-valuemax="100">
                <div class="rounded-full overflow-hidden bg-blue-600 bg-blue-500" style="height: 90%"><progress id="energy"/></div>
            </div>
        </div>
        <div class="flex flex-col">
            <p class="text-2xl text-center">Carbone</p>
            <div class="flex flex-col flex-nowrap justify-end w-5 h-72 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700" role="progressbar" aria-valuenow={$carbon} aria-valuemin="0" aria-valuemax="100">
                <div class="rounded-full overflow-hidden bg-blue-600 bg-blue-500" style="height: 90%"><progress id="carbon"/></div>
            </div>
        </div>
        
    </div>
</div>


<style>

    #span {
        display:flex;
        flex-direction: column;
    }
	#energy {
		display: block;
        transform: rotate(-90deg);
	}
    #carbon {
		display: block;
        transform: rotate(-90deg);
	}
</style>