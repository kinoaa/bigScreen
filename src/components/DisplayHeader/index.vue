<template>
  <div class="display-header">
    <span class="sub">数据更新于：{{ time }}</span>
    <span class="title">2020XXX交易会实时销售数据可视化平台</span>
    <span class="sub full-screen" @click="toggleScreen">{{ operationText }}</span>
  </div>
</template>
<script>
let timer
export default {
  data () {
    return {
      isFullScreen: false
    }
  },
  computed: {
    operationText () {
      return this.isFullScreen ? '退出' : '全屏'
    },
    time () {
      const t = this.$store.state.updateTime
      return `${t.toLocaleDateString()} ${t.toLocaleTimeString()}`
    }
  },
  methods: {
    toggleScreen () {
      const main = document.body
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    },
    changeFullScreenStatus () {
      this.isFullScreen = !this.isFullScreen
    }
  },
  mounted () {
    if (document.body.requestFullscreen) {
      document.addEventListener('fullscreenchange', this.changeFullScreenStatus)
    } else if (document.body.msRequestFullscreen) {
      document.addEventListener('MSFullscreenChange', this.changeFullScreenStatus)
    }
  },
  destroyed () {
    clearInterval(timer)
    if (document.body.requestFullscreen) {
      document.removeEventListener('fullscreenchange', this.changeFullScreenStatus)
    } else if (document.body.msRequestFullscreen) {
      document.removeEventListener('MSFullscreenChange', this.changeFullScreenStatus)
    }
  }
}
</script>
<style lang="scss" scoped>
.display-header{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  .title{
    font-size: 60px;
    color: #fff;
    letter-spacing: .1em;
  }
  .sub{
    width: 1000px;
    color: rgba(255,255,255,.3);
  }
  .full-screen{
    cursor: pointer;
    position: relative;
    text-align: right;
    &:before{
      content: '';
      position: absolute;
      top: -20px;
      bottom: -20px;
      left: -20px;
      right: -20px;
    }
  }
}
</style>
