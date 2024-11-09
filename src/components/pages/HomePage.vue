<template>
    <div class="align-items-center d-flex img1">
        <div class="card mb-3 ms-5" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Ready to declutter your closet</h5>
                <a href="#" class="btn btn-info" style="min-width: 100%; margin-top: 40px;">Shop Now</a>
            </div>
        </div>
    </div>
    <div>
        <product-list 
        :products="productList"
        v-if="productListStatus"></product-list>
    </div>
    
</template>

<script setup>
import ProductList from '../product/ProductList.vue';
import { onMounted, ref  } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const productListStatus = ref(false);
const productList = ref();

onMounted(async () => {
    try {
        await store.dispatch("product/getProductData")
        productListStatus.value = true;
        productList.value = store.state.product.products
    } catch (error) {
        console.log(error)
    }
});
</script>