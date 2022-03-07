<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item" :key="item.iid">
      {{ goods }}
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from '@/components/content/goods/GoodsListItem';

export default {
  name: "goodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    goods(){
      console.log('goods list',this.goods)
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  padding:2px;
}

</style>