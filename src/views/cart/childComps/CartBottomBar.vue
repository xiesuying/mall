<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="checkedAll"
                    @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{ totalPrice }}
    </div>
    <div class="right">
      去计算：{{ checkLength }}
    </div>

  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton';
import { mapGetters } from 'vuex';

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '¥' + this.cartList.filter(item => {
        return item.checked;
      }).reduce((perValue, item) => {
        return perValue + item.newPrice * item.count;
      }, 0).toFixed(2);

    },
    checkLength() {
      return '(' + this.cartList.filter(item => item.checked).length + ')';
    },
    checkedAll() {
      if (this.cartList.length === 0) return false;
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    checkClick() {
      if (this.checkedAll) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true);
      }
    }

  }


};
</script>

<style scoped>

.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}

.check-content {
  height: 20px;
  display: flex;
  width: 80px;
}

.check-content span {
  padding-left: 40px;
}

.check-button {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 10px;
  height: 21px;
  width: 21px;
}

.price {
  flex: 1;
}

.right {
  text-align: center;
  background-color: var(--color-high-text);
  width: 100px;
}
</style>