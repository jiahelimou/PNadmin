<template>
  <div class="app-container">
    <span class="title">Configurations</span>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Options" name="directly">
        <el-select v-model="listQuery.importance" placeholder="Configuration Name" clearable class="filter-item" style="width:278px; margin-right:10px;">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <el-input v-model="listQuery.title" placeholder="Option Name" style="width:278px; margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.title" placeholder="Option Value" style="width:278px; margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" style="border-radius:25px;">
          Add Options
        </el-button>
        <el-table
          :data="Options"
          style="width: 100%;margin-top:20px;"
        >
          <el-table-column
            prop="Name"
            label="Option Name"
            width="220"
          />
          <el-table-column
            prop="Value"
            label="Option Value"
            width="220"
          />
          <el-table-column
            prop="Operation"
            label="Operation"
            width="220"
          />
        </el-table>
      </el-tab-pane>
      <!--  -->
      <el-tab-pane label="Configurations" name="v-directive">
        <el-input v-model="inputData" placeholder="Configurations Name" style="width:561px;max-width:100%;margin-right:20px;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" style="border-radius:25px;">
          Add Configuration
        </el-button>
        <el-table
          :data="Configurations.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column
            label="Configuration Name"
            prop="name"
          />
          <el-table-column
            label="Operation"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              />
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  data() {
    return {
      components: { Pagination },
      activeName: 'directly', // 蓝色
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      Configurations: [{
        name: '王小虎'
      }, {
        name: '王小虎'
      }, {
        name: '王小虎'
      }, {
        name: '王小虎'
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

<style>
  .title span {
    font-size: 20px;
  }
  .el-tabs {
    width: 90%;
    margin: 0 auto;
  }
</style>
