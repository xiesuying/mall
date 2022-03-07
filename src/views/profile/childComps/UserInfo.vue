<template>
  <div id="user-info">
    <div class="profile-left">
      <img class="profile-photo" src="@/assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="profile-center">
      <span>登陆/注册</span>
      <div class="center-text">
        <img class="profile-phone" src="@/assets/img/profile/phone.svg" alt="">
        <span class="phone-info">暂无绑定手机号</span>
      </div>
    </div>
    <div class="profile-right">
      <img class="profile-right-icon" src="@/assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>


</template>

<script>
export default {
  name: "UserInfo"

};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  height: 60px;
  width: 345px;
  padding: 15px;
  margin: auto;
  box-sizing: content-box;
}

.profile-left {
  float: left;
}

.profile-photo {
  width: 60px;
  height: 60px;
}


.profile-center {
  float: left;
  width: 210px;
  height: 60px;
  margin-left: 10px;
  margin-top: 10px;
  color: #fff;
}


.profile-phone {
  float: left;
  width: 18px;
  height: 28px;
}


.phone-info {
  float: left;
  margin-top: 5px;
  font-size: 10px;
  font-weight: 200;
}


.profile-right {
  float: right;
  height: 11px;
  margin-top: 18px;
  color: #fff;
  line-height: 11px;
}

.profile-right-icon {
  width: 15px;
  height: 20px;
}

</style>