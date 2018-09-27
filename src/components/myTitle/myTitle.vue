<template>
 <div class="con">
    <div class="title">
      <span><i class="iconfont icon-1" @click="$router.go(-1)"></i>{{title}}</span>
    </div>
    <div class="banner">
      <img src="../../assets/img/banner2.png" alt="" width="100%" style="display:block;">
    </div>
 </div>
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="less" scoped>
.con{
  width: 100%;
  position: relative;
  .title{
    width: 100%;
    background-color: #ffffff;
    height: 1.1733rem;
    line-height: 1.1733rem;
    border-bottom: 1px solid #dbdbdb;
    box-sizing: border-box;
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 10;
    font-size: 0.4267rem;
    .icon-1{
      position: absolute;
      left: 0.48rem;
      font-size: 0.5333rem;
    }
  }
  .banner{
    margin-top: 1.1733rem;
  }
}
</style>
