<script>
//import EditableText from '@/components/EditableText.vue';
import Phone from '@/components/Phone.vue';

export default {
  name: 'SocialMedia',
  components: {
    //EditableText,
    Phone
  },
  data() {
    return {
      text: {
        landingText: null,
        section2text: null
      },
      options: {
        normalScrollElements: '.test-container, .modal-active, .modal-inactive, .more-work-grid, .more-work-container, .modal-images',
        loopHorizontal: false,
        scrollingSpeed: 2000,
        slidesNavigation: false,
        controlArrows: false,
        navigation: true,
        fadingEffect: true,
        navigationPosition: 'left',
        showActiveTooltip: false,
        navigationTooltips: [
            'Social Media Management', 
            "Why it's important", 
            'Creative Direction', 
            'Community Management',
            'Benchmarking & Analysis',
            'Pricing',
            'Add-ons', 
            'Case Study | Motorola Baby', 
            'Case Study | Motorola Lifestyle', 
            'Case Study | Obliphica', 
            'Case Study | aTeam'
        ],
        easingcss3: 'ease', //swoopy
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        },
        onSlideLeave: (origin, destination, direction) => {
          this.handleSlideLeave(origin, destination, direction);
        }
      },
      triggerUp: false,
      triggerDown: false,
      fix: false,
      activeSection: 0,
      activeSlide: 1,
      hover: false,
      currentExtra: '',
      currentPreview: '',
      currentProjectText: '',
      currentProjectTitle: '',
      scrollOverflow: false,
      context: 0
    }
  },
  props: {
    dataRef: Object
  },
  created() {

  },
  mounted() {
    this.hideNav = false; //hide nav on landing page?
    this.fetchText();
  },
  methods: {
    fetchText() {
      this.fireFetch('text', 'rel == landingText', (docs) => {
        docs.forEach((doc) => {
          this.text.landingText = doc.data().value;
        });
      });
      this.fireFetch('text', 'rel == section2text', (docs) => {
        docs.forEach((doc) => {
          this.text.section2text = doc.data().value;
        });
      });
    },
    handleLeave(origin, destination, direction) {
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSection = destination.index;

      console.log('activeSection: ', this.activeSection);

      if(direction == 'up') {
        this.triggerUp = true;
        this.triggerDown = false;
        console.log('going up');
      }
      else {
        this.triggerDown = true;
        this.triggerUp = false;
        console.log('going down');
      }

      if(destination.index == 0) {
        console.log('on first slide');
      }
    },
    handleSlideLeave(origin, destination, direction) {
      console.clear();
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSlide = destination.index;

      console.log('activeSlide: ', this.activeSlide);

      if(direction == 'up') {
        this.triggerUp = true;
        this.triggerDown = false;
      }
      else {
        this.triggerDown = true;
        this.triggerUp = false;
      }
    },
    handleMouseEnter(i, index) {
      console.clear();
      console.log('enter' , index);
      this.hover = true;
      this.currentPreview = i.thumb;
      this.currentProjectText = i.description;
      this.currentProjectTitle = i.title;
      this.context = index;

      console.log(this.currentPreview);
    },
    handleMouseLeave(i, index) {
      console.clear();
      console.log('leave', index);

      this.hover = false;

      /*if(!this.modalActive) {}*/
    },
    handleScroll() {
      //console.log(scrollY);
      //this.bannerOffset = scrollY;
    },
    goDown() {
      this.$refs.fullpage.api.moveSectionDown()
    },
    moveRight() {
      this.$refs.fullpage.api.moveSlideRight();
    },
    moveLeft() {
      this.$refs.fullpage.api.moveSlideLeft();
    }
  }
}
</script>

