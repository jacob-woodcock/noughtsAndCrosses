<template>
  <div
    v-if="previousGames.length !== 0"
    class="flex flex-col w-full gap-4 pl-3 pr-10 overflow-scroll pb-12"
  >
    <h1 class="text-2xl font-semibold mb-7">Previous Games</h1>
    <div v-for="game in previousGames" :key="game?.id">
      <PreviousGameCard :game="game" @deleteGame="deleteGame" />
    </div>
  </div>
  <div v-else>
    <h1 class="text-lg font-semibold">No games recorded</h1>
  </div>
</template>

<script setup>
import PreviousGameCard from "./PreviousGameCard.vue";
import { onMounted, ref } from "@vue/runtime-core";

const previousGames = ref([]);

onMounted(async () => {
  previousGames.value = await fetchLastFiveGames();
  previousGames.value = previousGames.value;
});

const fetchLastFiveGames = async () => {
  const res = await fetch("http://localhost:8000/api/games/latest");

  const data = await res.json();

  return data;
};

const deleteGame = async (id) => {
  await fetch(`http://localhost:8000/api/games/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  previousGames.value = previousGames.value.filter((game) => game.id !== id);
};
</script>


<style>
</style>