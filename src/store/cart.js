import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            cartItems: []
        };
    },
    getters: {
        cartItemCount(state) {
            return state.cartItems.length;
        },
        cartTotalPrice(state) {
            return state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    },
    mutations: {
        setCartItems(state, payload) {
            state.cartItems = payload;
        },
        addToCart(state, payload) {
            state.cartItems.push(payload);  // Menambahkan produk baru
        },
        removeCartItem(state, productId) {
            state.cartItems = state.cartItems.filter(item => item.id !== productId);
        },
        updateCartItem(state, payload) {
            const item = state.cartItems.find(item => item.id === payload.id);
            if (item) {
                item.quantity = payload.quantity;  // Memperbarui kuantitas item yang sudah ada
            }
        }
    },
    
    actions: {
        async fetchCartItems({ commit, rootState }) {
            try {
                const { data } = await axios.get(
                    `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/carts.json?auth=${rootState.auth.token}`
                );
                const cartItems = [];
                for (let key in data) {
                    if (data[key].userId === rootState.auth.userLogin.userId) {
                        cartItems.push({ id: key, ...data[key] });
                    }
                }
                commit("setCartItems", cartItems);
            } catch (error) {
                console.log("Error fetching cart items:", error);
            }
        },
        async addToCart({ commit, state, rootState }, product) {
            try {
                // Cek apakah produk sudah ada di cartItems
                const existingProduct = state.cartItems.find(item => item.id === product.id);
                
                if (existingProduct) {
                    // Jika produk sudah ada, tambahkan kuantitasnya
                    const updatedQuantity = existingProduct.quantity + product.quantity;
                    
                    // Perbarui kuantitas di Firebase
                    await axios.patch(
                        `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/carts/${existingProduct.id}.json?auth=${rootState.auth.token}`,
                        { quantity: updatedQuantity }
                    );
                    
                    // Mutasi untuk memperbarui item di Vuex state
                    commit("updateCartItem", { id: existingProduct.id, quantity: updatedQuantity });
                } else {
                    // Jika produk belum ada, tambahkan sebagai produk baru di keranjang
                    const newProduct = {
                        ...product,
                        userId: rootState.auth.userLogin.userId,
                        username: rootState.auth.userLogin.username,
                        quantity: product.quantity  // Tambahkan kuantitas awal dari produk
                    };
                    
                    // Tambahkan produk baru ke Firebase
                    const { data } = await axios.post(
                        `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/carts.json?auth=${rootState.auth.token}`,
                        newProduct
                    );
                    
                    // Mutasi untuk menambahkan produk baru ke Vuex state
                    commit("addToCart", { id: data.name, ...newProduct });
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        },
        
        
        
        
        async removeCartItem({ commit, rootState }, productId) {
            try {
                await axios.delete(
                    `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/carts/${productId}.json?auth=${rootState.auth.token}`
                );
                commit("removeCartItem", productId);
            } catch (error) {
                console.log("Error removing cart item:", error);
            }
        },
        async updateCartItem({ commit, rootState }, { id, quantity }) {
            try {
                await axios.patch(
                    `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/carts/${id}.json?auth=${rootState.auth.token}`,
                    { quantity }
                );
                commit("updateCartItem", { id, quantity });
            } catch (error) {
                console.log("Error updating cart item quantity:", error);
            }
        }
    }
};
