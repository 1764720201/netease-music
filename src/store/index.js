import { createStore } from "vuex";
import { getMusicLyric, getPhoneLogin } from "@/request/api/home";

export default createStore({
  state: {
    playList: [
      {
        al: {
          id: 80100742,
          name: "隔离区（片段）",
          pic: 109951164186186600,
          picUrl:
            "https://p2.music.126.net/wYtnuBzLbjUfyQg9ulJXJg==/109951164186186590.jpg",
          pic_str: "109951164186186590",
        },
        id: 1929332181,
        ar: [
          {
            name: "王泽科",
          },
        ],
      },
    ],
    playListIndex: 0,
    isbtnShow: true,
    detailShow: false,
    lyricList: {},
    currentTime: 0,
    duration: 0,
    isLogin: false,
    isFooterMusic: true,
    token: "",
    user: {},
  },
  getters: {},
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    pushPlayList: function (state, value) {
      state.playList.push(value);
    },
    updatePlayList: function (state, value) {
      state.playList = value;
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
    },
    updateIsLogin: function (state, value) {
      state.isLogin = true;
    },
    updateToken: function (state, vlaue) {
      state.token = vlaue;
      localStorage.setItem("token", state.token);
    },
    updateUser: function (state, value) {
      state.user = value;
    },
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value);
      context.commit("updateLyricList", res.data.lrc);
    },
    getLogin: async function (context, value) {
      let res = await getPhoneLogin(value);
      return res;
    },
  },
  modules: {},
});
