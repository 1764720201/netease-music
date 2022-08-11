<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑可以切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        v-show="isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-show="!isbtnShow"
      >
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>
<script>
import MusicDetail from "@/components/item/MusicDetail";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  components: { MusicDetail },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal);
      }
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 500);
    },
    addDuration() {
      this, this.updateDuration(this.$refs.audio.duration);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    playListIndex: function () {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.pause) {
        this.updateIsbtnShow(false);
      }
    },
    playList: function () {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
