<template>
  <Container :backdrop="true" position="bottom">
    <div class="player" v-for="user in users" :key="user.id">
      <div class="image" :class="{ active: user.id === currentUser }" :id="user.id"></div>
      <p id="name">{{ user.id }}</p>
      <p id="punkte">{{ user.score }}</p>
    </div>
  </Container>
</template>

<script>
import Container from './Container'

export default {
  name: 'Top',
  props: ['users', 'currentUser'],
  components: { Container }
}
</script>

<style scoped lang="less">
  .player {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .image {
      width: 100px;
      height: 100px;
      border-radius: 100px;
      background-size: 105%;
      background-position: center;
      border: 4px solid #D9C8B4;
      box-shadow: 0 0 2px rgba(black, .3), 0 2px 4px rgba(black, .3);
      margin-bottom: 4px;

      &.active {
        border-color: yellowgreen;
      }

      &#arek {
        background-image: url(../assets/arek.png);
      }
      &#marvin {
        background-image: url(../assets/marvin.png);
      }
      &#michi {
        background-image: url(../assets/michi.png);
      }
      &#osman {
        background-image: url(../assets/osman.png);
      }
    }

    p {
      font-size: 18px;
      margin: 0;
      text-transform: capitalize;
      margin-top: 2px;
    }
  }
</style>