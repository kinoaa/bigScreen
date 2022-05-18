<template>
  <box>
    <vue-echarts :options="chartOption" />
  </box>
</template>
<script>
const dailyOpt = {
  title: {
    text: '每日销售额',
    textStyle: {
      color: '#fff',
      fontSize: 40
    },
    left: 20,
    top: 20
  },
  grid: {
    top: 120,
    bottom: 50,
    left: 50,
    right: 50
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      fontSize: 24,
      color: '#fff'
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    offset: 10
  },
  yAxis: {
    axisLabel: {
      fontSize: 20,
      color: '#fff'
    },
    splitLine: {
      lineStyle: {
        type: 'dotted'
      }
    }
  },
  series: [
    {
      type: 'bar',
      data: [45, 36, 56, 50, 60, 80, 100],
      barWidth: '45%',
      itemStyle: {
        color: '#3398db'
      }
    }
  ]
}
export default {
  computed: {
    chartOption () {
      const dailySales = this.$store.state.dailySales
      const names = []
      const values = []
      dailySales.forEach((item) => {
        names.push(item.name)
        values.push(item.value)
      })
      dailyOpt.xAxis.data = names
      dailyOpt.series[0].data = values
      return Object.assign({}, dailyOpt)
    }
  }
}
</script>
<style lang="scss" scoped></style>
