<template>
  <div id="app">

    <!-- Userauswahl -->
    <div id="user" v-if="!currentUser">
      <h1>Choose wisely</h1>
      <button v-for="user in users" :key="user" @click="currentUser = user">{{ user}}</button>
    </div>

    <!-- Game -->
    <div v-else>
      <Top id="top" :users="data.users" />
      <Mid id="mid" :dirts="data.dirt" :restService="restService" />
      <Bottom id="bottom" :userid="currentUser" :restService="restService" />
    </div>
  </div>
</template>

<script>
import Top from './components/Top'
import Mid from './components/Mid'
import Bottom from './components/Bottom'
import RestService from './services/RestService'

export default {
  name: 'App',
  components: { Top, Mid, Bottom },
  data () {
    return {
      users: ['michi', 'osman', 'marvin', 'arek'],
      currentUser: "",
      interval: undefined,
      data: undefined
    }
  },
  created () {
    const path = process.env.NODE_ENV === 'production' ? '/fegen/' : 'http://mreinecke.com/fegen/'
    this.restService = new RestService(path)
    this.interval = setInterval(() => this.update(), 500)
  },
  methods: {
    async update () {
      const response = await this.restService.get('data.php')
      this.data = response.data
    },
  }
}
</script>

<style scoped lang="less">
  #app {
    width: 100%;
    height: 100%;
    background: url(./assets/brown_wood.jpg);
    background-size: cover;

    & > div {
      animation: fadeIn 1s;
    }
  }

  #user {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      color: white;
      font-size: 80px;
      text-shadow: 0 2px 5px rgba(black, .5);
    }

    button {
      transition: transform .1s ease-in-out;
      cursor: pointer;
      outline: none !important;
      background: #F2E6D8;
      border: none;
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 15px 0;
      width: 300px;
      font-size: 30px;
      text-transform: capitalize;
      box-shadow: 0 2px 5px 2px rgba(black, .5);
      &:active {
        background: darken(#F2E6D8, 10%);
        transform: scale(.98);
      }
    }
  }

  #top {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 170px;
  }

  #mid {
    position: fixed;
    left: 0;
    right: 0;
    top: 170px;
    bottom: 80px;
    height: auto;
  }

  #bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80px;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>
