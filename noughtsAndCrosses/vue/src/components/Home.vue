<template>
  <div
    class="
      pt-8
      text-center
      justify-center
      flex-col
      items-center
      gap-10
      md:flex
      block
    "
  >
    <h1 class="mb-8 text-3xl font-bold uppercase text-white">
      Noughts And Crosses
    </h1>

    <div v-if="!singlePlayer">
      <h3 class="text-xl mb-4">
        PLAY AGAINST THE COMPUTER OR ANOTHER OPPONENT
      </h3>
      <div class="flex flex-col justify-center gap-10 mx-10 my-10">
        <button
          @click="(singlePlayer = true), (twoPlayer = false)"
          class="
            bg-transparent
            hover:bg-pewterBlueLight
            text-white text-2xl
            font-semibold
            hover:text-white
            py-2
            px-4
            border border-white
            hover:border-white
            rounded
          "
        >
          Single Player
        </button>

        <button
          @click="(twoPlayer = true), (singlePlayer = true)"
          class="
            bg-transparent
            hover:bg-pewterBlueLight
            text-white text-2xl
            font-semibold
            hover:text-white
            py-2
            px-4
            border border-white
            hover:border-white
            rounded
          "
        >
          Two Player
        </button>
      </div>
    </div>

    <div
      v-if="singlePlayer || twoPlayer"
      class="flex flex-col justify-center gap-5 mx-10"
    >
      <h1 class="text-xl">Please enter names</h1>
      <form @submit="onSubmit">
        <div class="mb-4">
          <label class="block text-white text-lg font-bold mb-2" for="player1">
            Player 1
          </label>
          <input
            required
            v-model="player1"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
              text-center
            "
            id="player1"
            type="text"
            placeholder="Player 1"
          />
        </div>

        <div class="mb-4" v-if="twoPlayer">
          <label class="block text-white text-lg font-bold mb-2" for="player2">
            Player 2
          </label>
          <input
            required
            v-model="player2"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
              text-center
            "
            id="player2"
            type="text"
            placeholder="Player 2"
          />
        </div>

        <div class="flex justify-evenly">
          <button
            type="submit"
            class="
              bg-transparent
              hover:bg-pewterBlueLight
              text-white text-2xl
              font-semibold
              hover:text-white
              py-2
              px-4
              border border-white
              hover:border-white
              rounded
              mt-5
            "
          >
            Play
          </button>

          <button
            @click="(singlePlayer = false), (twoPlayer = false)"
            class="
              bg-transparent
              hover:bg-pewterBlueLight
              text-white text-2xl
              font-semibold
              hover:text-white
              py-2
              px-4
              border border-white
              hover:border-white
              rounded
              mt-5
            "
          >
            Back
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const player1 = ref("");
const player2 = ref("");

//Input Player One and Player Two
//V-if variables to display necessary input boxes
const singlePlayer = ref(false);
const twoPlayer = ref(false);

const onSubmit = (e) => {
  e.preventDefault();
  //Push to correct route and pass props as url - can be done with vuex
  if (twoPlayer.value === true) {
    router.push(`/multi/${player1.value}/${player2.value}`);
  } else {
    router.push(`/single/${player1.value}`);
  }
};
</script>

<style>
body {
  @apply bg-pewterBlue text-white;
}
</style>