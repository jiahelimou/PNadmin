<template>
  <div>
    <h2 class="add">行程添加</h2>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          :rules="rules"
        >
          <el-form-item label="事件类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择类型" size="medium" style="width:50%">
              <el-option label="公事" value="公事" />
              <el-option label="私事" value="私事" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="事件类别" prop="category">
            <el-select v-model="form.category" placeholder="请选择类型" size="medium" style="width:50%">
              <el-option label="开会" value="1" />
              <el-option label="会见" value="2" />
              <el-option label="聚会" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="事件名称(请限制为最多20个字符)" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容" style="width:50%" />
          </el-form-item>
          <h2>位置</h2>
          <el-form-item label="请输入位置">
            <el-autocomplete
              v-model="form.address"
              placeholder="请输入位置"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              value-key="name"
              style="width:50%"
              @select="handleSelect"
            />
          </el-form-item>
          <el-form-item label="经纬度">
            <el-input v-model="form.latitude" placeholder="请输入纬度" style="width:40%" />
            ,
            <el-input v-model="form.longitude" placeholder="请输入经度" style="width:40%" />
          </el-form-item>
          <el-form-item label="详情" prop="description">
            <tinymce v-model="form.description" :height="300" />
          </el-form-item>
          <el-form-item label="上传缩略图/封面图片">
            <el-upload
              ref="upload"
              :class="{ disabled: uploadDisabled }"
              :limit="1"
              action="http://43.143.202.95:5609/goods/picture"
              list-type="picture-card"
              :auto-upload="false"
              :multiple="false"
              :on-change="on_image"
              :file-list="imagelist"
              :on-remove="on_image"
              :on-success="on_success"
            >
              <i slot="default" class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="活动日期" prop="date">
                <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date" placeholder="yyyy-mm-dd" style="width: 60%;" />
                <el-checkbox v-model="checked" size="medium" style="width: 100%;">拆分为每小时间隔</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择时间段(开始时间和结束时间):" prop="start_date">
                <el-time-picker v-model="form.start_date" value-format="hh:mm" placeholder="hh:mm" style="width: 45%;" />-
                <el-time-picker v-model="form.end_date" value-format="hh:mm" placeholder="hh:mm" style="width: 45%;" />
              </el-form-item>

            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">新增</el-button>
            </el-form-item>
          </el-row>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
import { AddCalendar } from '@/api/calendar'
import axios from 'axios'

export default {
  name: 'AddCalendarMgt',
  components: { tinymce },
  data() {
    return {
      form: {
        type: '',
        category: '',
        name: '',
        description: ' ',
        latitude: '',
        longitude: '',
        address: '',
        date: '',
        start_date: '',
        end_date: ''
      },
      is: true,
      checked: false,
      rules: {
        type: [
          { required: true, message: '请输入事件类型', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请输入事件类别', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入行程名', trigger: 'change' },
          { max: 20, message: '最多20个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入详情', trigger: 'change' }
        ],
        image: [
          { required: true, message: '请上传封面', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请输入日期', trigger: 'change' }
        ],
        start_date: [
          { required: true, message: '请输入时间', trigger: 'change' }
        ]
      },
      address: [],
      imagelist: []
    }
  },
  computed: {
    uploadDisabled: function() {
      return this.imagelist.length > 0
    }
  },

  created() {
  },
  mounted() {},

  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          return false
        }
      })
    },
    // 图片上传成功
    on_success(response, file, fileList) {
      this.form.image = response.data
      AddCalendar(this.form).then(res => {
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        })
      })
    },
    // 地址匹配
    querySearch(queryString, cb) {
      axios.get('https://restapi.amap.com/v3/assistant/inputtips?parameters&key=4342d1354a45a5856d38bfc054ac1fca&keywords=' + queryString).then(res => {
        cb(res.data.tips)
      })
    },
    GetAddress(queryString) {
      axios.get('https://restapi.amap.com/v3/assistant/inputtips?parameters&key=4342d1354a45a5856d38bfc054ac1fca&keywords=' + queryString).then(res => {
        this.address = res.data.tips
      })
    },
    handleSelect(item) {
      const xy = item.location.split(',')
      this.form.latitude = xy[0]
      this.form.longitude = xy[1]
    },
    // 图片上传后
    on_image(file, fileList) {
      this.imagelist = fileList
    }
  }
}
</script>

<style  scoped>
    .add{
        margin-left: 20px;
    }
    .el-form-item__label{
        font-size: 20px !important;
    }
    .disabled .el-upload--picture-card {
        display: none;
    }
</style>
<style>
    .el-form-item__label{
        font-size: 20px !important;
    }
    .disabled .el-upload--picture-card{
	display: none;
    }
</style>
