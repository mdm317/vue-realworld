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
            <i class="ion-gear-a">Home</i>&nbsp;
          </router-link>
        </li>
        <li @click="clickNav" class="nav-item" id="newpost">
          <a class="nav-link" href="">
            <i class="ion-compose">New Post</i>&nbsp;
          </a>
        </li>
        <li
          id="setting"
          @click="clickNav"
          v-if="username"
          class="nav-item"
          :class="{ active: active.setting }"
        >
          <router-link to="setting" class="nav-link">
            <i class="ion-gear-a">Settings</i>&nbsp;
          </router-link>
        </li>
        <li @click="clickNav" v-if="username" class="nav-item">
          <router-link to="" class="nav-link">
            <i class="ion-gear-a"> {{ username }}</i
            >&nbsp;
          </router-link>
        </li>
        <li @click="clickNav" id="signup" v-else class="nav-item">
          <router-link
            to="signup"
            class="nav-link"
            :class="{ active: active.signup }"
          >
            <i class="ion-gear-a">Sign Up</i>&nbsp;
          </router-link>
        </li>
        <li
          id="logout"
          @click="clickNav"
          v-if="username"
          class="nav-item"
          :class="{ active: active.logout }"
        >
          <div @click="clickLogout" class="nav-link">
            <i class="ion-gear-a">Log out</i>&nbsp;
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
      this.active = {
        home: true,
        newpost: false,
        setting: false,
        signup: false,
        logout: false,
      };
    },
    clickLogout: function () {
      destroyToken();
      this.$router.push({ path: "/" });
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
      console.log(e.currentTarget.id);
    },
  },
};
</script>
