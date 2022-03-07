<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item class="cart-list-item"
                      v-for="(item,index) in cartList"
                      :key="index"
                      :product="item">

      </cart-list-item>
    </scroll>
  </div>
</template>
　
<script>

import Scroll from '@/components/common/scroll/Scroll';
import CartListItem from '@/views/cart/childComps/CartListItem';
import { mapGetters } from 'vuex';

export default {
  name: "CartList",
  components: { CartListItem,Scroll },
  props: {
    CartListItem
  },

  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  activated() {
    this.$refs.scroll.refresh();
  }

};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px  - 40px);
}

.cart-list-item {
  width: 100vw;
  word-break: break-all;
  position: relative;
  top: 44px
}

.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>