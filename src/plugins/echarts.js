import * as echarts from 'echarts/core'

import {
  BarChart,
  PieChart,
  MapChart,
  EffectScatterChart,
  LineChart
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  GeoComponent,
  LegendComponent
} from 'echarts/components'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  PieChart,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  EffectScatterChart,
  LineChart,
  LegendComponent
])
