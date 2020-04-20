<template>
  <Container :backdrop="true" position="top">
    <div class="wipe" v-for="type in types" :key="type">
      <div class="count">{{ getWipeCount(type) }}</div>
      <div>x</div>
      <div class="image" :class="getClassByType(type)"></div>
    </div>
  </Container>
</template>

<script>
import Container from './Container'

export default {
  name: 'Wipes',
  props: ['wipes'],
  components: { Container },
  data () {
    return {
      types: ['0', '1', '2']
    }
  },
  methods: {
    getWipeCount (type) {
      if (this.wipes && this.wipes.length > 0) {
        const wipe = this.wipes.find(wipe => wipe.type === type)
        if (wipe) return wipe.count
      }
      return 0
    },
    getClassByType (type) {
      switch (type) {
        case '0':
          return 'fleck'
        case '1':
          return 'geschirr'
        default:
          return 'kotze';
      }
    }
  }
}
</script>

<style scoped lang="less">
  .wipe {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      margin: 0 3px;
      font-size: 20px;
    }

    .count {
      width: 30px;
      text-align: right;
    }

    .image {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      &.fleck {
        width: 60px;
        height: 30px;
        background-image: url(../assets/fleck.png);
      }
      &.geschirr {
        width: 90px;
        height: 40px;
        background-image: url(../assets/geschirr.png);
      }
      &.kotze {
        width: 100px;
        height: 40px;
        background-image: url(../assets/kotze.png);
      }
    }
  }
</style>