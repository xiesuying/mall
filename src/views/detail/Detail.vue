<template>
  <div class="detail">
    <detail-nav-b-ar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-b-ar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info @imageLoad="imageLoad" ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo">11111</detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBAr from '@/views/detail/childComps/DetailNavBar';
import DetailSwiper from '@/views/detail/childComps/DetailSwiper';
import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo';
import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo';
import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo';
import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo';
import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar';

import Scroll from '@/components/common/scroll/Scroll';
import GoodsList from '@/components/content/goods/GoodsList';
import BackTop from '@/components/content/backTop/BackTop';

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail';
import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo';
// import { mapActions } from 'vuex';

export default {
  name: "Detail",
  components: {
    DetailParamInfo,
    DetailNavBAr,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsParam,
    Scroll,
    GoodsList,
    BackTop

  },
  data() {
    return {
      iid: null,
      res: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      isShowBackTop: false

    };
  },
  activated() {
    this.iid = this.$route.params.iid;

  },
  created() {

    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // console.log(res);
      // this.res = res;
      //2.1.获取轮播图
      this.topImage = data.itemInfo.topImages;
      this.$refs.scroll.scroll.refresh;
      // console.log('scroll', this.$refs.scroll);

      //2.2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // console.log(this.goods);

      //2.3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);

      //2.4.获取商品详细数据
      this.detailInfo = data.detailInfo;
      this.$nextTick(() => this.$refs.scroll.refresh());


      //2.5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // console.log('param', this.paramInfo);


      //2.6.提取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log('comment', this.commentInfo);
        this.$nextTick(() => this.$refs.scroll.refresh());
      }


    });


    //3.获取推荐的数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
      this.$nextTick(() => this.$refs.scroll.refresh());
    });


  },

  methods: {
    // ...mapActions(['addToCart']),
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    titleClick(index) {
      console.log(index);
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 100);
    },
    contentScroll(position) {
      const positionY = -position.y + 44;
      // console.log(position);
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      ;
      //1.判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000;

    },
    addToCart() {
      const product = {};
      product.iid = this.iid;
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.realPrice;
      // this.addToCart(product).then(res=>{
      //   console.log(res);
      // })

      this.$store.dispatch('addToCart', product).then(res => {
        console.log(this.$toast);
        this.$toast.show(res, 2000);
        console.log(res);
      });

    }


  }

};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 9999;
  background-color: #fff;
  height: 100vh;
}


.detail-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  overflow: hidden;
  height: calc(100% - 44px);
}


.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

}


</style>