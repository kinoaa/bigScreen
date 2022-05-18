<template>
  <box>
    <div class="items">
      <div>
        <p>累计销售额</p>
        <p>
          <count-to :startVal="startVal.totalSales"
                    :endVal="overall.totalSales"
                    :duration="3000"
                    prefix="¥"></count-to>
        </p>
      </div>
      <div>
        <p>今日销售额</p>
        <p>
          <count-to :startVal="startVal.todaySales"
                    :endVal="overall.todaySales"
                    :duration="3000"
                    prefix="¥"></count-to>
        </p>
      </div>
    </div>
    <div class="items">
      <div>
        <p>累计订单量</p>
        <p>
          <count-to :startVal="startVal.totalOrders"
                    :endVal="overall.totalOrders"
                    :duration="3000"></count-to>
        </p>
      </div>
      <div>
        <p>今日订单量</p>
        <p>
          <count-to :startVal="startVal.todayOrders"
                    :endVal="overall.todayOrders"
                    :duration="3000"></count-to>
        </p>
      </div>
    </div>
  </box>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  data () {
    return {
      startVal: {
        totalSales: 0,
        todaySales: 0,
        totalOrders: 0,
        todayOrders: 0
      }
    }
  },
  computed: {
    overall () {
      return this.$store.state.overall
    }
  },
  watch: {
    overall: {
      handler (oldVal, newVal) {
        this.startVal = oldVal
      },
      deep: true
    }
  },
  components: {
    CountTo
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/variable.scss";
.items{
  display: flex;
  &:last-child{
    margin-top: 50px;
  }
  &>div:first-child{
    width: 60%;
  }
  p:first-child{
    color: $blue-font;
    font-size: 32px;
  }
  p:last-child{
    color: $green-font;
    font-size: 70px;
    margin-top: 6px;
  }
}
</style>
