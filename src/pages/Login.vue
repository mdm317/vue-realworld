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
import BaseInputVue from "../components/BaseInput.vue";
export default {
  components: {
    BaseInputVue,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: async function () {
      const userLogin = { email: this.email, password: this.password };
      await this.$store.dispatch("login", userLogin);
      this.$router.push({ path: "/" });
    },
  },
  computed: {
    errors: function () {
      return this.$store.getters.loginErr;
    },
  },
};
</script>

<style></style>
