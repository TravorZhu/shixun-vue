<template>
  <div :style="note">
    <div class="login-box">
      <div class="login-logo">
        <a style="color:#fff"><b>华侨大学</b>课程系统</a>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body" style="background-color: #56666B;color:#fff;border-radius:7px;">
        <p class="login-box-msg">请输入你的账号密码登录</p>
        <div class="callout callout-danger" v-if="errormsg!==''">{{errormsg}}</div>

        <div class="form-group has-feedback">
          <input class="form-control" id="username" placeholder="账号" style="border-radius:4px;" type="text" v-model="username">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input class="form-control" id="password" placeholder="密码" style="border-radius:4px;" type="password" v-model="password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button class="btn btn-primary btn-block btn-flat" id="login"
                    style="border-radius:4px;background-color: #e8f0fe;color:#777" v-on:click="login">登录
            </button>
          </div>
          <!-- /.col -->
        </div>

      </div>
      <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->
  </div>

</template>

<script>

  import $ from 'jquery'

  export default {

  name: 'login',
  data () {
    return {
      success: false,
      errormsg: '',
      note: {
        width: '100%',
        height: '100%',
        backgroundImage: 'url(' + require('../assets/a.jpg') + ')',
        backgroundPosition: 'center center',
        // backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        position: 'absolute'
      },
      username: '',
      password: '',
      error: ''
    }
  },
  created: function () {
    var data = {
      'uniqueToken': this.$store.token
    }
    if (this.$store.token === '' || this.$store.token == null) { return }
    $.ajax({
      // method: "POST",
      type: 'POST',
      url: 'http://120.78.78.174:6233/user/logout',
      // async: false, // 使用同步方式
      // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
      // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
      // headers:{"Authorization":""},
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      // dataType: "json",
      success: d => {
        // console.log(d)
        if (d.status === 200) {
          this.$router.push('login')
        } else {
          this.errormsg = d.msg
        }
      }, // 注意不要在此行增加逗号,
      error: function (e) {
        console.log(e)
        this.errormsg = '服务器连接出错'
      }
    })
    this.$store.token = ''
    this.$store.type = ''
  },
  // created: function () {
  // },
  methods: {
    login: function (e) {
      // this.$store.token = '233333'
      // this.$store.type = 'admin'
      // const store = this.$store
      // console.log(store)
      this.error = ''
      // this.$router.push('admin')
      var data = {
        'uid': this.username,
        'upass': this.password,
        'usertype': ''
      }
      // $.ajaxSetup({async: true})
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/user/login',
        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: d => {
          console.log(d)
          if (d.status === 200) {
            // console.log(this.store)
            this.$store.token = d.data.uniqueToken
            this.$store.type = d.data.usertype
            console.log(this.$store)
            switch (this.$store.type) {
              case 'student':
                this.$router.push('student')
                break
              case 'teacher':
                this.$router.push('teacher')
                break
              case 'admin':
                this.$router.push('admin')
                break
            }
          } else {
            console.log('error')
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          console.log('error')
          this.errormsg = '服务器连接出错'
        }
      })
    }
  }
}
</script>

<style scoped>
  html,body {
    height: 100%;
    width: 100%
  }

</style>
