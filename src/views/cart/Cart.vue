<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';
import CartList from '@/views/cart/childComps/CartList';
import CartBottomBar from '@/views/cart/childComps/CartBottomBar';
import { mapGetters } from 'vuex';

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
  }
};
</script>

<style scoped>

.cart {
  height: 100vh;
}

.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: fixed;
  top: 0;
  /*left: 0;*/
  /*right: 0;*/
  width: 100vw;
  z-index: 999;
}

</style>