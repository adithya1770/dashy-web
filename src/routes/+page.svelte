<script>
  import "../app.css";
  import { Button } from 'flowbite-svelte';
  import { Label, Input, ButtonGroup } from 'flowbite-svelte';
  import { EnvelopeSolid, LockSolid } from 'flowbite-svelte-icons';
  import { supabase } from "../lib/supabaseClient";
  import { goto } from '$app/navigation';
  import { onMount } from "svelte";

  let reqReceipt = null;
  let reqError = null;
  let username = '';
  let password = '';
  let userClick = false;
  let signClicked = false;
  let name = '';
  
  var userClicked = () => {
      userClick = userClick ? false : true;
  }

  var signClick = () => {
      signClicked = signClicked ? false : true;
      console.log(signClicked)
  }

  async function signUpNewUser() {
      const { data: responseData, error: responseError } = await supabase.auth.signUp({
          email: username,
          password: password,
          options: {
              emailRedirectTo: 'http://localhost:5173',
          },
      })
      const { data, error } = await supabase
        .from('users')
        .insert([
            { email: username, user_name: name },
        ])
        .select()
      reqReceipt = responseData;
      reqError = responseError;
  }

  async function signInWithEmail() {
      const { data: responseData, error: responseError } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
      })
      if (responseError) {
          reqError = responseError;
      } else {
          reqReceipt = responseData;
          goto('/dashboard');
      }
  }

  var googleSignIn = () => {
    window.location.href = 'https://effective-octo-eureka-h2n4.onrender.com/oauth';
  }
</script>


<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Julius+Sans+One&family=Prata&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" />

<style>
  #main {
      background-image: url("https://wallpapercat.com/w/full/6/c/9/795262-3840x2160-desktop-4k-gradient-background-photo.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      height: 100vh;
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
  .fira-sans-bold-italic {
      font-family: "Fira Sans", serif;
      font-weight: 700;
      font-style: italic;
  }
</style>

<div id="main">
  <div class="w-full h-64 absolute top-52 bg-black">
      <h1 class="lg:text-10xl text-9xl fira-sans-bold text-white lg:ml-7 lg:mt-8 ml-4 mt-4">Dashy</h1>
      <span class="material-symbols-outlined text-white">
          <button class="text-7xl absolute lg:right-10 lg:bottom-24 lg:top-20 right-40 top-40" on:click={userClicked}>login</button>
      </span>
  </div>

  {#if userClick}
      <div class="h-auto w-11/12 sm:w-80 md:w-96 lg:w-1/3 backdrop-blur-3xl lg:top-10 border-white border-4 absolute top-20 left-1/2 transform -translate-x-1/2 rounded-3xl">
          <span class="material-symbols-outlined absolute right-4 top-4">
              <button on:click={userClicked}>close</button>
          </span>
          {#if signClicked==true}
              <div class="mb-6 ml-4">
                  <h1 class="fira-sans-bold absolute top-10 left-8 md:left-24 text-8xl md:text-8xl text-white ">Log in</h1><br><br><br>
                  <Label for="input-group-1" class="block mt-28 lg:ml-10 ml-2 text-2xl md:text-4xl text-white">Email</Label>
                  <Input id="email" type="email" class="w-64 md:w-72 lg:ml-10 ml-2 lg:mt-6" placeholder="name@gmail.com" bind:value={username}>
                      <EnvelopeSolid slot="left" class="w-5 h-5 ml-2 lg:ml-10 text-gray-500 dark:text-gray-400" />
                  </Input>
                  <Label for="input-group-1" class="block mt-6 ml-2 lg:ml-10 text-2xl md:text-4xl text-white">Password</Label>
                  <Input id="password" type="password" class="w-64 ml-2 md:w-72 lg:ml-10 lg:mt-6" placeholder="Min. 8 Characters" bind:value={password}>
                      <LockSolid slot="left" class="w-5 h-5 ml-2 lg:ml-10 text-gray-500 dark:text-gray-400" />
                  </Input>
                  <br>
                  <Button color="light" class="ml-2 lg:ml-12 mt-5" on:click={signInWithEmail}>
                      Log in
                  </Button>
                  <button on:click={signClick} class="ml-4 text-white fira-sans-bold-italic">didn't sign up?</button>
                  {#if reqError}
                      <p class="text-white">{reqError.message}</p>
                  {/if}
              </div>
          {:else}
              <div class="mb-6 ml-4">
                  <h1 class="fira-sans-bold absolute top-14 lg:top-10 left-8 md:left-20 text-7xl md:text-8xl text-white">Sign Up</h1><br><br><br>
                  <Label for="input-group-1" class="block mt-28 lg:ml-10 ml-2 text-2xl md:text-4xl text-white">Email</Label>
                  <Input id="email" type="email" class="w-64 md:w-72 lg:ml-10 ml-2 lg:mt-1" placeholder="Your Email" bind:value={username}>
                      <EnvelopeSolid slot="left" class="w-5 h-5 ml-2 lg:ml-10 text-gray-500 dark:text-gray-400" />
                  </Input>
                  <Label for="input-group-1" class="block mt-4 lg:ml-10 ml-2 text-2xl md:text-4xl text-white">Username</Label>
                  <Input id="name" type="name" class="w-64 ml-2 md:w-72 lg:ml-10 lg:mt-6" placeholder="Your Supercool username" bind:value={name}>
                    <EnvelopeSolid slot="left" class="w-5 h-5 ml-2 lg:ml-10 text-gray-500 dark:text-gray-400" />
                  </Input>
                  <Label for="input-group-1" class="block mt-6 ml-2 lg:ml-10 text-2xl md:text-4xl text-white">Password</Label>
                  <Input id="password" type="password" class="w-64 ml-2 md:w-72 lg:ml-10 lg:mt-6" placeholder="Min. 8 Characters" bind:value={password}>
                      <LockSolid slot="left" class="w-5 h-5 ml-2 lg:ml-10 text-gray-500 dark:text-gray-400" />
                  </Input>
                  <br>
                  <Button color="light" class="ml-3 lg:ml-12 mt-6" on:click={signUpNewUser}>
                      Sign up
                  </Button>
                  <Button color="light" class="ml-3 lg:ml-3 mt-2" on:click={googleSignIn}>
                    <br>
                    <img src="/google.png" alt="google" class="h-5 w-5">
                  </Button>
                  <button on:click={signClick} class="ml-4 mt-4 text-white fira-sans-bold-italic">already signed up?</button>
                  {#if reqReceipt}
                      <p class="ml-10 mt-6 text-white">Check e-mail for confirmation</p>
                  {/if}
                  {#if reqError}
                      <p class="text-white">{reqError.message}</p>
                  {/if}
              </div>
          {/if}
      </div>
  {/if}
</div>