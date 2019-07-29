<template>
  <div>
    <section class="content-header">
      <h1>
        添加考试
        <!--        <small>Advanced form element</small>-->
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
        <li><a href="#">考试</a></li>
        <li class="active">添加考试</li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">添加考试</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="alert alert-success" v-if="success">{{success}}</div>
              <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>
              <form role="form">
                <div class="form-group" id="usertype-form">
                  <label>课程</label>
                  <select class="form-control" name="state" v-model="cid" v-on:change="hid=cid+parseInt(Math.random()*100000,10)+1">
                    <option v-for="i in courselist" v-bind:value="i.cid" v-bind:key="i.cid">{{i.cname}}</option>
                  </select>
                </div>
                <div class="form-group" id="cid-form">
                  <label>作业ID</label>
                  <input type="text" class="form-control" placeholder="输入 ..." v-model="hid">
                </div>
                <div class="form-group" id="cname-form">
                  <label>作业名称</label>
                  <input type="text" class="form-control" placeholder="输入 ..." v-model="htitle">
                </div>
                <div class="form-group" id="tid-form">
                  <label>作业文件</label>
                  <input id="hfile" type='file' class="form-control" v-if="false">
                  <button class="btn btn-file" v-on:click="upload">上传文件</button>{{filename}}
                </div>
                <div class="box-footer">
                  <button class="btn btn-primary" v-on:click="submit">提交</button>
                </div>
              </form>
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
  name: 'pushHomework',
  data () {
    return {
      cid: '',
      hid: '',
      htitle: '',
      courselist: '',
      errormsg: '',
      success: '',
      filename: ''
    }
  },
  created () {
    var data = {
      'uniqueToken': this.$store.token
    }
    $.ajax({
      // method: "POST",
      type: 'POST',
      url: 'http://120.78.78.174:6233/teacher/getAllCourse',
      async: false, // 使用同步方式
      // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
      // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
      // headers:{"Authorization":""},
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      // dataType: "json",
      success: (d) => {
        if (d.status === 200) {
          d.data.forEach((item, index) => {
            this.courselist.push({cid: item.cid, cname: item.cname, score: 0})
          })
        } else {
          this.errormsg = d.msg
        }
      }, // 注意不要在此行增加逗号,
      error: function (e) {
        this.errormsg = e.msg
      }
    })
  },
  methods: {
    upload: function () {
      $('#hfile').click()
    },
    fileUpdate: function () {
      this.filename = $('#hfile').files[0].name
    },
    submit: function () {
      var form = new FormData()
      form.push('uniqueToken', this.$store.token)
      form.push('cid', this.cid)
      form.push('hid', this.hid)
      form.push('htitle', this.htitle)
      form.push('file', $('#file')[0].files[0])
      $.ajax({
        // TODO:发布作业
        url: 'http://120.78.78.174:6233/teacher/',
        dataType: 'json',
        type: 'POST',
        async: false,
        // data:JSON.stringify(data),
        data: form,
        processData: false,
        contentType: false,
        success: (data) => {
          console.log(data)
          if (data.status === 200) { this.success = true }
        },
        error: (response) => {
          this.errormsg = response.msg
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
