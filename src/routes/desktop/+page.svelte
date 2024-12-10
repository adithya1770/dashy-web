<script>
    import { onMount } from "svelte";
    import { supabase } from "../../lib/supabaseClient";
    import "../../app.css"
    let sessionData;
    let divToggle = false;
    let divToggle2 = false;
    let divToggle3 = false;
    let divToggle4 = false;
    let userName = null;
    let fileName = null;
    let compilerData = {};
    let codeSnippet = `#include<stdio.h>
        int main(){
            printf("Hello World");
            return 0;
        }`;

    import { GoogleGenerativeAI } from "@google/generative-ai";

    let requestQuery = "";
    let requestResponse = "";


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

    const divToggler3 = () => {
        divToggle3 = divToggle3?false:true;
        divToggle = false;
    }

    const divToggler4 = () => {
        divToggle4 = divToggle4?false:true;
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

    const responseGenerator = async () => {
        const genAI = new GoogleGenerativeAI("AIzaSyBCwWdQi0GK9mi_sVEfOGRLjDqBFUnZqwA");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `${requestQuery}`;
        const result = await model.generateContent(prompt);
        requestResponse = result.response.text();
    }

    const compilerRun = async () => {
        const compilerPayload = {
            clientId: "9017e2a6af802508a15b40a5b9b4a5ad",
            clientSecret: "15a673ccac2b06e080ea26edc9f0d0e3672d192474f30811154a7985529140fb",
            script: `${codeSnippet}`,
            language: "c",
            versionIndex: "0",
            stdin: "",
            compileOnly: false
        }
        const compilerReq = await fetch("https://effective-octo-eureka-h2n4.onrender.com/compiler", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(compilerPayload)
        })

        if(compilerReq){
            compilerData = await compilerReq.json();
        }
        else{
            console.log("error");
        }
    }


</script>

<style>

    .custom::-webkit-scrollbar{
            display: none;
        }

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

    .source-code-pro {
    font-family: "Source Code Pro", monospace;
    font-optical-sizing: auto;
    font-weight: 500px;
    font-style: normal;
    }

</style>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=play_arrow" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Julius+Sans+One&family=Prata&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">

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
            <button on:click={divToggler3}>
                <img src="/specs.png" alt="Specs" class=" hover:bg-blue-800 absolute top-2 left-32" />
            </button>
            <button on:click={divToggler4}>
                <img src="https://preview.redd.it/the-vs-code-logo-v0-hyvwvj3m8zdb1.png?width=640&crop=smart&auto=webp&s=00e26e2aae03f6d96ee33e82cab6332ef611c65d" alt="VS code"  class=" hover:bg-blue-800 absolute top-28 left-32">
            </button>
        </div>
        <div class="lg:w-full lg:h-16 bg-gray-400 absolute h-10 w-full top-165 lg:top-135 flex flex-row">
            <div class="lg:h-16 lg:w-52 h-10 w-40 bg-gray-700 flex flex-row">
                <a href="https://www.youtube.com/watch?v=oHg5SJYRHA0">
                    <img src="/win.png" alt="Windows" class="lg:w-16 lg:h-14 w-8 h-8 lg:ml-4 ml-2 mt-2 lg:mt-2">
                </a>
                <p class="font-mono text-3xl lg:mt-4 ml-2 lg:ml-4 mt-1 font-semibold">Start</p>
            </div>
        </div>
        {#if divToggle3}
            <div class="bg-gray-500 h-120 w-96 lg:h-160 lg:w-120 z-10 source-code-pro">
                <div class="h-10 w-120 bg-blue-800">
                    <button on:click={divToggler3}>
                        <img src="https://preview.redd.it/windows-95-98-tab-buttons-needs-your-help-some-people-have-v0-qa0k1n3tfar81.png?auto=webp&s=c07ee409ab4177c0d8baebb7bfe73734637cda78" alt="" class="h-10 w-32 ml-99">
                    </button>
                        <div class="overflow-y-scroll h-80 w-96 lg:h-96 lg:w-111 custom mt-10 fira-sans-medium">
                            <p class="text-white text-4xl ml-3">{requestQuery}</p>
                            <br>
                            <br>
                            <p class="text-white ml-3">{requestResponse}</p>
                        </div>  
                      <div>
                        <input type="text" class="lg:w-80 lg:mt-28 ml-3 fira-sans-bold lg:ml-6" placeholder="enter your query here!" bind:value={requestQuery}>
                        <button class="text-white fira-sans-bold lg:ml-64 ml-4 text-xl lg:mt-5 absolute lg:top-134 lg:left-135" on:click={responseGenerator}>Generate</button>
                      </div>
                </div>
            </div>
        {/if}
        {#if divToggle4}
            <div class="bg-gray-500 h-120 w-64 lg:h-160 lg:w-120 z-10 source-code-pro absolute top-10">
                <div class="h-10 w-64 lg:h-10 lg:w-120 bg-blue-800">
                    <button on:click={divToggler4}>
                        <img src="https://preview.redd.it/windows-95-98-tab-buttons-needs-your-help-some-people-have-v0-qa0k1n3tfar81.png?auto=webp&s=c07ee409ab4177c0d8baebb7bfe73734637cda78" alt="" class="h-10 w-32 lg:ml-99">
                    </button>
                    <textarea name="ide" placeholder="start coding!" rows="15" class="ml-0 lg:ml-3 lg:w-100 w-64 cols-23 lg:cols-43" bind:value={codeSnippet}></textarea>                        
                    <button class="ml-3" on:click={compilerRun}><span class="material-symbols-outlined">
                        <p class="text-5xl">play_arrow</p>
                        </span></button>
                </div>
                <div class="lg:h-40 lg:w-115 bg-black mt-100 lg:mt-100 overflow-x-scroll overflow-y-scroll custom">
                    <p class="text-white ml-2 mt-2">{compilerData.output}</p>
                    <p class="text-white">----------------------------------------</p>
                    <p class="text-white ml-2">average cpu time :{compilerData.cpuTime}</p>
                    <p class="text-white ml-2">memory used :{compilerData.memory}</p>
                    <p class="text-white ml-2">built by adithya ps</p>
                </div>
            </div>
        {/if}
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
