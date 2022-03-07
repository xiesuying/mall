<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">
        商品分类
      </div>
    </nav-bar>
    <tab-menu :categories="categories"
              class="tab-menu">
    </tab-menu>
    <div class="category-content">
      <tab-control :titles="['综合', '新品', '销量']" @tabClick="handleTabClick"></tab-control>
      <goods-list :goods="showCategoryDetail"></goods-list>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';
import TabMenu from '@/views/category/childComps/TabMenu';
import TabControl from '@/components/content/tabControl/TabControl';
import GoodsList from '@/components/content/goods/GoodsList';


import { getCategory, getCategoryDetail } from '@/network/category';


export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabControl,
    GoodsList

  },
  data() {
    return {
      // 分类数据，左侧
      categories: [],
      // 当前分类下的细节商品数据，右侧展示
      categoryData: [],
      currentIndex: -1,
      currentType: 'pop'
    };
  },
  /**
   * 1. 请求分类数据
   * 2. 获取当前选中分类的详细数据
   */
  created() {
    this.getCategory().then(() => {
      this.currentIndex = 0;
      this.getCategoryDetail('pop');
      this.getCategoryDetail('new');
      this.getCategoryDetail('sell');
    });
  },
  computed: {
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex][this.currentType];
    }
  },
  watch: {
    showCategoryDetail() {
      console.log('showCategoryDetail', this.currentType, this.showCategoryDetail);
    }
  },
  methods: {
    getCategory() {
      return getCategory().then(res => {
        this.categories = res.data.category.list;

        for (let i = 0; i < this.categories.length; i++) {
          this.$set(this.categoryData, i, {
            pop: [],
            new: [],
            sell: []
          });
        }
      });
    },
    handleTabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    getCategoryDetail(type) {
      const currentCategory = this.categories[this.currentIndex];
      return getCategoryDetail(
          currentCategory.miniWallkey,
          type
      ).then((goods) => {
        this.categoryData[this.currentIndex][type] = goods;
      });
    }
  }
};
</script>

<style scoped>

.category {
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

.category-content {
  float: right;
  width: 275px;
  position: relative;
  top: 44px;
}

</style>