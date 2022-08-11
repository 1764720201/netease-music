<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in state.images" :key="image">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
import { onMounted, reactive } from "vue";
import { getBanner } from "@/request/api/home.js";
export default {
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      let res = await getBanner();
      state.images = res.data.banners;
    });
    return { state };
  },
};
</script>
<style lang="less">
.van-swipe {
  width: 100%;
  padding: 0.2rem;
  .van-swipe__track {
    .van-swipe-item {
      img {
        width: 100%;
        height: 3rem;
        border-radius: 0.2rem;
      }
    }
  }
  .van-swipe__indicator--active {
    background-color: rgb(219, 130, 130);
  }
}
</style>
