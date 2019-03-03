<template>
    <div>
      <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="value" @change="change" @save="saveToServer"/>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Markdown',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 数据发生变化的时候调用该函数
    change (value, render) {
      // console.log(render)
    },
    // 将数据保存到数据库中
    saveToServer (value, render) {
      console.log(render)
    },
    // 添加图片回调函数
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.vm.$img2Url(pos, url)
      })
    },
    // 删除图片回调函数
    $imgDel (filename) {
      var formdata = new FormData()
      formdata.append('filename', filename)
      axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
