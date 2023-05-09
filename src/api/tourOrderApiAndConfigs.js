import request from '@/utils/request'

export function api(query) {
  return request({
    url: '../views/example/table.vue',
    method: 'get',
    params: params
  })
}
