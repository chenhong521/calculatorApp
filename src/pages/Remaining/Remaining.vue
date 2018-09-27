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
          <!-- <mu-form-item prop="radio" label="计算方式：" >
            <mu-radio v-model="form.radio" value="principal" label="等额本息"></mu-radio>
            <mu-radio v-model="form.radio" value="standard" label="等额本金"></mu-radio>
          </mu-form-item> -->
          <mu-form-item label="贷款金额：" prop="amount" :rules="amountRules">
            <mu-text-field type="number" v-model="form.amount" prop="amount" suffix="万元"></mu-text-field>
          </mu-form-item>
          <!-- <mu-form-item prop="property" label="首付：" :rules="propertyRules">
            <mu-select v-model="form.property">
              <mu-option v-for="(option, index) in property" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item> -->
          <mu-form-item prop="region" label="贷款期限：" :rules="regionRules">
            <mu-select v-model="form.region">
              <mu-option v-for="(option, index) in region" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="rate" label="年利率：" :rules="rateRules">
            <mu-select v-model="form.rate">
              <mu-option  v-for="(option, index) in rate" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="firstDate" label="第一次还款日期：">
            <mu-date-input v-model="form.firstDate" prop="firstDate" no-display></mu-date-input>
          </mu-form-item>
          <mu-form-item prop="nextDate" label="提前还款日期：">
            <mu-date-input v-model="form.nextDate" prop="nextDate" no-display></mu-date-input>
          </mu-form-item>
          <!-- <mu-form-item prop="Pmethod" label="提前还款方式：">
            <mu-select v-model="form.Pmethod">
              <mu-option  v-for="(option, index) in Pmethod" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item label="贷款金额：" prop="Tamount" :rules="TamountRules" v-if="form.Pmethod == 2">
            <mu-text-field type="number" v-model="form.Tamount" prop="Tamount" suffix="万元"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="handling" label="处理方式：" v-if="form.Pmethod == 2">
            <mu-select v-model="form.handling">
              <mu-option  v-for="(option, index) in handling" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
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
      <ul class="resultList">
        <li class="listTitle"></li>
        <li class="item"><span>已还本金：</span><span class="right">{{resultForm.resultEd}}元</span></li>
        <li class="item"><span>已还本息：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
        <li class="item"><span>已支付还款额：</span><span class="right">{{resultForm.resultRepayment}}元</span></li>
      </ul>
      <ul class="resultList">
        <li class="listTitle"></li>
        <li class="item"><span>每期还款：</span><span class="right">{{resultForm.resultEd}}元</span></li>
        <li class="item"><span>剩余利息：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
        <li class="item"><span>剩余本金：</span><span class="right">{{resultForm.resultOneRepayment}}元</span></li>
         <li class="item"><span>剩余还款总额：</span><span class="right">{{resultForm.descending}}元</span></li>
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
      title: '剩余还款计算器',
      region: [
        {option: '5年', value: 5},
        {option: '10年', value: 10},
        {option: '15年', value: 15},
        {option: '20年', value: 20},
        {option: '25年', value: 25},
        {option: '30年', value: 30}
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
        {option: '最新基准利率1.3倍(6.37%)', value: 0.0637},
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
      // propertyRules: [
      //   {validate: (val) => !!val, message: '必须选择首付'}
      // ],
      form: {
        amount: '',
        region: '',
        rate: '',
        firstDate: undefined,
        nextDate: undefined
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
    submit () {
      this.$refs.form.validate().then((res) => {
        // console.log(res)
        if (res === false) {
          return false
        } else {
          var result = this.$refs.form.model
          // 贷款总额
          console.log(result)
        }
      })
    },
    clear () {
      this.$refs.form.clear()
      this.form = {
        radio: 'principal',
        amount: '',
        region: '',
        rate: '',
        firstDate: '',
        nextDate: ''
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
