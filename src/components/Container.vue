<template>
  <div class="outer">
    <div class="inner" :class="{ backdrop, padding, top: position === 'top', bottom: position === 'bottom'}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: ['backdrop', 'position', 'padding']
}
</script>

<style scoped lang="less">
  .outer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inner {
    width: 100%;
    height: 100%;
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.backdrop {
      background: #F2E6D8;
      box-shadow: 0 0 5px 2px rgba(black, .5);
    }

    &.top {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    &.bottom {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &.padding {
      padding: 20px;
    }
  }
</style>