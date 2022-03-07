<template>
  <div class="menu-list">
    <scroll class="content">
      <div class="menu-list-item"
           v-for="(item, index) in categories">
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll';

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: Array
  }


};
</script>

<style scoped>
.menu-list {
  float: left;
  width: 100px;
  height: calc(100% - 44px - 40px);

}

.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.menu-list-item {
  width: 100px;
  height: 50px;
  font-size: 15px;
  text-align: center;
  line-height: 45px;
  position: relative;
  top: 44px;



}

</style>