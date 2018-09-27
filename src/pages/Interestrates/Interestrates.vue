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
            <mu-form-item prop="rate" label="年利率：">
              <mu-select v-model="form.rate" @change="change">
                <mu-option v-for="(option, index) in rate" :key="index" :label="option.option" :value="option.value"></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item label="输入年利率：">
              <mu-text-field style="font-size:12px;" v-model="form.srate" placeholder="若手动输入则按手动输入值计算" prop="srate" type="number" suffix="%"></mu-text-field>
            </mu-form-item>
          <div class="btn">
            <!-- <mu-button color="primary" @click="submit">计算</mu-button> -->
            <mu-button color="primary">计算</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </div>
        </mu-form>
      </mu-container>
      <div class="tool-title">
        <img src="../../assets/img/output.png" height="100%">
        <span>输出结果</span>
      </div>
      <!-- <ul class="resultList">
        <li class="listTitle">每月等额还款(等额本息)</li>
        <li class="item"><span>贷款总额：</span><span class="right">{{resultForm.resultEd}}元</span></li>
        <li class="item"><span>还款月数：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
        <li class="item"><span>每月还款：</span><span class="right">{{resultForm.resultRepayment}}元</span></li>
        <li class="item"><span>总支付利息：</span><span class="right">{{resultForm.Totalinterestpayments}}元</span></li>
        <li class="item"><span>本息合计：</span><span class="right">{{resultForm.total}}元</span></li>
      </ul> -->
      <ul class="resultList">
        <li class="listTitle"></li>
        <li class="item"><span>利息：</span><span class="right">{{resultForm.resultEd}}元</span></li>
        <li class="item"><span>本息合计：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
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
      title: '存款利率查询',
      property: [
        {option: '2成', value: 0.2},
        {option: '3成', value: 0.3},
        {option: '4成', value: 0.4},
        {option: '5成', value: 0.5},
        {option: '6成', value: 0.6},
        {option: '7成', value: 0.7},
        {option: '8成', value: 0.8},
        {option: '9成', value: 0.9}
      ],
      rate: [
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
      region: [
        {option: '1年', value: 1},
        {option: '2年', value: 2},
        {option: '3年', value: 3},
        {option: '4年', value: 4},
        {option: '5年', value: 5},
        {option: '6年', value: 6},
        {option: '7年', value: 7},
        {option: '8年', value: 8},
        {option: '9年', value: 9},
        {option: '10年', value: 10},
        {option: '11年', value: 11},
        {option: '12年', value: 12},
        {option: '13年', value: 13},
        {option: '14年', value: 14},
        {option: '15年', value: 15},
        {option: '16年', value: 16},
        {option: '17年', value: 17},
        {option: '18年', value: 18},
        {option: '19年', value: 19},
        {option: '20年', value: 20},
        {option: '21年', value: 21},
        {option: '22年', value: 22},
        {option: '23年', value: 23},
        {option: '24年', value: 24},
        {option: '25年', value: 25},
        {option: '26年', value: 26},
        {option: '27年', value: 27},
        {option: '28年', value: 28},
        {option: '29年', value: 30},
        {option: '30年', value: 30}
      ],
      amountRules: [
        {validate: (val) => !!val, message: '必须输入车价'}
      ],
      regionRules: [
        {validate: (val) => !!val, message: '必须选择贷款期限'}
      ],
      rateRules: [
        {validate: (val) => !!val, message: '必须选择年利率'}
      ],
      propertyRules: [
        {validate: (val) => !!val, message: '必须选择首付'}
      ],
      acreageRules: [
        {validate: (val) => !!val, message: '必须输入面积'}
      ],
      form: {
        amount: '',
        region: '',
        rate: '',
        unitprice: '',
        acreage: '',
        property: ''
      },
      resultForm: {
        resultEd: 0,
        resultRegion: 0,
        resultRate: 0,
        resultRepayment: 0,
        resultOneRepayment: 0,
        descending: 0,
        Totalinterestpayments: 0,
        Totalinterestpayments2: 0,
        total2: 0,
        total: 0
      }
    }
  },
  methods: {
    // submit () {
    //   this.$refs.form.validate().then((res) => {
    //     // console.log(res)
    //     if (res === false) {
    //       return false
    //     } else {
    //       var result = this.$refs.form.model
    //       // 贷款总额
    //       this.resultForm.resultEd = result.amount * 10000 - result.amount * 10000 * result.property
    //       console.log(this.resultForm.resultEd)
    //       // 贷款期限（月数）
    //       this.resultForm.resultRegion = parseInt(result.region) * 12
    //       // 月利率
    //       this.resultForm.resultRate = parseFloat(result.rate) / 12
    //       // 次方数
    //       var pow = Math.pow((1 + this.resultForm.resultRate), this.resultForm.resultRegion)
    //       // 除数
    //       var divisor = this.resultForm.resultEd * this.resultForm.resultRate * pow
    //       // 被除数
    //       var dividend = pow - 1
    //       // 每月还款
    //       this.resultForm.resultRepayment = parseFloat((divisor / dividend).toFixed(2))
    //       var repayment = parseFloat(divisor / dividend)
    //       // 总支付利息
    //       this.resultForm.Totalinterestpayments = parseFloat((repayment * this.resultForm.resultRegion - this.resultForm.resultEd).toFixed(2))
    //       // 总计
    //       this.resultForm.total = parseFloat((repayment * this.resultForm.resultRegion).toFixed(2))
    //       // 首月还款
    //       this.resultForm.resultOneRepayment = parseFloat(((this.resultForm.resultEd / this.resultForm.resultRegion) + (this.resultForm.resultEd * this.resultForm.resultRate)).toFixed(2))
    //       // 每月月供递减额
    //       this.resultForm.descending = parseFloat((this.resultForm.resultEd / this.resultForm.resultRegion * this.resultForm.resultRate).toFixed(2))
    //       // 等额本金总利息
    //       this.resultForm.Totalinterestpayments2 = parseFloat((((this.resultForm.resultEd / this.resultForm.resultRegion + this.resultForm.resultEd * this.resultForm.resultRate) + this.resultForm.resultEd / this.resultForm.resultRegion * (1 + this.resultForm.resultRate)) / 2 * this.resultForm.resultRegion - this.resultForm.resultEd).toFixed(2))
    //       // 等额本金总计
    //       this.resultForm.total2 = parseFloat((((this.resultForm.resultEd / this.resultForm.resultRegion + this.resultForm.resultEd * this.resultForm.resultRate) + this.resultForm.resultEd / this.resultForm.resultRegion * (1 + this.resultForm.resultRate)) / 2 * this.resultForm.resultRegion).toFixed(2))
    //       // console.log(this.resultForm.resultEd, this.resultForm.total2)
    //     }
    //   })
    // },
    clear () {
      this.$refs.form.clear()
      this.form = {
        radio: 'lines',
        amount: '',
        region: '',
        rate: '',
        unitprice: '',
        acreage: '',
        property: ''
      }
      this.resultForm = {
        resultEd: 0,
        resultRegion: 0,
        resultRate: 0,
        resultRepayment: 0,
        resultOneRepayment: 0,
        descending: 0,
        Totalinterestpayments: 0,
        Totalinterestpayments2: 0,
        total2: 0,
        total: 0
      }
    },
    change () {
      this.form.srate = ''
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
