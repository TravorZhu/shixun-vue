<template>
<div>
  <section class="content-header">
    <h1>
      成绩查询
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
      <li><a href="#" id="get-to-search-score">成绩查询</a></li>
      <li><a class="course-name" href="#"></a></li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title course-name">课程名</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="alert alert-success" hidden="hidden">添加成功</div>
            <div class="alert alert-error" hidden="hidden"></div>
            <v-table id="example2" class="table table-bordered table-hover"
                     :data="courseGrades">
              <thead slot="head">
              <tr>
                <th>项目</th>
                <th>成绩</th>
                <th>成绩占比(百分之)</th>
              </tr>
              </thead>
              <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="grade in displayData" :key="grade.cid">
                <td>{{grade.type}}</td>
                <td>{{grade.score}}</td>
                <td>{{grade.per}}</td>
              </tr>
              </tbody>
              <tfoot>

              <tr>
                <th>总成绩</th>

                <th colspan="2" id="total-score">80</th>
              </tr>
              </tfoot>
            </v-table>
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
export default {
  name: 'courseGrade',
  data () {
    return {
      courseGrades: [],
      rollCallMap: {attend: '出席', absence: '缺席', leave: '请假', other: '其他'}
    }
  },
  methods: {
    formatDate: function (date) {
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    }
  },
  created () {
    console.log(this.$route)
    var t
    for (var i in this.$route.params['exam-score']) {
      t = this.$route.params['exam-score'][i]
      // console.log(t)
      this.courseGrades[this.courseGrades.length] = { type: t.etitle, score: t.score, per: t.percentage }
    }
    for (var j in this.$route.params['homework-score']) {
      t = this.$route.params['homework-score'][j]
      // console.log(t)
      this.courseGrades[this.courseGrades.length] = { type: t.htitle, score: t.score, per: t.percentage }
    }
    for (var k in this.$route.params['homework-score']) {
      t = this.$route.params['roll-call-score'][k]
      // console.log(t)
      this.courseGrades[this.courseGrades.length] = { type: this.formatDate(new Date(t.calltime)) + '点名', score: this.rollCallMap[t.status], per: t.percentage }
    }
    this.courseGrades[this.courseGrades.length] = { type: '总成绩', score: this.$route.params['totalscore'], per: '' }
    console.log(this.courseGrades)
  }
}
</script>

<style scoped>

</style>
