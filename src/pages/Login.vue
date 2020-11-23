<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Log in</h1>
          <p class="text-xs-center">
            <router-link to="signup">Need an account?</router-link>
          </p>
          <ul v-for="(error, key) in errors" class="error-messages" :key="key">
            <li v-for="(errorMessage, index) in error" :key="index">
              {{ key + " " + errorMessage }}
            </li>
          </ul>
          <form @submit="login">
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
            <button class="btn btn-lg btn-primary pull-xs-right">Log in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { URL } from "../db";
import BaseInputVue from "../components/BaseInput.vue";
export default {
  components: {
    BaseInputVue,
  },
  data() {
    return {
      errors: {},
      email: "",
      password: "",
    };
  },
  methods: {
    login: async function () {
      try {
        const user = { email: this.email, password: this.password };
        await axios.post(URL + "/users/login", user);
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
</script>

<style></style>
