<script>
export default {
    name: 'AltPhone',
    data() {
        return {

        }
    },
    props: {
  
    },
    created() {

    },
    mounted() {
        //console.log('phone mounted');
        //console.log('oboy', this.contentIndex);
    },
    methods: {

    }
}
</script>

<template>
    <div class="phone">
        <div class="screen"></div>
    </div>
</template>

<style lang="scss" scoped>

.phone {
	display: flex;
	justify-content: center;
	align-items: center;
    position: relative;
	margin: 0 auto;
	width: 542px !important;
	height: 1245px !important;
    border-radius: 87.5px;
    box-shadow:
        inset 
        6px -6px 15px rgba(145,160,180,.45), 
        -10px 30px 40px rgba(118,146,180,.18);
    top: auto;
    z-index: auto;
    background: linear-gradient(to bottom left,#f3f8fb,#e5ebf2);
    opacity: 1;
    transition: none;
    pointer-events: auto;
    transition: transform 0.1s ease-out;
}

.screen {
    width: 515px;
    height: 1105px;
	border-radius: 45px;
    background-image: url('../assets/social-media/instagram/Motorola lifestyle Instagram.png');
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
    box-shadow: -1px 1px 4px rgba(107,124,147,.5);
    transition: opacity 1s ease;
    transform-origin: 0 0;
    overflow: hidden;
    will-change: transform;
    transition: 1s;
}


</style>