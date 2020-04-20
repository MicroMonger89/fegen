<template>
  <Container :backdrop="true" position="top">

    <div id="buttons">
      <button id="qButton" :class="{ 'active': qActive, 'gcd': this.gcd }" @click="trinken">
        <span class="key">Q</span>
      </button>
      <button id="wButton" :class="{ 'active': wActive, 'gcd': this.gcd }" @click="essen" :disabled="wCooldown > 0">
        <span v-if="wCooldown > 0" class="cooldown">{{ wCooldown }}</span>
        <span class="key">W</span>
      </button>
      <button id="eButton" :class="{ 'active': eActive, 'pulse': kotzable, 'gcd': this.gcd }" @click="kotzen" :disabled="!kotzable">
        <span class="key">E</span>
      </button>
    </div>

    <div id="progress">
      <Progress label="Magen" :value="platz" color="orange" />
      <Progress label="Pegel" :value="pegel" color="#99ccff" :indicator="indicator" />
      <div v-show="crit" id="crit">!!!</div>
    </div>

  </Container>
</template>

<script>
import Progress from './Progress'
import Container from './Container'

export default {
  name: 'Bottom',
  props: ['userid', 'restService'],
  components: { Progress, Container },
  data () {
    return {
      platz: 0,
      pegel: 0,
      gcd: false,
      qActive: false,
      wActive: false,
      eActive: false,
      wInterval: "",
      wCooldown: 0,
      crit: false,
      
      // Essen
      cooldownEssen: 5,
      kapaEssen: 15,
      kapaEssenCrit: 30,
      critchanceEssen: .3,

      // Trinken
      kapaTrinken: 5,
      kapaTrinkenCrit: 10,
      critchanceTrinken: .3,

      // Kotzen
      multiplikatorKotzen: 10,
      werteKotzen: new Map([[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 3], [6, 4], [7, 5], [8, 6], [9, 8], [10, 10]]),

      // Scores
      scoreEssen: 3,
      scoreTrinken: 1,
      scoreKotzen: 10
    }
  },
  created: function () {
    // ADD GLOBAL WINDOW LISTENER
    window.addEventListener('keydown', (event) => {
      if (['q', 'w', 'e'].some(key => key === event.key)) {
        this[`${event.key}Active`] = true
        setTimeout(() => this[`${event.key}Active`] = false, 100) 
        document.querySelector(`#${event.key}Button`).click()
      }
    })
  },
  computed: {
    indicator () {
      return this.platz / 2 + 50
    },
    kotzable () {
      return this.pegel >= this.indicator
    }
  },
  methods: {
    essen () {
      if (!this.gcd && !this.wInterval) {
        // START CD
        this.startGcd()
        this.startEssenCooldown()

        // CLIENT
        this.platz += this.isCrit(this.kapaEssen, this.kapaEssenCrit, this.critchanceEssen)
        if (this.platz > 100) this.platz = 100

        // SERVER
        this.restService.get('add.php', [`userid=${this.userid}`, 'type=1', `score=${this.scoreEssen}`])  
      }
    },

    trinken () {
      if (!this.gcd) {
        // START CD
        this.startGcd()
        
        // CLIENT
        const crit = this.isCrit(this.kapaTrinken, this.kapaTrinkenCrit, this.critchanceTrinken)
        this.pegel += crit
        if (this.pegel > 100) this.pegel = 100

        // SERVER
        if (crit === this.kapaTrinkenCrit) {
          this.restService.get('add.php', [`userid=${this.userid}`, 'type=0', `score=${this.scoreTrinken}`])
        }
      }
    },

    kotzen () {
      if (!this.gcd && this.kotzable) {
        // START CD
        this.startGcd()

        // CLIENT
        this.platz = 0
        this.pegel = 0

        // SERVER
        let amount = this.werteKotzen.get(Math.floor(this.platz / 10))
        this.restService.get('add.php', [`userid=${this.userid}`, 'type=2', `amount=${amount}`, `score=${amount * this.scoreKotzen}`])
      }
    },

    startGcd () {
      this.gcd = true
      setTimeout(() => this.gcd = false, 1000)
    },

    startEssenCooldown () {
      this.wCooldown = this.cooldownEssen
      this.wInterval = setInterval(() => {
        this.wCooldown -= 1
        if (this.wCooldown === 0) {
          clearInterval(this.wInterval)
          this.wInterval = null
        }
      }, 1000)
    },

    isCrit (min, max, chance) {
      const crit = Math.random() < chance
      if (crit) {
        this.crit = true
        setTimeout(() => this.crit = false, 1000)
      }
      return crit ? max : min
    }
  }
}
</script>

<style scoped lang="less">

  button {
    position: relative;
    transition: all .03s ease-in;
    outline: none !important;
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    background: #D9C8B4;
    box-shadow: 0 0 2px rgba(10, 10, 10, .3), 0 2px 4px rgba(10, 10, 10, .2);
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px rgba(black, .5);
    background-image: url(../assets/icons.png);
    background-size: 1300%;

    span {
      position: absolute;
      &.cooldown {
        top: 15px;
        left: 15px;
        font-size: 20px;
        text-align: center;
        width: 20px;
      }
      &.key {
        bottom: 2px;
        right: 5px;
      }
    }

    &.gcd {
      animation-duration: 1s;
      animation-name: gcd;
    }

    &.gcd[disabled] {
      animation-duration: 1s;
      animation-name: gcdd;
    }
    
    &.active {
      transform: scale(.92);
    }

    &[disabled] {
      filter: saturate(0);
    }

    &#qButton {
      background-position-x: 0px;
      background-position-y: -50px;
    }
    &#wButton {
      background-position-x: 0px;
      background-position-y: -100px;
    }
    &#eButton {
      background-position-x: -450px;
      background-position-y: -150px;
      &:not([disabled]) {
        box-shadow: 0 0 2px rgba(black, .8), 0 0 5px 3px red;
        animation-name: pulse;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }
    }
  }

  #progress {
    position: relative;

    & > div:first-child {
      margin-bottom: 5px;
    }

    label {
      display: inline-block;
      width: 50px;
      text-align: right;
      padding: 0 10px;
    }

    progress {
      display: inline-block;
      width: 400px;
    }
  }

  #crit {
    position: absolute;
    top: -10px;
    left: 50%;
    font-size: 70px;
    height: 70px;
    line-height: 70px;
    font-weight: bold;
    color: red;
    text-shadow: 1px 1px rgba(black, .5);
    animation-duration: 1.1s;
    animation-name: fadeOut;
    transform: rotate(10deg);
  }
  
  @keyframes grow {
    0% { transform: scale(1.15) }
    100% { transform: scale(1) }
  }
  @keyframes gcd {
    0% { filter: brightness(.1) }
    100% { filter: brightness(1) }
  }
  @keyframes gcdd {
    0% { filter: brightness(.1) saturate(0) }
    100% { filter: brightness(1) saturate(0) }
  }
  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
</style>