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
          <mu-form-item prop="calculation" label="计算方式：" >
            <mu-radio v-model="form.calculation" value="Average" label="普通住宅"></mu-radio>
            <mu-radio v-model="form.calculation" value="Noncommon" label="非普通住宅"></mu-radio>
            <mu-radio v-model="form.calculation" value="Affordable" label="经济适用房"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="firstbuy" label="首次购房：" >
            <mu-radio v-model="form.firstbuy" value="true" label="是"></mu-radio>
            <mu-radio v-model="form.firstbuy" value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="only" label="卖房者唯一住房：" >
            <mu-radio v-model="form.only" value="true" label="是"></mu-radio>
            <mu-radio v-model="form.only" value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="region" label="房产证年限：" :rules="regionRules">
            <mu-select v-model="form.region">
              <mu-option v-for="(option, index) in region" :key="index" :label="option.option" :value="option.value"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item label="房屋建筑面积：" prop="acreage" :rules="acreageRules">
            <mu-text-field type="number" v-model="form.acreage" prop="acreage" suffix="平米"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="房屋总价：" prop="amount" :rules="amountRules">
            <mu-text-field type="number" v-model="form.amount" prop="amount" suffix="万元"></mu-text-field>
          </mu-form-item>
           <mu-form-item label="房屋原价：" prop="Tamount" :rules="TamountRules">
            <mu-text-field type="number" v-model="form.Tamount" prop="Tamount" suffix="万元"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="rate" label="年利率：" :rules="rateRules">
              <mu-select v-model="form.rate">
                <mu-option  v-for="(option, index) in rate" :key="index" :label="option.option" :value="option.value"></mu-option>
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
      <mu-flex class="flex-wrapper chen" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>合计：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>99999元</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>契税：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>99999元</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" style="font-size:12px;" fill>买方缴纳，双方另有约定除外</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>增值税：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>99999元</mu-flex>
        <mu-flex class="flex-demo" justify-content="center"  style="font-size:12px;" fill>卖方缴纳，双方另有约定除外</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>个人所得税：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>99999元</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>卖方缴纳，双方另有约定除外</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>印花税：</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill> </mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>5元</mu-flex>
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
      title: '营改增税费计算器',
      region: [
        {option: '2年以内', value: 2},
        {option: '2-5年（不含5年）', value: 10},
        {option: '5年及以上', value: 15}
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
      Pmethod: [
        {option: '一次性还清', value: 1},
        {option: '部分提前还清', value: 2}
      ],
      handling: [
        {option: '减少月还款额,贷款期限不变', value: 1},
        {option: '缩短还款年限,月还款基本不变', value: 2}
      ],
      amountRules: [
        {validate: (val) => !!val, message: '必须输入房屋总价'}
      ],
      acreageRules: [
        {validate: (val) => !!val, message: '必须输入面积'}
      ],
      TamountRules: [
        {validate: (val) => !!val, message: '必须输入房屋原价'}
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
        calculation: 'Average',
        firstbuy: 'false',
        only: 'false',
        amount: '',
        Tamount: '',
        region: '',
        rate: '',
        firstDate: undefined,
        nextDate: undefined,
        Pmethod: '',
        handling: ''
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
    }
    .flex-wrapper{
      width: 100%;
      height: 1.3333rem;
      border-bottom: 1px solid #ebebeb;
      font-size: 0.3733rem;
      color: #4c4c4c;
      .flex-demo{
        width: 33%;
        border-right: 1px solid #ebebeb;
      }
    }
    .chen{
      background-color: #facaaa;
      .flex-demo{
        border-right: 0px;
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
