<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="margin-top: 150px; margin-bottom: 150px;" >
    <div class="container p-4 border rounded shadow-sm" style="max-width: 500px;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Sign up</h5>
        </div>
        <p class="text-muted mb-4">Enter your details below</p>
        <form @submit.prevent="register">
            <div class="mb-3">
                <base-input
                type="text"
                identity="fullname"
                placeholder="Enter your fullname"
                label="Full Name"
                v-model="signupData.fullname"
                />
            </div>
            <div class="mb-3">
                <base-input
                type="text"
                identity="username"
                placeholder="Enter your username"
                label="Username"
                v-model="signupData.username"
                />
            </div>
            <div class="mb-3">
                <base-input
                type="text"
                identity="email"
                placeholder="Enter your email"
                label="Email"
                v-model="signupData.email"
                />
            </div>
            <div class="mb-3">
                <base-input
                type="password"
                identity="password"
                placeholder="Enter your password"
                label="Password"
                v-model="signupData.password"
                @keyInput="passwordCheck"
                />
                <p
                class="text-danger mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: passwordStatusDisplay }"
                >
                The password field must be at least 8 characters
                </p>
            </div>
    
            <div class="mb-3">
                <base-input
                type="password"
                identity="confirmationPassword"
                placeholder="Enter your password"
                label="Confirmation Password"
                v-model="signupData.confirmationPassword"
                @keyInput="confirmationPasswordCheck"
                />
                <p
                class="text-danger mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: confirmPasswordDoesNotMatch }"
                >
                The password confirmation does not match
                </p>
                <p
                class="text-success mt-1 fw-medium"
                style="font-size: 11px"
                :style="{ display: confirmPasswordMatch }"
                >
                The password confirmation does match
                </p>
            </div>

            <div class="my-4">
          <base-input
            type="file"
            identity="recipeImage"
            label="Profile Photo"
            isImage="true"
            @input="checkImage"
          >
            <div>
              <div class="border p-1 mt-2 rounded-circle">
                <img
                  :src="signupData.image"
                  class="rounded-circle"
                  width="140"
                  height="150"
                  style="object-fit: cover"
                />
              </div>
              <div class="text-center" style="transform: translateY(-24px)">
                <i
                  class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"
                ></i>
              </div>
            </div>
          </base-input>
        </div>
    
            <div class="d-flex">
                <input type="checkbox" class="mb-6 me-2" />
                <p>
                  By clicking sign up, I hereby agree and consent to
                  <a href="#" class="text-decoration-none"
                      ><span style="color: #2bced8"> Term & Conditions,</span></a>
                  I confirm that I have read
                  <a href="#" class="text-decoration-none"
                      ><span style="color: #2bced8"> Privacy policy.</span></a>
                </p>
            </div>
            <base-button
                class="login w-100 my-3"
                style="background-color: #2bced8; color: white">
                Register
            </base-button>
        </form>
    </div>

      <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <img src="/src/assets/images/singup_modal.png" alt="sungup_modal">
            <h1 style="color: grey">Succesfully Register</h1>
            <p style="color: grey" class="mt-3">
              Thankyou for register at aetheria. Start find <br />
              your favorite pre-loved product here
            </p>
            <base-button 
              class="mt-3" 
              style="background-color: #2bced8; color: white; width: 400px; font-size: 20px;"
              @click="goToHome">
              Go to Home Page
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import BaseInput from "../ui/BaseInput.vue";
  import BaseButton from "../ui/BaseButton.vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { reactive, ref } from "vue";
  
  const store = useStore();
  const router = useRouter();
  
  const passwordStatusDisplay = ref("none");
  const confirmPasswordDoesNotMatch = ref("none");
  const confirmPasswordMatch = ref("none");
  const showModal = ref(false);
  
  const passwordCheck = () => {
    if (signupData.password.length < 8) {
      passwordStatusDisplay.value = "block";
    } else {
      passwordStatusDisplay.value = "none";
    }
  };
  
  const confirmationPasswordCheck = () => {
    if (signupData.confirmationPassword === "") {
      confirmPasswordDoesNotMatch.value = "none";
      confirmPasswordMatch.value = "none";
      return;
    }
  
    if (signupData.password !== signupData.confirmationPassword) {
      confirmPasswordDoesNotMatch.value = "block";
      confirmPasswordMatch.value = "none";
      return;
    }
  
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "block";
  };
  
  const register = async () => {
    if (
      signupData.password !== signupData.confirmationPassword ||
      signupData.password.length < 8
    ) {
      signupData.confirmationPassword = "";
      signupData.password = "";
      confirmPasswordDoesNotMatch.value = "none";
      confirmPasswordMatch.value = "none";
    } else {
      await store.dispatch("auth/getRegisterData", signupData);
      showModal.value = true;
    }
  };
  
  const goToHome = () => {
    router.push("/");
  };

  const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.image = reader.result;
  });
};
  
  const signupData = reactive({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmationPassword: "",
    image: "",
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Ganti dengan background semi-transparan */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-dialog {
    width: 100%; /* Atur lebar ke 100% */
    max-width: 500px; /* Lebar maksimum modal */
    max-height: 90%; /* Tinggi maksimum modal */
    height: auto; /* Tinggi otomatis */
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden; /* Menyembunyikan overflow */
}

.modal-content {
    background: white;
    color: black; /* Ganti warna teks agar lebih kontras */
    border-radius: 8px;
    padding: 20px; /* Tambah padding untuk ruang di dalam modal */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto; /* Tambahkan scroll jika konten lebih tinggi dari modal */
}

.modal-body {
    text-align: center;
}

  </style>
  