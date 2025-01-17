import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            products: []
        }
    },
    getters: {},
    mutations: {
        setProductData(state, payload) {
            state.products = payload;
        },
        setProductDetail(state, payload) {
            state.productDetail = payload;
        },
        setNewProduct(state, payload) {
            state.products.push.payload;
          },
    },
    actions: {
        async getProductData({commit}) {
            try {
                const { data } = await axios.get (
                    "https://final-test-vue-85b2f-default-rtdb.firebaseio.com/products.json"
                )
                const arr = []
                for( let key in data ) {
                    arr.push({id: key, ...data[key]})
                }
                commit("setProductData", arr)
            } catch (err) {
                console.log(err)
            }
        },
        async getProductDetail({ commit }, payload) {
            try {
              const { data } = await axios.get(
                `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/products/${payload}.json`
              );
              console.log(data)
              commit("setProductDetail", data);
            } catch (err) {} 
        },
        async addNewProduct({ commit, rootState }, payload) {
            const newData = {
              ...payload,
              username: rootState.auth.userLogin.username,
              createdAt: Date.now(),
              likes: ["null"],
              userId: rootState.auth.userLogin.userId,
            };
            try {
              const { data } = await axios.post(
                `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.token}`,
                newData
              );
              commit("setNewProduct", { id: data.name, ...newData });
            } catch (err) {
              console.log(err);
            }
        },
        async deleteProduct({ dispatch, rootState }, payload) {
            try {
              const { data } = await axios.delete(
                `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.token}`
              );
              await dispatch("getProductData");
            } catch (err) {
              console.log(err);
            }
          },
          async updateProduct({ dispatch, rootState }, { id, newProduct }) {
            try {
              const { data } = await axios.put(
                `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/products/${id}.json?auth=${rootState.auth.token}`,
                newProduct
              );
              await dispatch("getProductData");
            } catch (error) {
              console.log(error);
            }
          },    
    }
}