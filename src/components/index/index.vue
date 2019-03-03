<template>
    <div class="index" ref="container">
      <div class="poster-content">
        <div class="poster-textcontent">
          <div class="poster-title">VR卓越工作室</div>
          <div class="poster-slogan">机会需要我们自己去寻找！</div>
          <div class="poster-slogan">相信自己， 因为你学的不仅是技术，更是梦想</div>
          <div class="poster-slogan">南昌市维悟科技有限公司是一家在线智
            慧旅游服务公司。公司专注于开发景区
            互动娱乐全景体验平台、包括景区互动
            游戏制作</div>
          <div class="play_video">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="22px" style="float: left">
              <path fill-rule="evenodd" fill="rgb(0, 96, 255)" d="M18.000,11.000 L-0.000,21.392 L-0.000,0.608 L18.000,11.000 Z"></path>
            </svg>
            <p style="margin-left: 20px;color: #fff">查看工作室详情</p>
          </div>
          <div class="first-botton">
            <a @click.prevent="" href="#" target="_blank">
              <div class="first botton-style t1">加入VR卓越工作室</div>
            </a>
            <a href="#" target="" @click="to_about">
              <div class="first botton-style t2">了解VR卓越工作室</div>
            </a>
          </div>
        </div>
      </div>
      <transition>
        <div class="Bulletin-board animated bounceInDown">
          <h2 class="title">公告栏</h2>
          <Divider />
          <div class="Notices">
            <div class="Notice" v-for="notice in notices" :key="notice.index">
              <a @click.prevent="showNoticeDetail(notice)" href="#" style="float: left"><p>{{notice.title}}</p></a>
              <span style="float: right;margin-right: 10px">{{notice.publicTime | dateFormat}}</span>
            </div>
          </div>
        </div>
      </transition>
      <Modal
        v-model="noticeflag"
        title="公告"
        width="1000px"
        @on-cancel="cancel">
        <div style="padding: 18px;">
          <h1>{{title}}</h1>
          <p style="margin: 10px 0;font-size: 14px">{{context}}</p>
          <p style="float: right;font-size: 14px">{{fabiaotime | dateFormat}}</p>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      notices: [],
      noticeflag: false,
      title: '',
      fabiaotime: '',
      context: ''
    }
  },
  mounted () {
    let em = this.$refs.container
    let height = window.innerHeight
    em.style.height = (height - 60) + 'px'
  },
  beforeCreate () {
    this.$http.get('/getNoticeTop5').then(res => {
      let notices = res.data
      console.log(notices)
      this.notices = notices
    })
  },
  methods: {
    to_about () {
      this.$router.push('/about')
    },
    showNoticeDetail (content) {
      this.noticeflag = true
      this.title = content.title
      this.context = content.context
      this.fabiaotime = content.publicTime
    },
    cancel () {
      console.log('cancel')
      this.title = ''
      this.context = ''
      this.fabiaotime = ''
    }
  },
  filters: {
    dateFormat (arg) {
      let date = new Date(parseInt(arg) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ').toString()
      return date.toString()
    }
  }
}
</script>

<style scoped lang="stylus">
.index
  position relative
  width 100%
  background: #eee;
  background-image url("./bg.jpg")
  background-size: 100% 100%;
  .poster-content
    max-width: 1600px;
    width: calc(80% - 90px);
    margin: 0 auto;
    min-width: 980px;
    .poster-textcontent
      color: #fff;
      overflow: hidden;
      height: 100%;
      letter-spacing 2px
      .poster-title
        font-size: 36px;
        float: left;
        width: 100%;
        font-weight: 600;
        margin-top: 170px;
      .poster-slogan
        font-size: 14px;
        float: left;
        width: 100%;
        margin-top: 10px;
      .play_video
        margin-top: 80px;
        float: left;
        width: 100%;
        font-size: 14px;
        line-height: 22px;
      .first-botton
        float: left;
        width: 100%;
        height: 55px;
        margin-top: 15px;
        color: #fff;
        .botton-style
          float: left;
          padding-left: 30px;
          padding-right: 30px;
          line-height: 55px;
          height: 100%;
          margin-right: 30px;
          border-radius: 3px;
          font-size: 14px;
          cursor: pointer;
          font-family: 'microsoft yahei ui', 'microsoft yahei';
        .t1
          background-color: #0060ff;
          transition: all linear .3s;
          color: #fff;
        .t2
          height: 53px;
          border: 1px solid #ffffff87;
          transition: all linear .3s;
          color: #fff;
  .Bulletin-board
    position absolute
    width 600px
    height 250px
    padding 0 20px
    border-radius 12px
    overflow hidden
    background: rgba(7,17,27,0.2)
    top: 20px
    right 20px
    .title
      text-align center
      font-size 14px
      padding-top 10px
      color #fff
    .Notices
      .Notice
        min-height 12px
        position static
        font-size 14px
        margin 20px 0
        color #fff
        a
          color #fff
</style>
