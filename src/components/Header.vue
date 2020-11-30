<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link @click.native="clickLogo" class="navbar-brand" to="/"
        >conduit</router-link
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li @click="clickNav" class="nav-item" id="home">
          <!-- Add "active" class when you're on that page" -->
          <router-link to="/" class="nav-link" :class="{ active: active.home }">
            <i class="ion-gear-a"></i>&nbsp;<span>Home</span>
          </router-link>
        </li>
        <li v-if="username" @click="clickNav" class="nav-item" id="newpost">
          <router-link :to="{ name: 'addArticle' }" class="nav-link" href="">
            <i class="ion-compose"></i>&nbsp;Add Post
          </router-link>
        </li>
        <li
          id="setting"
          @click="clickNav"
          v-if="username"
          class="nav-item"
          :class="{ active: active.setting }"
        >
          <router-link :to="{ name: 'setting' }" class="nav-link">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li @click="clickNav" id="signup" v-else class="nav-item">
          <router-link
            :to="{ name: 'signup' }"
            class="nav-link"
            :class="{ active: active.signup }"
          >
            <i class="ion-gear-a"></i>&nbsp;Sign Up
          </router-link>
        </li>
        <li
          id="logout"
          @click="clickNav"
          v-if="username"
          class="nav-item"
          :class="{ active: active.logout }"
        >
          <div @click="clickLogout" class="nav-link cursor">
            <i class="ion-gear-a"></i>&nbsp;Log out
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { destroyToken } from "../jwt/jwt";
export default {
  data() {
    return {
      active: {
        home: true,
        newpost: false,
        setting: false,
        signup: false,
        logout: false,
      },
    };
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
  },
  methods: {
    clickLogo: function () {
      location.reload();
    },
    clickLogout: function () {
      destroyToken();
      location.reload();
    },
    clickNav: function (e) {
      const newActive = {
        home: false,
        newPost: false,
        setting: false,
        signup: false,
        logout: false,
      };
      newActive[e.currentTarget.id] = true;
      this.active = newActive;
    },
  },
};
</script>
<style>
.cursor {
  cursor: pointer;
}
</style>
