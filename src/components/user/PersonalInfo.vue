<template>
  <div class="col-md-9">
    <div class="card profile-card">
      <div class="card-body">
        <h5 class="card-title" style="color: darkgray">Edit Profile</h5>
        <form @submit.prevent="updateProfile">
          <div class="mb-3 text-center d-flex p-4">
            <p class="mt-3">Photo</p>
            <div class="d-flex m-auto float-end">
              <img
                :src="userData.image"
                alt="Profile"
                width="100"
                height="100"
                class="rounded-circle border me-1"
                style="object-fit: cover"
              />
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                class="d-none"
                @change="handleFileChange"
              />
              <button type="button" class="btn btn-secondary m-auto me-5" @click="selectImage">
                Choose
              </button>
              <small class="text-muted m-auto me-5">JPG, JPEG or PNG, 1 MB max.</small>
            </div>
          </div>
          <div class="mb-3">
            <base-input type="text" id="editfullname" label="Full Name" v-model="userData.fullname"></base-input>
          </div>
          <div class="mb-3">
            <base-input type="text" id="editusername" label="Username" v-model="userData.username"></base-input>
          </div>
          <div>
            <base-input type="email" id="editemail" label="Email" v-model="userData.email"></base-input>
          </div>

          <button type="submit" class="btn btnProfileMenu float-end mt-2">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import BaseInput from '../ui/BaseInput.vue';

const store = useStore();
const userData = computed(() => store.state.auth.userLogin);
const isLoading = ref(false); // Tambahkan isLoading di sini

const selectImage = () => {
  document.getElementById('profileImageInput').click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userData.value.image = e.target.result; // Set image URL ke userData
    };
    reader.readAsDataURL(file); // Baca file sebagai URL data
  }
};

const updateProfile = async () => {
  isLoading.value = true; // Set loading sebelum mengupdate
  try {
    const updatedData = {
      userId: userData.value.userId, // Pastikan userId ada di userData
      fullname: userData.value.fullname,
      username: userData.value.username,
      email: userData.value.email,
      image: userData.value.image,
    };

    await store.dispatch('auth/updateUser', updatedData); // Panggil action updateUser
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile.');
  } finally {
    isLoading.value = false; // Reset loading setelah selesai
  }
};
</script>

<style scoped>
.profile-card {
  background-color: #f5f5f5; /* Light gray background */
  border-radius: 8px;
  padding: 20px;
}
.btnProfileMenu {
  background-color: #6c757d;
  color: #fff;
  border: none;
}
</style>
