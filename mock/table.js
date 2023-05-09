// // 引入mock
// var Mock = require('mockjs')
// // 生成数组
// var arr = []
// arr = Mock.mock({
//   'list|5': [ // 生成一个 length是 22~100之间的数组
//     { 
//         'thumb': '@image()',//随机图片
//         'type|+1': 1,//id排列
//         'name': '@cname', // 生成保养巡视人员
//         'date': '@date(yyyy-MM-dd)', // 生成巡视时间
//         'addr': '@county(true)'
//     }
//   ],
//   'code': '2000',
//   'message': '这是mock数据'
// })
// Mock.mock(RegExp('../views/example/table.vue'), 'get', () => {return arr})
