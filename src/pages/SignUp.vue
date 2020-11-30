<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="login">Have an account?</router-link>
          </p>
          <ErrorMessage :errors="errors" v-if="errors"> </ErrorMessage>
          <form @submit.prevent="registerUser">
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
import BaseInputVue from "../components/BaseInput.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

export default {
  components: {
    BaseInputVue,
    ErrorMessage,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    registerUser: function () {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("signup", user).then(() => {
        console.log("[this.errors]:", this.errors);

        if (!this.errors) {
          this.$router.push({ name: "home" });
        }
      });
    },
  },
  computed: {
    errors() {
      return this.$store.getters.signupErr;
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
