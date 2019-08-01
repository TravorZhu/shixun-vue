<template>
  <div>
    <section class="content-header">
      <h1>
        批改作业
        <small>Advanced form element</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
        <li><a href="#">用户操作</a></li>

      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">All Students</h3>
              <div class="box-tools">
                <div class="input-group input-group-sm hidden-xs" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <div id="div2" style="width: 800px;margin-left:20px;margin-top: 0px">
              <div class="alert alert-success" v-if="success">{{success}}</div>
              <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>
              <div class="col-xs-3">
              课程：<select class="form-control" name="cid" id="cid" style="width: 100px;" v-model="cid" v-on:change="updateCourse">
              <option v-bind:value="item.cid" v-for="item in getCourseArr" v-bind:key="item.cid" >{{item.cname}}</option>
            </select>
            </div>
              <div class="col-xs-3">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 作业：<select class="form-control" style="width: 150px;" v-model="hid" v-on:change="updateHomework">
              <!--select只是下拉框的框框 具体内容要用另一个标签定义  option-->
              <!--如果value属性没有内容则调用内容，如果有内容，则显示内容-->
              <option v-bind:value="item.hid" v-for="item in getHomeworkList" v-bind:key="item.hid" >{{item.htitle}}</option>

            </select>
              </div>
              <!--                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->

            </div>
            <br>

            <!-- /.box-header -->
            <div class="box-body">
              <div class="alert alert-success" hidden="hidden">上传成功</div>
              <div class="alert alert-error" hidden="hidden"></div>
              <v-table id="example2" class="table table-bordered table-hover"
                       :data="getInfoArr"
                       :currentPage.sync="currentPage"
                       :pageSize="5"
                       @totalPagesChanged="totalPages = $event">
                <thead slot="head">
                <tr>
                  <th>学号</th>
                  <th>姓名</th>
                  <th>下载作业</th>
                  <th>分数</th>
                  <th>提交分数</th>
                </tr>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="item in displayData" :key="item.hid">
                  <td>{{item.sid}}</td>
                  <td>{{item.uname}}</td>
                  <td><a v-bind:href="'http://120.78.78.174:6233/teacher/correctHomework'+item.submitfile">点击下载</a></td>
                  <td><input type="number" v-bind:id="'score'+item.sid" /></td>
                  <td>
                    <button class="btn btn-facebook" v-on:click="submit(item.sid)">提交</button>
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <th>学号</th>
                  <th>姓名</th>
                  <th>下载作业</th>
                  <th>分数</th>
                  <th>提交分数</th>
                </tr>
                </tfoot>
              </v-table>
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix">
              <smart-pagination
                :currentPage.sync="currentPage"
                :totalPages="totalPages"
                class="pagination pagination-sm no-margin pull-right"
              />
            </div>
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'submitHomeworkScore',
  data () {
    return {
      getCourseArr: [],
      getInfoArr: [],
      getInfoMap: {},
      getHomeworkList: [],
      currentPage: 1,
      totalPages: 0,
      errormsg: '',
      success: '',
      cid: '',
      hid: ''
    }
  },
  created () {
    var data = {
      'uniqueToken': this.$store.token
    }
    // 通过tid得到cid
    $.ajax({
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
            let a = {
              cid: item.cid,
              cname: item.cname,
              tid: item.tid
            }
            this.getCourseArr[this.getCourseArr.length] = a
            // $('#cid').append($(" <option value='" + item.cid + "'>" + item.cname + '</option>\n'))
            // console.log(item.cid)
          })
        } else {
          this.errormsg = d.msg
        }
      },
      error: (e) => {
        this.errormsg = e.msg
      }
    })
  },
  methods: {
    updateCourse: function () {
      var data = {
        'uniqueToken': this.$store.token,
        'cid': this.cid
      }
      // $('#hid').empty()
      $.ajax({
        type: 'POST',
        url: 'http://120.78.78.174:6233/teacher/getAllStuHomeworkInfo',
        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          // console.log(d2);
          if (d.status === 200) {
            d.data.forEach((item2, index2) => {
              let a2 = {
                sid: item2.sid,
                hid: item2.hid,
                hfilepath: item2.hfilepath,
                htitle: item2.htitle,
                uname: item2.uname,
                submitfile: item2.submitfile,
                submittime: item2.submittime
              }
              if (this.getInfoMap[item2.hid] == null) {
                this.getInfoMap[item2.hid] = []
              }
              this.getInfoMap[item2.hid].push(a2)
              // $('#hid').append($(" <option value='" + item2.hid + "'>" + item2.htitle + '</option>\n'))
              // console.log(item2.htitle)
            })

            this.getHomeworkList = Object.keys(this.getInfoMap).map(item => {
              // console.log(this.getInfoMap[item])
              return {hid: item, htitle: this.getInfoMap[item][0].htitle}
            })
          } else {
            this.errormsg = d.msg
          }
        },
        error: (e) => {
          this.errormsg = e.msg
        }
      })// $.ajax
    },
    submit: function (sid) {
      var score = $('#score' + sid).val()
      var sdata = {
        'uniqueToken': this.$store.token,
        'hid': this.hid,
        'sid': sid,
        'score': score
      }
      // console.log(sdata)
      $.ajax({
        type: 'POST',
        url: 'http://120.78.78.174:6233/teacher/updateStuHomework',
        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(sdata),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            this.success = d.msg
          } else {
            this.errormsg = d.msg
          }
        },
        error: function (d) {
          this.errormsg = d.msg
        }
      })
    },
    updateHomework: function () {
      console.log(this.getInfoMap)
      console.log(this.getInfoMap[this.hid])
      this.getInfoArr = Object.values(this.getInfoMap[this.hid]).map(item => item)
      console.log(this.getInfoArr)
    }
  }
}
</script>

<style scoped>

</style>
