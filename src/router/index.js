import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import starter from '@/components/starter'
import login from '../components/login'
import admin from '../components/admin/admin'
import addUser from '../components/admin/addUser'
import store from '../store/index.js'
import listAllUser from '../components/admin/listAllUser'
import editUser from '../components/admin/editUser'
import addCourse from '../components/admin/addCourse'
import listAllCourse from '../components/admin/listAllCourse'
import editCourse from '../components/admin/editCourse'
import student from '../components/student/student'
import notice from '../components/student/notice'
import grade from '../components/student/grade'
import courseGrade from '../components/student/courseGrade'
import getHomework from '../components/student/getHomework'
import selectCourse from '../components/student/selectCourse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/admin',
      name: 'admin',
      component: admin,
      beforeEnter: function (to, from, next) {
        if (store.type === 'admin') {
          next()
        } else if (store.type === 'student') {
          next('/student')
        } else if (store.type === 'teacher') {
          next('/teacher')
        } else {
          next('/')
        }
      },
      children: [
        {
          path: '/',
          component: listAllUser
        },
        {
          path: 'adduser',
          name: 'addUser',
          component: addUser
        },
        {
          path: 'listAllUser',
          name: 'listAllUser',
          component: listAllUser
        },
        {
          path: 'editUser',
          name: 'editUser',
          component: editUser
        },
        {
          path: 'addCourse',
          name: 'addCourse',
          component: addCourse
        },
        {
          path: 'listAllCourse',
          name: 'listAllCourse',
          component: listAllCourse
        },
        {
          path: 'editCourse',
          name: 'editCourse',
          component: editCourse
        }

      ]
    }, {
      path: '/student',
      name: 'student',
      component: student,
      beforeEnter: function (to, from, next) {
        if (store.type === 'student') {
          next()
        } else if (store.type === 'admin') {
          next('/admin')
        } else if (store.type === 'teacher') {
          next('/teacher')
        } else {
          next('/')
        }
      },
      children: [
        {
          path: 'notice',
          name: 'showNotice',
          component: notice
        },
        {
          path: '/',
          name: 'showNotice',
          component: notice
        },
        {
          path: 'grade',
          name: 'grade',
          component: grade
        },
        {
          path: 'courseGrade',
          name: 'courseGrade',
          component: courseGrade
        },
        {
          path: 'getHomework',
          name: 'getHomework',
          component: getHomework
        },
        {
          path: 'selectCourse',
          name: 'selectCourse',
          component: selectCourse
        }
      ]
    }
    // {
    //   path: '/',
    //   name: 'starter',
    //   component: starter
    // }
  ]
})
