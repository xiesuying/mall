<template>
  <div id="home">
    <nav-bar class="home-nav" v-show="!isTabFixed">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"
                 v-show="isTabFixed">
    </tab-control>
    <scroll
        ref="scroll"
        class="content"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"
    >
      <div class="home-wrapper">
        <home-swiper :banners="banners"
                     @swiperImageLoad="swiperImageLoad"
        ></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';


import HomeSwiper from '@/views/home/childComps/HomeSwiper';
import RecommendView from '@/views/home/childComps/RecommendView';
import FeatureView from '@/views/home/childComps/FeatureView';
import TabControl from '@/components/content/tabControl/TabControl';
import GoodsList from '@/components/content/goods/GoodsList';
import Scroll from '@/components/common/scroll/Scroll';
import BackTop from '@/components/content/backTop/BackTop';

import { getHomeMultidata, getHomeGoods } from '@/network/home';


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };

  },

  mounted() {
    // const refresh = this.debounce(this.$refs.scroll.scroll.refresh, 500);
    //请求多个数据;
    Promise.all([
      this.getHomeMultidata(),
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
    ]).then(() => {
      this.$nextTick(() => {
        // const refresh = this.debounce(this.$refs.scroll.scroll.refresh, 500);
        // refresh();
        this.$refs.scroll.scroll.refresh();
      });
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },

  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
  },

  methods: {
    //防抖
    // debounce(func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },


    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index,
          this.$refs.tabControl2.currentIndex = index,

          this.$nextTick(() => {
            // const refresh = this.debounce(this.$refs.scroll.scroll.refresh, 500);
            // refresh();
            this.$refs.scroll.scroll.refresh();
          });
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    contentScroll(position) {
      //1.判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000;

      //2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop;1
      // console.log(tabOffsetTop);

    },

    loadMore() {
      console.log('load more');
      this.getHomeGoods(this.currentType).then(() => {
        this.$nextTick(() => {
          this.$refs.scroll.scroll.refresh();
        });
      });
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
      // console.log('tabOffsetTop', this.tabOffsetTop);
    },


    getHomeMultidata() {
      return getHomeMultidata().then(res => {

            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;

          }
      );
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;

      return getHomeGoods(type, page).then(res => {
        // console.log('111');
        // console.log('res', res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();

      });
    }
  }


};
</script>

<style scoped>

#home {
  height: 100vh;
  position: relative;

}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  /*padding-top: 44px;*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: relative;
  z-index: 9;
  /*position: sticky;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;
  /*overflow-y: auto;*/
  /*height: calc(100% - 98px);*/
  /*position: absolute;*/
  /*top: 0px;*/
  /*bottom: 49px;*/
  /*left: 0;*/
  /*right: 0;*/
  height: 100vh;
  width: 100vw;
}

.home-wrapper{
  padding-top: 44px;
}
</style>