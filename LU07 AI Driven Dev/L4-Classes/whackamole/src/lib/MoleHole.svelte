<script>
    let { position, hasMole, onWhack } = $props();

    import moleImage from "$lib/assets/mole.svg";

    function handleClick() {
        onWhack(position);
    }
</script>

<button
    onclick={handleClick}
    class="aspect-square bg-amber-900 rounded-full border-4 relative overflow-hidden"
>
    {#if hasMole}
        <div class="absolute inset-0 flex items-center justify-center">
            <img src={moleImage} alt="Mole" class="object-contain" />
        </div>
    {/if}
</button>
