<template>
  <div class="con">
    <myTitle :title="title"></myTitle>
    <div class="calculator">
      <div class="tool-title">
        <img src="../../assets/img/input.png" height="100%">
        <span>输入数据</span>
      </div>
      <mu-container>
        <mu-form ref="form" :model="form" label-position="right">
          <mu-form-item prop="region" label="贷款期限：" :rules="regionRules">
            <mu-select v-model="form.region">
              <mu-option v-for="(option, index) in region" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item label="公积金贷款金额：" prop="Gamount" :rules="GamountRules">
            <mu-text-field type="number" v-model="form.Gamount" prop="Gamount" suffix="万元"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="Grate" label="公积金贷款利率：" :rules="GrateRules">
            <mu-select v-model="form.Grate">
              <mu-option v-for="(option, index) in Grate" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item label="商业贷款金额：" prop="Samount" :rules="SamountRules">
            <mu-text-field type="number" v-model="form.Samount" prop="Samount" suffix="万元"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="Srate" label="年利率：" :rules="SrateRules">
            <mu-select v-model="form.Srate">
              <mu-option  v-for="(option, index) in Srate" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <div class="btn">
            <mu-button color="primary" @click="submit">计算</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </div>
        </mu-form>
      </mu-container>
      <div class="tool-title">
        <img src="../../assets/img/output.png" height="100%">
        <span>输出结果</span>
      </div>
      <ul class="resultList">
        <li class="listTitle">每月等额还款(等额本息)</li>
        <li class="item"><span>贷款总额：</span><span class="right">{{resultForm.resultAmount}}元</span></li>
        <li class="item"><span>还款月数：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
        <li class="item"><span>每月还款：</span><span class="right">{{resultForm.resultRepayment}}元</span></li>
        <li class="item"><span>总支付利息：</span><span class="right">{{resultForm.resultInterest}}元</span></li>
        <li class="item"><span>本息合计：</span><span class="right">{{resultForm.total}}元</span></li>
      </ul>
      <ul class="resultList">
        <li class="listTitle">逐月递减还款(等额本金)</li>
        <li class="item"><span>贷款总额：</span><span class="right">{{resultForm.resultAmount}}元</span></li>
        <li class="item"><span>还款月数：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
        <li class="item"><span>首月还款：</span><span class="right">{{resultForm.resultOneRepayment}}元</span></li>
         <li class="item"><span>每月递减：</span><span class="right">{{resultForm.descending}}元</span></li>
        <li class="item"><span>总支付利息：</span><span class="right">{{resultForm.resultInterest2}}元</span></li>
        <li class="item"><span>本息合计：</span><span class="right">{{resultForm.total2}}元</span></li>
        <li class="item itembot"><img src="../../assets/img/245388866389677681.png"><span>此结果仅供参考，实际应缴费以当地为准</span></li>
      </ul>
    </div>
    <myFooter></myFooter>
  </div>
