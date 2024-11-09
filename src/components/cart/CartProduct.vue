<template>
    <div class="container-md" style="margin-top: 30px; margin-bottom: 30px;">
      <div class="row " >
        <!-- Bagian Cart Card -->
        <div class="col-8 order-items-card">
            <div class="d-flex justify-content-between align-items-center">
                <h2>Cart</h2>
                <p>{{ totalItems }} items</p>
            </div>
            <div class="d-flex">
                <i class="fa-solid fa-location-dot p-1" style="color: #000000;"></i>
                <p>shipping to <span class="fw-semibold">Dauh Puri, Denpasar, Bali, Indonesia</span></p>
            </div>
            <div v-if="cartProducts && cartProducts.length > 0">
                <div v-for="(product, index) in cartProducts" :key="index" class="cart-item d-flex justify-content-between align-items-start border p-3 position-relative">
                    <div class="d-flex align-items-center">
                        <img :src="product.image" alt="Product Image" class="product-image me-3 border" style="width: 100px; height: 150px;" />
                        <div>
                        <h5>{{ product.name }}</h5>
                        <!-- Tampilan hanya menampilkan quantity asli dari store -->
                        <p>{{ product.quantity }}/{{ product.size }}</p>
                        <h6 class="text-dark">{{ formatPrice(product.price) }}</h6>
                        <button class="btn btn-link p-1" @click="removeProduct(product.id)" style="text-decoration: none; background-color: darkred; color: white;">Remove</button>
                        </div>
                    </div>
                    
                    <!-- Quantity Selector Positioned to Bottom Center -->
                    <div class="quantity-selector">
                        <button @click="decreaseQuantity(product)" class="btn  quantity-button">-</button>
                        <span>{{ getOrderQuantity(product.id) }}</span>
                        <button @click="increaseQuantity(product)" class="btn  quantity-button">+</button>
                    </div>

                </div>
             </div>
            <div v-else>
                <p>No products in the cart.</p>
            </div>
        </div>

  
        <!-- Bagian Order Summary -->
        <div class="col-4 ">
          <div class="order-summary-card card p-3">
            <h5 class="d-flex justify-content-between">
              <span>Order Summary</span>
              <span>{{ totalPrice }}</span>
            </h5>
            <p>{{ totalItems }} items</p>
            <p class="text-muted">Not include shipping fee</p>
            <button class="btn  w-100 button-summary" @click="goToOrderConfirmation">Checkout ({{ totalItems }})</button>
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


      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  const products = computed(() => store.state.products || []);

  // Computed property to get cart items from Vuex
  const cartProducts = computed(() => store.state.cart.cartItems || []);
  
  // Define a ref to hold quantities
  const orderQuantities = ref({});
  
  // Format price
function formatPrice(price) {
  let formattedPrice = "Rp " + parseInt(price).toLocaleString('id-ID');
  if (!formattedPrice.includes(',')) {
    formattedPrice += ".000";
  }
  return formattedPrice;
}

  
  // Total items calculation
  const totalItems = computed(() =>
    Object.values(orderQuantities.value).reduce((total, qty) => total + qty, 0)
  );
  
  // Remove product from cart
  function removeProduct(productId) {
    store.dispatch("cart/removeCartItem", productId);
    delete orderQuantities.value[productId];
  }
  
 
  // Total price calculation
const totalPrice = computed(() => {
  const total = cartProducts.value.reduce((total, item) => {
    const quantity = orderQuantities.value[item.id] || item.quantity || 1;
    const price = parseInt(item.price.replace(/\./g, "").replace(/Rp /g, "")); // Menghapus format Rp dan pemisah ribuan
    return isNaN(price) ? total : total + price * quantity;
  }, 0);
  
  return formatPrice(total); // Format harga total menggunakan fungsi formatPrice
});

  
  // Get order quantity
  const getOrderQuantity = (itemId) => {
    return orderQuantities.value[itemId] || 1;
  };
  
  // Increase quantity
  const increaseQuantity = (item) => {
    const currentQuantity = getOrderQuantity(item.id);
    if (currentQuantity < item.quantity) {
      orderQuantities.value[item.id] = currentQuantity + 1;
    }
  };
  
  // Decrease quantity
  const decreaseQuantity = (item) => {
    const currentQuantity = getOrderQuantity(item.id);
    if (currentQuantity > 1) {
      orderQuantities.value[item.id] = currentQuantity - 1;
    }
  };
  
  // Fetch cart items on mount
  onMounted(async () => {
    await store.dispatch("cart/fetchCartItems");
    cartProducts.value.forEach((item) => {
      orderQuantities.value[item.id] = item.quantity; // Initialize quantities
    });
  });
  
  // Go to order confirmation page
  const goToOrderConfirmation = () => {
    router.push({ name: "OrderConfirmation" });
  };

  // Pastikan produk lain dimuat setelah komponen terpasang
onMounted(() => {
  if (!products.value || products.value.length === 0) {
    store.dispatch("product/getOtherProducts"); // Ganti dengan aksi yang benar
  }
});
  </script>
  

  
  <style scoped>
  .quantity-button {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    margin: 0 5px;
    font-weight: bold;
    background-color: rgb(106, 113, 255);
  }
  .quantity-button:hover {
    background-color: #1a237e; /* Biru tua untuk efek hover */
    color: white;
    
  }
  .quantity-selector span {
    margin: 0 10px;
    font-weight: bold;
  }
  .button-summary {
    background-color: rgb(114, 126, 254);
  }
  .order-items-card,
  .order-summary-card {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background: #f9f9f9;
  }
</style>
