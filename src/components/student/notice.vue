<template>
  <div>
    <section class="content-header">
      <h1>
        公告栏
      </h1>
      <ol class="breadcrumb">

        <li class="active">公告栏</li>
      </ol>
    </section>
    <section class="content">
      <div class="box box-widget" v-for="item in notices" v-bind:key="item.title+item.content">
        <div class="box-header with-border">
          <div class="user-block"><span class="username">{{item.title}}</span><span class="description">{{item.des}}</span></div>
        </div>
        <div class="box-body"><p v-html="item.content"></p><br/><span class="pull-right text-muted">{{item.date}}</span></div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'notice',
  data () {
    return {
      notices: [],
      errormsg: '',
      success: false
    }
  },
  created () {
    var data = {
      'uniqueToken': this.$store.token
    }
    // console.log("print");
    $.ajax({
      // method: "POST",
      type: 'POST',
      url: 'http://120.78.78.174:6233/stu/showNotice',
      async: false, // 使用同步方式
      // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
      // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
      // headers:{"Authorization":""},
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      // dataType: "json",
      success: (d) => {
        console.log(d)
        if (d.status === 200) {
          // var user = new Array();
          d.data.forEach((item, index) => {
            var a = {
              title: item.ntitle,
              des: item.cname + '-' + item.uname,
              content: item.content,
              date: this.formatDate(new Date(item.ntime))
              // date: item.ntime
            }
            this.notices[this.notices.length] = a
          })
          console.log(this.notices)
        } else {
          console.log(d)
          this.errormsg = d.msg
        }
      }, // 注意不要在此行增加逗号,
      error: (e) => {
        console.log(e)
        this.errormsg = e.status
      }
    })
  },
  methods: {
    formatDate: function (date) {
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
  }
}
</script>

<style scoped>

</style>
