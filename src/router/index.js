import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// const Foo = { template: "<div>foo</div>" };
// const Bar = { template: "<div>bar</div>" };
// const router = new VueRouter({
//   //   mode: "history",
//   routes: [
//     { path: "/", component: Foo },
//     { path: "*", component: Bar },
//   ],
// });        에러나는데 이유가?
// import NotFound from "../components/NotFound.vue";
import Home from "../pages/Home.vue";
import SignUp from "../pages/SignUp.vue";
import Login from "../pages/Login.vue";
import Setting from "../pages/Setting.vue";
import Article from "../pages/Article.vue";

import test from "./test.vue";
const router = new VueRouter({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/signup", name: "signup", component: SignUp },
    { path: "/login", name: "login", component: Login },
    { path: "/setting", component: Setting },
    { path: "/test", component: test },
    { path: "/article/:slug", component: Article, props: true },
    { path: "*", component: Home },
  ],
});
export default router;
