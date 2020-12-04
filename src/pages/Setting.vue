<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ErrorMessage :errors="errors"></ErrorMessage>
          <form @submit="submitSetting">
            <fieldset>
              <fieldset class="form-group">
                <BaseInput
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="image"
                />
              </fieldset>
              <fieldset class="form-group">
                <BaseInput
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-on:input="onTextarea"
                  :value="bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <BaseInput
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <BaseInput
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import axios from "axios";
import { getToken } from "../jwt/jwt";
import { URL } from "../db";
import ErrorMessage from "../components/ErrorMessage.vue";
export default {
  components: { BaseInput, ErrorMessage },
  methods: {
    onTextarea: function (e) {
      this.bio = e.target.value;
    },
    submitSetting: async function () {
      const token = getToken();
      const userForm = {
        email: this.email,
        username: this.name,
        password: this.password,
        image: this.image,
        bio: this.bio,
      };
      try {
        const response = await axios.put(
          URL + "/user",
          { user: userForm },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        this.$store.commit("loginSuc", response.data.user);
        this.$router.push({ path: "/" });
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
  data() {
    return {
      errors: {},
      name: undefined,
      bio: undefined,
      email: undefined,
      password: undefined,
      image: undefined,
    };
  },
};
</script>

<style></style>
