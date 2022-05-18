<template>
  <Frame :width="3840" :height="2160" bgColor="#03050c">
    <div v-if="isLoading" class="loading">loading...</div>
    <div v-else class="container">
      <div class="header">
        <display-header />
      </div>
      <div class="content">
        <div class="left">
          <div class="total">
            <overall />
          </div>
          <div class="daily">
            <daily-sales />
          </div>
          <div class="category">
            <category-sales />
          </div>
        </div>
        <div class="right">
          <div class="right-upper">
            <div class="flow">
              <flow-direction />
            </div>
            <div class="star-product">
              <star-product />
            </div>
          </div>
          <div class="right-down">
            <div class="annual-sales">
              <annual-sales />
            </div>
            <div class="completion">
              <Completion />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Frame>
</template>

<script>
import DisplayHeader from '@/components/DisplayHeader'
import Overall from '@/components/Overall'
import DailySales from '@/components/DailySales'
import CategorySales from '@/components/CategorySales'
import FlowDirection from '@/components/FlowDirection'
import StarProduct from '@/components/StarProduct'
import AnnualSales from '@/components/AnnualSales'
import Completion from '@/components/Completion'
import Frame from '@/components/Common/Frame'
export default {
  name: 'Home',
  components: {
    DisplayHeader,
    Overall,
    DailySales,
    CategorySales,
    FlowDirection,
    StarProduct,
    AnnualSales,
    Completion,
    Frame
  },
  computed: {
    isLoading () {
      return this.$store.state.loading
    }
  },
  created () {
    this.$store.dispatch('updateAll')
    setInterval(() => { // 更新数据的间隔时间
      this.$store.dispatch('updateAll')
    }, 5 * 3600 * 1000)
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/variable.scss";
.loading{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 50px;
}
.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  .header{
    height: 200px;
    margin: 0 40px;
    border-bottom: 4px solid rgba(255,255,255,.3)
  }
  .content{
    margin-top: $margin;
    flex: 1;
    display: flex;
    margin-left: $margin-around;
    .left{
      width: 800px;
      display: flex;
      flex-direction: column;
      .total{
        height: 400px;
      }
      .daily{
        margin-top: $margin;
        height: 600px;
      }
      .category{
        flex:1;
        min-height: 800px;
        margin: $margin 0 $margin-around;
      }
    }
    .right{
      margin-left: $margin;
      margin-right: $margin-around;
      flex: 1;
      display: flex;
      flex-direction: column;
      .right-upper{
        flex: 1;
        display: flex;
        .flow{
          width: 2000px;
        }
        .star-product{
          margin-left: $margin;
          flex: 1;
        }
      }
      .right-down{
        margin: $margin 0 $margin-around;
        height: 500px;
        display: flex;
        .annual-sales{
          width: 2000px;
        }
        .completion{
          flex: 1;
          margin-left: $margin;
        }
      }
    }
  }
}
</style>
