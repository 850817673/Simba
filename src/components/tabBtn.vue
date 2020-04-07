<template>
  <div>
    <van-tabbar v-model="tabActive">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="point-gift-o">专题</van-tabbar-item>
      <van-tabbar-item icon="qr" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="smile-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabActive: 0
    };
  }
};
</script>