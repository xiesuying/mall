<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <user-info class="user-info"></user-info>
    <div class="account">
      <div class="balance">
        <span class="amount">0.00</span>元
        <div class="account-text">我的余额</div>
      </div>

      <div class="balance">
        <span class="amount">0</span>个
        <div class="account-text">我的优惠</div>
      </div>

      <div class="balance">
        <span class="amount">0</span>分
        <div class="account-text">我的积分</div>
      </div>
    </div>
    <list-view>
    </list-view>

  </div>

</template>

<script>

import NavBar from '@/components/common/navbar/NavBar';
import UserInfo from '@/views/profile/childComps/UserInfo';
import ListView from '@/views/profile/childComps/ListView';

export default {
  name: 'Profile',
  components: { UserInfo, NavBar,ListView}
};
</script>

<style scoped>
.nav-bar {
  display: block;
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.user-info {
  display: block;
}

.account {
  width: 375px;
  height: 85px;
  display: flex;
  font-size: 13px;
  color: #666;
}


.balance {
  padding: 18px;
  flex: 1;
  text-align: center;
}

.amount{
  font-size: 24px;
  color: #ff5f3e;
  font-weight: 700;
}

.account-text{
  margin-top: 5px;
}

</style>
