<template>
  <div class="wrapper">
    <header class="main-header">
      <!-- Logo -->
      <a class="logo">
        <span class="logo-mini"><b>H</b>QU</span>
        <span class="logo-lg"><b>Hqu</b>LTE</span>
      </a>

      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">侧边栏</span>
        </a>

        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="../../assets/user2-160x160.jpg" class="user-image" alt="User Image">
                <span class="hidden-xs">{{username}}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="user-header">
                  <img src="../../assets/user2-160x160.jpg" class="img-circle" alt="User Image">
                  <p>
                    {{username}}
                    <small>培养优秀的学生是我的职责</small>
                  </p>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
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
            <p>{{username}}</p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>
        <ul class="sidebar-menu" data-widget="tree">
          <router-link tag="li" active-class="active" :to="'/teacher/pushNotice'">
            <a href="#">
              <i class="fa fa-dashboard"></i>发布公告
            </a>
          </router-link>

          <li class="treeview" :class="scoreSubmitBool? 'treeview menuopen active' : 'treeview'">
            <a href="#" v-on:click="scoreSubmitBool=!scoreSubmitBool">
              <i class="fa fa-laptop"></i>
              <span>考试</span>
              <span class="pull-right-container">
                                <i :class="scoreSubmitBool? 'fa fa-angle-down pull-up' : 'fa fa-angle-left pull-right'"></i>
                            </span>
            </a>
            <ul class="treeview-menu">
              <router-link tag="li" active-class="active" :to="'/teacher/addExam'"><a href="#"><i class="fa fa-circle-o"></i>发布考试</a></router-link>
            </ul>
            <ul class="treeview-menu">
              <router-link tag="li" active-class="active" :to="'/teacher/examScoreSubmit'"><a href="#"><i class="fa fa-circle-o"></i>考试成绩提交</a></router-link>
、
            </ul>
          </li>
          <li id="dianming">
            <a href="#">
              <i class="fa fa-pie-chart"></i>点名
            </a>
          </li>

          <li class="treeview" :class="homeworkbool? 'treeview menuopen active' : 'treeview'">
            <a href="#" v-on:click="homeworkbool=!homeworkbool">
              <i class="fa fa-th"></i>
              <span>作业</span>
              <span class="pull-right-container">
                                <i :class="homeworkbool? 'fa fa-angle-down pull-up' : 'fa fa-angle-left pull-right'"></i>
                            </span>
            </a>
            <ul class="treeview-menu">
              <li id="updateHomework"><a href="#"><i class="fa fa-circle-o"></i>批改作业</a></li>
              <li id="update-course"><a href="#"><i class="fa fa-circle-o"></i>发布作业</a></li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
    <div class="content-wrapper">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'teacher',
  data () {
    return {
      username: '',
      errormsg: '',
      success: '',
      scoreSubmitBool: false,
      homeworkbool: false
    }
  },
  methods: {},
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
          this.username = d.msg
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
