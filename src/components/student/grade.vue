<template>
<div>
  <section class="content-header">
    <h1>
      成绩查询
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
      <li><a href="#" id="get-to-search-score">成绩查询</a></li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">总成绩</h3>
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
            <div class="alert alert-success" hidden="hidden">添加成功</div>
            <div class="alert alert-error" hidden="hidden"></div>
            <v-table id="example2" class="table table-bordered table-hover"
                     :data="courseGrades"
                     :filters="filters"
                     :currentPage.sync="currentPage"
                     :pageSize="5"
                     @totalPagesChanged="totalPages = $event">
              <thead slot="head">
              <tr>
                <th>课程</th>
                <th>老师</th>
                <th>成绩</th>
              </tr>
              </thead>
              <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="grade in displayData" :key="grade.cid" v-on:click="getin(grade.cid)">
                <td>{{grade.cname}}</td>
                <td>{{grade.uname}}</td>
                <td>{{grade.totalscore}}</td>
              </tr>

              </tbody>
              <tfoot slot="foot">
              <tr>
                <th>平均</th>
                <th colspan="2">{{adv}}</th>
              </tr>

              </tfoot>
            </v-table>

          </div>
          <div class="box-footer clearfix">
            <smart-pagination
              :currentPage.sync="currentPage"
              :totalPages="totalPages"
              class="pagination pagination-sm no-margin pull-right"
            />
          </div>
          <!-- /.box-body -->
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
  name: 'grade',
  data () {
    return {
      courseGradesMap: {},
      courseGrades: [],
      currentPage: 1,
      totalPages: 0,
      filters: {
        name: {value: '', keys: ['cname']}
      }
    }
  },
  methods: {
    getin: function (cid) {
      if (cid == null) { return }
      // console.log(this.courseGradesMap[cid])
      this.$router.push({name: 'courseGrade', params: this.courseGradesMap[cid]})
    }
  },
  created () {
    var allCourseScore = this.courseGradesMap

    var data = {
      'uniqueToken': this.$store.token
    }
    // 请求获取所有已选课程
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
          d.data.forEach(function (item, index) {
            allCourseScore[item.cid] = {cid: item.cid, cname: item.cname, uname: item.uname, totalscore: 0}
          })
        } else {
        }
      }, // 注意不要在此行增加逗号,
      error: function (e) {
        // $('.alert-error').show()
      }
    })

    // 请求作业成绩
    for (var k in allCourseScore) {
      data['cid'] = k
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/stu/getHomeworkScore',

        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            allCourseScore[k]['homework-score'] = d.data
            d.data.forEach(function (item, index) {
              allCourseScore[k]['totalscore'] += 0.01 * item.score * item.percentage
            })
          }
        }
      })

      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/stu/getExamScore',

        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            allCourseScore[k]['exam-score'] = d.data
            d.data.forEach(function (item, index) {
              allCourseScore[k]['totalscore'] += 0.01 * item.score * item.percentage
            })
          }
        }
      })

      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/stu/getRollCallScore',

        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: (d) => {
          if (d.status === 200) {
            allCourseScore[k]['roll-call-score'] = d.data
            d.data.forEach(function (item, index) {
              if (item.status !== 'absence') {
                allCourseScore[k]['totalscore'] += item.percentage
              }
            })
          }
        }
      })
    }
    console.log(this.courseGradesMap)
    var sum = 0
    var count = 0
    for (k in allCourseScore) {
      var t = allCourseScore[k]
      this.courseGrades[this.courseGrades.length] = t
      sum += t.totalscore
      count++
    }
    this.adv = (1.0 * sum / count)
    this.courseGrades[this.courseGrades.length] = {uname: '平均成绩', totalscore: this.adv}
    console.log(this.courseGrades)
  }
}
</script>

<style scoped>

</style>
