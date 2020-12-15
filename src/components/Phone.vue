<script>
export default {
    name: 'Phone',
    data() {
        return {

        }
    },
    props: {
        contentIndex: Number,
        alt1: Boolean,
        alt2: Boolean,
        altHome: Boolean
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
        <div 
        class="screen" 
        :class="( 
            alt1 ? 
            'alt1-'+contentIndex : 
            ( 
                alt2 ? 
                'alt2-'+contentIndex : 
                'screen'+contentIndex
            ) 
        )">
            <div class="content-inner">
                <div 
                class="app-top" 
                :class="( 
                    contentIndex == 7 ? 
                    'top-motobb' : 
                    ( 
                        contentIndex == 8 ? 
                        'top-motolifestyle' : 
                        ( 
                            contentIndex == 9 ? 
                            'top-obliphica' : 
                            ( 
                                contentIndex == 10 ? 
                                'top-ateam' : 
                                'gone'
                            )
                        ) 
                    ) 
                )"></div>
                <div 
                class="app-content" 
                :class="( 
                    contentIndex == 7 ? 
                    'content-motobb' : 
                    ( 
                        contentIndex == 8 ? 
                        'content-motolifestyle' : 
                        ( 
                            contentIndex == 9 ? 
                            'content-obliphica' : 
                            ( 
                                contentIndex == 10 ? 
                                'content-ateam' : 
                                'gone'
                            ) 
                        ) 
                    ) 
                )"></div>
            </div>
        </div>
	</div>
</template>

<style lang="scss" scoped>

@keyframes scroll {
    to {
        background-position-y: -862px;
    }
}

.gone {
    background-image: url('../assets/social-media/instagram/crops/content_motobaby.png');
    opacity: 0 !important;
}

.content-motobb {
    background-image: url('../assets/social-media/instagram/crops/content_motobaby.png');
}

.content-motolifestyle {
    background-image: url('../assets/social-media/instagram/crops/content_motolifestyle.png');
}

.content-obliphica {
    background-image: url('../assets/social-media/instagram/crops/content_obliphica.png');
}

.content-ateam {
    background-image: url('../assets/social-media/instagram/crops/content_ateam.png');
}

.app-content {
    opacity: 1;
    transition: 2s;
    height: 362px;
    width: 100%;
    background-size: cover;
    background-repeat: repeat-y;
    animation: scroll 24s linear infinite;
    //transition-delay: opacity 2s;
}

.app-top {
    width: 100%;
    height: 145px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    //transition-delay: 2s;
    //transition: 1s;
}

.top-motobb {
    background-image: url('../assets/social-media/instagram/crops/topbar_motobaby.png');
}

.top-motolifestyle {
    background-image: url('../assets/social-media/instagram/crops/topbar_motolifestyle.png');
}

.top-obliphica {
    background-image: url('../assets/social-media/instagram/crops/topbar_obliphica.png');
}

.top-ateam {
    background-image: url('../assets/social-media/instagram/crops/topbar_ateam.png');
}

.inner-rotatable {
    //background: yellow;
    transform: rotate(90deg);
    color: black;

    h1 {
        color: white;
    }

    .card-container {
        display: flex;
    }

    .card {
        border-radius: 24px;
        margin-top: 64px;
        color: white;
    }

    .card-left {
        margin-right: 8px;
        background: rgba(white, 0.2);
        height: 420px;
        width: 530px;
    }

    .card-right {
        margin-left: 8px;
        background: rgba(white, 0.2);
        height: 420px;
        width: 530px;
    }
}

.inner-content {
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    height: 100%;
    width: 100%;
    margin: 0px;
}

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

.screen0 {
	background-image: url("../assets/social-media/instagram/Obliphica Instagram.png");
}

.screen1 {
	background-image: url("../assets/social-media/instagram/Motorola Baby Instagram.png");
}

.screen2 {
	background-image: url("../assets/social-media/instagram/full/full-obliphica2.png");
}

.screen3 {
	background-image: url("../assets/social-media/instagram/comments/comment2.png");
}

.screen4 {
	background-image: url("../assets/social-media/benchmarking.png");
}

.screen5 {
	background-image: url("../assets/social-media/pricing.png");
}

.screen6 {
	background-image: url("../assets/social-media/addons.png");
}

.screen7 {
	background-image: url("../assets/social-media/addons.png");
}

.screen8 {
	background-image: url("../assets/social-media/addons.png");
}

.screen9 {
	background-image: url("../assets/social-media/addons.png");
}

.screen10 {
	background-image: url("../assets/social-media/addons.png");
}

// ---------- alt1 ----------

.alt1-0 {
    background-image: url("../assets/social-media/instagram/full/full-obliphica.png");
}

.alt1-1 {
    background-image: url("../assets/social-media/instagram/full/full-obliphica.png");
}

.alt1-2 {
    background-image: url("../assets/social-media/instagram/full/full-obliphica.png");
}

.alt1-3 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}

.alt1-4 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}

.alt1-5 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}
.alt1-6 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}
.alt1-7 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}
.alt1-8 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}
.alt1-9 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}
.alt1-10 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}
.alt1-11 {
    background-image: url("../assets/social-media/instagram/comments/comment3.png");
}

// ---------- alt2 ----------

.alt2-0 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-1 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-2 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-3 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-4 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-5 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-6 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-7 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-8 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-9 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-10 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

.alt2-11 {
    background-image: url("../assets/social-media/instagram/comments/comment1.png");
}

// ---------- end of alt ----------

</style>