<script>
    let {programs, formats} = $props();

    // Change this value by hand to show more of the form
    let showOnCampusOptions = false;

    let mealPlans = ["Warrior Plan", "Maroon Plan", "Gold Plan"];
    let dormOptions = ["Oak", "Trustee", "Keokuk"];
</script>

<div class="max-w-2xl mx-auto p-6 space-y-6">
    <div class="rounded-lg shadow-lg p-6 border-t-4 border-red-800">
        <h2 class="text-2xl font-bold text-red-800 mb-6">
            Student Registration
        </h2>

        <form class="space-y-4">
            <div>
                <label for="name" class="block text-sm mb-1">Name:</label>
                <input
                        type="text"
                        id="name"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        required
                />
            </div>

            <div>
                <label
                        for="address"
                        class="block text-sm font-medium text-gray-700 mb-1"
                >Address:</label
                >
                <input
                        id="address"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        required
                />
            </div>

            <div>
                <label
                        for="program"
                        class="block text-sm font-medium text-gray-700 mb-1"
                >Program:</label
                >
                <select
                        id="program"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        required
                >
                    <option value="">Select a program...</option>
                    {#each programs as program}
                        <option value={program.id}>{program.name}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label
                        for="format"
                        class="block text-sm font-medium text-gray-700 mb-1"
                >Class Format:</label
                >
                <select
                        id="format"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
                        required
                >
                    <option value="">Select a format...</option>
                    {#each formats as format}
                        <option value={format}>{format}</option>
                    {/each}
                </select>
            </div>
        </form>
    </div>

    {#if showOnCampusOptions}
        <div
                class="bg-red-50 rounded-lg shadow-lg p-6 border-l-4 border-red-800"
        >
            <h3 class="text-xl font-semibold text-red-800 mb-4">
                On-Campus Options
            </h3>

            <div class="space-y-4">
                <div>
                    <label
                            for="meal-plan"
                            class="block text-sm font-medium text-gray-700 mb-1"
                    >Meal Plan:</label
                    >
                    <select
                            id="meal-plan"
                            class="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent bg-white"
                    >
                        <option value="">Select a meal plan...</option>
                        {#each mealPlans as mealPlan}
                            <option value={mealPlan}>{mealPlan}</option>
                        {/each}
                    </select>
                </div>

                <div>
                    <label
                            for="dorm"
                            class="block text-sm font-medium text-gray-700 mb-1"
                    >Dorm Options:</label
                    >
                    <select
                            id="dorm"
                            class="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent bg-white"
                    >
                        <option value="">Select a dorm...</option>
                        {#each dormOptions as dorm}
                            <option value={dorm}>{dorm}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}

    <button
            type="submit"
            class="bg-red-800 text-white py-3 px-8 rounded-md shadow-lg"
    >
        Register
    </button>
</div>
