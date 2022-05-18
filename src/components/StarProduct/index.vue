<template>
  <box>
    <div class="star-product">
      <div class="title">明星产品销售概况</div>
      <div class="list">
        <scroll :header = "header"
                :rows = "list"
                :duration = "duration"
                :capacity = "6"></scroll>
      </div>
    </div>
  </box>
</template>
<script>
import Scroll from '@/components/Common/Scroll'
export default {
  components: {
    Scroll
  },
  data () {
    return {
      header: {
        headerItems: ['产品', '销售额', '订单量'],
        headerHeight: 140,
        headerStyle: [
          {
            fontSize: '45px'
          },
          {
            width: '260px',
            fontSize: '45px'
          },
          {
            width: '260px',
            fontSize: '45px'
          }
        ]
      },
      rowBg: ['red', 'green'],
      duration: 3000
    }
  },
  computed: {
    list () {
      return this.$store.state.starProduct
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/variable.scss";
.star-product{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .title{
    height: 100px;
    font-size: 40px;
    font-weight: bold;
  }
  .list{
    flex: 1;
    width: 100%;
    font-size: 36px;
  }
}
</style>
