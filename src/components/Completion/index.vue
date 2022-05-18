<template>
  <box>
    <div class="completion">
      <div class="part">
        <div class="chart">
          <vue-echarts :options="chartOption[0]" />
        </div>
        <div class="title">销售额完成率</div>
      </div>
      <div class="part">
        <div class="chart">
          <vue-echarts :options="chartOption[1]" />
        </div>
        <div class="title">订单量完成率</div>
      </div>
    </div>
  </box>
</template>
<script>
const chartOpt1 = {
  title: {
    text: '70%',
    textStyle: {
      color: '#fff',
      fontSize: 30
    },
    left: 180,
    top: 180
  },
  series: [
    {
      type: 'pie',
      data: [
        { value: 70, name: '完成' },
        { value: 30, name: '未完成' }
      ],
      label: false,
      radius: ['47%', '55%'],
      color: ['#3db7f0', '#0c4057']
    }
  ]
}
const chartOpt2 = {
  title: {
    text: '65%',
    textStyle: {
      color: '#fff',
      fontSize: 30
    },
    left: 180,
    top: 180
  },
  series: [
    {
      type: 'pie',
      data: [
        { value: 65, name: '完成' },
        { value: 35, name: '未完成' }
      ],
      label: false,
      radius: ['47%', '55%'],
      color: ['#ea8d05', '#636457']
    }
  ]
}
export default {
  computed: {
    chartOption () {
      const completion = this.$store.state.completion
      chartOpt1.title.text = parseInt(completion.sales * 100) + '%'
      chartOpt1.series[0].data = [
        {
          value: completion.sales,
          name: '完成'
        },
        {
          value: 1 - completion.sales,
          name: '未完成'
        }
      ]

      chartOpt2.title.text = parseInt(completion.order * 100) + '%'
      chartOpt2.series[0].data = [
        {
          value: completion.order,
          name: '完成'
        },
        {
          value: 1 - completion.order,
          name: '未完成'
        }
      ]
      return [Object.assign({}, chartOpt1), Object.assign({}, chartOpt2)]
    }
  }
}
</script>
<style lang="scss" scoped>
  .completion{
    display: flex;
    height: 100%;
    .part{
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      .title{
        height: 50px;
        font-size: 32px;
        font-weight: bold;
      }
      .chart{
        width: 100%;
        min-height: 100px;
        flex: 1;
      }
    }
  }
</style>
