<script>
    import Header from "$lib/Header.svelte";
    //Change this bool value during lecture to show dynamic attributes
    let readyToLearn = $state(false);

    function flip() {
        readyToLearn = !readyToLearn;
    }
</script>

<!-- Moved h1 to header component -->
<!-- Start out with H1 here -->
<Header />

<p>
    Ready to learn Svelte: {readyToLearn ? "Yes!" : "Nope."}
</p>
<!-- Using Tailwind CSS -->
<button
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    onclick={flip}
>
    I'm ready to learn Svelte!
</button>
