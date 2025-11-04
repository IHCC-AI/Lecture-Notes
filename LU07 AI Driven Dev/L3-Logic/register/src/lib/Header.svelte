<script>
    let { formats } = $props();
</script>

<div class="container mx-1 px-1 py-1">
    <h1 class="text-4xl font-bold text-maroon-800 mb-6 text-red-900">
        Register for Courses
    </h1>
    <p class="text-black mb-4 leading-relaxed">
        Indian Hills Community College offers many classes in a variety of
        formats so each student can select the format that works best for their
        personal safety as well as their learning style. Some Health Sciences
        and Advanced Technologies classes will require students to be on campus,
        but most Arts & Sciences classes will be offered in the following
        formats:
    </p>
    <ul class="list-disc list-inside text-black space-y-2 ml-4">
        {#each formats as format}
            <li>{format}</li>
        {/each}
    </ul>
</div>
