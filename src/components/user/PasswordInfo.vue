<template>
  <div class="col-md-9">
    <div class="card profile-card">
      <div class="card-body">
        <h5 class="card-title mb-4" style="color: darkgray">Change Password</h5>
        <form @submit.prevent="handleChangePassword">
          <div class="mb-3">
              <base-input
                  type="password" 
                  identity="oldPassword" 
                  placeholder="Old password" 
                  label="Old Password"
                  v-model="oldPassword"
              ></base-input>
          </div>
          <div class="mb-3">
              <base-input
                  type="password" 
                  identity="newPassword" 
                  placeholder="New password" 
                  label="New Password"
                  v-model="newPassword"
              ></base-input>
          </div>
          <div class="mb-3">
              <base-input
                  type="password" 
                  identity="confirmationPassword" 
                  placeholder="Confirmation new password" 
                  label="Confirm New Password"
                  v-model="confirmationPassword"
              ></base-input>
          </div>
          <p v-if="passwordError" class="text-danger">{{ passwordError }}</p>
          <div class="col-12 justify-content-end d-flex">
              <button type="submit" class="btn btnProfileMenu float-end mt-2">
                  Save Changes
              </button>
          </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Data binding for the form fields
const oldPassword = ref("");
const newPassword = ref("");
const confirmationPassword = ref("");
const passwordError = ref("");

const handleChangePassword = async () => {
    // Validasi kata sandi baru dan konfirmasi
    if (newPassword.value !== confirmationPassword.value) {
        passwordError.value = "New password and confirmation do not match.";
        return;
    }

    // Reset error message
    passwordError.value = "";

    // Panggil fungsi changePassword dari store
    try {
        await store.dispatch("auth/changePassword", {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
        });
        alert("Password changed successfully.");
    } catch (error) {
        passwordError.value = "Failed to change password. Please check the old password.";
        console.error(error);
    }
};
</script>

<style scoped>
.profile-card {
  background-color: #f5f5f5; /* Light gray background */
  border-radius: 8px;
  padding: 20px;
}
</style>
