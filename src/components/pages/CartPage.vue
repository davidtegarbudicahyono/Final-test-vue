<template>
    <cart-product :products="productList"></cart-product>
  </template>
  
  <script setup>
  import CartProduct from "../cart/CartProduct.vue";
  import { onMounted, ref } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore();
  const productList = ref([]);
  
  onMounted(async () => {
    try {
      // Mendapatkan semua data produk untuk produk lain
      await store.dispatch("product/getProductData");
  
      // Mendapatkan detail produk untuk produk di keranjang
      await store.dispatch("cart/fetchCartItems");
      productList.value = store.state.cart.cartItems;
  
      console.log(productList.value); // Cek data produk di console
    } catch (error) {
      console.log(error);
    }
  });
  </script>
  