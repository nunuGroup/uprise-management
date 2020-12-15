<script>
import Navbar from '@/components/Navbar.vue';
import store from './store';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      dataRef: {},
      xChild: 0,
      yChild: 0,
      xParent: 0,
      yParent: 0,
      hover: false,
      hideCursor: false,
      unveil: null
    }
  },
  computed: {
    editMode() {
      return store.state.editMode;
    },
    cursorCircle() {
      return `transform: translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0) translate3d(0, 0, 0);`
    },
    cursorPoint() {
      return `transform: translateX(${this.xChild - 3}px) translateY(${this.yChild - 3}px) translateZ(0) translate3d(0, 0, 0);`
    },
    globalTrans() {
      return store.state.globalTrans;
    }
  },
  mounted() {
    setTimeout(() => {
      this.unveil = true;
      //this.waveOffset = 700;
      console.log('unveiled');
    }, 3000);
    document.addEventListener("mousemove", this.moveCursor);
    document.addEventListener('mouseleave', (e) => {
      this.hideCursor = true;
      console.log('left: ', e.target);
    });
    document.addEventListener('mouseenter', (e) => {
      this.hideCursor = false;
      console.log('entered: ', e.target);
    });
  },
  methods: {
    handleNav(index) {
      console.clear();
      console.log(index);
      this.$refs.fullpage.api.moveTo(1);
    },
    moveCursor(e) {
      var self = this;

      //console.log(e.target.classList);

      if(e.target.classList.contains('hoverable') || e.target.classList.contains('fp-tooltip') || e.target.tagName == "SPAN") {
        //console.log(e.target.tagName);
        //console.log('HOVERABLE:)');
        self.hover = true;
      } else {
        //console.log('NOT HOVERABLE!');
        self.hover = false;
      }

      this.xChild = e.clientX;
      this.yChild = e.clientY;
      setTimeout(() => {
        this.xParent = e.clientX - 20;
        this.yParent = e.clientY - 20;
      }, 100);
    }
  }
}
</script>

<template>
  <div id="app">
    <div :class="(unveil ? 'swoop' : '' )" class="logo-loader"></div>
    <div :class="(unveil ? 'loading-veil unveil' : 'loading-veil')"></div>
    <div class="transition-pane-container">
      <div :class="( globalTrans ? 'pane-active' : 'pane-inactive' )" class="pane"></div>
    </div>
    <div 
      :style="( editMode ? 'display:none' : 'display:block' )" 
      class="cc" 
      :class="[ 'g-cursor', { 'g-cursor_hover': hover }, {'g-cursor_hide': hideCursor} ]">
      <div :style="cursorCircle" class="g-cursor__circle"></div>
      <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
    </div>
    <Navbar />
    <router-view :dataRef='dataRef' />
  </div>
</template>

<style lang="scss">
html {
  transition: filter 1s;
}

