
<template>
  <div
    class="
      flex
      min-h-full
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h1
          class="mt-6 text-center text-4xl font-bold tracking-tight text-white"
        >
          Nought's and Crosses
        </h1>
        <h2
          class="
            mt-6
            text-center text-3xl
            font-semibold
            tracking-tight
            text-white
          "
        >
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <router-link
            to="Register"
            class="font-medium text-white hover:text-gray-100"
            >or register for free here</router-link
          >
        </p>
      </div>

      <div v-if="errorMsg" class="p-4 bg-red-600 rounded-lg">
        <h2 class="text-center text-lg text-white">{{ errorMsg }}</h2>
      </div>

      <form class="mt-8 space-y-6" @submit="login">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="user.email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="
                relative
                block
                w-full
                appearance-none
                rounded-none rounded-t-md
                border border-gray-300
                px-3
                py-2
                text-gray-900
                placeholder-gray-500
                focus:z-10
                focus:border-pewterBlue
                focus:outline-none
                focus:ring-pewterBlue
                sm:text-sm
              "
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="user.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="
                relative
                block
                w-full
                appearance-none
                rounded-none rounded-b-md
                border border-gray-300
                px-3
                py-2
                text-gray-900
                placeholder-gray-500
                focus:z-10
                focus:border-pewterBlue
                focus:outline-none
                focus:ring-pewterBlue
                sm:text-sm
              "
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              v-model="user.remeber"
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="
                h-4
                w-4
                rounded
                border-gray-300
                text-white
                focus:ring-pewterBlue
              "
            />
            <label for="remember-me" class="ml-2 block text-sm text-white"
              >Remember me</label
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              flex
              w-full
              justify-center
              rounded-md
              border border-transparent
              bg-frenchBistre
              py-2
              px-4
              text-sm
              font-medium
              text-white
              hover:bg-vanDykeBrown
              focus:outline-none
              focus:ring-2
              focus:ring-vanDykeBrown
              focus:ring-offset-2
            "
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/20/solid";

import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
let errorMsg = ref("");

const user = {
  email: "",
  password: "",
  remember: false,
};

//on login, dispatch login action, if error returned, display the message
//error msg bound to v-if, will display
function login(e) {
  e.preventDefault();

  store
    .dispatch("login", user)
    .then(() => {
      router.push({
        name: "Home",
      });
    })
    .catch((err) => {
      errorMsg.value = err.response.data.message;
    });
}
</script>
