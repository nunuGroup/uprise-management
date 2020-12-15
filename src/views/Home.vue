<script>
//import firebase from 'firebase';
import EditableText from '@/components/EditableText.vue'
import AltPhone from '@/components/AltPhone.vue'
import store from '../store'

export default {
  name: 'Home',
  components: {
    EditableText,
    AltPhone
  },
  data() {
    return {
      text: {
        landingText: null,
        section2text: null
      },
      waveOffset: "120vw",
      waveLeft: true,
      options: {
        normalScrollElements: '.test-container, .modal-active, .modal-inactive, .more-work-grid, .more-work-container, .modal-images',
        loopHorizontal: false,
        scrollingSpeed: 2000,
        slidesNavigation: false,
        controlArrows: false,
        navigation: false,
        fadingEffect: true,
        navigationPosition: 'left',
        //navigationTooltips: ['Home','About', 'Services', 'Social Media','Case Studies','Contact'],
        anchors: ['home','about','services','social_media_management','case_studies','contact',],
        showActiveTooltip: true,
        easingcss3: 'cubic-bezier(0.65, 0, 0.35, 1)', //swoopy
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
      context: 0,
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
    this.eventHub.$on('move', sec => {
      console.log("SUCCESS! MOVING TO " + sec);
      this.$refs.fullpage.api.moveTo(sec);
    })
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

      store.commit('cancelTransition');
  
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

      store.commit('cancelTransition');
  
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
  <div class="home">

    <!-- optional top layer for modals & such -->
    <!--div class="top-layer">
      <div :class="( smallEnter ? 'enter' : 'stage-left' )" class="modal-small">This is some text</div>
      <div :class="( bigEnter ? 'enter' : 'stage-left' )" class="modal-big"></div>
    </div-->

    <div class="backdrop-container">
      <!--canvas id="glscreen"></canvas-->
          <div :class="( activeSection == 0 ? 'tagline1' : ( activeSection == 1 ? 'tagline2' : 'tagline-gone' ) )" class="tagline"></div>
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

    <!-- navigation -->
    <div id="nav" class="hoverable">
      <div class="link-list hoverable">

      </div>
    </div>

    <!-- main (fullpage.js; TODO: Configuure locomotive scroll) -->
    <full-page ref="fullpage" :options="options" id="fullpage">

      <!-- (landing page) -->
      <section class="section landing">
        <div class="landing-container">
          <div class="landing-title"></div>
          <div class="landing-text">
            <EditableText rel="landingText" align="center" width="500px" />
          </div>
          <div @click="goDown()" class="landing-button hoverable">Learn More</div>
          <div @click="goDown()" class="arrows hoverable"></div>
        </div>
      </section>
      
      <!-- about section -->
      <section class="section">
        <div class="page-container sec2">
          <div class="bar1">
            <div :class="( activeSection == 1 ? 'enter-text' : 'stage-default' )" class="overview-text-container">
              <h1>Overview</h1>
              <p>UPRISE Management is a 360 ̊  full service marketing, branding and creative agency for luxury, premium and digital brands as well as for leading e-commerce giants. UPRISE’s experience is broad; specializing in beauty, tech, food & spirits, lifestyle and hospitality. In this digital era, we deliver strategy-driven branding, high profile celebrity sourcing, forward-thinking creative marketing and visually rich solutions - all in conjunction with integrated media photography, video and global from-start-to-finish production services.</p>
              <p>Our team has worked with---</p>
            </div>
          </div>
          <div class="logo-line"></div>
        </div>
      </section>

      <!-- services section -->
      <section class="section">
        <div class="page-container service-section" style="background:white">
          <div class="grid-container">
          <h1 :class="( activeSection == 2 ? 'enter-text' : 'stage-default' )" class="page-title">Services</h1>
          <div class="parent">
            <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div1 hoverable">
              <div class="item-head"><div class="item-icon icon1"></div><h2>Strategic Consulting</h2></div>
                <div class="bubble-list">
                  <div class="bubble-items">
                    <span>Brand<span>-</span>Building</span>
                    <span>Brand<span>-</span>Consulting</span>
                    <span>Brand<span>-</span>Messaging</span>
                    <span>Brand<span>-</span>Strategy</span>
                    <span>Brand<span>-</span>Vision</span>
                    <span>Content<span>-</span>Planning</span>
                    <span>Creative<span>-</span>Direction</span>
                    <span>Digital<span>-</span>Media<span>-</span>Planning</span>
                    <span>Digital<span>-</span>Strategy</span>
                    <span>Performance</span>
                    <span>Marketing<span>-</span>Strategy</span>
                    <span>Paid<span>-</span>Social<span>-</span>Strategy</span>
                    <span>Print<span>-</span>+<span>-</span>OOH<span>-</span>Media<span>-</span>Planning</span>
                    <span>Social<span>-</span>Media<span>-</span>Strategy</span>
                    <span>Storytelling</span>
                  </div>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div2 hoverable">
                <div class="item-head"><div class="item-icon icon2"></div><h2>Branding</h2></div>
                <div class="bubble-items">
                  <span>Art<span>-</span>Direction</span>
                  <span>Brand<span>-</span>Books<span>-</span>+<span>-</span>Guidelines</span>
                  <span>Brand<span>-</span>Development</span>
                  <span>Copy-writing</span>
                  <span>Graphic<span>-</span>Design</span>
                  <span>Logo<span>-</span>Design</span>
                  <span>Name<span>-</span>+<span>-</span>Naming System</span>
                  <span>Packaging<span>-</span>Design</span>
                  <span>Storytelling</span>
                  <span>Visual<span>-</span>Identity</span>
                  <span>Vision</span>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div3 hoverable">
                <div class="item-head"><div class="item-icon icon3"></div><h2>Content Creation</h2></div>
                <div class="bubble-items">
                  <span>Advertising<span>-</span>+<span>-</span>Campaign</span>
                  <span>Animation</span>
                  <span>Concept<span>-</span>Development</span>
                  <span>Creative<span>-</span>Direction</span>
                  <span>Directing<span>-</span>+<span>-</span>Filming</span>
                  <span>Editing<span>-</span>+<span>-</span>Post</span>
                  <span>Global<span>-</span>Production<span>-</span>Services</span>
                  <span>Illustration</span>
                  <span>Photography</span>
                  <span>Retouching</span>
                  <span>Social<span>-</span>Media<span>-</span>Content</span>
                  <span>Still<span>-</span>Life<span>-</span>+<span>-</span>Editorial</span>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div4 hoverable">
                <div class="item-head"><div class="item-icon icon4"></div><h2>Email</h2></div>
                <div class="bubble-items">
                  <span>Email<span>-</span>Sourcing</span>
                  <span>Email<span>-</span>Verification</span>
                  <span>Creative<span>-</span>Email<span>-</span>Marketing</span>
                  <span>Development<span>-</span>Support</span>
                  <span>Email<span>-</span>Template<span>-</span>Creation</span>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div5 hoverable">
                <div class="item-head"><div class="item-icon icon5"></div><h2>Talent</h2></div>
                <div class="bubble-items">
                  <span>Calabrity<span>-</span>Seeding</span>
                  <span>Infuencer<span>-</span>Gifting</span>
                  <span>Infulencer<span>-</span>Partnerships</span>
                  <span>Strategic<span>-</span>Collaborations</span>
                  <span>Strategic<span>-</span>Partnerships</span>
                  <span>Talent<span>-</span>Campaign Strategy</span>
                  <span>Talent<span>-</span>Campaign<span>-</span>Global<span>-</span>Execution</span>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div6 hoverable">
                <div class="item-head"><div class="item-icon icon6"></div><h2>Public Relations</h2></div>
                <div class="bubble-items">
                  <span>Digital<span>-</span>+<span>-</span>Traditional Press</span>
                  <span>Fashion<span>-</span>Shows</span>
                  <span>Front<span>-</span>of<span>-</span>House</span>
                  <span>Full-event<span>-</span>Production</span>
                  <span>Openings</span>
                  <span>Planning</span>
                  <span>Presentations</span>
                  <span>PR<span>-</span>Box<span>-</span>/<span>-</span>Mailers</span>
                  <span>Product<span>-</span>Launches</span>
                  <span>Top-tier<span>-</span>Editorial<span>-</span>Placement</span>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div7 hoverable">
                <div class="item-head"><div class="item-icon icon7"></div><h2>Social Media</h2></div>
                <div class="bubble-items">
                  <span>Benchmarking<span>-</span>&<span>-</span>Analysis</span>
                  <span>Brand<span>-</span>Social<span>-</span>Identity</span>
                  <span>Community<span>-</span>Building</span>
                  <span>Community<span>-</span>Management</span>
                  <span>Social<span>-</span>Media<span>-</span>Growth<span>-</span>Giveaways</span>
                  <span>Paid<span>-</span>Social<span>-</span>Framework</span>
                  <span>Social<span>-</span>Aesthetic<span>-</span>Appeal</span>
                  <span>Social<span>-</span>Media<span>-</span>Management</span>
                  <span>Social<span>-</span>Media<span>-</span>Strategy</span>
                  <span>Strategic<span>-</span>Alignment</span>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div8 hoverable">
                <div class="item-head"><div class="item-icon icon8"></div><h2>Spatial Design</h2></div>
                <div class="bubble-items">
                  <span>3D<span>-</span>Rendering</span>
                  <span>Custom<span>-</span>Wall<span>-</span>Graphics</span>
                  <span>In-store<span>-</span>Displays</span>
                  <span>Large<span>-</span>Space<span>-</span>Graphics</span>
                  <span>Retail<span>-</span>Displays</span>
                  <span>Special<span>-</span>Events<span>-</span>&<span>-</span>Booth<span>-</span>Design</span>
                  <span>Vector<span>-</span>Graphics</span>
                </div>
              </div>
              <div :class="( activeSection == 2 ? 'grid-item' : 'grid-item-stage' )" class="div9 hoverable">
                <div class="item-head"><div class="item-icon icon9"></div><h2>Additional Services</h2></div>
                <div class="bubble-items">
                  <span>Advisory<span>-</span>Board<span>-</span>Assembly</span>
                  <span>Celebrity<span>-</span>Giveaways</span>
                  <span>CMO<span>-</span>on<span>-</span>Demand</span>
                  <span>Digital<span>-</span>Ads<span>-</span>Management</span>
                  <span>Growth<span>-</span>Hacking</span>
                  <span>Marketing<span>-</span>Advising</span>
                  <span>SEO<span>-</span>-<span>-</span>SEM</span>
                  <span>Social<span>-</span>Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- social media section -->
      <section class="section">
        <div class="page-container sm-sec" style="background-color: white">
          <div :class="( activeSection == 3 ? 'bar3' : 'bar3-stage' )">
            <div class="overview-text-container ov-sm">
              <h1 :class="( activeSection == 3 ? 'enter' : 'stage-default' )">Social Media Management & Strategic Consulting</h1>
            </div>
          </div>
          <div :class="( activeSection == 3 ? 'sm-txt' : 'stage-default' )">
            <p class="sm-text">
              <span class="sm-inner">With a team of experienced professionals and many years of success in the industry, we want to help your business create a unique brand identity and build a strong social media strategy.</span>
              <br><br>
              <router-link to="/social_media_management"><span class="learn-more-button hoverable">Learn More 🡢</span></router-link>
            </p>
          </div>
          <div :class="( activeSection == 3 ? 'altphone-container' : 'altphone-stage' )"><AltPhone /></div>
        </div>
      </section>

      <!-- Section 5 w slides -->
      <section class="section">
        <div class="slide">
          <div class="page-container"><!-- UNDERCOVER LYFT -->
            <div class="cs-content">
              <div class="left-content" style="background: black">
                <div :class="( activeSection == 4 ? 'enter' : 'stage-default' )" class="case-logo lyft-logo"></div>
                <div :class="( activeSection == 4 ? 'enter' : 'stage-default' )" class="text-case">
                  <p>Generated over <strong>100,000 new users</strong> taking their first ride in a matter of 6 months, and countless more downloads and sign ups</p>
                  <p>UPRISE was brought on to the influencer and celebrity campaign for Lyft. Activating top influencers (<strong>TheGabbieShow, Coby Persin, Jon Paul Piques amongst others</strong>) as well as bringing celebrities to the table such as Sean “Diddy” Combs to create exclusive activations. Additionally, UPRISE generated red carpet event placements for Lyft to allow for additional press.</p>
                </div>
              </div>
              <div :class="( activeSection == 4 ? 'right-content' : 'content-inactive' )" class="lyft-things">
                <video loop muted autoplay data-autoplay data-keepplaying id="lyft-vid">
                  <source src="../assets/lyft/undercover_lyft_1080.mp4" type="video/mp4">
                </video>
              </div>
            </div>
            <div class="bottom-actions">
              <div @click="moveLeft()" class="hoverable nav-button prev" style="opacity: 0; pointer-events: none">Back</div>
              <div @click="moveRight()" class="hoverable nav-button next">Next Case Study 🡢</div>
            </div>
          </div>       
        </div>
        <div class="slide">
          <div class="page-container" style="background:orange">
            <div class="cs-content">
              <div class="left-content" style="background: black">
                <div class="case-logo superscreen-logo"></div>
                <div class="text-case">
                  <p>UPRISE secured all marketing talent for the campaign, as well as worked with Kickstarter Live to en- sure a live stream during the campaign hosted by top tech blogger <strong>TechnoBuffalo.</strong></p>
                  <p>Instead of zooming in, Super-Screen Aspect fits the content on your mobile screen so nothing gets blurry or cropped, so text and icons appear at exactly the same size as on your phone. Supercharg- ing your phone’s OS with the convenience of a 10” HD display.</p>
                  <p><strong>Most funded Kickstarter campaign of all time</strong></p>
                  <p><strong>50K</strong> goal in 30 minutes</p>
                  <p><strong>Over 20K pledges</strong></p>
                  <p><strong>Over $2.5 million</strong> raised in 30 days</p>
                </div>
              </div>
              <div :class="( activeSection == 4 ? 'right-content' : 'content-inactive' )" class="superscreen-things">
                <video loop muted autoplay data-autoplay data-keepplaying id="lyft-vid">
                  <source src="../assets/superscreen/superscreen.mp4" type="video/mp4">
                </video>
              </div>
            </div>
            <div class="bottom-actions">
              <div @click="moveLeft()" class="hoverable nav-button prev">🡠 Back</div>
              <div @click="moveRight()" class="hoverable nav-button next">Next Case Study 🡢</div>
            </div>
          </div>      
        </div>
        <div class="slide">
          <div class="page-container" style="background:maroon">
            <div class="cs-content">
              <div class="left-content" style="background: black">
                <div class="case-logo loaded8s-logo"></div>
                <div class="text-case">
                  <p><strong>Produced a full length commercial</strong> as well as cut downs for social media marketing</p>
                  <p><strong>Generated over 250 million impressions</strong></p>
                  <p><strong>Oversaw the entire ad campaign </strong>on Facebook, Instagram, Twitter and Snapchat</p>
                  <p><strong>Oversaw an international pre-launch </strong>and testing phase</p>
                  <p><strong>Generated over 100,000 downloads within the first three weeks from the global launch</strong></p>
                  <p>UPRISE built a network of top influencers with over 50 million followers for Loaded 8’s to appear in their marketing campaigns, their commercials, and to continually promote throughout the launch – all on revenue share basis. Some of the influencers were <strong>VitalyZdTv, Andrea Espada, Furious Pete, Paige Hathaway</strong> and many more.</p>
                  <p>UPRISE secured celebrities such as <strong>Snoop Dogg, Chuck Liddell, Dennis Rodman</strong> amongst others, to appear in their commercials and be a part of the launch.</p>
                </div>
              </div>
              <div :class="( activeSection == 4 ? 'right-content' : 'content-inactive' )" class="superscreen-things">
                <video loop muted autoplay data-autoplay data-keepplaying id="lyft-vid">
                  <source src="../assets/loaded8s/loaded8s.mp4" type="video/mp4">
                </video>
              </div>
            </div>
            <div class="bottom-actions">
              <div @click="moveLeft()" class="hoverable nav-button prev">🡠 Back</div>
              <div @click="moveRight()" class="hoverable nav-button next">Next Case Study 🡢</div>
            </div>
          </div>      
        </div>
        <div class="slide">
          <div class="page-container" style="background:purple">
            <div class="cs-content">
              <div class="left-content"></div>
              <div :class="( activeSection == 4 ? 'right-content' : 'content-inactive' )"></div>
            </div>
            <div class="bottom-actions">
              <div @click="moveLeft()" class="hoverable nav-button prev">🡠 Back</div>
              <div @click="moveLeft()" class="hoverable nav-button next" style="opacity: 0; pointer-events: none">Next Case Study 🡢</div>
            </div>
          </div>      
        </div>
      </section>

      <section style="background: black" class="section">
        <div class="page-container page-contact">
          <div class="contact-container">
            <p :class="( activeSection == 5 ? 'enter-text' : 'stage-default' )">UPRISE MANAGEMENT</p>
            <p>2317 Mount Olympus Dr, Los Angeles, California 90046</p>
            <p>info@uprisemgmt.com</p>
          </div>
        </div>
      </section>

    </full-page>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/global';

.sm-txt {
  opacity: 1;
  transition-delay: 4s !important;
  transition: 1s;
}

.sm-inner {
  opacity: 0.4;
}

.sm-text {
  opacity: 0.99;
  margin-top: 130px !important;
  //color: red;
}

a {
  text-decoration: none !important;
}

.learn-more-button {
  opacity: 1;
  background: white;
  padding: 12px 24px;
  border-radius: 12px;
  color: black !important;
  border: white solid 2px;
  transition: 200ms;
  z-index: 99999;
  line-height: 40px;
  font-weight: bold;
  margin-top: 80px;

  &:hover {
    color: white !important;
    background: transparent;
  }
}

.altphone-stage {
  position: absolute;
  opacity: 0;
  transform: scale(0.4) rotate(5deg);
  top: -40px;
  right: 300px;
  transition: 1s;
}

.altphone-container {
  position: absolute;
  transform: scale(0.55) rotate(0deg);
  top: -122px;
  right: 300px;
  transition: 1.5s;
  transition-delay: 3s;
}

.ov-sm-stage {
  margin-top: -164px !important;
  width: 1000px !important;
  opacity: 0;  
}

.ov-sm {
  transition: 1s;
  margin-top: -164px !important;
  width: 1000px !important;
  opacity: 1;
}

.sm-sec {
  margin-top: -12px !important;
  justify-content: flex-start !important;

  p {
    color: white !important;
    z-index: 99;
    font-size: 18px;
    text-align: left;
    width: 600px;
    margin-left: 120px;
    margin-top: 32px;
    line-height: 2;
  }
}

.obliphica-things {
  background-size: cover;
  background-repeat: repeat-y;
  background-image: url('../assets/obliphica/collage.png');
}

.loaded8s-logo {
  background-image: url('../assets/loaded8s/logo.png');
  height: 100px;
  width: 100px;
}

.superscreen-logo {
  background-image: url('../assets/superscreen/logo.png');
  height: 60px;
  width: 200px;
}

.lyft-logo {
  background-image: url('../assets/lyft/logo.svg');
  height: 100px;
  width: 200px;
}

.case-logo {
  margin-right: auto;
  margin-left: 100px;
  margin-bottom: 48px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.text-case {
  margin-left: 0px;
  width: 470px;
  line-height: 2;
  color: gray;
  font-size: 14px;

  strong {
    color: white;
  }
}

.service-section {
  margin-top: -2px !important;
}

video {
    height: 100%;
    //width: 177.77777778vh; /* 100 * 16 / 9 */
    min-width: 100%;
    min-height: 56.25vw; /* 100 * 9 / 16 */
    transform: translate(-20%, 0%); /* % of current element */
}

.lyft-things, .superscreen-things {
  overflow: hidden;
}

.page-contact {
  justify-content: flex-start !important;
  align-items: flex-end !important;
}

.contact-container {
  text-align:left;
  color: white;
  z-index: 999;
  margin-bottom: 64px;
  margin-left: 92px;
  font-weight: normal !important;
  font-size: 24px !important;
}

.cs-content {
  display: flex;
  height: 100vh;
  width: 100%;
}

.left-content {
  background: white;
  height: 100vh;
  width: 100%;
  transition: 4s;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  //margin-top: -1px;
}

.right-content {
  background: black;
  height: 100vh;
  width: 175%;
  transition: 4s;
}

.content-inactive {
  width: 0%;
  height: 100vh;
  background: black;
  transition: 2s;
}

.page-title {
  color: black;
  text-align: left;
  margin-top: 0px;
}

.bubble-items {
  text-align: left;
  width: 80%;
  margin-left: 24px;

  span {
    margin-right: 4px;
    color: black;
    background: #eee;
    padding: 4px 8px;
    line-height: 1;
    font-size: 12px;
    border-radius: 12px;
    display:inline-block;
    margin-bottom: 6px;

    span {
      padding: 0px;
      margin: 0px;
      color: transparent;
    }
  }
}

.icon1 {
  background-image: url('../assets/services/strategic-consulting.svg');
}

.icon2 {
  background-image: url('../assets/services/branding.svg');
}

.icon3 {
  background-image: url('../assets/services/content-creation.svg');
}

.icon4 {
  background-image: url('../assets/services/email.svg');
}

.icon5 {
  background-image: url('../assets/services/talent.svg');
}

.icon6 {
  background-image: url('../assets/services/public-relations.svg');
}

.icon7 {
  background-image: url('../assets/services/social-media.svg');
}

.icon8 {
  background-image: url('../assets/services/spatial-design.svg');
}

.icon9 {
  background-image: url('../assets/services/additional-services.svg');
}

.item-head {
  display: flex;
  line-height: 51px;

  h2 {
    font-size: 18px;
    margin-left: 12px;
    font-weight: normal;
  }
}

.item-icon {
  //background: red;
  border-radius: 100%;
  height: 32px;
  width: 32px;
  margin-left: 24px;
  margin-top: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  //filter: invert(1);
}

.grid-item-stage {
  color: black;
  opacity: 0;
  transform: scale(0.85);
  border-radius: 18px;
  height: 100%;
  width: 100%;
  //background: #e0e0e0 !important;
  transition: 1s;
  border: solid black 2px;
}

.grid-item {
  color: black;
  opacity: 1;
  transform: scale(1);
  border-radius: 18px;
  height: 100%;
  width: 100%;
  //background: #eee !important;
  transition: 1s;
  border: solid black 2px;

  &:hover {
    //border-color: blue;
  }
}

.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 18px;
  height: 82vh;
  width: 76vw;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 2 / 3 / 3 / 4; }
.div5 { grid-area: 2 / 2 / 3 / 3; }
.div6 { grid-area: 2 / 1 / 3 / 2; }
.div7 { grid-area: 3 / 1 / 4 / 2; }
.div8 { grid-area: 3 / 2 / 4 / 3; }
.div9 { grid-area: 3 / 3 / 4 / 4; }

.overview-text-container {
  text-align: left;
  width: 700px;
  margin-left: 120px;
  line-height: 2;
  margin-top: -390px;
}

.tagline-gone {
  opacity: 0;
  background-image: url('../assets/design-create-inspire-big.svg');
  background-size: cover;
  background-repeat: repeat-x;
  height: 150px;
  width: 2641px;
  position: absolute;
  left: 0px;
  z-index: 999;
  bottom: 372px;  
  transition: 2s $ezpz;
  transform: translateY(-110vh);
  animation: move-tagline1 50s linear forwards infinite;
}

.tagline1 {
  opacity: 1;
  background-image: url('../assets/design-create-inspire-big.svg');
  background-size: cover;
  background-repeat: repeat-x;
  height: 150px;
  width: 2641px;
  position: absolute;
  left: 0px;
  z-index: 9;
  margin: auto;
  bottom: 24px;
  transition: 2s $ezpz;
  animation: move-tagline1 50s linear forwards infinite;
}

.tagline2 {
  opacity: 1;
  background-image: url('../assets/design-create-inspire-big.svg');
  background-size: cover;
  background-repeat: repeat-x;
  height: 150px;
  width: 2641px;
  position: absolute;
  left: 0px;
  z-index: 9;
  bottom: 472px;  
  transition: 2s $ezpz;
  transform: scale(1.8) translateY(-40px);
  animation: move-tagline1 50s linear forwards infinite;
}

.logo-line {
  //background: red;
  height: 317px;
  width: 90%;
  position: absolute;
  margin: auto;
  right: 0px;
  left: 0px;
  bottom: 0px;
  margin-bottom: 60px;
  background-image: url('../assets/logo-line.png');
  background-size: 100%;
  background-repeat: repeat-x;
}

.bar3-stage {
  background:black;
  width: 100%;
  height: 0px;
  z-index: 0;
  position: absolute;
  transition: 2s;
  top: 50px;
  bottom: 0px;
  margin: auto;

  h1 {
    color: white;
    font-size: 32px;
    width: 100%;
    margin-top: 240px;
    opacity: 0;
  }
}

.bar3 {
  background:black;
  width: 100%;
  height: 450px;
  z-index: 0;
  position: absolute;
  transition: 2s;
  transition-delay: 1.6s;
  top: 50px;
  bottom: 0px;
  margin: auto;

  h1 {
    color: white;
    font-size: 32px;
    width: 100%;
    margin-top: 240px;
  }
}

.bar2 {
    background:black;
    width: 100%;
    height: 650px;
    z-index: 0;
    position: absolute;
    top: 0px;
    margin-top: -20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.bar1 {
    background:white;
    width: 100%;
    height: 450px;
    z-index: 0;
    position: absolute;
    bottom: 0px;
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
  //background-image: url("../assets/mission-bg.png");
  background: black;
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
}

.bottom-actions {
  position: absolute;
  bottom: 0px;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background: gray;
  color: white;
  height: 100px;
  width: 100vw;

  .prev {
    margin-left: 32px;
  }

  .next {
    margin-right: 32px;
    background: white !important;
    color: black;
    font-weight: bold;
  }

  .nav-button {
    background: black;
    height: 40px;
    width: max-content;
    padding: 6px 24px;
    //margin-right: 36px;
    line-height: 40px;
    border-radius: 12px;
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
  //background: #555;
  //height: 250px;
  transition: 1.5s;

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
    transition-delay: 1.2s;  
  }

  &:nth-child(5) {
    transition-delay: 1.4s;  
  }

  &:nth-child(6) {
    transition-delay: 1.6s;  
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