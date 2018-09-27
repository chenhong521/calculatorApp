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
          <mu-form-item label="贷款金额：" prop="amount" :rules="amountRules">
            <mu-text-field type="number" v-model="form.amount" prop="amount" suffix="万元"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="region" label="贷款期限：" :rules="regionRules">
            <mu-select v-model="form.region">
              <mu-option v-for="(option, index) in region" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="rate" label="年利率：" :rules="rateRules">
            <mu-select v-model="form.rate">
              <mu-option v-for="(option, index) in rate" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <!-- <mu-form-item label="手动输入利率：">
            <mu-text-field  v-model="form.srate" prop="srate" type="number" suffix="%"></mu-text-field>
          </mu-form-item> -->
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
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>还款方式</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>等额本息</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>等额本金</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>首期还款：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>{{resultForm.resultRepayment}}元</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>{{resultForm.resultRepayment2}}元</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>末期还款：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>{{resultForm.resultRepayment}}元</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>{{resultForm.Totalinterestpayments2}}元</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>还款总额：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>{{resultForm.total}}元</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>{{resultForm.total2}}元</mu-flex>
      </mu-flex>
      <div class="itembot"><img src="../../assets/img/245388866389677681.png"><span>此结果仅供参考，实际应缴费以当地为准</span></div>
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
      title: '还款方式比较器',
      region: [
        {option: '5年(60期)', value: 5},
        {option: '10年(120期)', value: 10},
        {option: '15年(180期)', value: 15},
        {option: '20年(240期)', value: 20},
        {option: '25年(300期)', value: 25},
        {option: '30年(360期)', value: 30}
      ],
      rate: [
        {option: '最新商贷利率(4.9%)', value: 0.049},
        {option: '最新商贷利率7折(3.34%)', value: 0.0343},
        {option: '最新商贷利率8折(3.92%)', value: 0.0392},
        {option: '最新商贷利率8.3折(4.08%)', value: 0.04067},
        {option: '最新商贷利率8.5折(4.17%)', value: 0.04165},
        {option: '最新商贷利率8.8折(4.31%)', value: 0.04312},
        {option: '最新商贷利率9折(4.41%)', value: 0.0441},
        {option: '最新商贷利率1.05倍(5.15%)', value: 0.05145},
        {option: '最新商贷利率1.1倍(5.39%)', value: 0.0539},
        {option: '最新商贷利率1.2倍(5.88%)', value: 0.0588},
        {option: '最新商贷利率1.3倍(6.37%)', value: 0.0637},
        {option: '公积金基准利率(3.25%)', value: 0.0325},
        {option: '公积金基准利率1.1倍(3.58%)', value: 0.0358},
        {option: '公积金基准利率1.2倍(3.90%)', value: 0.0390}
      ],
      amountRules: [
        {validate: (val) => !!val, message: '必须输入贷款金额'}
      ],
      regionRules: [
        {validate: (val) => !!val, message: '必须选择贷款期限'}
      ],
      rateRules: [
        {validate: (val) => !!val, message: '必须选择年利率'}
      ],
      form: {
        amount: '',
        region: '',
        rate: ''
      },
      resultForm: {
        resultRepayment: 0,
        resultRepayment2: 0,
        Totalinterestpayments: 0,
        Totalinterestpayments2: 0,
        total2: 0,
        total: 0
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
          var amountAll = parseInt(result.amount * 10000)
          // 贷款期数
          var regionAll = parseInt(result.region * 12)
          // 月利率
          var rateAll = parseFloat(result.rate) / 12
          // 次方数
          var pow = Math.pow((1 + rateAll), regionAll)
          // 除数
          var divisor = amountAll * rateAll * pow
          // 被除数
          var dividend = pow - 1
          // 等额本息每月还款
          this.resultForm.resultRepayment = parseFloat(divisor / dividend).toFixed(2)
          // 等额本息贷款总和
          this.resultForm.total = (regionAll * parseFloat(divisor / dividend)).toFixed(2)
          // 等额本金首月还款
          this.resultForm.resultRepayment2 = (amountAll / regionAll + (amountAll - 0) * rateAll).toFixed(2)
          // 每月月供递减额
          var dijian = amountAll / regionAll * rateAll
          this.resultForm.Totalinterestpayments2 = (amountAll / regionAll + dijian).toFixed(2)
          // 等额本金总利息 总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
          var lx = ((amountAll / regionAll + amountAll * rateAll) + amountAll / regionAll * (1 + rateAll)) / 2 * regionAll - amountAll
          // 等额本金贷款总和
          this.resultForm.total2 = (lx + amountAll).toFixed(2)
        }
      })
    },
    clear () {
      this.$refs.form.clear()
      this.form = {
        amount: '',
        region: '',
        rate: ''
      }
      this.resultForm = {
        resultRepayment: 0,
        resultRepayment2: 0,
        Totalinterestpayments: 0,
        Totalinterestpayments2: 0,
        total2: 0,
        total: 0
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
    }
    .flex-wrapper{
      width: 100%;
      height: 0.8533rem;
      border-bottom: 1px solid #ebebeb;
      font-size: 0.3733rem;
      color: #4c4c4c;
      .flex-demo{
        width: 33%;
        border-right: 1px solid #ebebeb;
        height: 0.8533rem;
        line-height: 0.8533rem;
      }
    }
    .itembot{
      font-size: 0.2933rem;
      height: 0.8533rem;
      line-height: 0.8533rem;
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
</style>
