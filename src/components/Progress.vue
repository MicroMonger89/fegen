<template>
  <div class="progressbar">
    <div class="label">{{ label }}:</div>
    <div class="outer" :class="{ full: value === 100 }">
      <div class="inner" :style="{ width: value + '%', background: color }"></div>
      <span v-if="indicator" class="indicator" :style="{ left: indicatorPosition + 'px' }"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: ['label', 'value', 'color', 'indicator'],
  computed: {
    indicatorPosition () {
      return this.indicator * 4 - 2
    }
  }
}
</script>

<style scoped lang="less">
  .progressbar {
    & > div {
      display: inline-block;
    }

    .label {
      width: 60px;
      margin-right: 10px;
      text-align: right;
    }

    .outer {
      transition: box-shadow .1s ease-out;
      position: relative;
      border-radius: 4px;
      width: 400px;
      height: 10px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px 1px rgba(black, .1);
      &.full {
        box-shadow: inset 0 2px 4px 1px rgba(black, .1), 0 0 5px 3px red;
      }
    }

    .inner {
      transition: width .3s ease-out;
      box-shadow: inset 0 2px 4px 1px rgba(black, .1);
      height: 100%;
      border-radius: 4px;
    }

    .indicator {
      transition: left .3s ease-out;
      position: absolute;
      top: -3px;
      width: 4px;
      border-radius: 4px;
      height: 16px;
      background: red;
    }
  }
</style>