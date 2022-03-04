<template>
  <div class="search">
    <div class="back_main">
      <a-input
        placeholder="搜索"
        @change="searchChange"
        v-model:value="SearchName"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
        <template #suffix>
          <div v-if="suffixState">
            <a-tag color="default" @click="suffixClick">
              <template #icon> <minus-circle-outlined /> </template>取消</a-tag
            >
            <a-tag color="success" @click="pressEnter">
              <template #icon> <check-circle-outlined /> </template>搜索</a-tag
            >
          </div>
        </template>
      </a-input>
    </div>
    <div class="mod_search_result" v-if="suffixState">
      <div
        class="search_result__sort"
        v-for="(item, index) in searchChangeList"
        :key="index"
      >
        <div class="search_result__tit">
          <CustomerServiceOutlined v-if="item.name == '单曲'" />
          <UserOutlined v-if="item.name == '歌手'" />
          <SolutionOutlined v-if="item.name == '专辑'" />
          <VideoCameraOutlined v-if="item.name == 'MV'" />
          {{ item.name }}
        </div>
        <template v-if="item.itemlist.length >= 1">
          <div
            v-for="(items, indexs) in item.itemlist"
            :key="indexs"
            class="search_result__list"
          >
            <span class="test" v-html="items.name"></span>
            -
            <span class="test" v-html="items.singer"></span>
          </div>
        </template>
        <template v-else>
          <div class="search_result__list">暂无数据</div>
        </template>
      </div>
    </div>

    <div class="casual"><CustomerServiceTwoTone /> <span>随便听听</span></div>
    <div class="justListen">
      <a-tag
        @click="justListenEnter(item)"
        v-for="(item, index) in justListen"
        :key="index"
        >{{ item }}</a-tag
      >
    </div>
    <div class="searchList">
      <List
        v-if="listState"
        @addCurrentPage="addCurrentPage"
        :current-page="CurrentPage"
        :key="songListNum"
        :random-list="randomList"
      />
    </div>
  </div>
</template>

<script lang="ts">
import List from "./list.vue"; //列表
import { onMounted, ref, watch } from "vue";
import { getSearchSong, getReleaseBoxList } from "../../utils/api";