<template>
<transition name="fade" mode="out-in">

  <div class="sm">

    <!-- optional top layer for modals & such -->
    <!--div class="top-layer">
      <div :class="( smallEnter ? 'enter' : 'stage-left' )" class="modal-small">This is some text</div>
      <div :class="( bigEnter ? 'enter' : 'stage-left' )" class="modal-big"></div>
    </div-->

    <div class="backdrop-container">
      <!--canvas id="glscreen"></canvas-->
    </div>

    <!-- social media buttons -->
    <div class="soc-container">
      <a href="#" target="_blank"><div class="hoverable soc-button fb"></div></a>
      <a href="#" target="_blank"><div class="hoverable soc-button insta"></div></a>
      <a href="#" target="_blank"><div class="hoverable soc-button tw"></div></a>
      <a href="#" target="_blank"><div class="hoverable soc-button li"></div></a>
    </div>

    <!-- optional wave -->
    <!--div :style="'left:' + waveOffset" :class="(waveLeft ? 'wave-left' : 'wave-right' )" class="wave-panel">
        <div class="wave"></div>
    </div-->

    <div class="corner-down"><div @click="goDown()" class="arrows hoverable"></div></div>

    <!-- navigation -->
    <div id="nav" class="hoverable">
      <div class="link-list hoverable">

      </div>
    </div>

    <div class="phone-layer">
        <div class="phone-container main-phone" :class="'pos' + activeSection">
          <Phone :contentIndex="activeSection" />
        </div>
        
        <div class="phone-container phone2" :class="(activeSection == 2 ? 'phone2-enter' : ( activeSection == 3 ? 'phone2-next' : 'phone2-stage' ) )">
          <Phone :alt1="true" :contentIndex="activeSection" />
        </div>

        <div class="phone-container phone4" :class="(activeSection == 3 ? 'phone4-enter' : 'phone4-stage' )">
          <Phone :alt2="true" :contentIndex="activeSection" />
        </div>
    </div>

    <!-- main (fullpage.js; TODO: Configuure locomotive scroll) -->
    <full-page ref="fullpage" :options="options" id="fullpage">

        <!-- Section 1 (landing page) -->
        <section class="section landing">
          <div class="page-container">
              <div class="bar1">
                <div :class="( activeSection == 0 ? 'enter-text' : 'stage-default' )" class="head" id="head1">
                  <h1 class="head head1">Social Media Management & Strategic Consulting</h1>
                </div>
                <div :class="( activeSection == 0 ? 'social-text-enter' : 'social-text-stage' )" class="main-text socialText1">
                  <p>UPRISE Management is a full-service social media and social commerce management and asset creation agency. With a team of experienced professionals and many years of success in the industry, we want to help your business create a unique brand identity and build a strong social media strategy.</p>
                </div>
              </div>
          </div>
        </section>
        
        <!-- Section 2 -->
        <section class="section">
          <div class="page-container">
              <div class="bar2">
                <h1 :class="( activeSection == 1 ? 'enter-text' : 'stage-default' )" class="head head2">Social Media Management & Strategic Consulting</h1>
                <div class="main-text main2">
                  <h3>WHY IT'S IMPORTANT</h3>
                  <p>Whether you’re upgrading, revitalizing or starting from scratch, a strong social media strategy and presence is important.</p>
                  <p>Customer engagement and retention is an important and effective tool to boost sales, reach more customers and revitalize your business.</p>
                  <p>Your strategy will include continuous and creative posts, digital storytelling, impeccable photography, professional videos, celebrity and influencer collaborations, as well as planned giveaways.</p>
                </div>
              </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="section">
            <div class="page-container" style="background: white">
                <div class="main-text main3">
                  <h1 :class="( activeSection == 2 ? 'enter-text' : 'stage-default' )" class="main-head">Creative Direction</h1>
                  <h4>Strategic Alignment</h4>
                  <p>Your social media content strategy, tactics and every day programming should always align with with your business goals. Whether it’s brand awareness, customer engagement, website traffic, sales or retention (increased lifetime customer values), our team will help you meet your business objectives by aligning a content plan, within the relevant paid social framework, around your specific targets.</p><p>Brand identity is important, because it increases the likelihood that someone will land on your profile and choose to follow you, based on the look and feel of your content. Creating an appealing visual identity to your target audience, through social media, will elevate and expand your digital outreach, with the purpose of attracting more customers and growing your business.</p><p>Whether you’re just starting out or looking to rebrand, our team has many solutions, through years of experience in different industries, to help your business thrive.</p>
                  <h4>Paid Social Framework</h4>
                  <p>Understanding which platforms and tactics will best drive brand growth, engagement and traffic is a fundamental aspect of your social media content strategy. Our team will coordinate your paid social budget and efforts (goals, platforms, tactics) with your business goals, and ensure your brand is operating within the best framework to bring you consistency and success.</p><p>Our team will help you layout visual guidelines, to design your brand’s aesthetic, through creating logos with multiple variations for different applications, a consistent color scheme and lighting/filters for your content, to start building your brand’s look and feel. With visually appealing and relevant content your brand can reach a wider clientele, attract new customers and stay relevant.</p>
                </div>
            </div>
        </section>

        <!-- Section 4 -->
        <section class="section">
            <div class="page-container">
                <div class="main-text main4">
                  <h1 :class="( activeSection == 3 ? 'enter-text' : 'stage-default' )" class="main-head">Community Management</h1>
                  <h4>Why it's Important</h4>
                  <p>Community management is a hybrid between the modern customer service rep and a social media specialist. It is critical to the success of a company’s social media program, because without it, a brand comes off cold, corporate and as if they simply don’t care.</p>
                  <h4>Daily Management</h4>
                  <p>Using your brand’s voice, our team will help your business engage, expand and nurture your audience of customers and prospects to facilitate your brand relationships. We will curate responses, posts, engage with your followers and oversee the publication of compelling content that resonates with your brand’s digital community, so you can focus on running your business.</p>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="page-container">
              <!--div class="bar1 g"></div-->
            </div>
        </section>

        <section class="section">
            <div class="page-container">
              <!--div class="bar2 g"></div-->
            </div>
        </section>

        <section class="section">
            <div class="page-container">
              <!--div class="bar1 g"></div-->
            </div>
        </section>

        <section class="section">
            <div class="page-container">
              <div class="bar1 c1"><div class="cs-logo cs1"></div></div>
            </div>
        </section>

        <section class="section">
            <div class="page-container">
              <div class="bar1 c2"><div class="cs-logo cs2"></div></div>
            </div>
        </section>

        <section class="section">
            <div class="page-container">
              <div class="bar1 c3"><div class="cs-logo cs3"></div></div>
            </div>
        </section>

        <section class="section">
            <div class="page-container">
              <div class="bar1 c4"><div class="cs-logo cs4"></div></div>
            </div>
        </section>
            <div class="stroke-head"></div>
    </full-page>
  </div>

