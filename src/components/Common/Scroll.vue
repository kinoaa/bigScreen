<template>
<div class="scroll">
  <div class="scroll-header"
        :style="{
          height : headerConfig.headerHeight + 'px',
          background: headerConfig.headerBackground,
        }">
    <div class="scroll-header-item"
         v-for="(item, index) in headerConfig.headerItems"
         :key = "'scroll-header-item' + index"
         :style="{
           width: averageWidth + 'px',
           ... headerConfig.headerStyle[index]
         }">
         {{item}}</div>
  </div>
  <div class="scroll-content" ref="scrollContent">
    <div v-for="(item, index) in rowsData"
         :key = "item.index"
         :style = "{
           height: rowHeights[index] + 'px',
           background: item.index % 2 === 0 ? rowBackground[0] : rowBackground[1]
          }"
         class="scroll-content-li">
      <div v-for="( k, i ) in Object.keys(item.data)"
           :key = "'scroll-content-li' + i"
           class="scroll-content-li-item"
           :style="{
             width: headerConfig.headerStyle[i].width ? headerConfig.headerStyle[i].width : averageWidth + 'px',
            }">{{item.data[k]}}</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'scroll',
  props: {
    header: {
      type: Object,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    rowBackground: {
      type: Array,
      default: function () {
        return ['hsl(207deg 84% 51% / 8%)', 'transparent']
      }
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      headerConfig: null,
      averageWidth: 0,
      rowHeight: 0,
      currentIndex: 0,
      rowsx: null,
      rowsData: null,
      step: 1,
      rowHeights: new Array(this.rows.length).fill(0)
    }
  },
  watch: {
    rows: {
      handler (newValue, oldValue) {
        this.handleRowData()
        const index = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentIndex
        const temp = this.rowsx.slice(index)
        temp.push(...this.rowsx.slice(0, index))
        this.rowsData = temp
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.animation()
        }, this.duration)
      },
      deep: true
    }
  },
  methods: {
    handleRowData () {
      let temp = this.rows.slice()
      if (this.rows.length > this.capacity) {
        temp = this.rows.slice().concat(this.rows.slice())
      }
      this.rowsx = temp.map((item, index) => {
        return {
          data: item,
          index: index
        }
      })
      this.rowsData = this.rowsx.slice()
    },
    setConfig () {
      const headerConfigDefault = {
        headerItems: [],
        headerBackground: 'transparent',
        headerHeight: 60,
        headerStyle: []
      }
      this.headerConfig = Object.assign(headerConfigDefault, this.header)
      this.handleRowData()
    },
    setHeaderWidth () {
      const width = this.$el.clientWidth
      let fixedWidth = 0
      let n = 0
      this.headerConfig.headerStyle.forEach(item => {
        if (item.width) {
          fixedWidth += parseInt(item.width)
          n++
        }
      })
      this.averageWidth = (width - fixedWidth) / (this.header.headerItems.length - n)
    },
    animation () {
      clearTimeout(this.timer)
      const len = this.rowsx.length
      if (len <= this.capacity) return
      const temp = this.rowsx.slice(this.currentIndex)
      temp.push(...this.rowsx.slice(0, this.currentIndex))
      this.rowHeights = new Array(len).fill(this.rowHeight)
      this.rowHeights.splice(0, this.step, ...new Array(this.step).fill(0))
      this.rowsData = temp
      this.currentIndex += this.step

      const isLast = this.currentIndex - len
      if (isLast >= 0) this.currentIndex = isLast

      this.timer = setTimeout(() => {
        this.animation()
      }, this.duration)
    },
    setContentHeight () {
      const height = this.$el.clientHeight
      const h = height - this.headerConfig.headerHeight
      this.$refs.scrollContent.style.height = h + 'px'
      const min = Math.min(this.rows.length, this.capacity)
      this.rowHeight = h / min
      this.rowHeights = new Array(min).fill(this.rowHeight)
    }
  },
  created () {
    if (!this.header.headerItems || this.header.headerItems.length === 0) return
    this.setConfig()
    this.$nextTick(() => {
      this.setHeaderWidth()
      this.setContentHeight()
      this.timer = setTimeout(() => {
        this.animation()
      }, this.duration)
    })
  }
}
</script>
<style lang="scss" scoped>
.scroll{
  height: 100%;
  width: 100%;
  text-align: center;
  &-header{
    display: flex;
    align-items: center;
    &-item{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &-content{
    overflow: hidden;
    &-li{
      display: flex;
      align-items: center;
      overflow: hidden;
      transition: all 0.3s linear;
      &-item{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
        padding:0 10px;
      }
    }
  }
}
</style>
