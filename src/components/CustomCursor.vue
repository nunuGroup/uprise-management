<template>
  <div class="custom-cursor">
    <div class="custom-cursor__circle" :style="circleStyle" ref="customCursorCircle"></div>
    <div class="custom-cursor__dot" :style="dotStyle" ref="customCursorDot"></div>
  </div>
</template>

<script>
export default {
  name: "CustomCursor",
  props: {
    targets: Array,
    circleColor: String,
    circleColorHover: String,
    dotColor: String,
    dotColorHover: String,
    hoverSize: Number
  },
  data() {
    return {
      scale: 1,
      x: null,
      y: null,
      circlePosX: null,
      circlePosY: null,
      dotPosX: null,
      dotPosY: null,
      circleStyle: null,
      dotStyle: null
    };
  },
  methods: {
    customCursor(e) {
      // cursor pos
      this.x = e.clientX;
      this.y = e.clientY;
      // cursor circle
      const circle = this.$refs.customCursorCircle;
      this.circlePosX = this.x - circle.clientWidth / 2;
      this.circlePosY = this.y - circle.clientWidth / 2;
      // cursor circle
      const dot = this.$refs.customCursorDot;
      this.dotPosX = this.x - dot.clientWidth / 2;
      this.dotPosY = this.y - dot.clientHeight / 2;
      //change style when hovering on selected targets
      if (
        (this.targets.length > 0 &&
          this.targets.includes(e.target.tagName.toLowerCase())) ||
        this.targets.includes(e.target.className.toLowerCase())
      ) {
        this.scale = this.hoverSize;
        this.circleStyle = { borderColor: this.circleColorHover };
        this.dotStyle = { backgroundColor: this.dotColorHover };
      } else {
        this.scale = 1;
        this.circleStyle = { borderColor: this.circleColor };
        this.dotStyle = { backgroundColor: this.dotColor };
      }
      //move custom cursor
      circle.style.transform = `translate(${this.circlePosX}px,${this.circlePosY}px) scale(${this.scale})`;
      dot.style.transform = `translate(${this.dotPosX}px,${this.dotPosY}px)`;
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.customCursor);
  }
};
</script>

<style lang="scss" scoped>
$ease: cubic-bezier(0.23, 1, 0.32, 1);
.custom-cursor {
  cursor: none;
  pointer-events: none;
}
.custom-cursor__circle {
  position: fixed;
  cursor: none;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  //border: 4px solid white;
  background: rgba(white, 0.2);
  border-radius: 50%;
  transform: translate(-100%, -100%);
  transition: 0.4s $ease;
}
.custom-cursor__dot {
  position: fixed;
  cursor: none;
  z-index: 999;
  top: 1px;
  left: 1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  transform: translate(-100%, -100%);
  transition: 0.2s $ease;
}
</style>