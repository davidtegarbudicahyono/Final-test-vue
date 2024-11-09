<template>
    <router-link to="/login" class="btn btnlogin-signup me-2">Login</router-link>
    <router-link to="/signup">
      <button type="button" class="btn btnlogin-signup me-2">SignUp</button>
    </router-link>
    <div class="dropdown">
      <a
        class="btn btnlogin-signup dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        EN
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#" >EN</a></li>
        <li><a class="dropdown-item" href="#" >IDN</a></li>
      </ul>
    </div>

  </template>
  
  <script setup>
  import "@/assets/base.css";
  </script>
  