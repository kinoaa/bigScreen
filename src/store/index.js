import Vue from 'vue'
import Vuex from 'vuex'
import {
  overallData,
  annualData,
  categoryData,
  completionData,
  dailyData,
  starProduct,
  flowData
} from '@/assets/data/appData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    updateTime: '',
    overall: null,
    dailySales: null,
    annualSales: null,
    categorySales: null,
    completion: null,
    flowDirection: null,
    starProduct: null
  },
  mutations: {
    updateLoading (state) {
      state.loading = false
    },
    updateOverall (state, payload) {
      state.overall = payload
    },
    updateTime (state, payload) {
      state.updateTime = payload
    },
    updateDailySales (state, payload) {
      state.dailySales = payload
    },
    updateAnnualSales (state, payload) {
      state.annualSales = payload
    },
    updateCategorySales (state, payload) {
      state.categorySales = payload
    },
    updateCompletion (state, payload) {
      state.completion = payload
    },
    updateFlowDirection (state, payload) {
      state.flowDirection = payload
    },
    updateStarProduct (state, payload) {
      state.starProduct = payload
    }
  },
  actions: {
    updateAll (context) {
      setTimeout(() => { // 模拟成功请求接口数据
        // 数据变化
        overallData.totalSales += 10
        annualData[8].spring += 5
        categoryData[0].value += 6
        completionData.sales += 0.01
        dailyData[5].value += 1
        flowData[6].value += 1000
        starProduct.forEach((item) => {
          item.sales += 200
        })
        // 更新state
        const time = new Date()
        context.commit('updateLoading', false)
        context.commit('updateTime', time)
        context.commit('updateOverall', JSON.parse(JSON.stringify(overallData)))
        context.commit('updateDailySales', JSON.parse(JSON.stringify(dailyData)))
        context.commit('updateAnnualSales', JSON.parse(JSON.stringify(annualData)))
        context.commit('updateCategorySales', JSON.parse(JSON.stringify(categoryData)))
        context.commit('updateCompletion', JSON.parse(JSON.stringify(completionData)))
        context.commit('updateFlowDirection', JSON.parse(JSON.stringify(flowData)))
        context.commit('updateStarProduct', JSON.parse(JSON.stringify(starProduct)))
      }, 1000)
    }
  },
  modules: {
  }
})
