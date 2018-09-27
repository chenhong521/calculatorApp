import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Housingloan from '@/pages/Housingloan/Housingloan'
import SecondHousingloan from '@/pages/SecondHousingloan/SecondHousingloan'
import Accumulation from '@/pages/Accumulation/Accumulation'
import Standard from '@/pages/Standard/Standard'
import Principal from '@/pages/Principal/Principal'
import Combination from '@/pages/Combination/Combination'
import Reimbursement from '@/pages/Reimbursement/Reimbursement'
import Carloans from '@/pages/Carloans/Carloans'
import Prepayment from '@/pages/Prepayment/Prepayment'
import Remaining from '@/pages/Remaining/Remaining'
import Camptotax from '@/pages/Camptotax/Camptotax'
import Shanghai from '@/pages/Shanghai/Shanghai'
import Propertytax from '@/pages/Propertytax/Propertytax'
import Chongqing from '@/pages/Chongqing/Chongqing'
import Interestrates from '@/pages/Interestrates/Interestrates'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/housingloan',
      component: Housingloan
    },
    {
      path: '/secondhousingloan',
      component: SecondHousingloan
    },
    {
      path: '/accumulation',
      component: Accumulation
    },
    {
      path: '/standard',
      component: Standard
    },
    {
      path: '/principal',
      component: Principal
    },
    {
      path: '/combination',
      component: Combination
    },
    {
      path: '/reimbursement',
      component: Reimbursement
    },
    {
      path: '/carloans',
      component: Carloans
    },
    {
      path: '/prepayment',
      component: Prepayment
    },
    {
      path: '/remaining',
      component: Remaining
    },
    {
      path: '/camptotax',
      component: Camptotax
    },
    {
      path: '/shanghai',
      component: Shanghai
    },
    {
      path: '/propertytax',
      component: Propertytax
    },
    {
      path: '/chongqing',
      component: Chongqing
    },
    {
      path: '/interestrates',
      component: Interestrates
    }
  ]
})
