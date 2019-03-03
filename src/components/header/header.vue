<template>
    <div class="headers">
      <div class="content-wrapper">
        <div class="content">
          <Menu mode="horizontal" active-name="1">
            <div style="display: inline;float:left;margin-right: 40px">
              <span style="cursor: pointer" @click="toindex()">VR卓越工作室</span>
            </div>
            <MenuItem name="1" to="/index">
              <Icon type="ios-paper" />
              首页
            </MenuItem>
            <MenuItem name="2" to="/about">
              <Icon type="ios-people" />
              关于我们
            </MenuItem>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-stats" />
                加入我们
              </template>
              <MenuGroup title="申请加入">
                <MenuItem name="3-1"><div @click="showapply"><span>填写申请表</span></div></MenuItem>
              </MenuGroup>
              <MenuGroup title="查看进度">
                <MenuItem name="3-2"><div @click="showprogress"><span>申请进度</span></div></MenuItem>
              </MenuGroup>
              <MenuGroup title="正式成员">
                <MenuItem name="3-3"><div @click="showmembers"><span>正式成员</span></div></MenuItem>
              </MenuGroup>
            </Submenu>
            <MenuItem name="4">
              <div @click="$Opinion">
                <Icon type="ios-construct" />
                意见反馈
              </div>
            </MenuItem>
            <div style="float: right">
              <MenuItem name="5">
                <div v-if="!loginFlag" @click="show()">
                  <Icon type="ios-contact" />
                  <span style="margin-left: 5px">登录</span>
                </div>
                <div v-else>
                  <Icon type="ios-contact" />
                  <span style="margin-left: 5px">{{user.studName}}</span>
                </div>
              </MenuItem>
              <MenuItem name="6">
                <div v-if="!loginFlag" @click="showregister()">
                  <Icon type="md-person-add" />
                  <span style="margin-left: 5px">注册</span>
                </div>
                <div v-else @click="zhuxiao">
                  <Icon type="md-person-add" />
                  <span style="margin-left: 5px">注销</span>
                </div>
              </MenuItem>
            </div>
          </Menu>
        </div>
      </div>
      <Modal
        v-model="modal1"
        title="登 录"
        width="400px"
        @on-ok="ok"
        @on-cancel="cancel">
        <div style="padding: 18px;">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" @keyup.enter.native="loginSubmit('formInline')" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <Button style="width:100%" type="primary" @click="loginSubmit('formInline')">登录</Button>
            <div style="padding-top: 10px">
              <a href="#"><span style="float:left;">还未注册？</span></a>
              <a href="#"><span style="float:right;">忘记密码？</span></a>
            </div>
          </Form>
        </div>
        <div slot="footer">
        </div>
      </Modal>
      <Modal
        v-model="Opinion"
        title="填写意见"
        width="400px"
        @on-cancel="cancel">
        <div style="padding: 18px;">
          <label>
            <Select v-model="OpinionType" style="width:200px;margin: 10px auto">
              <Option v-for="item in Opinions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </label>
          <div style="margin-bottom: 24px;vertical-align: top;"><Input v-model="Feedback" type="textarea" placeholder="Enter Feedback" style="width: 100%" /></div>
          <Button type="primary" style="width: 100%" @click="Submit">Submit</Button>
        </div>
        <div slot="footer">
        </div>
      </Modal>
      <Modal
        v-model="apply_progress"
        title="申请进度"
        width="800px"
        @on-cancel="cancel">
        <div style="padding: 18px;">
          <Steps :current="user.status">
            <Step title="提交申请" content="这里是该步骤的描述信息"></Step>
            <Step title="申请通过" content="这里是该步骤的描述信息"></Step>
            <Step title="笔试通过" content="这里是该步骤的描述信息"></Step>
            <Step title="面试通过" content="这里是该步骤的描述信息"></Step>
            <Step title="正式成员" content="这里是该步骤的描述信息"></Step>
          </Steps>
        </div>
        <div slot="footer">
        </div>
      </Modal>
      <Modal
        v-model="apply"
        title="申请"
        width="1000px"
        @on-cancel="cancel">
        <div style="padding: 18px;">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="Name" prop="name">
              <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="Class" prop="class">
              <Input v-model="formValidate.class" placeholder="Enter your class"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="mail">
              <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="感兴趣的技术" prop="Technology">
              <RadioGroup v-model="formValidate.Technology">
                <Radio label="10000">前端</Radio>
                <Radio label="01000">后端</Radio>
                <Radio label="00100">架构</Radio>
                <Radio label="00010">运营</Radio>
                <Radio label="00001">VR & AR</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="技术的了解程度" prop="Technology_degree">
              <RadioGroup v-model="formValidate.Technology_degree">
                <Radio label="nothing">小白</Radio>
                <Radio label="something">对部分有了解</Radio>
                <Radio label="mogul">我是大神</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="工作室的了解程度" prop="Studio_degree">
              <RadioGroup v-model="formValidate.Studio_degree">
                <Radio label="never">没听说过</Radio>
                <Radio label="little">听说过,但不是很了解</Radio>
                <Radio label="very">很了解</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="对考研的想法" prop="Idea">
              <RadioGroup v-model="formValidate.Idea">
                <Radio label="no">不想考</Radio>
                <Radio label="unclear">现在不清楚</Radio>
                <Radio label="must">很想考</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="自我介绍" prop="desc">
              <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
        </div>
      </Modal>
      <Modal
        v-model="members"
        title="正式成员"
        width="1000px"
        @on-cancel="cancel">
        <div style="padding: 18px;">
          <Table height="400" border :columns="columns" :data="membersData"></Table>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'header',
  data () {
    return {
      user: {},
      Feedback: '',
      apply: false,
      modal1: false,
      loginFlag: false,
      Opinion: false,
      apply_progress: false,
      members: false,
      Opinions: [
        {
          value: '网站建设',
          label: '网站建设'
        },
        {
          value: '工作室建议',
          label: '工作室建议'
        },
        {
          value: '学风建设',
          label: '学风建设'
        },
        {
          value: '其他建议',
          label: '其他建议'
        }
      ],
      OpinionType: '',
      columns: [
        {
          title: 'Name',
          key: 'studName'
        },
        {
          title: 'Class',
          key: 'className'
        },
        {
          title: 'Email',
          key: 'email'
        },
        {
          title: 'Job',
          key: 'job',
          default: '正式成员'
        }
      ],
      membersData: [
      ],
      formValidate: {
        name: '',
        mail: '',
        class: '',
        Technology: '',
        Technology_degree: '',
        Studio_degree: '',
        Idea: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        class: [
          { required: true, message: 'The class cannot be empty', trigger: 'blur' }
        ],
        Technology: [
          { required: true, message: 'Please select technology', trigger: 'change' }
        ],
        Technology_degree: [
          { required: true, message: 'Please select technology degree', trigger: 'change' }
        ],
        Studio_degree: [
          { required: true, message: 'Please select studio degree', trigger: 'change' }
        ],
        Idea: [
          { required: true, message: 'Please select idea', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 4, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
    },
    show () {
      this.modal1 = true
    },
    showprogress () {
      if (!this.user.studName) {
        this.$Message.error('请先登录')
        return
      }
      this.apply_progress = true
    },
    showapply () {
      if (!this.user.studName) {
        this.$Message.error('请先登录')
        return
      }
      if (this.user.status >= 2) {
        this.$Message.error('你已经提交给申请了！请静候佳音')
        return
      }
      this.apply = true
    },
    showmembers () {
      this.members = true
      this.$http.get('/getStudent?status=5').then(res => {
        let membersDatas = res.data
        for (let x of membersDatas) {
          Vue.set(x, 'job', '正式成员')
        }
        this.membersData = membersDatas
        this.$Message.success('获取数据成功!')
      }).catch(res => {
        this.$Message.error('获取数据失败!')
      })
    },
    showregister () {
      this.$Message.info({
        content: '注册功能尚未开放',
        duration: 2,
        closable: true
      })
    },
    Submit () {
      if (!this.user.studName) {
        this.$Message.error('请先登录')
        return
      }
      let title = this.OpinionType
      let context = this.Feedback
      let time = (new Date()).getTime()
      this.$http.post(`/putSuggest?suggestTitle=${title}&studNum=${this.user.studNum}&suggestContext=${context}&suggestTime=${time}`).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
      this.Opinion = false
      this.$Message.info('提交成功')
    },
    zhuxiao () {
      if (!this.user.studName) {
        this.$Message.error('请先登录')
        return
      }
      this.loginFlag = false
      this.user = {}
      this.$Message.success('注销成功')
    },
    $Opinion () {
      if (!this.user.studName) {
        this.$Message.error('请先登录')
        return
      }
      this.Opinion = true
    },
    toindex () {
      this.$router.push('/index')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let registerdata = this.formValidate
          let data = {
            studName: registerdata.name,
            className: registerdata.class,
            tec: registerdata.Technology,
            knowDeep: registerdata.Technology_degree,
            knowWe: registerdata.Studio_degree,
            pee: registerdata.Idea,
            suggest: registerdata.desc,
            studNum: this.user.studNum,
            email: registerdata.mail
          }
          this.$http.post(`/putApply?email=${data.email}&studName=${data.Name}&className=${data.className}&tec=${data.tec}&knowDeep=${data.knowDeep}&knowWe=${data.knowWe}&pee=${data.pee}&suggest=${data.suggest}&studNum=${data.studNum}`, JSON.stringify(data)).then(res => {
            this.user.studName = data.studName
            this.apply = false
            this.$Message.success('Success!')
          }).catch(res => {
            console.log(res)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    loginSubmit (name) {
      let data = this.formInline
      let studNum = data.user
      let password = data.password
      let url = `/user/login?studNum=${studNum}&password=${password}`
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post(url, {headers: {'content-type': 'application/json;charset=UTF-8'}}).then(res => {
            res = res.data
            if (res.code === 1) {
              this.$Message.success('登陆成功！')
              this.loginFlag = true
              this.user = res.student
              if (!this.user.studName) {
                Vue.set(this.user, 'studName', '路人甲')
              }
              this.modal1 = false
            } else if (res.code === 0) {
              this.$Message.success('账号或者密码错误！')
            } else {
              this.$Message.success('参数错误！')
            }
          }).catch(res => {
            console.log('error')
            console.log(res)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  props: {
  }
}
</script>

<style scoped lang="stylus">
.headers
  width 100%
  position fixed
  z-index 1000
  top 0
  left: 0
  background: #fff;
  .content-wrapper
    width 95%
    height 60px
    background: #fff;
    margin 0 auto
</style>
