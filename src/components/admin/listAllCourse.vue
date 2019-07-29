<template>
<div>
  <section class="content-header">
    <h1>
      删除/修改课程
<!--      <small>Advanced form element</small>-->
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
      <li><a href="#">课程操作</a></li>
      <li class="active">删除修改课程</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">所有课程</h3>
            <div class="box-tools">
              <div class="input-group input-group-sm hidden-xs" style="width: 150px;">
                <input type="text" name="table_search" class="form-control pull-right" placeholder="Search"
                       v-model="filters.name.value">

                <!--                  <div class="input-group-btn">-->
                <!--                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>-->
                <!--                  </div>-->
              </div>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
<!--            <div class="alert alert-success" v-if="success">删除成功</div>-->
            <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>
            <v-table id="example2" class="table table-bordered table-hover"
                     :data="courseList"
                     :filters="filters"
                     :currentPage.sync="currentPage"
                     :pageSize="5"
                     @totalPagesChanged="totalPages = $event">
              <thead slot="head">
              <tr>
                <th>课程ID</th>
                <th>课程名</th>
                <th>教师ID</th>
                <th>课程时间</th>
                <th>课程信息</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="course in displayData" :key="course.cid">
                <td>{{course.cid}}</td>
                <td>{{course.cname}}</td>
                <td>{{course.tid}}</td>
                <td>{{course.ctime}}</td>
                <td>{{course.info}}</td>
                <td>
                  <router-link
                    v-bind:to="{ path: '/admin/editCourse', query: {cid: course.cid, cname: course.cname, tid: course.tid, ctime: course.ctime, cinfo: course.info }}">
                    <button class="btn btn-success">
                      修改
                    </button>
                  </router-link>
                </td>
                <td>
                  <button v-on:click="deleteCourse" class="btn btn-danger" v-bind:id="course.cid" >
                    删除
                  </button>
                </td>
              </tr>

              </tbody>
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
  name: 'listAllCourse',
  data () {
    return {
      courseList: [],
      success: false,
      errormsg: '',
      currentPage: 1,
      totalPages: 0,
      filters: {
        name: {value: '', keys: ['cname']}
      },
      coursemap: {}
    }
  },
  created () {
    this.refrash()
  },
  methods: {
    refrash: function () {
      var data = {
        'uniqueToken': this.$store.token
      }
      console.log('print')
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/admin/getAllCourse',
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
              let a = {cid: item.cid, cname: item.cname, tid: item.tid, ctime: item.ctime, info: item.info}
              this.coursemap[item.cid] = a
            })
            console.log(this.coursemap)
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: (e) => {
          this.errormsg = '服务器连接出错'
        }
      })
      this.courseList = Object.values(this.coursemap).map(item => item)
      console.log(this.userList)
    },
    deleteCourse: function (e) {
      console.log(e)
      var data = {
        'uniqueToken': this.$store.token,
        'cid': e.target.id
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/admin/delCourse',
        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          // console.log(d)
          if (d.status === 200) {
            console.log(this)
            this.methods.refrash()
            // console.log(userlist)
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          console.log(e)
          this.errormsg = '服务器连接出错'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
