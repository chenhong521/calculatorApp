<template>
  <div class="home">
    <myHeader></myHeader>
    <myBanner></myBanner>
    <mySection></mySection>
    <myFooter></myFooter>
    <router-view></router-view>
  </div>
</template>
<script>
import myHeader from '../myHeader/myHeader'
import myBanner from '../myBanner/myBanner'
import mySection from '../mySection/mySection'
import myFooter from '../myFooter/myFooter'
export default {
  components: {
    myHeader,
    myBanner,
    mySection,
    myFooter
  }
}
</script>
<style lang="less" scoped>
.home{
  width: 100%;
}
</style>
