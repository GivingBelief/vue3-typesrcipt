<template>
  <div class="newest">
    <div
      class="clickIcon"
      :style="{
        left: visible == false ? '0' : '200px',
        background: visible == false ? '#ccc' : '#fff',
      }"
      @click="showDrawer"
    >
      <DoubleRightOutlined v-show="visible == false" />
      <DoubleLeftOutlined v-show="visible == true" />
    </div>
    <a-drawer
      :placement="placement"
      width="200px"
      :closable="false"
      :visible="visible"
      @close="onClose"
      bodyStyle="padding:0px"
    >
      <p
        class="peakList"
        @click="peakListClick(item.topID)"
        :style="{
          background: item.topID == topID ? 'rgba(24,144,255,0.5)' : '',
        }"
        v-for="item in peakList"
        :key="item.topID"
      >
        {{ item.ListName }}
      </p>
    </a-drawer>
    <div>
      <div class="ListName">{{ ListName }}</div>

      <a-list
        class="songlist"
        :grid="{ gutter: 10, column: 4 }"
        :data-source="songlist"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card>
              <div class="list">
                <img :src="item.data.albummidImg" alt="" />
                <p>{{ item.data.songname }}</p>
              </div>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
import { getInTheaters } from "../../utils/api";

import { onMounted, ref, toRefs, defineComponent } from "vue";

export default defineComponent({
  name: "Newest",
  props: {},
  setup() {
    const placement = ref<string>("left");
    const visible = ref<boolean>(false);
    // const { peakList } = toRefs(props);
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
    let topID = ref(0);
    let peakednessData = ref([]); // 最新歌曲的数据
    let ListName = ref(""); // 巅峰榜单标题
    let songlist = ref([]); // 巅峰榜歌单列表
    // 打开抽屉事件
    const showDrawer = () => {
      if (visible.value == false) {
        visible.value = true;
      } else {
        visible.value = false;
      }
    };
    // 关闭抽屉事件
    const onClose = () => {
      visible.value = false;
    };
    // 获取 最新数据
    const getInTheatersData = (id: any) => {
      getInTheaters(id).then((res) => {
        console.log("res", res);
        peakednessData.value = res;
        ListName.value = res.data.topinfo.ListName + " Top100";
        res.data.songlist.map((item: any) => {
          // 有图片路径就拼接,没有是用默认图片
          if (item.data.albummid) {
            item.data.albummidImg =
              "http://y.gtimg.cn/music/photo_new/T002R180x180M000" +
              item.data.albummid +
              ".jpg";
          } else {
            item.data.albummidImg =
              "data:image/png;base64,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";
          }
        });
        songlist.value = res.data.songlist;
        console.log("res", songlist);
      });
    };
    // 点击抽屉每一项的事件
    const peakListClick = (id: any) => {
      getInTheatersData(id);
      topID.value = id;
      visible.value = false;
    };
    onMounted(() => {
      getInTheatersData(peakList[0].topID);
      topID.value = peakList[0].topID;
    });
    return {
      placement,
      visible,
      showDrawer,
      peakListClick,
      onClose,
      topID,
      peakednessData,
      ListName,
      songlist,
      peakList
    };
  },
});
</script>
<style scoped>
ul li {
  list-style: none;
}
.ListName {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background-color: #054547;
  color: #fff;
}
.clickIcon {
  position: fixed;
  top: 40%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 99999;
  padding: 10px 5px;
  transition: all 0.4s;
}
:global(.clickIcon .anticon svg) {
  width: 15px;
  height: 15px;
}
:global(.peakList) {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0px;
  padding: 10px;
}
:global(.ant-list) {
  padding: 0 5px;
}
:global(.ant-row) {
  height: calc(100vh - 90px);
  padding-top: 10px;
  overflow: scroll;
}
:global(.ant-card-body) {
  padding: 0;
}
:global(.ant-card-bordered) {
  border: none;
}
:global(.ant-list-item) {
  margin-bottom: 8px !important;
}
.songlist .list p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
  margin-top: 8px;
  color: #214c5b;
}
.songlist .list img {
  width: 100%;
  height: 90px;
  border-radius: 10px;
}
</style>
