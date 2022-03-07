<template>
  <div class="list">
    <div class="list-view">
      <img class="list-icon" src="@/assets/img/profile/message.svg" alt="">
      <span class="list-text">我的消息</span>
    </div>
    <div class="list-view">
      <img class="list-icon" src="@/assets/img/profile/pointer.svg" alt="">
      <span class="list-text">积分商城</span>
    </div>
    <div class="list-view">
      <img class="list-icon" src="@/assets/img/profile/vip.svg" alt="">
      <span class="list-text">会员卡</span>
    </div>
    <div class="list-view">
      <img class="list-icon" src="@/assets/img/profile/cart.svg" alt="">
      <span class="list-text">我的购物车</span>
    </div>
    <div class="list-view">
      <img class="list-icon" src="@/assets/img/profile/shopping.svg" alt="">
      <span class="list-text">下载购物APP</span>
    </div>


  </div>
</template>

<script>
export default {
  name: "ListView"
};
</script>

<style scoped>
.list {
  height: 250px;
  margin-top: 12px;
  font-size: 15px;
  color: #333;
}

.list-view {
  height: 44px;
}

.list-icon {
  float: left;
  width: 24px;
  height: 24px;
  margin: 10px;
}

.list-text {
  width: 330px;
  height: 43px;
  float: left;
  text-align: left;
  line-height: 43px;
  border-bottom: 1px solid rgba(100, 100, 100, .1);


}
</style>