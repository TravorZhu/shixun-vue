<template>
  <div>
    <section class="content-header">
      <h1>
        点名
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
        <li><a href="#">点名</a></li>
      </ol>
      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">点名</h3>
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
                  成绩百分比
                  <input class="form-control" v-model="percentage" type="number">
                </div>
                <v-table id="example2" class="table table-bordered table-hover"
                         :data="allStudentList"
                         :currentPage.sync="currentPage"
                         :pageSize="5"
                         @totalPagesChanged="totalPages = $event"
                         style="table-layout: fixed;">
                  <thead slot="head">
                  <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>出席情况</th>
                  </tr>
                  </thead>
                  <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="item in displayData" :key="item.hid">
                    <td>{{item.sid}}</td>
                    <td>{{item.sname}}</td>
                    <td><div class="btn-group" v-bind:id="'stu'+item.sid"><button class="btn btn-success" v-bind:class="'btn btn-success stu'+ item.sid" v-on:click="submit(item.sid,'attend',$event)">出席</button>
                    <button class="btn btn-danger" v-bind:class="'btn btn-success stu'+ item.sid" v-on:click="submit(item.sid,'absence',$event)">无故缺席</button>
                    <button class="btn btn-warning" v-bind:class="'btn btn-success stu'+ item.sid" v-on:click="submit(item.sid,'leave',$event)">请假</button>
                      <button class="btn btn-facebook" v-bind:class="'btn btn-success stu'+ item.sid" v-on:click="submit(item.sid,'other',$event)">其它</button>
                    </div></td>
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
  name: 'rollCall',
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
      examlist: [],
      percentage: ''
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
    courseChange: function () {
      this.allStudentMap = {}
      this.allStudentList = []
      this.errormsg = ''
      this.success = ''
      var data = {
        'uniqueToken': this.$store.token,
        'cid': this.cid
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        // TODO:查询该课程学生的地址
        url: 'http://120.78.78.174:6233/teacher/getAllStu',
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
              this.allStudentMap[item.uid] = {sid: item.uid, sname: item.uname}
            })
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: (e) => {
          this.errormsg = e.msg
        }
      })
      this.allStudentList = Object.values(this.allStudentMap).map(item => item)
    },
    submit: function (sid, status, btn) {
      console.log(btn)
      this.errormsg = ''
      this.success = ''
      var data = {
        'uniqueToken': this.$store.token,
        'sid': sid,
        'cid': this.cid,
        'status': status,
        'percentage': this.percentage
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        // TODO:提交点名
        url: 'http://120.78.78.174:6233/teacher/submitRollCallScore',
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
            var a = btn.target.outerHTML
            $('.stu' + sid).remove()
            $('#stu' + sid).append(a)
            $('.stu' + sid).prop('disable', 'true')
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: (e) => {
          this.errormsg = e.msg
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
