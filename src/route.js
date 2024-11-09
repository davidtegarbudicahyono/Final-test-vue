import { compile } from "vue";
import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import ProductPage from "./components/pages/ProductPage.vue";
import ProductDetail from "./components/detail/ProductDetail.vue";
import UserPage from "./components/pages/UserPage.vue";
import NewProductPage from "./components/pages/NewProductPage.vue";
import Cookies from "js-cookie";
import EditProductPage from "./components/pages/EditProductPage.vue";
import { store } from "./store/index";
import CartPage from "./components/pages/CartPage.vue";
import OrderConfirmation from "./components/cart/OrderConfirmation.vue";


export const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    beforeEnter: () => {
      checkAuth();
    },
  },
  {
    path: "/login",
    name: "loginpage",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signuppage",
    component: SignupPage,
  },
  {
    path: "/product/:id",
    name: "productdetail",
    component: ProductDetail,
  },
  {
    path: "/products",
    name: "productpage",
    component: ProductPage,
    
  },
  { path: "/user", 
    name: "userPage", 
    component: UserPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "loginpage" });
    }
  },
  {
    path: "/new-product",
    name: "newProductPage",
    component: NewProductPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "loginpage" });
    }
  },
  {
    path: "/product/edit/:id",
    name: "editProductPage",
    component: EditProductPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "loginpage" });
    }
  },
  {
    path: "/cart",
    name: "cartProduct",
    component: CartPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "loginpage" });
    }
  },
  {
    path: "/orderconfirmation",
    name: "OrderConfirmation",
    component: OrderConfirmation,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "loginpage" });
    }
  },
];

const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");

    if (jwtCookie) {
        if (new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationDate,
            });
            store.dispatch("auth/getUser", userId);
            return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        }
    } else {
        return false;
    }
};
