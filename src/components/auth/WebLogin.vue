<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="container p-4 border rounded shadow-sm " style="max-width: 400px;">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-3">Login</h5>
                </div>
                <p class="text-muted mb-4">Enter your details below</p>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <base-input
                        type="text"
                        identity="email"
                        placeholder="Enter your email"
                        label="Email"
                        v-model="loginData.email"
                        >
                        </base-input>
                    </div>
                    <div class="mb-3">
                        <base-input
                        type="password"
                        identity="password"
                        placeholder="Enter your password"
                        label="Password"
                        v-model="loginData.password"
                        >
                        </base-input>
                    </div>
                    <base-button
                        class="login w-100 my-3"
                        style="background-color: #2bced8; color: white"
                    >
                        Login
                    </base-button>
                </form>
            </div>
        </div>
</template>

  
  <script setup>
  import BaseButton from "../ui/BaseButton.vue";
  import BaseInput from "../ui/BaseInput.vue";
  import { reactive } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  
  const store = useStore();
  const router = useRouter();
  
  const login = async () => {
    await store.dispatch("auth/getLoginData", loginData);
    router.push("/");
  };
  
  const loginData = reactive({
    email: "",
    password: "",
    isLogin: true,
  });
  </script>
  