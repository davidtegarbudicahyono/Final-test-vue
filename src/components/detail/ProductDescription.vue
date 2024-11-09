<template>
  <div class="container mt-5 d-flex justify-content-center align-items-center">
    <div class="row">
      <!-- Bagian Kiri: Card Gambar Produk -->
      <div class="col-md-6">
        <div class="card">
          <!-- Pastikan productDetail terdefinisi sebelum digunakan -->
          <img
            v-if="productDetail.image"
            :src="productDetail.image"
            class="card-img-top"
            alt="Main image"
            style="height: 650px;"
          />
        </div>
      </div>

      <!-- Bagian Kanan: Card Detail Produk -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <h2 class="card-title fs-2">IDR {{ productDetail.price }}</h2>
              <i class="fa-regular fa-heart ms-auto"></i>
            </div>
            <h6 class="card-subtitle mb-2 text-muted">{{ productDetail.name }}</h6>
            <ul class="d-flex card-text me-5 p-0">
              <li type="none" class="me-4">
                {{ productDetail.quantity }} / {{ productDetail.size }}
              </li>
              <li class="me-4">{{ productDetail.condition }}</li>
              <li>{{ productDetail.city }}</li>
            </ul>
            <hr />
            <h2 class="card-text">Item Description</h2>
            <p>{{ productDetail.description }}</p>
            <table class="table table-borderless">
              <tbody>
                <tr><td>Category</td><td>{{ productDetail.category }}</td></tr>
                <tr><td>Size</td><td>{{ productDetail.size }}</td></tr>
                <tr><td>Quantity</td><td>{{ productDetail.quantity }}</td></tr>
                <tr><td>Condition</td><td>{{ productDetail.condition }}</td></tr>
                <tr><td>Color</td><td>{{ productDetail.color }}</td></tr>
                <tr><td>Uploaded</td><td>5 hours ago</td></tr>
                <tr><td>Shipping</td><td>{{ productDetail.shipping }}</td></tr>
              </tbody>
            </table>
            <div class="card-footer">
              <button class="btn btnBuyDetail w-100 mb-2">Buy Now</button>
              <button class="btn btnBuyDetail w-100" @click="addToCart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal -->
<div v-if="showModal" class="modal-backdrop">
    <div class="modal-content">
        <img src="/src/assets/images/card_logo.png" class=" mb-3" alt="Cart logo" style="max-width: 100px; margin-left: 35%;" />
        <h4>Product successfully added to cart</h4>
        <p>"{{ productDetail.name }}" successfully added to cart. Check now on the cart or continue shopping.</p>

        <div class="d-flex flex-column justify-content-center mt-4">
            <button class="btn modal-cart1" @click="continueShopping">Continue shopping</button>
            <button class="btn modal-cart2" @click="goToCart">Go to cart</button>
        </div>
    </div>
</div>


  <!-- Produk Lain -->
  <div class="container my-5" v-if="products && products.length > 0">
    <h5>Other Products</h5>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <!-- Pastikan products ada sebelum digunakan -->
      <div
        class="col"
        v-for="(product, index) in products.slice(0, 5)"
        :key="product.id">
        <router-link :to="`/product/${product.id}`" class="card h-100 text-decoration-none text-black">
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
              <p class="mb-0">{{ product.location }}</p>
              <i class="fa-solid fa-location-pin"></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const productDetail = computed(() => store.state.product.productDetail);
const products = computed(() => store.state.product.products); // Ambil data produk lain
const showModal = ref(false);
const selectedQuantity = ref(productDetail.value.quantity || 1);

const addToCart = () => {
    store.dispatch('cart/addToCart', {
        ...productDetail.value,
        quantity: selectedQuantity.value  // Mengirim kuantitas yang dipilih ke aksi Vuex
    });
    showModal.value = true;
};



// Fungsi untuk melanjutkan belanja
const continueShopping = () => {
  showModal.value = false;
  router.push('/products');
};

// Fungsi untuk menuju ke halaman keranjang
const goToCart = () => {
  showModal.value = false;
  router.push('/cart');
};

// Pastikan produk lain dimuat setelah komponen terpasang
onMounted(() => {
  if (!products.value || products.value.length === 0) {
    store.dispatch("product/getOtherProducts"); // Ganti dengan aksi yang benar
  }
});
</script>

<style scoped>

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* Latar belakang semi-transparan */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-content {
    background-color: #f8f5f5; /* Warna latar belakang solid untuk modal */
    color: #0e0d0d; /* Warna teks putih untuk kontras */
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4); /* Efek bayangan */
    max-width: 400px;
    text-align: center;
    z-index: 1051;
}

.modal-content h4 {
    margin-bottom: 15px;
    font-weight: bold;
}

.modal-content p {
    margin-bottom: 20px;
}

.modal-content .btn {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}

.modal-cart1 {
    background-color: #f6f9fa;
    color:  #00AEEF;
    border: none;
    border-radius: 5px ;
    border: 1px solid #00AEEF;
}
.modal-cart1:hover {
    background-color: #00AEEF;
    color: #FFF;
    border: none;
    border-radius: 5px;
}

.modal-cart2 {
    background-color: #00AEEF;
    color: #FFF;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
}


</style>