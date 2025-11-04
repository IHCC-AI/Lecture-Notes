<script>
    import Header from "$lib/Header.svelte";
    import Form from "$lib/Form.svelte";
    let formats = [
        "Face-to-Face",
        "Live Virtual Learning",
        "Online learning (WWW)",
    ];
    let programs = [
        { id: 1, name: "Welding" },
        { id: 2, name: "Computer Software Development" },
        { id: 3, name: "Cyber Security" },
        { id: 4, name: "Multimedia Design" },
    ];
</script>

<Header {formats} />
<Form {programs} {formats} />
