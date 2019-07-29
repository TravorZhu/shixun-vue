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
                  <select class="form-control" name="state" v-model="cid">
                    <option v-for="i in courselist" v-bind:value="i.cid" v-bind:key="i.cid">{{i.cname}}</option>
                  </select>
                </div>
                <div class="form-group" id="cid-form">
                  <label>考试ID</label>
                  <input id="cid" type="text" class="form-control" placeholder="输入 ..." v-model="eid">
                </div>
                <div class="form-group" id="cname-form">
                  <label>考试名称</label>
                  <input id="cname" type="text" class="form-control" placeholder="输入 ..." v-model="etitle">
                </div>
                <div class="form-group" id="tid-form">
                  <label>成绩所占百分比</label>
                  <input id="tid" type="text" class="form-control" placeholder="输入 ..." v-model="percentage">
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
  name: 'addExam',
  data () {
    return {
      cid: '',
      eid: '',
      etitle: '',
      percentage: '',
      courselist: '',
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
    submit: function () {
      var data = {
        'uniqueToken': this.$store.token,
        'eid': this.eid,
        'etitle': this.etitle,
        'percentage': this.percentage,
        'etime': this.etime
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

</style>
