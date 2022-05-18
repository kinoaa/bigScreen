<template>
  <div class="box">
    <slot></slot>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import "@/scss/variable.scss";
.box{
  height: 100%;
  width: 100%;
  padding: 30px;
  color: $white-font;
  // background: hsla(240,50%,35%,0.3);
  background: #0e1528
}
</style>
