import { createStore } from "vuex";
import axiosClient from "../axios";

//VUEX store -

//state has user data taken from set Session Storage for easier access and previous games array

//no getters needed, possible array length but only used once?

const store = createStore({
    state: {
        user: {
            data: JSON.parse(sessionStorage.getItem("USER_DATA")),
            token: sessionStorage.getItem("TOKEN"),
        },
        previousGames: [],
    },
    getters: {},
    actions: {
        //send user data using axios, then setuser (login)
        register({ commit }, user) {
            return axiosClient.post("/register", user).then(({ data }) => {
                commit("setUser", data);
                return data;
            });
        },
        //check user data using axios, then setuser (login)
        login({ commit }, user) {
            return axiosClient.post("/login", user).then(({ data }) => {
                commit("setUser", data);
                return data;
            });
        },
        //clear user tokens from DB and then clear
        logout({ commit }) {
            return axiosClient.post("/logout").then((response) => {
                commit("logout");
                return response;
            });
        },
        //get previous games using User foreign id key
        getPreviousGames({ commit }, id) {
            return axiosClient.get(`/games/latest/${id}`).then(({ data }) => {
                commit("getPreviousGames", data);
            });
        },
        //post a new game with gameData object from frontend
        postGame({ commit }, gameData) {
            return axiosClient.post("/games", gameData).then(({ data }) => {
                commit("postGame", data);
                return data;
            });
        },
        //destroy action using id
        deleteGame({ commit }, id) {
            return axiosClient.delete(`/games/${id}`).then(() => {
                commit("deleteGame", id);
            });
        },
    },
    mutations: {
        //clear all session storage and state
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
            sessionStorage.removeItem("USER_DATA");
        },
        //set session storage and state
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
            sessionStorage.setItem("USER_DATA", JSON.stringify(userData.user));
        },
        //set state with returned data
        getPreviousGames: (state, data) => {
            state.previousGames = data;
        },
        //add to state with returned data
        postGame: (state, data) => {
            state.previousGames = [...state.previousGames, data];
        },
        //filter away state with returned data
        deleteGame: (state, id) => {
            state.previousGames = state.previousGames.filter(
                (game) => game.id === id
            );
        },
    },
    //no modules needed (so far)
    modules: {},
});
export default store;
