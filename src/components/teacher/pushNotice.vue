<template>
  <div>
    <section class="content-header">
      <h1>
        发布公告
<!--        <small>Advanced form element</small>-->
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active"><a href="#">发布公告</a></li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <div class="box-header">
              <h3 class="box-title">发布公告
                <!--                <small>Advanced and full of features</small>-->
              </h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body pad">
              <div class="alert alert-success" v-if="success!==''">{{success}}</div>
              <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>

              <div class="form-group" id="cid-form">
                <label>通知标题</label>
                <input id="cid" type="text" class="form-control" placeholder="输入 ..." v-model="ntitle">
              </div>
              <div class="form-group" id="usertype-form">
                <label>课程</label>
                <select class="form-control" id="usertype" v-model='cid'>
                  <option v-for="i in courselist" v-bind:value="i.cid" v-bind:key="i.cid">{{i.cname}}</option>
                </select>
              </div>
              <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :height="'300px'"></ckeditor>
              <div class="box-footer">
                <button type="submit" class="btn btn-primary" v-on:click="submit">提交</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box -->
      </div>
      <!-- /.col-->
      <!-- ./row -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
// import $ from 'jquery'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import $ from 'jquery'

export default {

  name: 'notice',
  data () {
    return {
      editor: ClassicEditor,
      editorData: '<p>公告内容</p>',
      editorConfig: {},
      ntitle: '',
      cid: '',
      courselist: [],
      errormsg: '',
      success: ''
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
            this.courselist.push({cid: item.cid, cname: item.cname})
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
    submit: function () {
      var data = {
        uniqueToken: this.$store.token,
        ntitle: this.ntitle,
        content: this.editorData,
        cid: this.cid
      }
      console.log(data)
      $.ajax({
        // method: "POST",
        type: 'POST',
        // TODO:发布公告
        url: 'http://120.78.78.174:6233/teacher/publishNotice',

        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            this.success = d.msg
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          this.errormsg = e.msg
        }
      })
    }
  }
}
</script>

<style scoped>
.ck-editor__editable {
  min-height: 500px;
}
</style>
