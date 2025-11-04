<script lang="ts">
    import MoleHole from "$lib/MoleHole.svelte";

    let score = $state(0);
    let molePosition = $state(0);
    let gameActive = $state(false);
    let timeLeft = $state(30);
    let gameInterval = $state<number | undefined>(undefined);
    let moleInterval = $state<number | undefined>(undefined);

    const gridSize = 5;
    const totalHoles = gridSize * gridSize;

    function startGame() {
        gameActive = true;
        score = 0;
        timeLeft = 30;
        moveMole();

        // clock
        gameInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        // how fast the mole moves
        moleInterval = setInterval(() => {
            moveMole();
        }, 1500);
    }

    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(moleInterval);
        gameInterval = 0;
        moleInterval = 0;
    }

    function moveMole() {
        if (!gameActive) return;
        molePosition = Math.floor(Math.random() * totalHoles);
    }

    function whackMole(position: number) {
        if (!gameActive) return;
        if (position === molePosition) {
            score += 10;
            moveMole();
        }
    }
</script>

<div class="min-h-screen p-8">
    <div class="max-w-2xl mx-auto">
        <div
            class="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow"
        >
            <div class="text-xl font-semibold">
                Score: <span>{score}</span>
            </div>
            <div class="text-xl font-semibold">
                Time: <span>{timeLeft}s</span>
            </div>
        </div>

        <div class="text-center mb-6">
            {#if !gameActive}
                <button
                    onclick={startGame}
                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
                >
                    {timeLeft <= 0 && score > 0 ? "Play Again" : "Start Game"}
                </button>
            {:else}
                <button
                    onclick={endGame}
                    class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
                >
                    Stop Game
                </button>
            {/if}
        </div>

        <div
            class="grid grid-cols-5 gap-2 bg-brown-600 p-4 rounded-lg shadow-lg"
        >
            {#each Array(totalHoles) as _, index}
                <MoleHole
                    position={index}
                    hasMole={gameActive && index === molePosition}
                    onWhack={whackMole}
                />
            {/each}
        </div>
    </div>
</div>
