<script>
    import { onMount } from "svelte";
    import { supabase } from "../../lib/supabaseClient";
    import "../../app.css"
    let sessionData;
    let divToggle = false;
    let divToggle2 = false;
    let userName = null;
    let fileName = null;


    onMount(async () => {
        let { data, error } = await supabase.auth.getSession();
        sessionData = data.session.access_token;
    });

    const divToggler = () => {
        divToggle = divToggle? false : true;
        divToggle2 = false;
    }

    const changeBg = () => {
        let bgDocument = document.getElementById('bg');
        const bgValue = bgDocument.files[0];
        if(bgValue){
            const reader = new FileReader();
            reader.readAsDataURL(bgValue); 
            reader.onload = (e) => {
                localStorage.setItem('bg', e.target.result);
            }
            location.reload();
        }
    }

    onMount(() => {
        let backgroundElement = document.getElementById('main');
        backgroundElement.style.backgroundImage = `url(${localStorage.getItem('bg')})`;
    })

    const divToggler2 = () => {
        divToggle2 = divToggle2?false:true;
        divToggle = false;
    }

    const uploadFile = async () => {
        let bgDocument = document.getElementById('fileInput');
        const bgValue = bgDocument.files[0];
        const { data: response, error } = await supabase
        .storage
        .from('dashyfiles')
        .upload(`${userName}/${fileName}`, bgValue, {
            cacheControl: '3600',
            upsert: false
        })
    }

    const retriveFile = async () => {
        const { data: response, error } = await supabase
            .storage
            .from('dashyfiles')
            .download(`${userName}/${fileName}`)
        
        const urlObj = URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = urlObj;
        a.download = 'DashyFileSystem';
        a.click(); 
    }

</script>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    #main {
        background-image: url("https://images5.alphacoders.com/117/thumb-1920-1173772.jpg");
        width: 100%;
        height: 93vh;
        background-position: center;
        background-size: cover;
        background-clip: unset;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>

<div id="main">
    {#if sessionData}
        <div class="h-96 w-20 absolute left-6 top-8">
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <button on:click={divToggler}>
                <img src="/finder.png" alt="Finder Image" class="hover:bg-blue-800"/>
            </button>
            <button on:click={divToggler2}>
                <img src="/mpc.png" alt="My Computer" class="mt-8 hover:bg-blue-800" />
            </button>
            <a href="https://github.com/adithya1770">
                <img src="https://ih1.redbubble.net/image.3082652016.7312/raf,360x360,075,t,fafafa:ca443f4786.u2.jpg" alt="Github" class="hover:bg-blue-800 rounded-full mt-8">
            </a>
            <a href="https://www.linkedin.com/in/adithyaps929/">
                <img src="/linkedin.png" alt="Linkedin" class="mt-8 hover:bg-blue-800">
            </a>
            <a href="https://www.reddit.com/user/Interesting-Cold-167/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button">
                <img src="/reddit.png" alt="Reddit" class="mt-8 hover:bg-blue-800">
            </a>
        </div>
        <div class="lg:w-full lg:h-16 bg-gray-400 absolute h-10 w-full top-165 lg:top-135 flex flex-row">
            <div class="lg:h-16 lg:w-52 h-10 w-40 bg-gray-700 flex flex-row">
                <a href="https://www.youtube.com/watch?v=oHg5SJYRHA0">
                    <img src="/win.png" alt="Windows" class="lg:w-16 lg:h-14 w-8 h-8 lg:ml-4 ml-2 mt-2 lg:mt-2">
                </a>
                <p class="font-mono text-3xl lg:mt-4 ml-2 lg:ml-4 mt-1 font-semibold">Start</p>
            </div>
        </div>
        {#if divToggle}
            <div class="bg-gray-500 h-120 w-64 z-10">
                <div class="h-10 w-64 bg-blue-800">
                    <button on:click={divToggler}>
                        <img src="https://preview.redd.it/windows-95-98-tab-buttons-needs-your-help-some-people-have-v0-qa0k1n3tfar81.png?auto=webp&s=c07ee409ab4177c0d8baebb7bfe73734637cda78" alt="" class="h-10 w-32 ml-32">
                    </button>
                    <h1 class="ml-6 font-mono text-3xl font-bold m-4">Change Wallpaper</h1>
                    <div class="lg:mt-16 mt-16 relative font-mono h-28 w-64 bg-gray-600 flex flex-col items-center justify-center">
                        <input type="file" id="bg" class="relative z-10 opacity-0">
                        <label for="bg" class="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer">
                            Choose File
                        </label>
                    </div>
                    <br><br>
                    <button on:click={changeBg} class="ml-16 h-10 w-32 bg-gray-800 font-mono lg:ml-16 text-white">Change</button>
                </div>
            </div>
        {/if}
        {#if divToggle2}
            <div class="h-120 w-64 z-10 bg-gray-600">
                <div class="h-10 w-64 bg-blue-800">
                    <button on:click={divToggler2}>
                        <img src="https://preview.redd.it/windows-95-98-tab-buttons-needs-your-help-some-people-have-v0-qa0k1n3tfar81.png?auto=webp&s=c07ee409ab4177c0d8baebb7bfe73734637cda78" alt="" class="h-10 w-32 ml-32">
                    </button>
                </div>
                <h1 class="ml-4 font-mono text-3xl font-bold m-4">FileSystem</h1>
                <label for="file" class="font-mono text-2xl ml-4 mt-4">Filename</label>
                <input name="file" type="text" class="h-10 w-64 mt-2" bind:value={fileName}>
                <label for="fileInput" class="font-mono text-2xl ml-4 mt-4">File</label>
                <input name="fileInput" id="fileInput" type="file" class="h-10 w-64 mt-2">
                <label for="name" class="font-mono text-2xl ml-4 mt-4">Name</label>
                <input name="name" type="text" class="h-10 w-64 mt-2" bind:value={userName}>
                <button on:click={uploadFile} class="ml-16 h-10 w-32 bg-gray-800 font-mono lg:ml-16 text-white mt-6">Upload</button>
                <button on:click={retriveFile} class="ml-16 h-10 w-32 bg-gray-800 font-mono lg:ml-16 text-white mt-6">Retrive</button>
            </div>
        {/if}
    {:else}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TtfGpQLF-Wx7dTlJgDadtgLMXxyU-CGl4g&s" alt="Errorenous">
    {/if}
</div>
