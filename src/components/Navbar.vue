<script>
//import store from '../store'

export default {
    name: 'Navbar',
    mounted() {
        console.log('CURRENT ROUTE PARAMS: ', this.contextHash);
    },
    computed: {
        context() {
            return this.$route.name;
        },
        contextHash() {
            return this.$route.hash;
        }
    },
    methods: {
        move(sec) {
            console.log('already on home. navigating to section ' + sec);
            this.eventHub.$emit('move', sec)
        }
    }
}
</script>

<template>
  <div class="navbar-container">
    <ul>
        <li :class="( contextHash == '#home' ? 'active-link' : 'inactive-link' )" class="nav-item hoverable"><router-link v-if="context == 'SocialMedia'" class="hoverable" to="/#home">Home</router-link><div v-if="context == 'Home'" @click="move(1)" class="hoverable">Home</div></li>
        <li :class="( contextHash == '#about' ? 'active-link' : 'inactive-link' )" class="nav-item hoverable"><router-link v-if="context == 'SocialMedia'" class="hoverable" to="/#about">About</router-link><div v-if="context == 'Home'" @click="move(2)" class="hoverable">About</div></li>
        <li :class="( contextHash == '#services' ? 'active-link' : 'inactive-link' )" class="nav-item hoverable"><router-link v-if="context == 'SocialMedia'" class="hoverable" to="/#services">Services</router-link><div v-if="context == 'Home'" @click="move(3)" class="hoverable">Services</div></li>
        <li :class="( contextHash == '#social_media_management' || context == 'social_media_management' ? 'active-link' : 'inactive-link' )" class="nav-item hoverable"><router-link class="hoverable" to="/social_media_management">Social Media Management</router-link></li>
        <li :class="( contextHash == '#case_studies' ? 'active-link' : 'inactive-link' )" class="nav-item hoverable"><router-link v-if="context == 'SocialMedia'" class="hoverable" to="/#case_studies">Case Studies</router-link><div v-if="context == 'Home'" @click="move(5)" class="hoverable">Case Studies</div></li>
        <li :class="( contextHash == '#contact' ? 'active-link' : 'inactive-link' )" class="nav-item hoverable"><router-link v-if="context == 'SocialMedia'" class="hoverable" to="/#contact">Contact</router-link><div v-if="context == 'Home'" @click="move(6)" class="hoverable">Contact</div></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/global';

.active-link {
    //background: yellow !important;
    opacity: 1 !important;
    font-weight: 500 !important;
}

.inactive-link {
    //background: blue !important;
}

.router-link-exact-active li {
    //background: red !important;
    opacity: 1 !important;
    //font-weight: bold !important;
}

.navbar-container {
    //background: rgba(orange, 0.2);
    color: white;
    height: 120px;
    width: 100%;
    position: absolute;
    z-index: 999;
    //padding-right: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 0px;
    mix-blend-mode: difference;

    ul {
        list-style: none;
        display: flex;
        margin: 0px;
        padding-right: 64px;
    }

    a {
        text-decoration: none;
        color: white;
        font-family: 'Gotham', Helvetica, Arial, sans-serif;
        font-weight: normal;
        cursor: none;
    }

    li {
        padding-right: 16px;
        padding-left: 16px;
        height: 0px;
        opacity: 0.3;
        transition: 200ms;
        font-weight: normal;

        &:hover {
            opacity: 1;
            //background: rgba(black, 0.5);
        }
    }
}

</style>