</template>
<script>
import myTitle from '../../components/myTitle/myTitle'
import myFooter from '../../components/myFooter/myFooter'
export default {
  data () {
    return {
      title: '组合贷款计算器',
      region: [
        {option: '5年', value: 5},
        {option: '10年', value: 10},
        {option: '15年', value: 15},
        {option: '20年', value: 20},
        {option: '25年', value: 25},
        {option: '30年', value: 30}
      ],
      Grate: [
        {option: '公积金基准利率(3.25%)', value: 0.0325},
        {option: '公积金基准利率1.1倍(3.58%)', value: 0.0358},
        {option: '公积金基准利率1.2倍(3.90%)', value: 0.0390}
      ],
      Srate: [
        {option: '最新基准利率(4.9%)', value: 0.049},
        {option: '最新基准利率7折(3.34%)', value: 0.0343},
        {option: '最新基准利率8折(3.92%)', value: 0.0392},
        {option: '最新基准利率8.3折(4.08%)', value: 0.04067},
        {option: '最新基准利率8.5折(4.17%)', value: 0.04165},
        {option: '最新基准利率8.8折(4.31%)', value: 0.04312},
        {option: '最新基准利率9折(4.41%)', value: 0.0441},
        {option: '最新基准利率1.05倍(5.15%)', value: 0.05145},
        {option: '最新基准利率1.1倍(5.39%)', value: 0.0539},
        {option: '最新基准利率1.2倍(5.88%)', value: 0.0588},
        {option: '最新基准利率1.3倍(6.37%)', value: 0.0637}
      ],
      regionRules: [
        {validate: (val) => !!val, message: '必须选择贷款期限'}
      ],
      GamountRules: [
        {validate: (val) => !!val, message: '必须输入公积金贷款金额'}
      ],
      GrateRules: [
        {validate: (val) => !!val, message: '必须选择公积金贷款利率'}
      ],
      SamountRules: [
        {validate: (val) => !!val, message: '必须输入商业贷款金额'}
      ],
      SrateRules: [
        {validate: (val) => !!val, message: '必须选择商业贷款利率'}
      ],
      form: {
        region: '',
        Gamount: '',
        Grate: '',
        Samount: '',
        Srate: ''
      },
      resultForm: {
        resultAmount: 0,
        resultRegion: 0,
        resultRepayment: 0,
        resultOneRepayment: 0,
        descending: 0,
        resultInterest: 0,
        resultInterest2: 0,
        total: 0,
        total2: 0
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((res) => {
        // console.log(res)
        if (res === false) {
          return false
        } else {
          var result = this.$refs.form.model
          // 贷款总额
          this.resultForm.resultAmount = (parseInt(result.Gamount) + parseInt(result.Samount)) * 10000
          // 还款月数
          this.resultForm.resultRegion = parseInt(result.region) * 12
          // 公积金月利率
          let GANinterest = parseFloat(result.Grate) / 12
          // 商业贷款月利率
          let SANinterest = parseFloat(result.Srate) / 12
          // 公积金贷款额度和商业贷款额度
          var Gamount = parseInt(result.Gamount) * 10000
          var Samount = parseInt(result.Samount) * 10000
          // 公积金次方数
          let Gpow = Math.pow((1 + GANinterest), this.resultForm.resultRegion)
          // 公积金除数
          let Gdivisor = Gamount * GANinterest * Gpow
          // 公积金被除数
          let Gdividend = Gpow - 1
          // 公积金每月还款
          let GRepayment = parseFloat(Gdivisor / Gdividend)
          // 公积金总利息
          let Ginterest = parseFloat(GRepayment * this.resultForm.resultRegion - Gamount)
          // 商业次方数
          let Spow = Math.pow((1 + SANinterest), this.resultForm.resultRegion)
          // 商业除数
          let Sdivisor = Samount * SANinterest * Spow
          // 商业被除数
          let Sdividend = Spow - 1
          // 商业每月还款
          let SRepayment = parseFloat(Sdivisor / Sdividend)
          // 商业总利息
          let Sinterest = parseFloat(SRepayment * this.resultForm.resultRegion - Samount)
          // 总每月还款
          this.resultForm.resultRepayment = (GRepayment + SRepayment).toFixed(2)
          // 总支付利息1
          this.resultForm.resultInterest = (Ginterest + Sinterest).toFixed(2)
          // 合计1
          this.resultForm.total = (Ginterest + Sinterest + this.resultForm.resultAmount).toFixed(2)
          // 首月月供额=贷款本金÷还款月数+贷款本金×月利率
          let GOneRepayment = Gamount / this.resultForm.resultRegion + Gamount * GANinterest
          let SOneRepayment = Samount / this.resultForm.resultRegion + Samount * SANinterest
          this.resultForm.resultOneRepayment = (GOneRepayment + SOneRepayment).toFixed(2)
          // 每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
          let Gdescending = Gamount / this.resultForm.resultRegion * GANinterest
          let Sdescending = Samount / this.resultForm.resultRegion * SANinterest
          this.resultForm.descending = (Gdescending + Sdescending).toFixed(2)
          // 总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
          let GresultInterest2 = ((Gamount / this.resultForm.resultRegion + Gamount * GANinterest) + Gamount / this.resultForm.resultRegion * (1 + GANinterest)) / 2 * this.resultForm.resultRegion - Gamount
          let SresultInterest2 = ((Samount / this.resultForm.resultRegion + Samount * SANinterest) + Samount / this.resultForm.resultRegion * (1 + SANinterest)) / 2 * this.resultForm.resultRegion - Samount
          this.resultForm.resultInterest2 = (GresultInterest2 + SresultInterest2).toFixed(2)
          this.resultForm.total2 = parseFloat(this.resultForm.resultInterest2) + Gamount + Samount
        }
      })
    },
    clear () {
      this.$refs.form.clear()
      this.form = {
        region: '',
        Gamount: '',
        Grate: '',
        Samount: '',
        Srate: ''
      }
      this.resultForm = {
        resultAmount: 0,
        resultRegion: 0,
        resultRepayment: 0,
        resultOneRepayment: 0,
        descending: 0,
        resultInterest: 0,
        resultInterest2: 0,
        total: 0,
        total2: 0
      }
    }
  },
  components: {
    myTitle,
    myFooter
  }
}
</script>
<style lang="less" scoped>
.con{
  width: 100%;
  background-color: #ffffff;
  .calculator{
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
    .btn{
      margin: 0.2667rem 0;
      display: flex;
      justify-content: space-around;
    }
    .resultList{
      width: 100%;
      li{
        width: 100%;
        padding: 0 0.4rem;
        height: 0.8533rem;
        line-height: 0.8533rem;
        color: #4c4c4c;
        font-size: 0.3733rem;
        .right{
          float: right;
        }
        .right:after{content:"";display:block;height:0;clear:both;visibility:hidden;font-size: 0;}
      }
      .listTitle{
        background-color: #facaaa;
        height: 0.96rem;
        line-height: 0.96rem;
      }
      .item{
        border-bottom: 1px solid #ebebeb;
      }
      .itembot{
        font-size: 0.2933rem;
        img{
          width: 0.3467rem;
          vertical-align: middle;
        }
        span{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
