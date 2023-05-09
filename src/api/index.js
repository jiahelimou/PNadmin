import Mock from 'mockjs'

import tableAPI from './user'

// 用户相关
Mock.mock('../views/example/table.vue', 'get', tableAPI.getUserList)
Mock.mock(/\/user\/remove/, 'get', tableAPI.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', tableAPI.batchremove)
Mock.mock('../components/calendar-mgt-add.vue', 'get', tableAPI.createUser)
Mock.mock(/\/user\/edit/, 'get', tableAPI.updateUser)
