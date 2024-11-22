<script>
    let accessKey = '7zxDLuekpq0b30GVrnrZuEq9F3nMjJTn1EAlGvr56rU';

    const getRandomPhoto = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    getRandomPhoto();
    // try to use onMount
</script>