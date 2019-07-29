<template>
  <div class="wrapper">

    <header class="main-header">

      <!-- Logo -->
      <a class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>H</b>QU</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>HQU</b>Course</span>
      </a>

      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages: style can be found in dropdown.less-->

            <!-- Tasks: style can be found in dropdown.less -->

            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img v-bind:src="imgUrl" class="user-image" alt="User Image">
                <span class="hidden-xs">{{username}}</span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img v-bind:src="imgUrl" class="img-circle" alt="User Image">

                  <p>
                    {{username}}
                    <small>996猝死中</small>
                  </p>
                </li>

                <!-- Menu Footer-->
                <li class="user-footer">

                  <div class="pull-right">
                    <a href="#" class="btn btn-default btn-flat" v-on:click="logout">登出</a>
                  </div>
                </li>
              </ul>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>

      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img v-bind:src="imgUrl" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>{{username}}</p>
            <a><i class="fa fa-circle text-success"></i> 在线</a>
          </div>
        </div>

        <ul class="sidebar-menu" data-widget="tree">

          <li :class="userbool? 'active treeview menu-open' : 'treeview'">
            <a v-on:click="userbool=!userbool">
              <i class="fa fa-dashboard"></i> <span>用户操作</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li id="add-user">
                <router-link to="/admin/adduser"><i class="fa fa-circle-o active"></i> 添加用户</router-link>
              </li>
              <li id="show-all-user">
                <router-link to="/admin/listAllUser"><i class="fa fa-circle-o"></i> 修改删除用户</router-link>
              </li>
            </ul>
          </li>
          <li :class="coursebool? 'active treeview menu-open' : 'treeview'">
            <a v-on:click="coursebool=!coursebool">
              <i class="fa fa-files-o"></i>
              <span>课程操作</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li id="add-course">
                <router-link to="/admin/addCourse"><i class="fa fa-circle-o"></i>添加课程</router-link>
              </li>
              <li id="show-all-course">
                <router-link to="/admin/listAllCourse"><i class="fa fa-circle-o"></i>修改删除课程</router-link>
              </li>
            </ul>
          </li>
          <li>

          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <router-view>
      </router-view>
    </div>
    <!-- /.content-wrapper -->

  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
  name: 'admin',
  data () {
    return {
      imgUrl: require('../..//assets/user2-160x160.jpg'),
      username: '测试用「管理员」',
      userbool: false,
      coursebool: false
    }
  },
  created: function () {
    console.log(this.$store.token)
  },
  methods: {
    logout: function () {
      var data = {
        'uniqueToken': this.$store.token
      }
      $.ajax({
        // method: "POST",
        type: 'POST',
        url: 'http://120.78.78.174:6233/user/logout',
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
            this.$router.push({name: 'login'})
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
