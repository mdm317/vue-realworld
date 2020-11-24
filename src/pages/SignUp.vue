<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="login">Have an account?</router-link>
          </p>
          <ul v-for="(error, key) in errors" class="error-messages" :key="key">
            <li v-for="(errorMessage, index) in error" :key="index">
              {{ key + " " + errorMessage }}
            </li>
          </ul>
          <form @submit="registerUser">
            <fieldset class="form-group">
              <BaseInputVue
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <BaseInputVue
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <BaseInputVue
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { URL } from "../db";
import BaseInputVue from "../components/BaseInput.vue";

export default {
  components: {
    BaseInputVue,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    registerUser: async function () {
      try {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        await Axios.post(URL + "/users", { user });
        console.log("[회원가입 성공]:");
        const loginUser = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("login", loginUser);

        this.$router.push({ name: "home" });
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.errors = error.response.data.errors;
        }
      }
    },
  },
};
/* {
  "user":{
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
} */
</script>

<style></style>
