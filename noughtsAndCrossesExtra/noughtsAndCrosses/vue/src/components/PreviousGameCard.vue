<template>
  <div
    class="
      w-full
      p-4
      border-2 border-black
      flex flex-col
      justify-evenly
      bg-xanadu
      rounded-md
      shadow-md
    "
  >
    <h3 class="text-lg mb-2">{{ props.game.created_at.slice(0, 10) }}</h3>

    <div class="flex justify-between">
      <p class="text-lg font-semibold">Game Type:</p>
      <p class="text-lg">{{ props.game.type }}</p>
    </div>

    <div class="flex justify-between">
      <p class="text-lg font-semibold">Player 1:</p>
      <p class="text-lg">{{ props.game.player1 }}</p>
    </div>

    <div v-if="props.game.type === 'Two Player'" class="flex justify-between">
      <p class="text-lg font-semibold">Player 2:</p>
      <p class="text-lg">{{ props.game.player2 }}</p>
    </div>

    <div class="flex justify-between">
      <p class="text-lg font-semibold">Number Of Moves:</p>
      <p class="text-lg">{{ props.game.number_of_moves }}</p>
    </div>

    <div class="flex justify-between">
      <p class="text-lg font-semibold">Game Result:</p>
      <p class="text-lg">{{ props.game.result }}</p>
    </div>

    <button
      @click="$emit('deleteGame', props.game.id)"
      class="
        mt-2
        px-4
        py-2
        bg-pewterBlue
        rounded
        uppercase
        font-bold
        hover:bg-pewterBlueLight
        duration-300
      "
    >
      Remove
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  game: Object,
});
</script>

<style>
</style>