.transition-pane-container {
  //background: red;
  position: fixed;
  height: 100vh;
  width: 100vw;
  padding: 0px;
  margin: 0px;
  z-index: 999;
  pointer-events: none;

  .pane-active {
    height: 100vh;
    bottom: 0px;
    transform: rotate(0deg) scale(4);
  }

  .pane-inactive {
    height: 0vh;
    top: 0px;
    transform: scale(2);
  }

  .pane {
    background: #eee;
    width: 100%;
    position: absolute;
    bottom: 0px;
    //transition: 1.5s cubic-bezier(0.65, 0, 0.35, 1);
    transition: 2s ease;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.swoop {
  transform: translate(-42px, -42px) scale(0.3) !important;
  //background: green !important;
  transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
}

.logo-loader {
  position: absolute;
  top: 0px;
  left: 0px;
  transform: translate(calc(50vw - 100px), calc(50vh - 100px));
  margin: auto;
  z-index: 999999;
  width: 200px;
  height: 200px;
  //background: pink;  
  transition: 2s cubic-bezier(0.65, 0, 0.35, 1);
  background-image: url('assets/emblem.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  mix-blend-mode: difference;
}

.fp-slideNav {
  //margin-bottom: 400px !important;

  ul li a span {
    background: red !important;
  }
}

#fp-nav {
  top: auto !important;
  margin-left: 27px;
  mix-blend-mode: difference;
  bottom: -24px !important;

  li {
    margin-top: 14px !important;
  }

  .fp-tooltip {
    font-size: 14px !important;
    padding-left: 32px;
    line-height: 22px;
  }

  .active span {
    opacity: 1 !important;
    background: white !important;
    border: 2px solid white;
    //transform: translate(4px,4px);
    margin: -8px 0 0 -8px !important;

    &:hover {
      //transform: translate(-1px,-1px) !important;
      //transform: scale(1.5);
    }
  }

  span {
    background: white !important;
    //background: rgba(0,0,0,0) !important;
    //height: 24px !important;
    //width: 24px !important;
    //transform: translate(-1px,-1px);
    transform: none !important;

    &:hover {
      //transform: translate(-1px,-1px);
      //transform: scale(1.05);
    }
  }
}

.unveil {
  opacity: 0 !important;
  transition: 4s;
  pointer-events: none;
}

.loading-veil {
  //display: none;
  background: #000;
  opacity: 1;
  width: 100%;
  height: 100vh;
  position: fixed;
  margin: 0px;
  padding: 0px;
  pointer-events: none;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 2s;
}

// ---------- transition shit -----------

//transition animation fade

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-active, .fade-leave-active {
  transition: all 300ms ease;
}

body {
  padding: 0px;
  margin: 0px;
  cursor: none !important;
}

p {
  //font-family: 'Inconsolata', monospace !important; 
}

#app {
  font-family: 'Gotham', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  //background: #222;
}

// --------- cursor stuff ----------

.g-cursor {
  position: absolute;
  //z-index: 9999;

    &_hide {
      opacity: 0;
      width: 60px;
      height: 60px;
      transition: 
        width .6s ease,
        height .6s ease,
        opacity .6s ease;
    }

    &__circle {
      pointer-events: none;
      user-select: none;
      top: 2px;
      left: 2px;
      position: fixed;
      width: 36px;
      height: 36px;
      //border: 2px solid rgba(white, 1);
      //mix-blend-mode: difference;
      //background: rgba(white,1);
      border-radius: 100%;
      z-index: 5555;
      backface-visibility: hidden;
      transition: 
        margin 0.2s ease,
        opacity 0.2s ease,
        width 0.2s ease,
        height 0.2s ease,
    }

    &__point {
      top: 0;
      left: 0;
      opacity: 1;
      position: fixed;
      width: 32px;
      height: 32px;
      pointer-events: none;
      user-select: none;
      margin-left: -16px;
      margin-top: -16px;
      border-radius: 100%;
      mix-blend-mode: difference;
      background: #fff;
      z-index: 55555555;
      backface-visibility: hidden;
      will-change: transform;
      transition:
        margin .4s ease,
        opacity .4s ease,
        width .4s ease,
        height .4s ease;
    }

    &_hover {
      .g-cursor__point {
          opacity: 1;
          width: 72px;
          height: 72px;
          margin-left: -36px;
          margin-top: -36px;
          border: 2px solid rgba(white, 1);
          //background: white;
          mix-blend-mode: difference;
          //background: rgba(white, 1);
          //border-color: white;
          transition: 
            margin .4s ease,
            width .4s ease,
            height .4s ease,
            opacity .4s ease,
            transform 0s;
        }

        .g-cursor__circle {
          opacity: 1;
          width: 64px;
          height: 64px;
          margin-left: -12px;
          margin-top: -12px;
          //background: rgba(white, 1);
          //border-color: transparent;
          transition: 
            margin .4s ease,
            width .4s ease,
            height .4s ease,
            opacity .4s ease;
        }
    }
}

@media only screen and (max-width: 900px) {
  .g-cursor {
    display: none !important;
  }

  .swoop {
      transform: translate(-56px, -62px) scale(0.2) !important;
      //background: green !important;
      transition: 1s cubic-bezier(0.65, 0, 0.35, 1);
   }

   .soc-container {
     transform: scale(0.7);
     top: 30px !important;
     right: 6px !important;
     display: none !important;
   }

   .landing-container {
     //width: 300px !important;
     height: 80px !important;
   }

   .fp-tooltip {
     display: none !important;
   }

   .fp-slidesNav ul li a {
     cursor: none !important;
   }

   #fp-nav {
     position: absolute;
     margin: 0px !important;
     transform: rotate(270deg);
     top: 0px !important;
     left: 180px !important;
     width: 12px;
     cursor: none !important;

     li {
       margin-bottom: 18px !important;
       cursor: none !important;

       a.active {
         width: 8px !important;
         height: 8px !important;
         margin: 0px 0 0 0px !important;
         cursor: none !important;
       }
     }
   }
}
</style>
