<!-- ConfirmationOrder.vue -->
<template>
    <div class="confirmation-order">
      <order-confirmation :cartproducts="cartproducts" ></order-confirmation>
    </div>
  </template>
  
  <script setup>
  import OrderConfirmation from "../cart/OrderConfirmation.vue";
  import { computed } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore();
  const cartproducts = computed(() => store.state.product.cartproducts);
  </script>
  
  <style scoped>
  .confirmation-order {
    padding: 20px;
  }
  .back-button {
    display: inline-block;
    margin-top: 20px;
    text-decoration: none;
  }
  </style>
  