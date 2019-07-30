<template>
  <a>返回主页</a>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'logout',
  created () {
    if (this.$store.token === '' || this.$store.token == null) {
      this.$store.token = this.$cookies$cookies.get('token')
    }
    if (this.$store.token === '' || this.$store.token == null) { return }
    var data = {
      'uniqueToken': this.$store.token
    }
    $.ajax({
      // method: "POST",
      type: 'POST',
      url: 'http://120.78.78.174:6233/user/logout',
      // async: false, // 使用同步方式
      // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
      // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
      // headers:{"Authorization":""},
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8'
      // dataType: "json",
    })
    this.$store.token = ''
    this.$store.type = ''
    // this.$cookie.remove('type')
    // this.$cookie.remove('token')
    this.$router.push({name: 'login'})
  }
}
</script>

<style scoped>

</style>
