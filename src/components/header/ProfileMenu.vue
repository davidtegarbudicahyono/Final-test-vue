<template>
    <router-link to="/cart">
      <img
          src= @/assets/images/card_logo.png
          alt="cart"
          width="36"
          height="36"
          class="rounded-circle border me-1"
          style="object-fit: cover"
          />
    </router-link>
    <router-link to="/">
      <i class="fa-solid fa-heart"></i>
    </router-link>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
        <!-- gambar-profile -->
        <img
          :src="userData.image"
          alt="Profile"
          width="36"
          height="36"
          class="rounded-circle border me-1"
          style="object-fit: cover"
          />
        </a>
        <ul class="dropdown-menu">
          <router-link to="/user" class="dropdown-item"
            ><i class="fa-regular fa-user"></i> Profile
          </router-link>
          <router-link to="" class="dropdown-item"
            ><i class="fa-solid fa-receipt"></i> Order
          </router-link>
          <li><hr class="dropdown-divider" /></li>
          <!-- Logout Button to Open Modal -->
          <li
            class="dropdown-item"
            @click="showLogoutModal = true"
            style="cursor: pointer"
          >
            <i class="fa-solid fa-right-from-bracket"></i>
            Logout
          </li>
        </ul>
      </li>
    </ul>
  
    <!-- Logout Confirmation Modal -->
    <div
      v-if="showLogoutModal"
      class="modal fade show"
      tabindex="-1"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Logout</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to logout from Aetheria?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="confirmLogout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  
  const userData = computed(() =>  store.state.auth.userLogin);
  const store = useStore();
  const router = useRouter();
  
  // State for modal visibility
  const showLogoutModal = ref(false);
  
  // Close modal function
  const closeModal = () => {
    showLogoutModal.value = false;
  };
  
  // Confirm logout function
  const confirmLogout = () => {
    store.commit("auth/setUserLogout");
    router.push("/");
    closeModal();
  };
  </script>

<style scoped>
/* Menambahkan jarak antar ikon */
.router-link {
  margin-right: 30px; /* Menambah jarak antar icon */
}

/* Memperbesar ukuran ikon */
i {
  font-size: 30px; 
  padding: 0 10px; /* Menambah jarak antar ikon */
}

/* Jarak antara ikon terakhir dan gambar profil */
.navbar-nav .nav-item .dropdown-toggle img {
  margin-left: 20px; /* Menambah jarak antara ikon terakhir dan foto profil */
}
</style>

  