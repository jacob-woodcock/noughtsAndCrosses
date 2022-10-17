<template>
  <div class="h-screen overflow-hidden">
    <div class="pb-10">
      <header class="flex justify-between items-center p-4 bg-xanadu">
        <router-link to="/" class="text-xl font-bold cursor-pointer"
          >Noughts And Crosses</router-link
        >
        <Bars3Icon
          @click="openMenu"
          v-if="!open"
          class="block h-6 w-6 cursor-pointer"
          aria-hidden="true"
        />
        <XMarkIcon
          @click="openMenu"
          v-else
          class="block h-6 w-6 cursor-pointer"
          aria-hidden="true"
        />
      </header>

      <div v-if="open" class="flex flex-row-reverse w-full">
        <nav class="flex w-96 h-full bg-frenchBistre fixed">
          <div class="w-full flex mx-auto px-6 py-8"><PreviousGames /></div>
        </nav>
      </div>
      <div :class="`${open ? 'mr-72' : 'mr-0'}`">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import PreviousGames from "./PreviousGames.vue";

const open = ref(false);

//V-if variable
const openMenu = () => {
  open.value = !open.value;
};
</script>

