<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Log in</h1>
          <p class="text-xs-center">
            <router-link to="signup">Need an account?</router-link>
          </p>

          <ErrorMessage :errors="errors" v-if="errors"> </ErrorMessage>
          <form @submit.prevent="login">
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
import ErrorMessage from "../components/ErrorMessage.vue";
export default {
  components: {
    BaseInputVue,
    ErrorMessage,
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
      if (!this.errors) {
        this.$router.push({ path: "/" });
      }
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
