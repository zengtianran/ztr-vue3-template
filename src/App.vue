<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "app",
  props: {},
  setup() {
    const name = ref<string>("ztr");
    onMounted(() => {
      console.log("app onMounted :>> ", process.env);
    });
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  font-size: 40px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 40px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
