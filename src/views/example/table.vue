<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="float: right;">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="$router.push('/example/components/calendar-mgt-add/')"
        >
          Add-V
        </el-button>
      </div>
    </div>

    <!-- 测试mock数据 -->
    <!-- <el-table :data="testDatas" stripe style="width: 100%"> -->
    <el-table
      :data="testDatas"
      stripe
      fit
      highlight-current-row
      style="width: 100%"
      boolean="true"
      :header-cell-style="{ color: 'black' }"
    >
      <el-table-column prop="thumb" label="Thumb" width="120">
        <el-image :src="thumb" />
      </el-table-column>
      <el-table-column prop="type" label="Type" width="100">
        Public
      </el-table-column>
      <el-table-column prop="name" label="name" />
      <el-table-column prop="date" label="Event Date" />

      <el-table-column label="Actions" width="240">
        <template slot-scope="scope">
          <!-- 查看 -->
          <el-button type="primary" size="small" icon="el-icon-document" @click="look(scope.row)" />
          <!-- 编辑 -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="edit(scope.row)" />
          <!-- 删除 -->
          <el-button slot="reference" type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row style="background-color: #f8f8f9;">
      <el-col :span="18">
        <div class="paginationBox">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="searchForm.page"
            :page-sizes="[15, 30, 50]"
            :page-size="searchForm.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row> -->

    <!-- <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" /> -->
  </div>
</template>

<script>
// 方式二：使用scr/api中规范定义的接口
import request from '@/utils/request'

// 方式一：使用axios直接请求模拟接口
// 在任意vue文件中 当然axios如果自己已经定义 请使用自己的 这里制作演示用
import axios from 'axios'

import { fetchList } from '@/api/article'
import { api } from '@/api/tourOrderApiAndConfigs'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// 这是src/api文夹下tourOrderApiAndConfigs.js文件中定义的接口

// export const api = {
// // 分页显示巡视工单列表&&巡视工单查询接口
//   getTourOrderList: {
//     // 执行接口
//     doApi: (params) => {
//       return request({
//         url: '../views/example/table.vue',
//         method: 'GET',
//         params: params
//       })
//     },
//     successTip: '执行成功', // 成功提示
//     failTip: '执行失败', // 失败提示
//     errorTip: '执行错误'// 错误提示
//   }
// }

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      testDatas: [],
      thumb: '',
      name: '',
      addr: '',
      type: 'Public',
      list: null,
      total: 0,
      listLoading: true,
      // listQuery: {
      //   page: 1,
      //   limit: 20
      // },
      // 删除
      visible: false
    }
  },
  // 钩子函数，页面加载完成请求数据
  created() {
    // 方式一：
    this.getList()
  },
  methods: {
    // 查看
    look(row) {
      console.log(row.id, 'ID')
      this.$router.push({ path: '/example/components/calendar-mgt-detail', query: {
        id: row.id,
        Type: row.Type,
        Category: row.Category,
        name: row.name,
        address: row.address,
        latitude: row.latitude,
        longitude: row.longitude,
        description: row.description,
        date: row.date,
        PAX: row.PAX,
        Capacity: row.Capacity,
        details: row.details,
        Login: row.Login

      }})
      this.editForm = row
      console.log('数据', this.editForm)
      // this.editForm.address
    },
    // 编辑
    edit(row) {
      console.log(row.id, 'ID')
      this.$router.push({ path: '/example/revise', query: { id: row.id }})
      // this.editForm = row
      // console.log('数据', this.editForm)
      // this.editForm.address
    },
    /** 删除 */
    handleDelete(row) {
      console.log(row.id, 'ID_') // ID

      this.$confirm('Are you sure You want to delete?', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })

        .then(() => {
          console.log(row.id, 'id') // 数据

          axios.post('/api/pageList/delete', row).then(res => {
            console.log(res)
            this.getList()
          })
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 方式一：
    getList() {
      axios.post('/api/pageList').then((res) => {
        // console.log('___tablelist___')
        // console.log(res.data)
        this.testDatas = res.data
      }).catch((err) => {
        console.log(err)
      })
    }
    // getList() {
    //   axios.get('../views/example/table.vue').then(res => {
    // 	// 这里的res就是mock模拟的接口返回的数据
    //   this.testDatas=res.data.list
    //   this.listLoading = false
    //   console.log(res.data)

    // })
    //   this.listLoading = true
    //   // fetchList(this.listQuery).then(response => {
    //   //   this.list = response.data.items
    //   //   this.total = response.data.total
    //   //   this.listLoading = false
    //   // })
    // }
    // getList() {
    //   // 获取表格数据
    //   console.log('__分割线__')
    //   // console.log(params)
    //   const params = {
    //     pageNum: this.pageNo,
    //     pageSize: this.pageSize
    //   }
    //   axios.get('../views/example/table.vue').then(res => {
    //     console.log(res)
    //     // this.tableData = res.list.list
    //     // this.total = res.total
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.Thumb {
  width: 65px;
  height: 39px;
  border-radius: 5px;
}

.el-button {
  margin-left: 5px;
}
</style>
