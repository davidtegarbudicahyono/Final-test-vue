<template>
    <div class="transaction-history">
      <h2>Transaction History</h2>
      <div v-if="transactions.length === 0">
        <p>No transactions found.</p>
      </div>
      <div v-else class="transaction-list">
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="transaction-item"
        >
          <div class="transaction-header">
            <p>{{ transaction.date }}</p>
            <p>Order ID: {{ transaction.orderId }}</p>
            <p>Status: {{ transaction.status }}</p>
          </div>
          <div class="transaction-details">
            <div
              v-for="product in transaction.products"
              :key="product.id"
              class="product-item"
            >
              <img :src="product.image" alt="Product Image" style="width: 100px; height: 100px;" />
              <div>
                <p>{{ product.name }}</p>
                <p>Price: Rp{{ product.price }}</p>
                <p>Quantity: {{ product.quantity }}</p>
              </div>
            </div>
          </div>
          <div class="transaction-total">
            <p>Total: Rp{{ transaction.total }}</p>
          </div>
          <button @click="buyAgain(transaction)" class="btn btn-primary">Buy Again</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from "vuex";
  
  export default {
    computed: {
  ...mapState("cart", ["cartItems"]),
  transactions() {
    // Convert cartItems into transaction history format
    return this.cartItems.map((item) => {
      const price = parseFloat(item.price) || 0;  // Ensure price is a number
      const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a number

      return {
        id: item.id,
        date: item.date || "Unknown date",
        orderId: item.orderId || "N/A",
        status: item.status || "Completed",
        products: [
          {
            id: item.id,
            name: item.name,
            image: item.image,
            price: price,
            quantity: quantity,
            size: item.size || "N/A",
          },
        ],
        total: price * quantity,  // Total calculated from price and quantity
      };
    });
  },


    },
    methods: {
      ...mapActions("cart", ["fetchCartItems"]),
      buyAgain(transaction) {
        // Add the product back to the cart
        transaction.products.forEach((product) => {
          this.$store.dispatch("cart/addToCart", product);
        });
      },
    },
    created() {
      this.fetchCartItems(); // Fetch the cart items when the component is created
    },
  };
  </script>
  
  <style scoped>
  .transaction-history {
    padding: 20px;
    background: #f9f9f9;
  }
  
  .transaction-item {
    border: 1px solid #e0e0e0;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 5px;
  }
  
  .transaction-header {
    display: flex;
    justify-content: space-between;
  }
  
  .transaction-details {
    display: flex;
    flex-wrap: wrap;
  }
  
  .product-item {
    display: flex;
    margin-right: 15px;
  }
  
  .transaction-total {
    text-align: right;
    font-weight: bold;
  }
  </style>
  