<template>
  <Container :backdrop="true" position="top">
    <div class="wipe" v-for="wipe in wipes" :key="wipe.type">
      <div class="count">{{ wipe.count }}</div>
      <div>x</div>
      <div class="image" :class="getClassByType(wipe.type)"></div>
    </div>
  </Container>
</template>

<script>
import Container from './Container'

export default {
  name: 'Wipes',
  props: ['wipes'],
  components: { Container },
  methods: {
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