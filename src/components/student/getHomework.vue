<template>
  <div>
    <section class="content-header">
      <h1>
        作业提交 - 所有课程
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
        <li><a href="#" id="get-to-search-score">作业提交 - 所有课程</a></li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">作业提交 - 所有课程</h3>
              <div class="box-tools">
                <div class="input-group input-group-sm hidden-xs" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control pull-right" placeholder="输入课程名称..."
                         v-model="filters.name.value">
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="alert alert-success" v-if="success">添加成功</div>
              <div class="alert alert-error" v-if="errormsg!==''">{{errormsg}}</div>
              <v-table id="example2" class="table table-bordered table-hover"
                       :data="homeworkList"
                       :filters="filters"
                       :currentPage.sync="currentPage"
                       :pageSize="5"
                       @totalPagesChanged="totalPages = $event">
                <thead slot="head">
                <tr>
                  <th>作业</th>
                  <th>课程</th>
                  <th>截止时间</th>
                  <th colspan="2">提交作业</th>
                </tr>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="item in displayData" :key="item.hid">
                  <td><a v-bind:href="'http://localhost:8080/student/download/'+item.hfilepath">{{item.htitle}}</a></td>
                  <td>{{item.cname}}</td>
                  <td>{{item.hdate}}</td>
                  <td><input type="file" v-bind:id="'file'+item.hid" style="display: none"/><button class="btn btn-file" v-on:click="upload(item.hid)">上传文件</button></td>
                  <td><button class="btn btn-facebook" v-on:click="submit(item.hid)">提交</button></td>
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
  name: 'get-homework',
  data () {
    return {
      homeworkList: [],
      success: false,
      errormsg: '',
      currentPage: 1,
      totalPages: 0,
      filters: {
        name: {value: '', keys: ['cname']}
      }
    }
  },
  methods: {
    submit: function (hid) {
      this.success = false
      var form = new FormData()
      // console.log($("#btn_file")[0].files[0]);
      form.append('file', $('#file' + hid)[0].files[0])// 文件对象
      form.append('uniqueToken', this.$store.token)// 可以增加表单数据
      form.append('hid', hid)
      console.log(form)

      $.ajax({
        url: 'http://120.78.78.174:6233/stu/uploadHomework',
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
    upload: function (hid) {
      console.log(hid)
      $('#file' + hid).click()
    }
  },
  created () {
    var data = {
      'uniqueToken': this.$store.token
    }
    // 获取所有课程作业
    $.ajax({
      type: 'POST',
      url: 'http://120.78.78.174:6233/stu/getAllHomework',
      async: false, // 使用同步方式
      // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
      // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
      // headers:{"Authorization":""},
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      success: (d) => {
        if (d.status === 200) {
          d.data.forEach((item, index) => {
            let a = {
              hid: item.hid,
              cname: item.cname,
              hdate: item.hdate,
              hfilepath: item.hfilepath,
              htitle: item.htitle
            }
            console.log(this.homeworkList)

            this.homeworkList[this.homeworkList.length] = a
          })
          console.log(this.homeworkList)
        } else {
          // console.log(d.msg);
          this.errormsg = d.msg
        }
      }, // 注意不要在此行增加逗号,
      error: function (e) {
        this.errormsg = e.msg
      }
    })
  }
}
</script>

<style scoped>

</style>
