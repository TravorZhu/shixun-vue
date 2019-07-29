<template>
  <div>
    <section class="content-header">
      <h1>
        考试成绩提交
        <small>Advanced form element</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
        <li><a href="#">考试成绩提交</a></li>
      </ol>
      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">考试成绩提交</h3>
                <div class="box-tools">
                </div>
              </div>
              <div class="box-body">
                <div class="alert alert-success" v-if="success">{{success}}</div>
                <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>
                <div class="col-xs-3">
                  课程
                  <select class="form-control" name="state" v-on:change="courseChange" v-model="cid">
                    <option v-for="i in courselist" v-bind:value="i.cid" v-bind:key="i.cid">{{i.cname}}</option>
                    </select>
                </div>
                <div class="col-xs-3">
                  考试
                  <select class="form-control" name="state" v-on:change="examChange" v-model="eid">
                    <option v-for="i in examlist" v-bind:value="i.eid" v-bind:key="i.eid">{{i.etitle}}</option>
                  </select>
                </div>
                <v-table id="example2" class="table table-bordered table-hover"
                         :data="allSourseList"
                         :filters="filters"
                         :currentPage.sync="currentPage"
                         :pageSize="5"
                         @totalPagesChanged="totalPages = $event">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>成绩</th>
                    <th>提交</th>
                  </tr>
                  </thead>
                  <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="item in displayData" :key="item.hid">
                    <td>{{item.sid}}</td>
                    <td>{{item.sname}}</td>
                    <td><input class="form-control" type="number" v-bind:value="item.score" v-bind:id="'score'+item.sid"></td>
                    <td><button v-on:click="submit(item.sid)">提交</button></td>
                  </tr>
                  </tbody>
                </v-table>
              </div>
              <div class="box-footer clearfix">
                <smart-pagination
                  :currentPage.sync="currentPage"
                  :totalPages="totalPages"
                  class="pagination pagination-sm no-margin pull-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'ExamScoreSubmit',
  data () {
    return {
      // editorData: '<p>公告内容</p>',
      // editorConfig: {},
      etitle: '',
      cid: '',
      courselist: [],
      errormsg: '',
      success: '',
      allStudentList: [],
      allStudentMap: [],
      currentPage: 1,
      totalPages: 0,
      eid: '',
      examlist: []
    }
  },
  created () {
    this.errormsg = ''
    this.success = ''
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
    submit: function (sid) {
      this.errormsg = ''
      this.success = ''
      var data = {
        'uniqueToken': this.$store.token,
        'eid': this.eid,
        'sid': sid,
        'score': $('#score' + sid).val()
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        // TODO:提交该学生的成绩
        url: 'http://120.78.78.174:6233/teacher/',
        async: true,
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
        error: (e) => {
          this.errormsg = e.msg
        }
      })
    },
    courseChange: function () {
      this.allStudentMap = {}
      this.allStudentList = []
      this.examlist = []
      this.errormsg = ''
      this.success = ''
      var data = {
        'uniqueToken': this.$store.token,
        'cid': this.cid
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
              this.examlist.push({cid: item.cid, cname: item.cname})
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
    examChange: function () {
      this.allStudentMap = {}
      this.allStudentList = []
      this.errormsg = ''
      this.success = ''
      var data = {
        'uniqueToken': this.$store.token,
        'cid': this.cid,
        'eid': this.eid
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        // TODO:查询该课程学生的地址
        url: 'http://120.78.78.174:6233/teacher/',
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
              this.allStudentMap[item.uid] = { sid: item.uid, sname: item.uname, score: 0 }
            })
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          this.errormsg = e.msg
        }
      })
      $.ajax({
        // method: "POST",
        type: 'POST',
        // TODO:查询该课程学生成绩地址
        url: 'http://120.78.78.174:6233/teacher/',
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
              this.allStudentMap[item.cid] = item.score
            })
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          this.errormsg = e.msg
        }
      })
      this.allStudentList = Object.values(this.allStudentMap).map(item => item)
    }
  }
}
</script>

<style scoped>
input {
  border-radius: 3px;
}

</style>
