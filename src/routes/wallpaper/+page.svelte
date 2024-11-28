<script>
    import '../../app.css'
    let accessKey = '7zxDLuekpq0b30GVrnrZuEq9F3nMjJTn1EAlGvr56rU';
    let photoBucket = [];
    let photoDownloadUrl = '';

    const getRandomPhoto = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/collections?client_id=${accessKey}`);
            const data = await response.json();
            photoBucket = data;
            console.log(photoBucket);
        } catch (error) {
            console.error(error);
        }
    };
    getRandomPhoto();
    
</script>

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Julius+Sans+One&family=Prata&display=swap" rel="stylesheet">

<style>
      .fira-sans-regular {
      font-family: "Fira Sans", serif;
      font-weight: 400;
      font-style: normal;
    }
    .fira-sans-medium {
        font-family: "Fira Sans", serif;
        font-weight: 500;
        font-style: normal;
    }
    .fira-sans-bold {
        font-family: "Fira Sans", serif;
        font-weight: 700;
        font-style: normal;
    }
</style>


<div class="bg-black">
    <div class="pt-7">
        <h1 class="text-white fira-sans-bold text-7xl lg:ml-10 mb-10">Daily Dose of Photographs and Wallpapers</h1>
    </div>
    {#each photoBucket as photo}
        <img src={photo.cover_photo.urls.regular} alt="Photo" class="lg:mt-6 lg:mb-6 inline-block lg:ml-48">
        <p class="text-2xl text-white fira-sans-bold lg:ml-160">{photo.title}</p><br><hr>
    {/each}
</div>