<template>
  <box>
    <vue-echarts :options="chartOption" />
  </box>
</template>
<script>
const annualOpt = {
  title: {
    text: '各年度销售额',
    textStyle: {
      color: '#fff',
      fontSize: 40
    },
    left: 30,
    top: 20
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 20,
    right: 70,
    icon: 'rect',
    textStyle: {
      fontSize: 20,
      color: '#fff'
    },
    data: ['春季', '秋季']
  },
  grid: {
    top: 120,
    bottom: 50,
    left: 100,
    right: 70
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    offset: 15,
    nameLocation: 'center',
    axisLabel: {
      fontSize: 24,
      color: '#fff'
    }
  },
  yAxis: {
    type: 'value',
    scale: true,
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    axisLabel: {
      fontSize: 20
    },
    splitLine: {
      lineStyle: {
        type: 'dotted'
      }
    }
  },
  series: [
    {
      name: '春季',
      type: 'line',
      smooth: true
    },
    {
      name: '秋季',
      type: 'line',
      smooth: true
    }
  ]
}
export default {
  computed: {
    chartOption () {
      const annualSales = this.$store.state.annualSales
      const year = []
      const spring = []
      const fall = []
      annualSales.forEach((item) => {
        year.push(item.year)
        spring.push(item.spring)
        fall.push(item.fall)
      })
      annualOpt.xAxis.data = year
      annualOpt.series[0].data = spring
      annualOpt.series[1].data = fall
      return Object.assign({}, annualOpt)
    }
  }
}
</script>
<style lang="scss" scoped></style>
