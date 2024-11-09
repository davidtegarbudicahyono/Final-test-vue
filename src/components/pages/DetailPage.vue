<template>
    <main>
        <div class="container my-5 py-5">
            <div class="row">
                <div class="col-12 col-sm-2"></div>
                <product-detail :productList="productList"></product-detail>
                <div class="col-12 col-sm-2"></div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import ProductDetail from '../detail/ProductDetail.vue';
</script>