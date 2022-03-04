<template>
  <div class="home">
    <a-tabs v-model:activeKey="activeKey" :tab-position="tabPosition">
      <a-tab-pane v-for="item in tabList" :key="item.id"
        ><template #tab>
          <span>
            <FireFilled v-show="item.id == 1" />
            <LikeFilled v-show="item.id == 2" />
            <SearchOutlined v-show="item.id == 3" />
            <SmileFilled v-show="item.id == 4" />
            {{ item.name }}
          </span>
        </template>
        <div class="tab">
          <router-view />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { useRouter } from "vue-router";
export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();
    const tabPosition = ref("bottom");
    const activeKey = ref(1);
    const tabList = ref([
      { name: "最新(巅峰榜)", id: 1 },
      { name: "随机推荐", id: 2 },
      { name: "搜索", id: 3 },
      { name: "我的", id: 4 },
    ]);
    let peakList: any = [
      {
        topID: 3,
        ListName: "巅峰榜·欧美",
      },
      {
        topID: 4,
        ListName: "巅峰榜·流行指数",
      },
      {
        topID: 5,
        ListName: "巅峰榜·内地",
      },
      {
        topID: 6,
        ListName: "巅峰榜·港台",
      },
      {
        topID: 18,
        ListName: "巅峰榜·民谣",
      },
      {
        topID: 19,
        ListName: "巅峰榜·摇滚",
      },
      {
        topID: 17,
        ListName: "巅峰榜·日本",
      },
      {
        topID: 16,
        ListName: "巅峰榜·韩国",
      },
      {
        topID: 20,
        ListName: "巅峰榜·全民K歌",
      },
      {
        topID: 23,
        ListName: "巅峰榜·畅销",
      },
      {
        topID: 21,
        ListName: "QQ音乐巅峰榜·我是歌手",
      },
      {
        topID: 22,
        ListName: "QQ音乐巅峰榜·中国好歌曲",
      },
      {
        topID: 25,
        ListName: "巅峰榜·中国新歌声",
      },
      {
        topID: 27,
        ListName: "巅峰榜·新歌",
      },
      {
        topID: 28,
        ListName: "巅峰榜·网络歌曲",
      },
      {
        topID: 29,
        ListName: "巅峰榜·影视金曲",
      },
      {
        topID: 30,
        ListName: "巅峰榜·梦想的声音",
      },
      {
        topID: 26,
        ListName: "巅峰榜·热歌",
      },
      {
        topID: 31,
        ListName: "巅峰榜·微信分享",
      },
      {
        topID: 34,
        ListName: "巅峰榜·人气",
      },
      {
        topID: 33,
        ListName: "全军出击·巅峰榜·歌手2018",
      },
      {
        topID: 32,
        ListName: "巅峰榜·音乐人",
      },
      {
        topID: 35,
        ListName: "QQ音乐巅峰分享榜",
      },
      {
        topID: 36,
        ListName: "巅峰榜·K歌金曲",
      },
      {
        topID: 53,
        ListName: "机车",
      },
      {
        topID: 50,
        ListName: "巅峰榜·中国有嘻哈",
      },
      {
        topID: 51,
        ListName: "巅峰榜·明日之子",
      },
      {
        topID: 52,
        ListName: "巅峰榜·腾讯音乐人原创榜",
      },
      {
        topID: 55,
        ListName: "江小白YOLO·巅峰榜·中国新说唱",
      },
      {
        topID: 54,
        ListName: "勇闯天涯·巅峰榜·明日之子",
      },
      {
        topID: 57,
        ListName: "电音榜",
      },
      {
        topID: 58,
        ListName: "说唱榜",
      },
      {
        topID: 60,
        ListName: "抖音排行榜",
      },
      {
        topID: 59,
        ListName: "香港地区榜",
      },
      {
        topID: 61,
        ListName: "台湾地区榜",
      },
      {
        topID: 56,
        ListName: "巅峰榜·2018中国好声音",
      },
      {
        topID: 63,
        ListName: "DJ舞曲榜",
      },
      {
        topID: 62,
        ListName: "飙升榜",
      },
      {
        topID: 65,
        ListName: "国风热歌榜",
      },
      {
        topID: 64,
        ListName: "综艺新歌榜",
      },
      {
        topID: 66,
        ListName: "ACG新歌榜",
      },
      {
        topID: 67,
        ListName: "听歌识曲榜",
      },
      {
        topID: 75,
        ListName: "有声榜",
      },
      {
        topID: 70,
        ListName: "达人音乐榜",
      },
      {
        topID: 73,
        ListName: "游戏音乐榜",
      },
      {
        topID: 74,
        ListName: "Q音快手榜",
      },
      {
        topID: 77,
        ListName: "扑通指数榜",
      },
      {
        topID: 72,
        ListName: "动漫音乐榜",
      },
      {
        topID: 76,
        ListName: "音乐巅峰榜",
      },
      {
        topID: 101,
        ListName: "KTV榜",
      },
      {
        topID: 102,
        ListName: "Channel[V]榜",
      },
      {
        topID: 103,
        ListName: "台湾Hito中文榜",
      },
      {
        topID: 104,
        ListName: "香港新城榜",
      },
      {
        topID: 105,
        ListName: "日本公信榜",
      },
      {
        topID: 106,
        ListName: "韩国Mnet榜",
      },
      {
        topID: 107,
        ListName: "英国UK榜",
      },
      {
        topID: 108,
        ListName: "美国公告牌榜",
      },
      {
        topID: 113,
        ListName: "香港电台榜",
      },
      {
        topID: 114,
        ListName: "香港商台榜",
      },
      {
        topID: 117,
        ListName: "台湾幽浮榜",
      },
      {
        topID: 118,
        ListName: "台湾Hito中文榜",
      },
      {
        topID: 121,
        ListName: "美国公告牌榜",
      },
      {
        topID: 122,
        ListName: "美国公告牌榜",
      },
      {
        topID: 124,
        ListName: "中国TOP排行榜",
      },
      {
        topID: 126,
        ListName: "JOOX本地热播榜",
      },
      {
        topID: 123,
        ListName: "美国热门音乐榜",
      },
      {
        topID: 127,
        ListName: "台湾KKBOX榜",
      },
      {
        topID: 128,
        ListName: "YouTube音乐排行榜",
      },
      {
        topID: 130,
        ListName: "香港TVB劲歌金榜",
      },
      {
        topID: 129,
        ListName: "韩国Melon榜",
      },
      {
        topID: 131,
        ListName: "大学生音乐榜",
      },
      {
        topID: 157,
        ListName: "MTV光荣榜",
      },
      {
        topID: 159,
        ListName: "特色推荐·网络新声",
      },
      {
        topID: 160,
        ListName: "特色推荐·独立原创",
      },
      {
        topID: 161,
        ListName: "特色推荐·动漫",
      },
      {
        topID: 158,
        ListName: "特色推荐·影视金曲",
      },
      {
        topID: 162,
        ListName: "特色推荐·翻唱",
      },
      {
        topID: 163,
        ListName: "特色推荐·双语",
      },
      {
        topID: 165,
        ListName: "特色推荐·粤语",
      },
      {
        topID: 167,
        ListName: "特色推荐·K歌金曲",
      },
      {
        topID: 168,
        ListName: "特色推荐·网络热歌",
      },
      {
        topID: 169,
        ListName: "vivo 手机 高品质音乐榜",
      },
      {
        topID: 201,
        ListName: "巅峰榜·MV",
      },
      {
        topID: 203,
        ListName: "HUAWEI nova·巅峰榜·梦想的声音",
      },
    ];
    let randomId: any = ref(0);
    watch(activeKey, (newValue) => {
      localStorage.removeItem('scrollTop')
      if (newValue == 1) {
        router.push("newest");
      }
      if (newValue == 2) {
        router.push({
          path: "recommend",
          query: {
            randomId:
              peakList[Math.floor(Math.random() * peakList.length)].topID,
          },
        });
      }
      if (newValue == 3) {
        router.push("search");
      }
      if (newValue == 4) {
        router.push("mine");
      }
    });
    return { tabPosition, activeKey, tabList, peakList, randomId };
  },
});
</script>
<style scoped>
.ant-tabs {
  height: 100vh;
  position: relative;
}
:global(.ant-tabs-bar) {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
:global(.ant-tabs-bottom .ant-tabs-bottom-bar) {
  background: #fff;
}
:global(.ant-tabs-nav) {
  height: 70px;
  display: flex;
  align-items: center;
}
</style>