</transition>
</template>

<style lang="scss" scoped>
@import '../assets/styles/global';

.stroke-head {
  background-image: url('../assets/sm-stroke-head.svg');
  background-repeat: repeat-x;
  background-size: cover;
  height: 270px;
  width: 6084px;
  position: fixed;
  left: 0px;
  top: 200px;
  z-index: 1;
  opacity: 0.2;
  animation: sm-stroke-head-move linear 130s forwards infinite;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}

.cs1 {
  background-image: url('../assets/social-media/motobb.png');
}

.cs2 {
  background-image: url('../assets/social-media/motolifestyle.png');
}

.cs3 {
  background-image: url('../assets/social-media/obliphica.png');
}

.cs4 {
  background-image: url('../assets/social-media/ateam.svg');
}

.cs-logo {
  height: 60px;
  width: 280px;
  margin-top: 64px;
  margin-left: 124px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.c1 {
  background: linear-gradient(90deg,#E8E8F4,#A59DB8) !important;
}

.c2 {
  background: linear-gradient(90deg,#213F35,#E5DBD1) !important;
}

.c3 {
  background: linear-gradient(90deg,#F45516,#8863CA) !important;
}

.c4 {
  background: linear-gradient(90deg,#000000,#F5AB92) !important;
}

.g {
  background: #eee !important;
}

.main4 {
  margin-left: 50vw !important;
}

.main3 {
  margin-left: -40vw !important;
  width: 600px !important;

  p {
    font-size: 14px !important;
  } 
}

.main2 {
    margin-left: 24vh;
    margin-top: 13vh;
}

.main-text {
  z-index: 999;
  color: black;
  text-align: left;
  width: 500px;
  line-height: 1.5;
  
  p {
    font-size: 18px;
  }

  h3 {
    font-size: 20px;
    color: $socialHeadColor;
  }

  h4 {
    opacity: 0.3;
  }

  h1 {
    color: $socialHeadColor;
    font-size: 36px;
  }
}

.head1 {
  color: $socialHeadColor;
  text-align: left;
  margin-top: 0px;
  font-size: 36px;
  margin-left: 0px;
  transition-delay: 1.5s !important;
}

.head2 {
  color: white;
  text-align: left;
  margin-top: 30vh;
  font-size: 36px;
  margin-left: 64px;
  transition-delay: 1.5s !important;
}

.social-text-enter {
  transform: translateX(0px);
  opacity: 1;  
  transition: 1s $ezpz;
}

.social-text-stage {
  transform: translateX(0px) scale(0.95);
  opacity: 0;
  transition: 1s $ezpz;
}

.head {
  transition-delay: 0ms;
}

#head1 {
  position: absolute;
  top: -72px;
  left: 39vw;
  z-index: 9999;
}

.socialText1 {
  //background: red;
  width: 500px;
  //height: 300px;
  margin-left: 39vw;
  margin-top: 42px;
  color: white !important;
}

.phone-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 800px;
}

.grid-phone-item {
    transform: scale(0.3)
}

.bar1 {
    background:black;
    width: 100%;
    height: 514px;
    z-index: 9;
    position: absolute;
    bottom: 0px;
    //animation: bar-intro 2s $ezpz forwards;
}

.bar2 {
    background:black;
    width: 100%;
    height: 400px;
    z-index: 9;
    position: absolute;
    top: 0px;
    margin-top: -12px;
}

.bar3 {
    display: none;
    background:white;
    width: 100%;
    height: 300px;
    z-index: 9;
    position: absolute;
    top: 0px;
    bottom: 0px;
}

.phone-layer {
    position: fixed;
    top: 0px;
    margin: 0px;
    padding: 0px;
    height: 100vh;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .phone-container {
        transition: 2.2s $ezpz;
    }

    .phone2 {
        position: absolute;
    }

    .phone3 {
        position: absolute;
        z-index: -1;
    }

    .phone4 {
        position: absolute;
        z-index: -1;
    }

    .phone2-next {
        opacity: 1;
        transform: scale(0.5) rotate(0deg) translate(-8vw, 0vh);
        z-index: -1;
    }

    .phone2-enter {
        opacity: 1;
        transform: scale(0.4) rotate(-15deg) translate(40vw, 55vh);
        z-index: -1;
    }

    .phone3-enter {
        opacity: 1;
        transform: scale(0.5) rotate(0deg) translate(0px, 0px);
    }

    .phone4-enter {
        opacity: 1;
        transform: scale(0.5) rotate(0deg) translate(-58vw, 0vh);
        transition-delay: 300ms;
    }

    .phone2-stage {
        opacity: 0;
        transform: scale(0.3) rotate(-0deg) translate(1200px, 0px);
        z-index: -1;
    }

    .phone3-stage {
        opacity: 0;
        transform: scale(0.45) rotate(0deg) translate(0px, 120px);
        z-index: -1;
        transition-delay: 300ms;
    }

    .phone4-stage {
        opacity: 0;
        transform: scale(0.5) rotate(0deg) translate(-110vw, 120px);
        z-index: -1;
    }

    .pos0 {
        transform: scale(0.9) translate(-30vw, 35vh);
    }

    .pos1 {
        transform: scale(0.55) rotate(12deg) translate(35vw, -10vh);
    }

    .pos2 {
        transform: scale(0.4) rotate(15deg) translate(68vw, -55vh);
    }

    .pos3 {
        transform: scale(0.6) rotate(0deg) translate(-27vw, 0vh);
    }

    .pos4 {
        transform: scale(1.2) rotate(-90deg) translate(0vw, 0vh);
    }
    
    .pos5 {
        transform: scale(1.2) rotate(-90deg) translate(0vw, 0vh);
    }

    .pos6 {
        transform: scale(1.2) rotate(-90deg) translate(0vw, 0vh);
    }

    .pos7 {
        transform: scale(1.4) rotate(0deg) translate(16vw, 40vh);
    }
        
    .pos8 {
        transform: scale(1.4) rotate(0deg) translate(16vw, 40vh);
    }
    
    .pos9 {
        transform: scale(1.4) rotate(0deg) translate(16vw, 40vh);
    }
    
    .pos10 {
        transform: scale(1.4) rotate(0deg) translate(16vw, 40vh);
    }
}

.corner-down {
    //background:red;
    position: absolute;
    margin: 0px;
    padding: 0px;
    z-index: 9999;
    bottom: 64px;
    mix-blend-mode: difference;
    left: 40px;
}

.sm {
    background: white;
}

.sec2text {

}

.landing-text {
  margin-bottom: 40px;
  opacity: 0.4;
}

.landing-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 0px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;

  h1 {
    font-size: 48px;
  }
}

.landing {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.landing-title {
  background-image: url('../assets/UPRISEMGMT.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 500px;
  height: 112px;
}

.landing-button {
  background: white;
  height: 40px;
  width: 180px;
  color: black;
  border-radius: 100px;
  line-height: 40px;
  font-weight: normal;
  border: solid 1px white;
  transition: $quick;

  &:hover {
    background: transparent;
    color: white;
  }
}

.backdrop-container {
  //background: #141414;
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0px;
  margin: 0px;
  background-image: url("../assets/mission-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
}

.page-container {
  height: 100vh;
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.bottom-actions {
  position: absolute;
  bottom: 0px;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  //background: gray;
  color: white;
  height: 100px;
  width: 100vw;

  .nav-button {
    background: black;
    height: 40px;
    width: max-content;
    padding: 6px 24px;
    margin-right: 36px;
    line-height: 40px;
    border-radius: $rad;
    transition: $quick;

    &:hover {
      transform: $shrink;
    }
  }
}

.arrows {
  position: relative;
  width: 30px;
  height: 30px;
  transform: scale(0.6);
  margin-top: 40px;
}

.arrows:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
  border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
  transform: translate(26.66667px, 106.66667px) rotate(-45deg);
  animation: arrows 3s linear infinite;
}

.arrows:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
  border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
  transform: translate(53.33333px, 0px) rotate(-45deg);
  animation: arrows 3s linear infinite -1.5s;
}

@keyframes arrows {
  0% {
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: translate(-13.33333px, -53.33333px) rotate(-45deg);
  }
  10%, 90% {
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
  }
  50% {
    border-left: 2px solid rgba(255, 255, 255, 0.7);
    border-bottom: 2px solid rgba(255, 255, 255, 0.7);
    transform: translate(-13.33333px, 0px) rotate(-45deg);
  }
  100% {
    border-left: 2.66667px solid transparent;
    border-bottom: 2.66667px solid transparent;
    transform: translate(-13.33333px, 53.33333px) rotate(-45deg);
  }
}

.top-layer {
  position: fixed;
  z-index: 99999;
  height: 100vh;
  width: 100%;
  display: flex;
  pointer-events: none;
  justify-content: center;
  align-items: center;
}

.soc-container {
  display: none !important;
  position: fixed;
  top: $pad;
  right: $pad;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.wave-panel {
  background: #181818;
  position: fixed;
  height: 100vh;
  width: 100%;
  margin: 0px;
  z-index: 9;
  transition: 2s;
  pointer-events: none;

  .wave {
    height: 100vh;
    transform: translateX(0px) scale(4);
    width: 175px;
    position: absolute;
    background-image: url('../assets/wave.svg');
    background-size: contain;
    background-position-y: 50%;
    background-repeat: repeat-y;
    transition: 2s;
  }
}

.wave-left {
  .wave {
    background-position-y: 7% !important;
    //background: rgba(yellow, 0.2);
  }
}

.wave-right {
  .wave {
    background-position-y: 50% !important;
    //background: rgba(aqua, 0.2);
  }
}

.main-title {
  //background:red;
  width: 70px;
  background-image: url("../assets/emblem.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 70px;
  margin: 42px;
}

.hoverable {
  //cursor: pointer;
}

.project-text {
  font-size: 14px !important;
}

.mwm-expanded {
  background: white;
  width: auto;
  height: 70%;
  border-radius: 18px;
  min-width: 25%;
}

.mwm-inactive {
  //background: blue;
  width: 100vw;
  height: 100vh;
  position: absolute;
  padding: 0px;
  margin: 0px;
  z-index: 999;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  
  img {
    transition: 600ms;
    transform: scale(0.8);
    opacity: 0;
  }
}

.mvm-active {
  background: rgba(black, 0.8);
  width: 100vw !important;
  height: 100vh !important;
  position: absolute;
  padding: 0px;
  margin: 0px;
  z-index: 999;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition-delay: 150ms;

  img {
    transition: 600ms;
    transform: scale(1);
  }
}

.modal-title {
  font-size: 36px;
}

.image-list {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.modal-text {
  //@extendanimation: flyleft 1s ease forwards 3s;
  width:300px;
  text-align: left;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  //background: purple;
  transition: 1s;
}

#nav {
  position: fixed;
  z-index: 9999;

  h1 {
    padding-left: 18px;
  }

  ul {
    list-style: none;
    text-align: left;
    font-family: 'Inconsolata', monospace;

    li {
      margin-top: 6px;
      font-size: 18px;

      &:hover {
        span {
          opacity: 1;
          padding-right: 8px;
        }
      }

      span {
        opacity: 0;
        margin-right: 12px;
        transition: 300ms;
        font-weight: bold;
      }
    }
  }

  a {
    color: white;
    text-decoration: none;
    opacity: 0.7;
    //cursor: none;

    &.router-link-exact-active {
      color: white;
      opacity: 1;
      font-weight: bold;
    }
  }
}

//grid flyin animation
.grid-item {
  background: #555;
  height: 250px;
  transition: 1.2s;

  &:hover {
    //transform: scale(0.95);
    //filter:hue-rotate(145deg);
  }

  &:nth-child(1) {
    transition-delay: 1.4s;  
  }

  &:nth-child(2) {
    transition-delay: 1.2s;  
  }

  &:nth-child(3) {
    transition-delay: 1s;  
  }

  &:nth-child(4) {
    transition-delay: 1.6s;  
  }

  &:nth-child(5) {
    transition-delay: 1.4s;  
  }

  &:nth-child(6) {
    transition-delay: 1.2s;  
  }

  &:nth-child(7) {
    transition-delay: 1.8s;  
  }

  &:nth-child(8) {
    transition-delay: 1.6s;  
  }

  &:nth-child(9) {
    transition-delay: 1.4s;  
  }
}

.modal-active {
  background: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
  transition: 600ms;
  transition-delay: 600ms;
  margin: auto;
  left: 0px;
  top: 0px;
  overflow: auto;
}

.modal-inactive {
  background: black;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
  transition: 600ms;
  margin: auto;
  left: 0px;
  top: 0px;
  overflow: auto;
  pointer-events: none;
}



.blur {
  filter: blur(24px);
}

.clear {
  filter: blur(0px);
}

@media only screen and (max-width: 900px) {

}
</style>