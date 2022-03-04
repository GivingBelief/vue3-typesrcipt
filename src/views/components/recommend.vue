<template>
  <div class="recommend">
    <div class="ListName">随机推荐 Top100</div>
    <List v-if="listState" :key="randomNum" :random-list="randomList" />
  </div>
</template>

<script lang="ts">
import List from "./list.vue"; //列表
import { getInTheaters } from "../../utils/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Recommend",
  components: {
    List,
  },
  props: {},
  setup() {
    const router = useRouter();
    let randomNum: any = router.currentRoute.value.query.randomId;
    let randomList: any = ref([]);
    let listState: any = ref(false);
    onMounted(() => {
      getInTheatersData(randomNum);
    });
    // 获取 最新数据
    const getInTheatersData = (id: any) => {
      getInTheaters(id).then((res) => {
        for (let index = 0; index < res.data.songlist.length; index++) {
          let element = res.data.songlist[index];
          let customSinger_a = "";
          let customSinger_b = "";
          for (let j = 0; j < element.data.singer.length; j++) {
            if (element.data.singer.length <= 1) {
              customSinger_b = element.data.singer[j].name;
            } else {
              customSinger_a += element.data.singer[j].name + ",";
              customSinger_b = customSinger_a.substring(
                0,
                customSinger_a.length - 1
              );
            }
          }
          element.data.customSinger = customSinger_b;
        }
        randomList.value = res.data.songlist;
        listState.value = true;
      });
    };

    return {
      onMounted,
      randomNum,
      randomList,
      listState,
    };
  },
};
</script>
<style scoped>
.ListName {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background-color: #054547;
  color: #fff;
}
:global(.ant-list-item-meta) {
  width: 100px;
  overflow: scroll;
  flex: none;
}
.test {
  white-space: nowrap;
}
::-webkit-scrollbar {
  display: none;
  width: 0;
}
:global(.ant-list-item) {
  justify-content: space-around;
}
:global(.ant-list-items) {
  height: calc(100vh - 120px);
  overflow: scroll;
}
</style>
