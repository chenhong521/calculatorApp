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
          <mu-form-item prop="radio" label="计算方式：" >
            <mu-radio v-model="form.radio" value="lines" label="按贷款额度"></mu-radio>
            <mu-radio v-model="form.radio" value="area" label="按面积"></mu-radio>
          </mu-form-item>
          <div v-if="form.radio==='lines'">
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
          </div>
          <div v-if="form.radio==='area'">
            <mu-form-item label="平米单价：" prop="unitprice" :rules="unitpriceRules">
              <mu-text-field type="number" v-model="form.unitprice" prop="unitprice" suffix="元/平米"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="面积：" prop="acreage" :rules="acreageRules">
              <mu-text-field type="number" v-model="form.acreage" prop="acreage" suffix="平米"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="property" label="首付：" :rules="propertyRules">
              <mu-select v-model="form.property">
                <mu-option v-for="(option, index) in property" :key="index" :label="option.option" :value="option.value"></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item prop="region" label="贷款期限：" :rules="regionRules">
              <mu-select v-model="form.region">
                <mu-option v-for="(option, index) in region" :key="index" :label="option.option" :value="option.value"></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item prop="rate" label="年利率：" >
              <mu-select v-model="form.rate" @change="change">
                <mu-option  v-for="(option, index) in rate" :key="index" :label="option.option" :value="option.value"></mu-option>
              </mu-select>
            </mu-form-item>
            <mu-form-item label="输入年利率：">
              <mu-text-field style="font-size:12px;" v-model="form.srate" placeholder="若手动输入则按手动输入值计算" prop="srate" type="number" suffix="%"></mu-text-field>
            </mu-form-item>
          </div>
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
        <li class="item"><span>贷款总额：</span><span class="right">{{resultForm.resultEd}}元</span></li>
        <li class="item"><span>还款月数：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
        <li class="item"><span>每月还款：</span><span class="right">{{resultForm.resultRepayment}}元</span></li>
        <li class="item"><span>总支付利息：</span><span class="right">{{resultForm.Totalinterestpayments}}元</span></li>
        <li class="item"><span>本息合计：</span><span class="right">{{resultForm.total}}元</span></li>
      </ul>
      <ul class="resultList">
        <li class="listTitle">逐月递减还款(等额本金)</li>
        <li class="item"><span>贷款总额：</span><span class="right">{{resultForm.resultEd}}元</span></li>
        <li class="item"><span>还款月数：</span><span class="right">{{resultForm.resultRegion}}月</span></li>
        <li class="item"><span>首月还款：</span><span class="right">{{resultForm.resultOneRepayment}}元</span></li>
         <li class="item"><span>每月递减：</span><span class="right">{{resultForm.descending}}元</span></li>
        <li class="item"><span>总支付利息：</span><span class="right">{{resultForm.Totalinterestpayments2}}元</span></li>
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
      title: '公积金贷款计算器',
      region: [
        {option: '5年', value: 5},
        {option: '10年', value: 10},
        {option: '15年', value: 15},
        {option: '20年', value: 20},
        {option: '25年', value: 25},
        {option: '30年', value: 30}
      ],
      rate: [
        {option: '公积金基准利率(3.25%)', value: 0.0325},
        {option: '公积金基准利率1.1倍(3.58%)', value: 0.0358},
        {option: '公积金基准利率1.2倍(3.90%)', value: 0.0390}
      ],
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
      amountRules: [
        {validate: (val) => !!val, message: '必须输入贷款金额'}
      ],
      unitpriceRules: [
        {validate: (val) => !!val, message: '必须输入单价'}
      ],
      regionRules: [
        {validate: (val) => !!val, message: '必须选择贷款期限'}
      ],
      rateRules: [
        {validate: (val) => !!val, message: '必须选择年利率'}
      ],
      acreageRules: [
        {validate: (val) => !!val, message: '必须输入面积'}
      ],
      propertyRules: [
        {validate: (val) => !!val, message: '必须选择首付'}
      ],
      form: {
        radio: 'lines',
        amount: '',
        region: '',
        rate: '公积金基准利率(3.25%)',
        unitprice: '',
        acreage: '',
        property: '',
        srate: ''
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
      // 计算器计算函数
      this.$refs.form.validate().then((res) => {
        // 验证表单结果 返回false则停止计算 返回
        if (res === false) {
          return false
        } else {
          var result = this.$refs.form.model
          if (result.radio === 'lines') {
            this.resultForm.resultEd = result.amount * 10000
            this.resultForm.resultRegion = parseInt(result.region) * 12
            // 月利率
            if (result.rate === '公积金基准利率(3.25%)' && result.srate === '') {
              // 月利率
              this.resultForm.resultRate = parseFloat(0.0325) / 12
            } else if (result.srate !== '' && result.rate !== '') {
              this.resultForm.resultRate = parseFloat(result.srate) / 100 / 12
            } else if (result.rate !== '公积金基准利率(3.25%)' && result.srate === '') {
              this.resultForm.resultRate = parseFloat(result.rate) / 12
            }
            // 次方数
            var pow = Math.pow((1 + this.resultForm.resultRate), this.resultForm.resultRegion)
            // 除数
            var divisor = this.resultForm.resultEd * this.resultForm.resultRate * pow
            // 被除数
            var dividend = pow - 1
            // 每月还款
            this.resultForm.resultRepayment = parseFloat((divisor / dividend).toFixed(2))
            var repayment = parseFloat(divisor / dividend)
            // 总支付利息
            this.resultForm.Totalinterestpayments = parseFloat((repayment * this.resultForm.resultRegion - this.resultForm.resultEd).toFixed(2))
            // 总计
            this.resultForm.total = parseFloat((repayment * this.resultForm.resultRegion).toFixed(2))
            // 首月还款
            this.resultForm.resultOneRepayment = parseFloat(((this.resultForm.resultEd / this.resultForm.resultRegion) + (this.resultForm.resultEd * this.resultForm.resultRate)).toFixed(2))
            // 每月月供递减额
            this.resultForm.descending = parseFloat((this.resultForm.resultEd / this.resultForm.resultRegion * this.resultForm.resultRate).toFixed(2))
            // 等额本金总利息
            this.resultForm.Totalinterestpayments2 = parseFloat((((this.resultForm.resultEd / this.resultForm.resultRegion + this.resultForm.resultEd * this.resultForm.resultRate) + this.resultForm.resultEd / this.resultForm.resultRegion * (1 + this.resultForm.resultRate)) / 2 * this.resultForm.resultRegion - this.resultForm.resultEd).toFixed(2))
            // 等额本金总计
            this.resultForm.total2 = parseFloat((((this.resultForm.resultEd / this.resultForm.resultRegion + this.resultForm.resultEd * this.resultForm.resultRate) + this.resultForm.resultEd / this.resultForm.resultRegion * (1 + this.resultForm.resultRate)) / 2 * this.resultForm.resultRegion).toFixed(2))
          } else {
            var result2 = this.$refs.form.model
            this.resultForm.resultEd = ((result2.unitprice * result2.acreage) - (result2.unitprice * result2.acreage * result2.property)).toFixed(2)
            this.resultForm.resultRegion = parseInt(result.region) * 12
            // 月利率
            if (result.rate === '公积金基准利率(3.25%)' && result.srate === '') {
              // 月利率
              console.log(1)
              this.resultForm.resultRate = parseFloat(0.0325) / 12
            } else if (result.srate !== '' && result.rate !== '') {
              this.resultForm.resultRate = parseFloat(result.srate) / 100 / 12
              console.log(2)
            } else if (result.rate !== '公积金基准利率(3.25%)' && result.srate === '') {
              this.resultForm.resultRate = parseFloat(result.rate) / 12
              console.log(3)
            }
            var pow2 = Math.pow((1 + this.resultForm.resultRate), this.resultForm.resultRegion)
            // 除数
            var divisor2 = this.resultForm.resultEd * this.resultForm.resultRate * pow2
            // 被除数
            var dividend2 = pow2 - 1
            // 每月还款
            this.resultForm.resultRepayment = parseFloat((divisor2 / dividend2).toFixed(2))
            var repayment2 = parseFloat(divisor2 / dividend2)
            // 总支付利息
            this.resultForm.Totalinterestpayments = parseFloat((repayment2 * this.resultForm.resultRegion - this.resultForm.resultEd).toFixed(2))
            // 总计
            this.resultForm.total = parseFloat((repayment2 * this.resultForm.resultRegion).toFixed(2))
            // 首月还款
            this.resultForm.resultOneRepayment = parseFloat(((this.resultForm.resultEd / this.resultForm.resultRegion) + (this.resultForm.resultEd * this.resultForm.resultRate)).toFixed(2))
            // 每月月供递减额
            this.resultForm.descending = parseFloat((this.resultForm.resultEd / this.resultForm.resultRegion * this.resultForm.resultRate).toFixed(2))
            // 等额本金总利息
            this.resultForm.Totalinterestpayments2 = parseFloat((((this.resultForm.resultEd / this.resultForm.resultRegion + this.resultForm.resultEd * this.resultForm.resultRate) + this.resultForm.resultEd / this.resultForm.resultRegion * (1 + this.resultForm.resultRate)) / 2 * this.resultForm.resultRegion - this.resultForm.resultEd).toFixed(2))
            // 等额本金总计
            this.resultForm.total2 = parseFloat((((this.resultForm.resultEd / this.resultForm.resultRegion + this.resultForm.resultEd * this.resultForm.resultRate) + this.resultForm.resultEd / this.resultForm.resultRegion * (1 + this.resultForm.resultRate)) / 2 * this.resultForm.resultRegion).toFixed(2))
          }
        }
      })
    },
    clear () {
      // 重置输入内容
      this.$refs.form.clear()
      this.form = {
        radio: 'lines',
        amount: '',
        region: '',
        rate: '公积金基准利率(3.25%)',
        unitprice: '',
        acreage: '',
        property: '',
        srate: ''
      }
      this.resultForm = {
        resultEd: 0,
        resultRegion: 0,
        resultRepayment: 0,
        Totalinterestpayments: 0,
        total: 0
      }
    },
    change () {
      // 如何年利率值改变则清空手动输入值
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