export default {
  name: "Search",
  components: {
    List,
  },
  props: {},
  setup() {
    let SearchName: any = ref(""); // 搜索关键字
    let CurrentPage: any = ref(0); // 搜索 当前页
    let PageNumber: any = ref(20); // 搜索 每页歌曲数量

    let suffixState: any = ref(false);
    let listState: any = ref(false);
    let songListNum: any = ref("");
    let justListen: any = ref([
      "开始懂了",
      "我好想你",
      "听雪",
      "死了都要爱",
      "青花瓷",
      "街角的祝福",
      "洋葱",
    ]);
    // 搜索歌曲列表
    let randomList: any = ref([]);
    // 下滑刷新歌曲列表
    let addRandomList: any[] = [];
    // 输入搜索关键字,出现下达框数据列表
    let searchChangeList: any = ref([]);

    // 组件挂载页面之后
    // onMounted(() => {
    //   searchChange();
    // });
    // 监听
    watch(SearchName, (newValue) => {
      if (newValue) {
        suffixState.value = true;
      } else {
        suffixState.value = false;
      }
      // console.log(suffixState);
    });
    // 搜索列表数据
    const SearchSongFun = (listObj: any, rollState: any) => {
      getSearchSong(listObj).then((res) => {
        let test = res.data.substring(8, res.data.length);
        let test2 = eval("(" + test.substring(1, test.length - 1) + ")");
        if (rollState == false) {
          for (let index = 0; index < test2.data.song.list.length; index++) {
            let element = test2.data.song.list[index];
            let customSinger_a = "";
            let customSinger_b = "";
            for (let j = 0; j < element.singer.length; j++) {
              if (element.singer.length <= 1) {
                customSinger_b = element.singer[j].name;
              } else {
                customSinger_a += element.singer[j].name + ",";
                customSinger_b = customSinger_a.substring(
                  0,
                  customSinger_a.length - 1
                );
              }
            }
            element.customSinger = customSinger_b;
            listState.value = true;
            randomList.value = test2.data.song.list;
            songListNum.value = new Date().getTime();
          }
        } else {
          test2.data.song.list.map((item: any) => {
            let customSinger_a = "";
            let customSinger_b = "";
            for (let j = 0; j < item.singer.length; j++) {
              if (item.singer.length <= 1) {
                customSinger_b = item.singer[j].name;
              } else {
                customSinger_a += item.singer[j].name + ",";
                customSinger_b = customSinger_a.substring(
                  0,
                  customSinger_a.length - 1
                );
              }
            }
            item.customSinger = customSinger_b;
            addRandomList.push(item);
          });
          songListNum.value = new Date().getTime();
          randomList.value = addRandomList;
        }
      });
    };
    const compare = (property: any) => {
      return function (a: any, b: any) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    };
    // 输入搜索关键字,出现下达框数据
    const searchChange = () => {
      // searchChangeList = [];
      if (SearchName.value) {
        getReleaseBoxList(SearchName.value).then((res) => {
          let testArray = [];
          for (var i in res.data.data) {
            testArray.push(res.data.data[i]);
            searchChangeList.value = testArray.sort(compare("order"));
          }
          let regularReplace = searchChangeList.value;
          regularReplace.map((item: any) => {
            item.itemlist.map((items: any) => {
              items.name = items.name.replaceAll(
                SearchName.value,
                "<span class='Highlight'>" + SearchName.value + "</span>"
              );
              items.singer = items.singer.replaceAll(
                SearchName.value,
                "<span class='Highlight'>" + SearchName.value + "</span>"
              );
            });
          });
        });
      }
    };
    // 取消按钮
    const suffixClick = () => {
      SearchName.value = "";
      listState.value = false;
      randomList.value = [];
      songListNum.value = new Date().getTime();
    };
    // 搜索按钮
    const pressEnter = () => {
      let listObj: any = {
        CurrentPage: CurrentPage.value,
        PageNumber: PageNumber.value,
        SearchName: SearchName.value,
      };
      SearchSongFun(listObj, false);
    };
    // 点击标签查询
    const justListenEnter = (search: string) => {
      SearchName.value = search;
      let listObj: any = {
        CurrentPage: CurrentPage.value,
        PageNumber: PageNumber.value,
        SearchName: SearchName.value,
      };
      SearchSongFun(listObj, false);
    };
    // 下滑增加数据
    const addCurrentPage = (data: any) => {
      CurrentPage.value = data;
      let listObj: any = {
        CurrentPage: data,
        PageNumber: PageNumber.value,
        SearchName: SearchName.value,
      };
      SearchSongFun(listObj, true);
    };
    return {
      SearchName,
      suffixState,
      suffixClick,
      justListen,
      pressEnter,
      justListenEnter,
      onMounted,
      SearchSongFun,
      randomList,
      songListNum,
      listState,
      CurrentPage,
      addCurrentPage,
      searchChange,
      searchChangeList,
    };
  },
};
</script>
<style scoped>
.back_main {
  background-color: #d9d9d8;
  padding: 5px 10px;
}
.back_main .ant-tag:last-of-type {
  margin-right: 0;
}
.casual {
  text-align: left;
  padding: 10px 0 0 10px;
}
.casual span:last-of-type {
  margin-left: 6px;
}
.justListen {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 0 10px;
  box-shadow: 0px 10px 5px rgba(200, 200, 200, 0.5);
}
.justListen span {
  margin-bottom: 10px;
}
.justListen .ant-tag {
  color: #000;
  background: #ecf9fd;
  border-color: #1890ff;
}
:global(.searchList .ant-list-items) {
  height: calc(100vh - 230px) !important;
}
.search {
  position: relative;
}
.mod_search_result {
  position: absolute;
  top: 42px;
  background: #fff;
  box-shadow: 0px 10px 5px rgba(200, 200, 200, 0.5);
  width: 100%;
}
.mod_search_result .search_result__sort {
  position: relative;
}
.mod_search_result .search_result__tit {
  position: absolute;
  top: 5px;
  left: 0;
  width: 90px;
  text-align: center;
  color: #999;
}
.mod_search_result .search_result__list {
  border-left: 1px solid #d4d4d4;
  border-top: 1px solid #f2f2f2;
  margin-left: 90px;
  padding: 5px 0;
  color: #999;
  padding: 10px 11px 10px 41px;
  text-align: left;
}
:global(.test .Highlight) {
  color: #1890ff;
}
</style>
