<template>
    <div class="direction">
      <h1 class="title">培养方向</h1>
      <Divider />
      <article class="content">
        <p>VR卓越工作室现阶段在学生培养方面共有五大方向，分别为：</p>
        <Table style="width: 900px;margin-top: 20px" border :columns="columns1" :data="data1"></Table>
      </article>
    </div>
</template>

<script>
export default {
  name: 'direction',
  data () {
    return {
      columns1: [
        {
          title: '大致方向',
          key: 'name'
        },
        {
          title: '具体方向',
          key: 'content'
        }
      ],
      data1: [
        {
          name: '前端',
          content: '前端全栈开发 | 前端交互设计 | 前端网页排版'
        },
        {
          name: '后台',
          content: 'JAVA语言开发  | .NET语言开发  | PHP语言开发  | 企业微信开发  | APP语言开发'
        },
        {
          name: 'VR & AR',
          content: 'Unity3D游戏引擎  |  VR体验开发  |  AR体验开发  |  全景技术开发'
        },
        {
          name: '架构',
          content: '数据库运维  |  Linux服务器  |  Docker云容器  |  微服务架构  |  大数据分析'
        },
        {
          name: '运营',
          content: 'SEO文案撰写  |  策划推广  |  市场营销  |  产品经理'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.direction
  font-size 0
  padding 20px 20px
  .title
    font-size 32px
    color: #2d8cf0;
  .content
    font-size 16px
    line-height 34px
</style>
