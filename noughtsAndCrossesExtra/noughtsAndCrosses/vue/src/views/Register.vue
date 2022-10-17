
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
          Register a new account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <router-link
            to="Login"
            class="font-medium text-white hover:text-gray-100"
            >or sign in to an existing account here</router-link
          >
        </p>
      </div>

      <div v-if="errorMsg" class="p-4 bg-red-600 rounded-lg">
        <h2 class="text-center text-lg text-white">{{ errorMsg }}</h2>
      </div>
      <form class="mt-8 space-y-6" @submit="register">
        <input type="hidden" name="remember" value="true" />

        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <input
              v-model="user.name"
              id="display_name"
              name="display_name"
              type="display_name"
              required
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
              placeholder="Display Name"
            />
          </div>
          <div>
            <input
              v-model="user.email"
              id="email-address"
              name="email"
              type="email"
              required
              class="
                relative
                block
                w-full
                appearance-none
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
            <input
              v-model="user.password"
              id="password"
              name="password"
              type="password"
              required
              class="
                relative
                block
                w-full
                appearance-none
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
          <div>
            <label for="password_confirmation" class="sr-only"
              >Confirm Password</label
            >
            <input
              v-model="user.password_confirmation"
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required
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
              placeholder="Confirm Password"
            />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
const router = useRouter();
let errorMsg = ref("");
const user = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

//dispatch register object

function register(ev) {
  ev.preventDefault();
  store
    .dispatch("register", user)
    .then((res) => {
      router.push({ path: "/home" });
    })
    .catch((err) => {
      console.log("err");
      errorMsg.value = err.response.data.message;
    });
}
</script>
