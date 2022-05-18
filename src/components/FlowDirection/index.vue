<template>
  <box>
    <div v-if="!ready">loading map...</div>
    <vue-echarts v-else :options="chartOption" />
  </box>
</template>
<script>
import map from '@/assets/data/map'
import * as echarts from 'echarts/core'
const flowOpt = {
  title: {
    text: '产品流向分布',
    textStyle: {
      color: '#fff',
      fontSize: 40
    },
    left: 50,
    top: 50
  },
  visualMap: {
    show: false,
    min: 0,
    max: 10000,
    seriesIndex: [0],
    inRange: {
      color: ['#a7d5f2', '#3f95ff', '#5470c6']
    }
  },
  geo: {
    map: 'china',
    zoom: 1.6,
    center: [104.114129, 36.050339],
    itemStyle: {
      borderColor: 'blue',
      borderWidth: 2
    }
  },
  series: [
    {
      name: '产品流向分布',
      type: 'map',
      map: 'china',
      zoom: 1.6,
      center: [104.114129, 36.050339],
      itemStyle: {
        borderColor: 'blue',
        borderWidth: 2
      }
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      symbolSize: function (val) {
        return val[2] / 200
      },
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        show: true,
        position: ['20', '0'],
        formatter: '{b}',
        fontSize: 16
      },
      itemStyle: {
        color: 'yellow'
      }
    }
  ]
}
export default {
  data () {
    return {
      ready: false
    }
  },
  methods: {
    genScatterData (flowData) {
      return flowData.map((item) => {
        return {
          name: item.name,
          value: this.mapData[item.name].concat(item.value)
        }
      })
    },
    genMapData (originData) {
      const mapData = Object.create(null)
      originData.forEach((item) => {
        mapData[item.properties.name] = item.properties.center
      })
      return mapData
    }
  },
  computed: {
    chartOption () {
      const flowData = this.$store.state.flowDirection
      const scatterData = this.genScatterData(flowData)
      flowOpt.geo.data = flowData
      flowOpt.series[0].data = flowData
      flowOpt.series[1].data = scatterData
      return Object.assign({}, flowOpt)
    }
  },
  created () {
    setTimeout(() => {
      echarts.registerMap('china', map)// 自定义扩展图表类型，map数据一般也从接口请求
      this.ready = true
      this.mapData = this.genMapData(map.features)
    }, 1000)
  }
}
</script>
<style lang="scss" scoped></style>
