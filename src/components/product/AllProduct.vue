<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>All Product</h5>

    </div>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <div class="col" v-for="(product, index) in products" :key="product.id">
        <router-link
          :to="`/product/${product.id}`"
          style="text-decoration: none"
        >
        <div class="card h-100 text-decoration-none text-black">
          <img
            :src="product.image"
            class="card-img-top"
            alt="Product Image"
            style="height: 200px; width: auto;"
          />
          <div class="card-body d-flex flex-column">
            <p class="card-title">{{ product.price }}</p>
            <p class="card-text">{{ product.name }}</p>
            <div class="mt-auto d-flex justify-content-between align-items-end">
              <p class="mb-0">{{ product.size }}/{{ product.color }}</p>
              <i class="fa-regular fa-heart" style="color: #000000;"> {{ product.like }}</i>
            </div>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex"; // Import useStore untuk mengakses Vuex

const store = useStore(); // Mengakses store
const products = ref([]); // Referensi reaktif untuk menyimpan produk

onMounted(async () => {
  await store.dispatch("product/getProductData"); // Memanggil action untuk mendapatkan data produk
  products.value = store.state.product.products; // Menyimpan data produk dari store ke referensi
});
</script>
