<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-xl font-semibold">
      Signed In: {{ store.state.user.data.name }}
    </h3>

    <button
      @click="logout"
      class="
        relative
        px-4
        py-2
        bg-vanDykeBrown
        rounded
        uppercase
        font-bold
        hover:bg-frenchBistre
        duration-300
      "
    >
      Logout
    </button>
    <h1 class="text-2xl font-semibold mb-7">Previous Games</h1>
    <div
      v-if="previousGames.length !== 0"
      class="flex flex-col w-full gap-4 pl-3 pr-10 overflow-scroll pb-12"
    >
      <div v-for="game in previousGames" :key="game?.id">
        <PreviousGameCard :game="game" @deleteGame="deleteGame" />
      </div>
    </div>

    <div v-else>
      <h1>No games recorded for this account</h1>
    </div>
  </div>
</template>

<script setup>
import PreviousGameCard from "./PreviousGameCard.vue";
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import store from "../store";

const router = useRouter();
const previousGames = ref([]);

onMounted(() => {
  store.dispatch("getPreviousGames", store.state.user.data?.id).then(() => {
    previousGames.value = store.state.previousGames;
  });
});

const deleteGame = (id) => {
  store.dispatch("deleteGame", id).then(() => {
    previousGames.value = previousGames.value.filter((game) => game.id !== id);
  });
};

function logout() {
  store.dispatch("logout").then(() => {
    router.push({
      name: "Login",
    });
  });
}
</script>


<style>
</style>