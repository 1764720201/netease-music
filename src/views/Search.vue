<template>
  <div class="searchTop">
    <svg class="icon liebiao" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="陈奕迅"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <p>历史</p>
    <span v-for="item in keyWorldList" :key="item" @click="searchHistory(item)">
      {{ item }}</span
    >
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList" v-show="isSearch">
    <div
      class="item"
      v-for="(item, i) in searchList"
      :key="i"
      @click="updateIndex(item)"
    >
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { getSearchMusic } from "@/request/api/home";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      keyWorldList: [],
      searchKey: "",
      searchList: [],
      isSearch: false,
    };
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList")) || [];
  },
  methods: {
    enterKey: async function () {
      if (this.searchKey != "") {
        this.keyWorldList.unshift(this.searchKey);
        //去重
        this.keyWorldList = [...new Set(this.keyWorldList)];
        if (this.keyWorldList.length > 6) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        let res = await getSearchMusic(this.searchKey);

        this.searchList = res.data.result.songs;
        console.log(this.searchList);
        this.searchKey = "";
        this.isSearch = true;
      }
    },
    delHistory() {
      Dialog.confirm({
        closeOnClickOverlay: true,
        message: "确认要删除历史记录吗",
      })
        .then(() => {
          localStorage.removeItem("keyWorldList");
          this.keyWorldList = [];
          this.isSearch = false;
        })
        .catch(() => {});
    },
    async searchHistory(item) {
      let res = await getSearchMusic(item);
      this.searchList = res.data.result.songs;
      console.log(res);
      this.isSearch = true;
    },
    updateIndex(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 85%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  p {
    font-weight: 700;
    margin-bottom: 0.2rem;
  }
  span {
    padding: 0.1rem 0.2rem;
    border-radius: 0.4rem;
    background-color: rgb(189, 175, 175);
    margin: 0.1rem 0.2rem;
    margin-left: -0.2rem;
    top: 0.1rem;
    left: 1rem;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
    top: 0.38rem;
  }
}
.itemList {
  width: 100%;
  padding: 0.2rem;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }
      div {
        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
        margin-left: 0.3rem;
      }
    }
    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
