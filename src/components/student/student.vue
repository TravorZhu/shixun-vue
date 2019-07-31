<template>
  <div>
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
            <span class="sr-only">打开侧边栏</span>
          </a>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="../../assets/user2-160x160.jpg" class="user-image" alt="User Image">
                  <span class="hidden-xs">{{uname}}</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="user-header">
                    <img src="../../assets/user2-160x160.jpg" class="img-circle" alt="User Image">
                    <p>
                      {{uname}}
                    </p>
                  </li>
                  <li class="user-footer">

                    <div class="pull-right">
                      <router-link href="#" class="btn btn-default btn-flat" :to="'/logout'">登出</router-link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside class="main-sidebar">
        <section class="sidebar">
          <div class="user-panel">
            <div class="pull-left image">
              <img src="../../assets/user2-160x160.jpg" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p>{{uname}}</p>
              <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
            </div>
          </div>
          <ul class="sidebar-menu" data-widget="tree">
            <router-link tag="li" active-class="active" class="treeview" to="/student/notice">
              <a>
                <i class="fa fa-dashboard"></i> <span>公告栏</span>
              </a>

            </router-link>
            <router-link tag="li" active-class="active" class="treeview" to="/student/grade">
              <a>
                <i class="fa fa-laptop"></i>
                <span>成绩查询</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" class="treeview" to="/student/getHomework">
              <a>
                <i class="fa fa-pie-chart"></i>
                <span>作业提交</span>
              </a>
            </router-link>
            <router-link tag="li" active-class="active" class="treeview" to="/student/selectCourse">
              <a>
                <i class="fa fa-th"></i>
                <span>网上选课</span>
              </a>
            </router-link>
          </ul>
        </section>
      </aside>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 0.0.01
        </div>
        <strong>Copyright &copy; 2019 <a href="#">HQU Course</a>.</strong> All rights
        reserved.
      </footer>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'student',
  data () {
    return {
      uname: '测试用「学生」'
    }
  },
  created () {
    var data = {
      'uniqueToken': this.$store.token
    }
    $.ajax({
      // method: "POST",
      type: 'POST',
      url: 'http://120.78.78.174:6233/user/getUname',
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
          this.uname = d.msg
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
</script>

<style scoped>

</style>
