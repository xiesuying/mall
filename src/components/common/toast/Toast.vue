<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default() {
    //     return "";
    //   }
    // },
    // show: {
    //   type: Boolean,
    //   default() {
    //     return false;
    //   }
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    };
  },
  methods: {
    show(message, duration) {
      console.log(111111111121213);
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }

};
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 999000;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .75);
  color: #fff;
  border-radius: 15px;
}
</style>