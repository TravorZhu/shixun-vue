import Vue from 'vue'
import Router from 'vue-router'
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
import teacher from '../components/teacher/teacher'
import pushNotice from '../components/teacher/pushNotice'
import examScoreSubmit from '../components/teacher/examScoreSubmit'
import addExam from '../components/teacher/addExam'
import pushHomework from '../components/teacher/pushHomework'
import logout from '../components/logout'
import rollCall from '../components/teacher/rollCall'
import submitHomeworkScore from '../components/teacher/submitHomeworkScore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '/login',
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
          redirect: 'listAllUser'
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
          path: '/',
          redirect: 'notice'
        },
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
    }, {
      path: '/teacher',
      name: 'teacher',
      component: teacher,
      beforeEnter: function (to, from, next) {
        if (store.type === 'teacher') {
          next()
        } else if (store.type === 'admin') {
          next('/admin')
        } else if (store.type === 'student') {
          next('/student')
        } else {
          next('/')
        }
      },
      children: [
        {
          path: '/',
          redirect: 'pushNotice'
        },
        {
          path: 'pushNotice',
          name: 'pushNotice',
          component: pushNotice
        },
        {
          path: 'examScoreSubmit',
          name: 'examScoreSubmit',
          component: examScoreSubmit
        },
        {
          path: 'addExam',
          name: 'addExam',
          component: addExam
        },
        {
          path: 'pushHomework',
          name: 'pushHomework',
          component: pushHomework
        },
        {
          path: 'rollCall',
          name: 'rollCall',
          component: rollCall
        },
        {
          path: 'submitHomeworkScore',
          name: 'submitHomeworkScore',
          component: submitHomeworkScore
        }
      ]
    }
  ]
})
