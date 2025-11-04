<script>
    import Header from "$lib/Header.svelte";
    import EventDetails from "$lib/EventDetails.svelte";

    let eventName = "Iowa Tech Submit";
    let eventData = {
        description:
            "Connect, Learn and Grow at Iowa's Premier Technology Conference",
        date: "2026-09-15",
        time: "10:00 AM",
        location: "Iowa Event Center",
    };
</script>

<!-- Event Name can be left blank for default value -->
<Header {eventName} />

<!-- Spreading the props -->
<EventDetails {...eventData} />
