<script>
    let { description, date, time, location } = $props();
</script>

<div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 mx-5">
    <p class="mb-4">{description}</p>
    <div class="flex gap-4 mb-2">
        <p>Date: {date}</p>
        <p>Time: {time}</p>
    </div>
    <p>Location: {location}</p>
</div>
