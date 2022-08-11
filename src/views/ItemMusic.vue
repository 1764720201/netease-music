<template>
  <ItemMusicTop :playlist="state.playlist" />
  <ItemMusicList
    :itemList="state.itemList"
    :subscribedCount="state.playlist.subscribedCount"
  />
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item";
import ItemMusicTop from "@/components/item/ItemMusicTop";
import ItemMusicList from "@/components/item/ItemMusicList";
export default {
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
  setup() {
    const state = reactive({
      playlist: {},
      itemList: [],
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      state.playlist = res.data.playlist;
      let result = await getItemList(id);
      state.itemList = result.data.songs;
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });

    return { state };
  },
};
</script>
