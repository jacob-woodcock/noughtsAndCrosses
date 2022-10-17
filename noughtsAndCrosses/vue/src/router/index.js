import { createRouter, createWebHistory } from "vue-router";

import Header from "../components/Header.vue";
import SinglePlayer from "../components/SinglePlayer.vue";
import TwoPlayer from "../components/TwoPlayer.vue";
import Home from "../components/Home.vue";

const routes = [
    {
        path: "/",
        redirect: "/home",
        component: Header,
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
