<template>
  <box>
    <vue-echarts :options="chartOption" />
  </box>
</template>
<script>
const colors = ['#e8d6b5', '#9fdfa1', '#75b1e7', '#9a82e6', '#ec9399', '#ecac7e']
const categoryOpt = {
  title: {
    text: '各品类销售额占比',
    textStyle: {
      color: '#fff',
      fontSize: 40
    },
    left: 30,
    top: 20
  },
  series: [
    {
      type: 'pie',
      color: colors,
      roseType: 'radius',
      top: 100,
      height: '80%',
      label: {
        color: '#fff',
        fontSize: 24,
        lineHeight: 40,
        formatter: function (params) {
          return params.name + '\n' + params.percent + '%'
        }
      },
      labelLine: {
        length: 10,
        length2: 8,
        smooth: true
      }
    }
  ]
}
export default {
  computed: {
    chartOption () {
      const categorySales = this.$store.state.categorySales
      categoryOpt.series[0].data = categorySales
      return Object.assign({}, categoryOpt)
    }
  }
}
</script>
<style lang="scss" scoped></style>
