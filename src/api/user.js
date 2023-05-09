import request from '@/utils/request'
import { get } from 'lodash'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
// export function edit(data){
//   return request({
//     url: '/edit',
//     method: 'post',
//     data
//   })
// }
