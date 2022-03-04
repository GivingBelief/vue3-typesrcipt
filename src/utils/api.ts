import request from "./request";

//获取  最新音乐
export const getInTheaters = (topid: number) => {
  return request({
    url: `/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=${topid}`,
  });
};

// 输入搜索关键字,出现下达框数据
export const getReleaseBoxList = (key: string) => {
  return request({
    url: `/splcloud/fcgi-bin/smartbox_new.fcg?key=${key}`,
  });
};

// 搜索列表数据
export const getSearchSong = (listObj: {
  CurrentPage: any;
  PageNumber: any;
  SearchName: any;
}) => {
  return request({
    url: `/soso/fcgi-bin/client_search_cp?p=${listObj.CurrentPage}&n=${listObj.PageNumber}&w=${listObj.SearchName}`,
  });
};
