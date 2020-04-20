<template>
  <div class="container">
    <div>
      <div v-for="dirt in dirts" 
        :key="dirt.id" 
        class="dirt" 
        :class="[ getClassByType(dirt.type), { fadeInDown: getFade(dirt.id) }]" 
        :style="{ top: getTop(dirt.id), left: getLeft(dirt.id), opacity: getOpacity(dirt) }"
        @click="click(dirt)">
      </div>
    </div>
  </div>
</template>

<script>
import Container from './Container'

export default {
  name: 'Mid',
  props: ['dirts', 'restService'],
  components: { Container },
  data () {
    return {
      interval: null,
      tops: null,
      lefts: null,
      clicks: null,
      times: null,

      // Scores
      scoreEssen: 3,
      scoreTrinken: 1,
      scoreKotzen: 10
    }
  },
  created () {
    this.tops = new Map()
    this.lefts = new Map()
    this.clicks = new Map()
    this.times = new Map()
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    getTop (id) {
      if (!this.tops.get(id)) {
        this.tops.set(id, Math.random() * 92)
      }
      return this.tops.get(id) + '%'
    },
    getLeft (id) {
      if (!this.lefts.get(id)) {
        this.lefts.set(id, Math.random() * 92)
      }
      return this.lefts.get(id) + '%'
    },
    getFade (id) {
      if (!this.times.get(id)) {
        this.times.set(id, new Date())
      }
      const d = new Date()
      return d - this.times.get(id) < 1100
    },
    click (dirt) {
      const { id, type } = dirt
      if (this.clicks.get(id) === undefined) {
        this.clicks.set(id, this.getClicksByType(type))
      }
      this.clicks.set(id, this.clicks.get(id) - 1)
      this.$forceUpdate()
      if (this.clicks.get(id) === 0){
        this.tops.set(id, '-100')
        this.lefts.set(id, '-100')
        this.restService.get('remove.php', [`dirtid=${id}`, `clicks=${this.getClicksByType(type)}`])
      }
    },
    getOpacity (dirt) {
      const { id, type } = dirt
      if (this.clicks.get(id) === undefined) return 1
      if (this.clicks.get(id) < 1) return 0
      return this.clicks.get(id) / this.getClicksByType(type)
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
    },
    getClicksByType (type) {
      switch (type) {
        case '0':
          return this.scoreTrinken
        case '1':
          return this.scoreEssen
        default:
          return this.scoreKotzen;
      }
    }
  }
}
</script>

<style scoped lang="less"> 
  .container {
    cursor: url(../assets/wiper-small.png) 20 60, auto;	
    padding: 20px;
    max-width: 1200px;
    margin: auto;

    & > div {
      height: 100%;
      position: relative;
    }
  }
  .dirt {
    cursor: url(../assets/wiper-small.png) 20 60, auto;	
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    line-height: 35px;
    color: white;
    text-shadow: 1px 1px black;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &.fadeInDown {
      animation-duration: 1s;
      animation-name: fadeInDown;
    }
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
  

  @keyframes fadeInDown {
    0% { opacity: 0; transform: translateY(-100px); }
    100% { opacity: 1; transform: translateY(0); }
  }
</style>