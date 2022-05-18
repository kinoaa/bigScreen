<template>
  <div class="echarts"></div>
</template>
<script>
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([CanvasRenderer])
export default {
  name: 'vue-echarts',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  watch: {
    options (newValue, oldValue) {
      if (this.chart && newValue) {
        this.chart.setOption(newValue)
      }
    }
  },
  methods: {
    init (opt) {
      if (!this.chart) {
        this.chart = echarts.init(this.$el)
      }
      this.chart.setOption(this.options)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
