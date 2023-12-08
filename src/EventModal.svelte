<script>
    export let showModal; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();

    export let acceptButton;
    export let rejectButton;
    export let acceptFunction;
    export let rejectFunction;

    function accept() {
        dialog.close(); 
        acceptFunction();
    }

    function refuse() {
        dialog.close(); 
        rejectFunction();
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => {}}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <slot name="header" />
        <hr />
        <slot />
        <hr />
        <div class="flex flex-row float-right space-x-4">
            <!-- svelte-ignore a11y-autofocus -->
            <button id="accept_modal_button" on:click={() => accept()}>{acceptButton}</button>
            <button id="refuse_modal_button" on:click={() => refuse()}>{rejectButton}</button>
        </div>
    </div>
</dialog>

<style>
    dialog {
        max-width: 32em;
        border-radius: 0.2em;
        border: none;
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
