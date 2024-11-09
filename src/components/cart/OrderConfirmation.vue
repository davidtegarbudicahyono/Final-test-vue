<template>
  <div class="confirmation-order-description container">
    <div v-if="!cartItems || cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div class="confirmation-content" v-else>

    <div v-for="(product, index) in cartProducts" :key="index" class="cart-item d-flex justify-content-between align-items-start border p-3 position-relative">
        <div class="d-flex align-items-center">
            <img :src="product.image" alt="Product Image" class="product-image me-3 border" style="width: 100px; height: 150px;" />
            <div>
              <h5>{{ product.name }}</h5>
              <!-- Tampilan hanya menampilkan quantity asli dari store -->
              <p>{{ product.quantity }}/{{ product.size }}</p>
              <h6 class="text-dark">{{ formatPrice(product.price) }}</h6>
            </div>
        </div>
    </div>

      <!-- Order Items Card -->
      <div class="order-items-card card">
        <h3>Order</h3>
        <div class="confirmation-items-list">
          <div v-for="item in cartItems" :key="item.id" class="cart-item d-flex justify-content-between align-items-start border p-3 position-relative">
            <div class="d-flex align-items-center">
              <img :src="item.image" alt="Product Image" class="product-image me-3 border" style="width: 100px; height: 150px;" />
              <div>
                <p class="item-name"><b>{{ item.name }}</b></p>
                <p class="item-quantity-size">
                  {{ item.quantity }} | {{ item.size }}
                </p>
                <p class="item-price">Rp{{ item.price }}</p>
              </div>
            </div>
            <!-- Bagian untuk menampilkan "x{{ item.quantity }}" di ujung kanan -->
            <div style="display: flex; align-items: center;">
              <span>X{{ getOrderQuantity(item.id) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="order-summary-card card">
          <h3>Order Summary</h3>
        <div class="summary-item">
          <span>Order</span>
          <span> {{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="summary-item">
          <span>Protection Fee</span>
          <span>Rp20.000</span>
        </div>
        <div class="summary-item">
          <span>Shipping</span>
          <span>Rp50.000</span>
        </div>
        <div class="total-to-pay">
          <b>Total to Pay</b>
          <span><b>{{ formatPrice(totalPrice + 20.000 + 15.000) }}</b></span>
        </div>
          <button class="btn  w-100 button-summary" @click="handleOrderNow">Order Now</button>
        </div>
      </div>
    </div>

    <!-- Additional Info Cards (Address, Shipping, Payment) -->
    <div class="info-cards d-flex flex-column mt-3">
      <div class="info-items-card  col-8 card">
        <h5 class="mt-3 ms-3">Address</h5>
        <div class="info-card card d-flex flex-row align-items-center m-3">
          <img src="@/assets/images/logo-lokasi.png" alt="foto" width="100px" height="100px" class="me-3"/> 
          <div>
            <p>PT. Timedoor Indonesia</p>
            <p style="color: gray;">Jl. Tukad Yeh Aya IX No.46, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226</p>
          </div>
        </div>
      </div>

      <div class="info-items-card  col-8 card">
        <h5 class="mt-3 ms-3">Delivery Details</h5>
        <div class="info-card card d-flex flex-row align-items-center m-3">
          <img src="@/assets/images/logo-sukses.png" alt="foto" width="100px" height="100px" class="me-3"/> 
          <div>
            <p>Fedex Express Shipping</p>
            <p style="color: gray;">Home delivery in 3-5 working days</p>
          </div>
        </div>
      </div>

      <div class="info-items-card  col-8 card">
        <h5 class="mt-3 ms-3">Payment Method</h5>
        <div class="info-card card d-flex flex-row align-items-center m-3">
          <img src="@/assets/images/logo-visa.png" alt="foto" width="100px" height="100px" class="me-3"/> 
          <div>
            <p> 0821-5555-1234</p>
            <p style="color: gray;">Jack Daniel Arya</p>
          </div>
        </div>
      </div>
    </div>

    
   <!-- Modal -->
    <div v-if="isModalVisible" class="modal fade show d-block" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center p-4">
          <div class="modal-body">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/043/561/562/small/pos-nfc-payment-bank-card-machine-icon-nfc-terminal-card-payment-transfer-png.png" alt="Payment Icon" class="mb-3" style="width: 150px;">
            <h5 class="modal-title mb-3">Order #ORD-89123-823 has been successfully placed</h5>
            <p>Thank you for shopping at Vintage. You can track and view your order in the Transaction History menu.</p>
            <div class="d-flex flex-column mt-4">
              <button @click="" class="btn btn-outline-primary mb-2">Continue Shopping</button>
              <button @click="goToUserPage" class="btn btn-primary">View Transaction History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>


  
  <style scoped>
  .confirmation-order-description {
    padding: 20px;
  }
  
  .confirmation-content {
    display: flex;
    gap: 20px;
  }
  
  .info-items-card ,
  .order-items-card,
  .order-summary-card,
  .info-card {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    background: #f9f9f9;
  }
  
  .order-items-card {
    flex: 2;
  }
  
  .order-summary-card {
    flex: 1;
  }
  
  .summary-item,
  .total-to-pay {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
  
  .total-to-pay {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .info-cards {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .info-card {
    flex: 1;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .button-summary {
    background-color: rgb(114, 126, 254);
  }
  </style>
  
  
  <script setup>
  import { computed, onMounted, ref } from "vue";
  import { useStore } from "vuex";

  
  const store = useStore();
  const isModalVisible = ref(false);

  // Computed property to get cart items from Vuex
  const cartItems = computed(() => store.state.cart.cartItems || []);
  const orderQuantities = ref({});
  
  // Calculate total items
  const totalItems = computed(() => {
    return Object.values(orderQuantities.value).reduce(
      (total, qty) => total + qty,
      0
    );
  });
  

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
    const quantity = orderQuantities.value[item.id] || item.quantity || 1;
    const price = parseInt(item.price.replace(/\./g, "").replace(/Rp /g, "")); // Menghapus format Rp dan pemisah ribuan
    return isNaN(price) ? total : total + price * quantity;
  }, 0);
  
  return formatPrice(total); // Format harga total menggunakan fungsi formatPrice
});

// Format price
function formatPrice(price) {
  let formattedPrice = "Rp " + parseInt(price).toLocaleString('id-ID');
  if (!formattedPrice.includes(',')) {
    formattedPrice += ".000";
  }
  return formattedPrice;
}
  
  // Get order quantity for an item
  const getOrderQuantity = (itemId) => {
    return orderQuantities.value[itemId] || 1;
  };
  
  // Initialize quantities when the component is mounted
  onMounted(() => {
    cartItems.value.forEach((item) => {
      orderQuantities.value[item.id] = item.quantity || 1; // Default quantity is 1
    });
  });
  
  // Handle order now (e.g., after checkout)
  const handleOrderNow = async () => {
    isModalVisible.value = true;
  
    // Dispatch Vuex action to update cart status to "Paid"
    await store.dispatch("cart/updateCartStatusToPaid");
  
    console.log("Cart items status updated to 'paid'");
  };
  
  const continueShopping = () => {
    isModalVisible.value = false;
    router.push("/");
  };
  
  import { useRouter } from 'vue-router';

const router = useRouter();

const goToUserPage = () => {
  router.push({ name: 'userPage' });
};


  </script>
  
  