<script>
    import { onMount } from "svelte";
    import { supabase } from "../../lib/supabaseClient";
    import "../../app.css"
    let sessionData;

    onMount(async () => {
        let { data, error } = await supabase.auth.getSession();
        sessionData = data.session.access_token;
    });
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
        height: 100vh;
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
            <a href="/desktop/error">
                <img src="/finder.png" alt="Finder Image" class="hover:bg-blue-800"/>
            </a>
            <a href="/desktop/error">
                <img src="/mpc.png" alt="My Computer" class="mt-8 hover:bg-blue-800" />
            </a>
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
    {:else}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TtfGpQLF-Wx7dTlJgDadtgLMXxyU-CGl4g&s" alt="Errorenous">
    {/if}
</div>
