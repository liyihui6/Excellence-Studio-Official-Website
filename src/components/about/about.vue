<template>
    <div class="about" ref="container">
      <div class="about-menu"><Menu active-name="1">
        <MenuItem name="1" to="/about/introduce">
          <Icon type="md-document" />
          工作室简介
        </MenuItem>
        <MenuItem name="2" to="/about/standard">
          <Icon type="md-chatbubbles" />
          招新标准
        </MenuItem>
        <MenuItem name="3" to="/about/pattern">
          <Icon type="md-heart" />
          运行模式
        </MenuItem>
        <MenuItem name="4" to="/about/Administration">
          <Icon type="md-leaf" />
          管理机制
        </MenuItem>
        <MenuItem name="5" to="/about/direction">
          <Icon type="ios-compass" />
          培养方向
        </MenuItem>
      </Menu></div>
      <div class="about-content">
        <transition name="slide-fade">
          <router-view/>
        </transition>
      </div>
    </div>
</template>

<script>
export default {
  name: 'about',
  mounted () {
    let em = this.$refs.container
    let height = window.innerHeight
    em.style.height = (height - 60) + 'px'
  }
}
</script>

<style scoped lang="stylus">
.about
  width 100%
  display flex
  justify-content space-between
  .about-menu
    display: inline-block
  .about-content
    width 100%
    display inline-block
    .slide-fade{
      position: absolute;left:0;right: 0;
    }
    .slide-fade-enter-active {
      transition: all 1.2s ease;
    }
    .slide-fade-leave-active {
      transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
      left:0;right: 0;
      transform: translateX(50px);
      opacity: 0;
    }
</style>
