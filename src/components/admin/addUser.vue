<template>
  <div>
    <section class="content-header">
      <h1>
        添加用户
        <!--        <small>Advanced form element</small>-->
      </h1>
      <ol class="breadcrumb">
        <li><router-link :to="'/admin'"><i class="fa fa-dashboard"></i>主页</router-link></li>
        <li><a href="#">用户操作</a></li>
        <li class="active">添加用户</li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">添加用户</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="alert alert-success" v-if="success">添加成功</div>
              <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>

                <div class="form-group" id="usertype-form">
                  <label>用户类型</label>
                  <select class="form-control" id="usertype" v-model="usertype">
                    <option value="admin">管理员</option>
                    <option value="teacher">老师</option>
                    <option value="student">学生</option>
                  </select>
                </div>

                <!-- text input -->
                <div class="form-group" id="uid-form">
                  <label>用户ID</label>
                  <input id="uid" type="text" class="form-control" placeholder="输入 ..." v-model="userid">
                </div>
                <div class="form-group" id="upass-form">
                  <label>密码</label>
                  <input id="upass" type="password" class="form-control" placeholder="输入 ..." v-model="userpass">
                </div>
                <div class="form-group" id="uname-form">
                  <label>名字</label>
                  <input id="uname" type="text" class="form-control" placeholder="输入 ..." v-model="username">
                </div>
                <div class="box-footer">
                  <button type="submit" class="btn btn-primary" v-on:click="submit">提交</button>
                </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col-->
      </div>
      <!-- ./row -->
    </section>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'addUser',
  data () {
    return {
      usertype: '',
      userid: '',
      userpass: '',
      username: '',
      errormsg: '',
      success: false
    }
  },
  methods: {
    submit: function () {
      this.success = false
      this.errormsg = ''
      var data = {
        'uniqueToken': this.$store.token,
        'uid': this.userid,
        'usertype': this.usertype,
        'upass': this.userpass,
        'uname': this.username
      }
      console.log(data)
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/admin/addUser',
        // async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            this.success = true
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: (e) => {
          this.errormsg = '服务器访问出错'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
