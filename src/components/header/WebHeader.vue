<template>
  <header class="container-fluid py-2 bg-light">
    <nav>
      <div class="d-flex justify-content-between align-items-center">
        
        <!-- Logo -->
        <router-link to="/" class="logo py-0 d-flex align-items-center text-decoration-none">
          <i class="fa-brands fa-vimeo fa-2x" style="color: #74C0FC;"></i>
          <span class="fw-bold mb-0 ms-2 pondexheader1 fs-2 text-info">Vintage</span>
        </router-link>
        
        <!-- Center Items -->
        <div class="d-flex align-items-center ms-4 flex-grow-1">
          <!-- Search Form -->
          <form class="d-flex me-3 w-100" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          
          <!-- Conditional Rendering for Menu Components -->
          <menu-header v-if="!isAuthenticated" />
          <profile-menu v-else />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MenuHeader from "./MenuHeader.vue";
import ProfileMenu from "./ProfileMenu.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    MenuHeader,
    ProfileMenu,
  },
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => !!store.state.auth.token);

    const menuComponent = ref("menu-header");

    const getToken = computed(() => store.state.auth.token);

    // Update menuComponent based on login status
    watch(
      getToken,
      (newValue) => {
        menuComponent.value = newValue ? "profile-menu" : "menu-header";
      },
      { immediate: true }
    );

    return {
      menuComponent,
      isAuthenticated,
    };
  },
};
</script>

<style scoped>
header {
  width: 100%; /* Full width */
  height: 80px;
  padding: 15px 20px; /* Increase padding for a larger header */
  position: sticky; /* Make header sticky */
  top: 0; /* Stick to the top of the page */
  z-index: 1000; /* Ensure it appears above other elements */
}

form input[type="search"] {
  width: 980px; /* Full width for search bar */
}

.container-fluid {
  padding-left: 80px;
  padding-right: 80px;
}
</style>
