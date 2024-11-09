import { createStore } from "vuex";
import product from "./product";
import auth from "./auth";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      tokenExpirationDate: null,
      userLogin: {},
      isLogin: false,
    };
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken;
      state.tokenExpirationDate = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    setUserLogin(state, { userData, loginStatus }) {
      state.userLogin = userData;
      state.isLogin = loginStatus;
    },
    setUserLogout(state) {
      state.token = null;
      state.userLogin = {};
      state.isLogin = false;
      state.tokenExpirationDate = null;
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyAf_GNCT5CqnljGD7tXLVxL5HZ8VYoo1mA";
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        const newUserData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
          image: payload.image,
        };
        Cookies.set("UID", newUserData.userId);
        await dispatch("addNewUser", newUserData);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewUser({ commit, state }, payload) {
      try {
        // Menggunakan userId sebagai kunci saat menyimpan data
        await axios.put(
          `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/user/${payload.userId}.json?auth=${state.token}`,
          payload
        );
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (err) {
        console.log(err);
      }
    },
    async getLoginData({ commit, dispatch }, payload) {
      console.log("Login Payload:", payload);
      const APIkey = "AIzaSyAf_GNCT5CqnljGD7tXLVxL5HZ8VYoo1mA";
      const authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        console.log("Local ID:", data.localId);
        await dispatch("getUser", data.localId);
      } catch (err) {
        console.log(err);
      }
    },
    async getUser({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/user.json`
        );
        console.log("User Data from API:", data);
        for (let key in data) {
          if (data[key].userId === payload) {
            Cookies.set("UID", data[key].userId);
            commit("setUserLogin", { userData: data[key], loginStatus: true });
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser({ commit, state }, payload) {
      try {
        // Gunakan UID pengguna untuk memperbarui data di Firebase
        const userId = payload.userId; // Pastikan payload memiliki userId
        await axios.put(
          `https://final-test-vue-85b2f-default-rtdb.firebaseio.com/user/${userId}.json?auth=${state.token}`,
          payload
        );
    
        // Update data di store
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (err) {
        console.error("Error updating user data:", err);
      }
    },
    async changePassword({ state }, { oldPassword, newPassword }) {
      const APIkey = "AIzaSyAf_GNCT5CqnljGD7tXLVxL5HZ8VYoo1mA";
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${APIkey}`;
  
      try {
          // Validasi apakah kata sandi lama cocok dengan kata sandi pengguna saat ini
          const { data: signInData } = await axios.post(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIkey}`,
              {
                  email: state.userLogin.email,
                  password: oldPassword,
                  returnSecureToken: true,
              }
          );
  
          // Jika cocok, lanjutkan untuk memperbarui kata sandi
          await axios.post(authUrl, {
              idToken: signInData.idToken,
              password: newPassword,
              returnSecureToken: true,
          });
  
          console.log("Password changed successfully!");
      } catch (err) {
          console.error("Error changing password:", err.response?.data || err);
      }
    },
  
    
    
  },
};

export const store = createStore({
  modules: {
    product,
    auth,
  },
});
