import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

import Header from "../components/Header.vue";
import SinglePlayer from "../views/SinglePlayer.vue";
import TwoPlayer from "../views/TwoPlayer.vue";
import Home from "../views/Home.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

const routes = [
    {
        path: "/",
        redirect: "/home",
        component: Header,
        meta: { requiresAuth: true },
        children: [
            { path: "/home", name: "Home", component: Home },
            {
                path: "/single/:player1",
                name: "Single",
                component: SinglePlayer,
                props: true,
            },
            {
                path: "/multi/:player1/:player2",
                name: "Multi",
                component: TwoPlayer,
                props: true,
            },
        ],
    },
    {
        path: "/auth",
        name: "Auth",
        component: AuthLayout,
        meta: { isGuest: true },
        redirect: "/login",
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
            },
            {
                path: "/register",
                name: "Register",
                component: Register,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

//for each route, check if auth is needed and if we have a token - if no token, redirect
//to login page
//if we do, redirect to home

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (store.state.user.token && to.meta.isGuest) {
        next({ name: "Home" });
    } else {
        next();
    }
});

export default router;
