<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="float: right;">
        <!-- <router-link :to="'/example/add/'">
              <el-button type="primary" size="small" icon="el-icon-document" />
            </router-link> -->
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="$router.push('/example/calendar-mgt-add/')"
        >
          Add-E
        </el-button>
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

    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      fit
      highlight-current-row
      style="width: 100%"
      boolean="true"
      :header-cell-style="{ color: 'black' }"
    >
      <el-table-column label="Thumb">
        <!-- <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template> -->
        <img
          src="https://s3.ap-southeast-1.amazonaws.com/propnex-xserver-img/pnimgs/fileservice/1000059/propnex-today/2208/1000059-propnex-today-1661830665-PWS-II1920x1080R11.png"
          alt=""
          class="Thumb"
        >
      </el-table-column>

      <el-table-column label="Type">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Event Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="false" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column v-if="false" class-name="status-col" label="Status">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column v-if="false" min-width="300px" label="Title">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>

import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      // 删除
      visible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log('123')
        console.log(response, '数据')
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
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
