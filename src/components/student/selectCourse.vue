<template>
<div>
  <section class="content-header">
    <h1>
      选课
    </h1>
    <ol class="breadcrumb">
      <li><router-link :to="'/student'"><i class="fa fa-dashboard"></i>主页</router-link></li>
      <li><a href="#" id="get-to-search-score">选课</a></li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">选课</h3><div class="box-tools">
            <div class="input-group input-group-sm hidden-xs" style="width: 150px;">
              <input type="text" name="table_search" class="form-control pull-right" placeholder="输入课程名称..."
                     v-model="filters.name.value">
            </div>
          </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="alert alert-success" v-if="success!==''">{{success}}</div>
            <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>
            <v-table id="example2" class="table table-bordered table-hover"
                     :data="allCourse"
                     :filters="filters"
                     :currentPage.sync="currentPage"
                     :pageSize="5"
                     @totalPagesChanged="totalPages = $event">
              <thead slot="head">
              <tr>
                <th>课程</th>
                <th>老师</th>
                <th>课程信息</th>
                <th>上课时间</th>
                <th>选课/退选</th>
              </tr>
              </thead>
              <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="item in displayData" :key="item.hid">
                <th>{{item.cname}}</th>
                <th>{{item.uname}}</th>
                <th>{{item.info}}</th>
                <th>{{item.ctime}}</th>
                <th>
                  <button class="btn btn-success" v-if="!item.selected" v-on:click="addCourse(item.cid)">选课</button>
                  <button class="btn btn-danger" v-if="item.selected" v-on:click="deleteCourse(item.cid)">退选</button>
                </th>
              </tr>
              </tbody>
              <tfoot>
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
  name: 'selectCourse',
  data () {
    return {
      allCourseMap: {},
      allCourse: [],
      success: '',
      errormsg: '',
      currentPage: 1,
      totalPages: 0,
      filters: {
        name: {value: '', keys: ['cname']}
      }
    }
  },
  created () {
    this.refrash()
  },
  methods: {
    deleteCourse: function (cid) {
      this.success = ''
      this.errormsg = ''
      var data = {
        'uniqueToken': this.$store.token,
        cid: cid
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/stu/courseCancel',

        // async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            this.success = '退选成功'
            this.refrash()
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          this.errormsg = e.msg
        }
      })
    },
    addCourse: function (cid) {
      var data = {
        'uniqueToken': this.$store.token,
        'cid': cid
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/stu/courseSelect',

        // async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            this.success = '选课成功'
            this.refrash()
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          this.errormsg = e.msg
          // $('.alert-error').show()
        }
      })
    },
    refrash: function () {
      var data = {
        'uniqueToken': this.$store.token
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/stu/getAllCourse',

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
              this.allCourseMap[item.cid] = {cid: item.cid, cname: item.cname, uname: item.uname, info: item.info, ctime: item.ctime, selected: false}
            })
          } else {
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          // $('.alert-error').show()
        }
      })
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/stu/getCourse',

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
              this.allCourseMap[item.cid]['selected'] = true
            })
          } else {
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          // $('.alert-error').show()
        }
      })
      this.allCourse = Object.values(this.allCourseMap).map(item => item)
    }
  }

}
</script>

<style scoped>

</style>
