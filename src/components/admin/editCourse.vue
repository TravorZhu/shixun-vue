<template>
<div>
  <section class="content-header">
    <h1>

      添加课程

      <!--        <small>Advanced form element</small>-->
    </h1>
    <ol class="breadcrumb">
      <li><router-link :to="'/admin'">><i class="fa fa-dashboard"></i>主页</router-link></li>
      <li><a href="#">课程操作</a></li>
      <li class="active">修改课程</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">修改课程</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="alert alert-success" v-if="success">修改成功</div>
            <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>
              <!--                        课程名。老师id。课程id。上课时间。课程信息-->
              <!-- text input -->
              <div class="form-group" id="cid-form">
                <label>课程ID</label>
                <input class="form-control" disabled id="cid" placeholder="" type="text" v-model="cid">
              </div>
              <div class="form-group" id="cname-form">
                <label>课程名</label>
                <input id="cname" type="text" class="form-control" placeholder="输入 ..." v-model="cname">
              </div>
              <div class="form-group" id="tid-form">
                <label>老师ID</label>
                <input id="tid" type="text" class="form-control" placeholder="输入 ..." v-model="tid">
              </div>
              <div class="form-group" id="ctime-form">
                <label>上课时间</label>
                <input id="ctime" type="text" class="form-control" placeholder="输入..." v-model="ctime">
              </div>
              <div class="form-group" id="cinfo-form">
                <label>课程信息</label>
                <input id="cinfo" type="text" class="form-control" placeholder="请输入..." v-model="cinfo">

              </div>
              <div class="box-footer">
                <button v-on:click="updateCourse" class="btn btn-primary">提交</button>
              </div>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->

      </div>
    </div>
  </section>
</div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'editCourse',
  data () {
    return {
      cid: '',
      cname: '',
      tid: '',
      ctime: '',
      cinfo: '',
      success: '',
      errormsg: ''
    }
  },
  created: function () {
    console.log(this.$route)
    this.cid = this.$route.query.cid
    this.cname = this.$route.query.cname
    this.tid = this.$route.query.tid
    this.ctime = this.$route.query.ctime
    this.cinfo = this.$route.query.cinfo
  },
  methods: {
    updateCourse: function () {
      var data = {
        'uniqueToken': this.$store.token,
        'cid': this.cid,
        'cname': this.cname,
        'tid': this.tid,
        'ctime': this.ctime,
        'info': this.cinfo
      }
      console.log(data)
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/admin/updateCourse',
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
            this.$router.push('listAllCourse')
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          this.errormsg = '服务器访问出错'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
