<template>
  <div class="recommend">
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      item-layout="horizontal"
      :data-source="listArray"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <span @click="play"><PlayCircleTwoTone /></span>
            <span @click="add"><HeartTwoTone /></span>
            <a @click="download"><VerticalAlignBottomOutlined /></a>
          </template>
          <a-list-item-meta>
            <template #title>
              <div class="test" v-if="item.data">{{ item.data.songname }}</div>
              <div class="test" v-else>{{ item.songname }}</div>
            </template>
          </a-list-item-meta>
          <div>-</div>
          <div
            class="test"
            style="width: 100px; overflow: scroll"
            v-if="item.data"
          >
            {{ item.data.customSinger }}
          </div>
          <div class="test" style="width: 100px; overflow: scroll" v-else>
            {{ item.customSinger }}
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { onMounted, toRefs } from "vue";
import { message } from "ant-design-vue";
export default {
  name: "list",
  props: {
    randomList: {
      type: Array,
    },
    currentPage: {
      type: Number,
    },
  },
  setup(props, ctx) {
    const { randomList, currentPage } = toRefs(props);
    let listArray: any = randomList.value;
    let pagingNum: any = currentPage.value;
    // 添加
    const add = () => {
      message.success("添加成功");
    };
    // 播放
    const play = () => {
      message.success("正在播放");
    };
    // 下载
    const download = () => {
      message.success("正在下载");
    };
    onMounted(() => {
      if (localStorage.getItem("scrollTop")) {
        const el: any = document.querySelector(".ant-list-items");
        el.scrollTop = localStorage.getItem("scrollTop");
      }
      // 滚动的容器
      const el: any = document.querySelector(".ant-list-items");
      const offsetHeight = el.offsetHeight;
      el.onscroll = () => {
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        localStorage.setItem("scrollTop", scrollTop);
        if (offsetHeight + scrollTop - scrollHeight >= 0) {
          // 需要执行的代码
          // console.log(pagingNum++);
          ctx.emit("addCurrentPage", ++pagingNum);
          // 调用list 原本的数据请求函数
        }
      };
    });
    return {
      onMounted,
      listArray,
      add,
      play,
      download,
    };
  },
};
</script>
<style scoped>
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
  height: calc(100vh - 40px);
  overflow: scroll;
}
</style>
