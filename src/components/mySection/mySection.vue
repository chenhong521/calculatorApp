<template>
  <section class="section">
    <div class="tool">
      <div class="tool-title">
        <img src="../../assets/img/syjz.png" height="100%">
        <span>买房工具</span>
      </div>
      <div class="tool-type">
        <router-link class="tool-content" v-for="(item, index) in tool1" :key="index" :to="item.to">
          <img :src="item.logo" alt="" height="100%">
          <span>{{item.title}}</span>
        </router-link>
      </div>
    </div>
    <div class="tool">
      <div class="tool-title">
        <img src="../../assets/img/syjz.png" height="100%">
        <span>买车工具</span>
      </div>
      <div class="tool-type">
        <router-link class="tool-content" v-for="(item, index) in tool2" :key="index" :to="item.to">
          <img :src="item.logo" alt="" height="100%">
          <span>{{item.title}}</span>
        </router-link>
      </div>
    </div>
    <div class="tool">
      <div class="tool-title">
        <img src="../../assets/img/syjz.png" height="100%">
        <span>存款工具</span>
      </div>
      <div class="tool-type">
        <router-link class="tool-content" v-for="(item, index) in tool3" :key="index" :to="item.to">
          <img :src="item.logo" alt="" height="100%">
          <span>{{item.title}}</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      tool1: [
        {to: '/housingloan', logo: require('../../assets/img/fdjs.png'), title: '房贷计算器'},
        {to: '/accumulation', logo: require('../../assets/img/gjjd.png'), title: '公积金贷款计算器'},
        {to: '/combination', logo: require('../../assets/img/zhdk.png'), title: '组合贷款计算器'},
        {to: '/standard', logo: require('../../assets/img/debj.png'), title: '等额本金还款计算器'},
        {to: '/principal', logo: require('../../assets/img/debx.png'), title: '等额本息还款计算器'},
        {to: '/secondhousingloan', logo: require('../../assets/img/esfd.png'), title: '二手房贷计算器'},
        {to: '/reimbursement', logo: require('../../assets/img/hkfs.png'), title: '还款方式比较器'},
        {to: '/prepayment', logo: require('../../assets/img/tqhk.png'), title: '提前还款计算器'},
        {to: '/remaining', logo: require('../../assets/img/syhk.png'), title: '剩余还款计算器'},
        {to: '/camptotax', logo: require('../../assets/img/ygs.png'), title: '营改增税费计算器'},
        {to: '/secondhousingloan', logo: require('../../assets/img/esfs.png'), title: '二手房交易税计算器'},
        {to: '/propertytax', logo: require('../../assets/img/fcsjs.png'), title: '房产税计算器'},
        {to: '/shanghai', logo: require('../../assets/img/shfcs.png'), title: '上海房产税计算器'},
        {to: '/chongqing', logo: require('../../assets/img/cqfcs.png'), title: '重庆房产税计算器'}
      ],
      tool2: [
        {to: '', logo: require('../../assets/img/gcsf.png'), title: '购车税费计算器'},
        {to: '/carloans', logo: require('../../assets/img/gcdk.png'), title: '车贷计算器'}
      ],
      tool3: [
        {to: '/interestrates', logo: require('../../assets/img/dkll.png'), title: '存款利率查询'},
        {to: '/interestrates', logo: require('../../assets/img/hqck.png'), title: '活期存款利率计算器'},
        {to: '/interestrates', logo: require('../../assets/img/dkll.png'), title: '定期存款利率计算器'}
      ]
    }
  }
}
</script>
<style lang='less' scoped>
.section{
  width: 100%;
  background-color: #ffffff;
  .tool{
    width: 100%;
    .tool-title{
      width: 100%;
      height: 1.2rem;
      box-sizing: border-box;
      padding: 0.32rem 0.3733rem;
      border-bottom: 1px solid #f4f4f4;
      img{
        margin-right: 0.1733rem;
        vertical-align: middle;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        font-size: 0.3733rem;
      }
    }
    .tool-type{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .tool-content{
        display: flex;
        width: 50%;
        height: 1.68rem;
        padding: 0.4rem 0 0.4rem 0.4rem;
        border-bottom: 1px solid #f4f4f4;
        box-sizing: border-box;
        img{
          margin-right: 0.2rem;
        }
        span{
          line-height: 0.84rem;
          font-size: 0.2933rem;
          color: #333333;
        }
      }
      .tool-content:nth-child(odd){
        border-right: 1px solid #f4f4f4;
      }
    }
  }
}
</style>
