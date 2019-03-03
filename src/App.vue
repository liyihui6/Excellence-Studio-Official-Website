<template>
  <div id="app">
    <div class="header"><Header></Header></div>
    <transition name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Markdown from '@/components/Markdown'
import header from '@/components/header/header'
export default {
  name: 'App',
  components: {
    Markdown,
    'Header': header
  },
  data () {
    return {
      // login_flag: false
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
#app
  width 100%
  padding 0
  margin-top 60px
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
