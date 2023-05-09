// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

// 使用mockjs模拟数据
// 用于接受生成数据的数组
let tableList = []
for (let i = 0; i < 10; i++) {
  let newObject = {
    id: Random.id(), // 获取全局唯一标识符
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    title: Random.csentence(5, 10), //  Random.csentence( min, max )
    name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
    score: Random.float(1, 100), // 随机生成1-100的浮点数
    stars: Random.natural(1, 5), // 随机生成1-5的数字
    url: Random.url(), // 生成web地址
    city: Random.city(true), // 随机生成一个城市
    date: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    // date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
  }
  tableList.push(newObject)
}
/** post请求分页 */
Mock.mock('/api/pageList', 'post', (params) => {
  // console.log(params, '分页params')
  return tableList
  //   const [index, size, total] = [JSON.parse(params.body).page, JSON.parse(params.body).size, tableList.length]
  //   let len = total / size
  //   // console.log(index, size, total, 'index, size, total')
  //   const totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
  //   // 截取list
  //   // const newProduceNewsData = tableList.slice(index * size, (index + 1) * size)
  //   const newProduceNewsData = tableList.slice((index - 1) * size, index * size)
  //   // console.log(newProduceNewsData, 'newProduceNewsData')
  //   return {
  //     code: '0',
  //     message: 'success',
  //     data: {
  //       page: index,
  //       size: size,
  //       list: newProduceNewsData,
  //       total: total,
  //       totalPages: totalPages
  //     }
  //   }
})

/** post请求增加表格数据 */
Mock.mock('/api/pageList/add', 'post', (params) => {
  // console.log(params, '增加数据params')
  let time1 = new Date()
  time1.setTime(time1.getTime())
  let Y1 = time1.getFullYear()
  let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
  let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
  let newData = JSON.parse(params.body)
  newData.id = Random.guid()
  newData.date = timer1
  // console.log(newData, 'newData')
  tableList.push(newData)
  return {
    code: '0',
    message: 'success',
    data: tableList
  }
})

// 数据的删除操作
/** post请求删除表格数据 */
Mock.mock('/api/pageList/delete', 'post', (params) => {
  
  const deleteObj = JSON.parse(params.body)
  let deleteId = deleteObj.id
  // console.log(deleteId, 'deleteId')
  tableList = tableList.filter(val => val.id !== deleteId)
  return {
    code: '0',
    message: 'success',
    data: []
  }
})

/** post请求编辑表格数据 */
Mock.mock('/api/pageList/edit', 'post', (params) => {
  // console.log(params, '编辑数据params')
  let editObj = JSON.parse(params.body)
  // console.log(editObj, 'newData')
  tableList.forEach(item => {
    if (item.id === editObj.id) {
      item.name = editObj.name
      // item.score = editObj.score
      // item.stars = editObj.stars
      // item.city = editObj.city
    }
  })
  return {
    code: '0',
    message: 'success',
    data: []
  }
})

// module.exports=[{
//   url: '/edit',
//   type: 'post',
//   response: data => {
//     let editObj = data.body
//     console.log(editObj)
//     tableList.forEach(item => {
//           if (item.id === editObj.id) {
//             item.name = editObj.name
//             // item.score = editObj.score
//             // item.stars = editObj.stars
//             // item.city = editObj.city
//           }
//         })
//     return {
//       code: 20000,
//     }
//   }
// }]




