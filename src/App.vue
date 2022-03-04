<template>
  <div>
    <router-view />
    <div v-if="isSpin" class="example">
      <Spin />
    </div>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from "vue";
import { useRouter } from "vue-router";
import Spin from "@/components/Spin.vue";
import store from "./store";
export default defineComponent({
  name: "App",
  setup() {
    const isSpin = ref("");
    const router = useRouter();

    watch(
      () => router.currentRoute.value.path,
      (toPath) => {
        //要执行的方法
        console.log(toPath, "toPath");
        setTimeout(() => {
          isSpin.value = JSON.parse(
            JSON.stringify(store.state)
          ).appStore.SpinState;
          setTimeout(() => {
            store.commit(
              "ADD_ASPIN",
              (JSON.parse(
                JSON.stringify(store.state)
              ).appStore.SpinState = false)
            );
            isSpin.value = JSON.parse(
              JSON.stringify(store.state)
            ).appStore.SpinState;
          }, 3000);
        }, 500);
      },
      { immediate: true, deep: true }
    );

    return {
      isSpin,
    };
  },
  components: {
    Spin,
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.example {
  background: rgba(0, 0, 0, 0.3);
  position: fixed !important;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
