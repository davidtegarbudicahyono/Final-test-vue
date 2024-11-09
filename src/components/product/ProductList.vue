<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Popular items</h4>
      <a href="products.html" class="text-decoration-none">See all</a>
    </div>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <div
        class="col"
        v-for="(product, index) in products.slice(0,5)"
        :key="index"
      >
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
          
          <!-- Tambahkan bagian bawah agar berada di ujung bawah card -->
          <div class="mt-auto d-flex justify-content-between align-items-end">
            <p class="mb-0">{{ product.size }}/{{ product.color }}</p>
            <i class="fa-regular fa-heart" style="color: #000000;">  {{ product.like }} </i>
          </div>
        </div>
      </router-link>

      </div>

      <!-- SEE ALL PRODUCT 1 -->
      <div class="col">
        <div class="card h-100 card-background">
          <div
            class="card-body d-flex justify-content-center align-items-center"
          >
            <router-link to="/products" class="text-decoration-none">
              <a
                href="products.html"
                class="text-decoration-none color-primary"
              >
                See All<br />
                New Product
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- SHOP BY BRAND SECTION -->
    <div class="container-md my-4">
  <h5>Shop by brand</h5>
  <div class="d-flex flex-wrap gap-2 brand-list">
    <button class="btn btn-outline-secondary mx-1 my-1">Vans</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Bohoo</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Mango</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Reebok</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Converse</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Sandro</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Nike</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Adidas</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Dior</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Puma</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Zara</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Bershka</button>
    <button class="btn btn-outline-secondary mx-1 my-1">American Eagle</button>

    <button class="btn btn-outline-secondary mx-1 my-1">Puma</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Zara</button>
    <button class="btn btn-outline-secondary mx-1 my-1">Bershka</button>
    <button class="btn btn-outline-secondary mx-1 my-1">American Eagle</button>
  </div>
</div>


    <!-- DISPLAY PRODUCT FROM INDEX 6 - 10 -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>New Product</h4>
      <a href="products.html" class="text-decoration-none">See all</a>
    </div>
    <div class="row row-cols-2 row-cols-md-6 g-3">
      <div
        class="col"
        v-for="(product, index) in products.slice(5,10)"
        :key="index"
      >
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
          
          <!-- Tambahkan bagian bawah agar berada di ujung bawah card -->
          <div class="mt-auto d-flex justify-content-between align-items-end">
            <p class="mb-0">{{ product.size }}/{{ product.color }}</p>
            <i class="fa-regular fa-heart" style="color: #000000;"> {{ product.like }}</i>
          </div>
        </div>
      </router-link>
      </div>

      <!-- SEE ALL PRODUCT -->
      <div class="col">
        <div class="card h-100 card-background">
          <div
            class="card-body d-flex justify-content-center align-items-center"
          >
            <router-link to="/products" class="text-decoration-none">
              <a
                href="products.html"
                class="text-decoration-none color-primary"
              >
                See All<br />
                New Product
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: Array,
});
</script>

<style>
  /* Warna hover biru muda */
  .btn-outline-secondary:hover {
    background-color: #add8e6 !important; /* Biru muda */
    color: #fff !important;
    border-color: #add8e6 !important;
  }
</style>



