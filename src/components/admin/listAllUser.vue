<template>
  <div>
    <section class="content-header">
      <h1>
        删除/修改用户
        <small>Advanced form element</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>主页</a></li>
        <li><a href="#">用户操作</a></li>
        <li class="active">删除修改用户</li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">所有用户</h3>
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
              <div class="alert alert-success" hidden="hidden">删除成功</div>
              <div class="alert alert-error" hidden="hidden"></div>
              <v-table id="example2" class="table table-bordered table-hover"
                       :data="userList"
                       :filters="filters"
                       :currentPage.sync="currentPage"
                       :pageSize="5"
                       @totalPagesChanged="totalPages = $event">
                <thead slot="head">
                <tr>
                  <th>ID</th>
                  <th>用户类型</th>
                  <th>用户名</th>
                  <th colspan="2">操作</th>
                </tr>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="user in displayData" :key="user.userid">
                  <td>{{user.userid}}</td>
                  <td>{{user.usertype}}</td>
                  <td>{{user.uname}}</td>
                  <td>
                    <router-link
                      v-bind:to="{ path: '/admin/editUser', query: {userid: user.userid, usertype: user.usertype, uname: user.uname }}">
                      <button class="btn btn-success">
                        修改
                      </button>
                    </router-link>
                  </td>
                  <td>
                      <button v-on:click="deleteUser" class="btn btn-danger" v-bind:id="user.userid" >
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
  name: 'listAllUser',
  data () {
    return {
      userList: [],
      errormsg: '',
      currentPage: 1,
      totalPages: 0,
      filters: {
        name: {value: '', keys: ['userid']}
      },
      usermap: {}
    }
  },
  methods: {
    deleteUser: function (e) {
      console.log(e)
      var data = {
        'uniqueToken': this.$store.token,
        'uid': e.target.id
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/admin/delUser',
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
            this.refrash()
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
    },
    refrash: function () {
      var data = {
        'uniqueToken': this.$store.token
      }
      var userlist = this.usermap
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/admin/getAllUser',
        async: false, // 使用同步方式
        // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
        // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
        // headers:{"Authorization":""},
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        // dataType: "json",
        success: d => {
          // console.log(d)
          if (d.status === 200) {
            d.data.forEach(function (item, index) {
              // console.log(userlist)
              userlist[item.uid] = {userid: item.uid, usertype: item.usertype, uname: item.uname}
            })
            console.log(userlist)
          } else {
            this.errormsg = d.msg
          }
        }, // 注意不要在此行增加逗号,
        error: function (e) {
          console.log(e)
          this.errormsg = '服务器连接出错'
        }
      })
      console.log(userlist)
      this.userList = Object.values(userlist).map(item => item)
      console.log(this.userList)
    }
  },
  created: function () {
    this.refrash()
  }
}
</script>

<style scoped>

</style>
