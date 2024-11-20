<script>
    import { onMount } from "svelte";
    import { supabase } from '../../lib/supabaseClient';
    import { goto } from "$app/navigation";
    import "../../app.css"
    import { P } from "flowbite-svelte";
    import { Button } from 'flowbite-svelte';
    import { Label, Input, ButtonGroup } from 'flowbite-svelte';
    import { EnvelopeSolid, LockSolid } from 'flowbite-svelte-icons';
    
    let sessionData = null;
    let sessionName = null;
    let errorMsgNew = '';
    let errorMsg = '';
    var locationObj = null;
    let latitude;
    let longitude;
    let reqIp = null;
    let locnPlace;
    let time;
    let weather;
    let climate;
    let battery = {};
    let network = {};
    let sessionEmail = '';
    let user_name = '';
    let date;
    let timex;
    let inputText;
    let outputText;
    
    onMount(async () => {
      try {
        let { data, error } = await supabase.auth.getSession();
        sessionData = data.session.access_token;
        sessionName = data.session.user;
        errorMsgNew = error;
        sessionEmail = sessionName.email;
        let { data: emailData, error: err } = await supabase
          .from('users')
          .select('user_name')
          .eq('email', sessionEmail);
        if (!error) {
          user_name = emailData[0].user_name;
        } else {
          console.log("No username or error:", error);
        }
      } catch {
        console.log(errorMsgNew);
      }
    });

    const getLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (location) => resolve(location),
          (error) => reject(error)
        )
      } 
    )
  }

  const getIp = async () => {
        const ipAddress = await fetch("https://api.ipify.org/?format=json");
        const ipAddressReal =  await ipAddress.json();
        return ipAddressReal;
  }
  

  onMount(async () => {
      try{
        const locationDet = await getLocation();
        time = new Date();
        date = time.toDateString();
        timex = time.toLocaleTimeString();
        const ip = await getIp();
        reqIp = ip.ip;
        latitude = locationDet.coords.latitude;
        longitude = locationDet.coords.longitude;
        battery = await navigator.getBattery();
        network = await navigator.connection;
        locationObj = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationDet.coords.latitude}&lon=${locationDet.coords.longitude}&appid=e634be95c09c096d1e555b39d775f4bc`);
        if(locationObj){
          const value = await locationObj.json();
          locnPlace = value.name;
          weather = Math.ceil((value.main.temp)-273.15);
          climate = value.weather[0].main;
          battery = {'batteryCharge': battery.level, 'status': battery.charging};
          network = {'networkType': network.effectiveType, 'speed': network.downlink};
        }
        else{
          console.log("Error");
        }
      }
      catch(error){
        console.log(error);
      }
    })
    
    async function signOut() {
      const { error } = await supabase.auth.signOut();
      goto('/');
      if (error) {
        errorMsg = error;
      } else {
        window.location.href = '/';
        errorMsg = 'User successfully logged out!';
      }
    }

    const addChore = () => {
      let choreJSON = localStorage.getItem('chore');
      if(choreJSON==null){
        choreJSON=[];
      }
      else{
      choreJSON = JSON.parse(choreJSON);
      }
      choreJSON.push(inputText);
      localStorage.setItem('chore', JSON.stringify(choreJSON));
      location.reload();
    }

    onMount(() => {
      outputText = JSON.parse(localStorage.getItem('chore'));
    })

    const dskTop = () => {
      goto('/desktop')
    }

    const removeChore = () => {
      let choreJSON = localStorage.getItem('chore');
      choreJSON = JSON.parse(choreJSON);
      let removeItem = choreJSON.indexOf(inputText);
      choreJSON.splice(removeItem, 1);
      localStorage.setItem('chore', JSON.stringify(choreJSON));
      location.reload();
    }
</script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=cloud" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Julius+Sans+One&family=Prata&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" />

<style>
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    } 

    #main {
    background-image: url("https://images.unsplash.com/photo-1708898813108-5f2e49873d44?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    width: 100%;
    background-position: center;
    background-size: cover;
    min-height: 100vh;
}

@media (max-width: 768px) {
    #main {
        height: 225vh;
        width: 60vh;
    }
}

@media (min-width: 769px) {
    #main {
        height: 100vh;
    }
}

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
 
<div id="main" class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center">
  {#if sessionData}
    <div class="flex lg:flex-row flex-col gap-x-6">
      <div class="lg:h-135 lg:w-110 h-96 w-80 ml-2 lg:ml-10 border-white border-2 bg-black rounded-2xl">
        <h1>fs</h1>
      </div>
      <div class="lg:h-135 lg:w-120 lg:mt-0 mt-10 h-165 w-80 lg:ml-0 ml-2 bg-black bg-opacity-75 text-white border-white border-2 fira-sans-regular shadow-lg p-6 lg:p-8 space-y-4 rounded-3xl">
        <div class="text-center">
          <h1 class="text-7xl lg:text-8xl font-bold">Hello!</h1>
          <h2 class="text-6xl lg:text-5xl fira-sans-bold mt-3">{user_name}</h2>
        </div>
        <div class="flex justify-between items-center text-xl lg:text-2xl">
          <div class="flex flex-col items-start absolute lg:top-64">
            <span class="material-symbols-outlined text-3xl mb-1">schedule</span>
            <p class="fira-sans-bold">{timex}<br>{date}</p>
            <p class="fira-sans-medium">{locnPlace}</p>
          </div>
          <div class="text-right ml-40 mt-32 lg:mt-6 lg:ml-80">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=cloud" />
            <span class="material-symbols-outlined">cloud</span>
            <p class="fira-sans-bold text-5xl">{weather}°C</p>
            <p>{climate}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 text-sm lg:text-lg">
          <div class="relative bottom-6 lg:top-10">
            <p class="fira-sans-bold text-2xl lg:text-4xl">Battery Charge</p>
            <p class="text-2xl fira-sans-bold">{(battery.batteryCharge)*100}%</p>
            {#if battery.status}
                <p>Charging</p>
            {:else}
              <p>Not Charging</p>
            {/if}
          </div>
          <div class="ml-4 lg:pl-12 text-right">
            <p class="fira-sans-bold mt-11 text-2xl lg:text-4xl">Network</p>
            <p class="text-5xl fira-sans-bold">{network.networkType}</p>
            <p class="mt-4">{network.speed}Mbps</p>
          </div>
        </div>
        <br>
        <div class="lg:h-10 lg:w-36 rounded-2xl lg:ml-36 h-10 w-52 ml-6 bg-black hover:bg-white transition-all">
          <p class="text-2xl lg:text-xl text-black text-center lg:pt-1 fira-sans-bold">{reqIp}</p>
        </div>
      </div>
      <div class="lg:h-135 lg:w-100 h-100 w-80 lg:ml-0 ml-2 lg:mt-0 mt-10 bg-black rounded-3xl border-2 border-white">
        <h1 class="text-white text-6xl lg:text-4xl ml-10 lg:ml-36 fira-sans-bold mt-4">Do these</h1>
        <div class="absolute h-122 w-96 overflow-y-scroll lg:ml-7 lg:mt-5 no-scrollbar">
          {#each outputText as chore}
            <li class="mt-2 fira-sans-medium">{chore}</li>
          {/each}
        </div>
    <Input id="email" type="email" class="absolute w-64 sm:w-64 pl-12 top-300 right-5 lg:top-134 lg:right-64 lg:w-52 lg:ml-8" placeholder="gimme some chores!" bind:value={inputText}></Input>
    <Button class="absolute top-301 right-40 lg:top-134 lg:right-44" on:click={addChore}>Add!</Button>
    <Button class="absolute top-301 right-16 lg:top-134 lg:right-20" on:click={removeChore}>Remove</Button>
      </div>
    </div>
    <div class="lg:mt-0 mt-10 flex flex-row sm:flex-row sm:gap-4 relative">
      <button on:click={signOut} class="mt-2 ml-4 lg:mt-1 py-3 px-6 sm:py-4 sm:px-10 lg:py-1 lg:ml-6 lg:px-12 bg-black text-white rounded-2xl font-bold hover:bg-white hover:text-black transition-all fira-sans-bold z-10">
          SIGN OUT
      </button>
      <button on:click={dskTop} class="mt-2 ml-6 lg:mt-1 py-3 px-6 sm:py-4 sm:px-10 lg:py-1 lg:ml-3 lg:px-12 text-white bg-black rounded-2xl font-bold hover:bg-white hover:text-black transition-all fira-sans-bold z-10">
          Desktop Emulator
      </button>
  </div>  
  {:else}
    <p class="text-xl text-center fira-sans-bold">Please log in to view your data.</p>
  {/if}
</div>

