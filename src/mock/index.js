// 引入mock
var Mock = require('mockjs')
// 生成数组
var arr = []
arr = Mock.mock({
  'list|10': [
    {
      'thumb': '@image()', // 随机图片
      'type': 'Public',
      'name': '@cname',
      'date': '@date(yyyy-MM-dd)'
    }
  ],
  'code': '2000',
  'message': '这是mock数据'
})
Mock.mock('../views/example/table.vue', 'get', () => { return arr })
