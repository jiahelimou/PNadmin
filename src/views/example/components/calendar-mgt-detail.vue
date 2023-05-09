<template>
  <div class="app-container">
    <!-- 数据：{{ this.$router.query }} -->
    <br>
    数据id: {{ this.$route.query.id }}
    <hr>
    <div class="filter-container" style="text-align: left;">
      <span class="title">Event Details</span>
    </div>

    <el-form style="width:80%; margin:0 auto;">
      <el-row>
        <el-col :span="24">
          <label for="">Project Type:</label>
          {{ this.$route.query.Type }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Category:</label>
          {{ this.$route.query.Category }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Event Name:</label>
          {{ this.$route.query.name }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Location (Address):</label>
          {{ this.$route.query.address }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Location (Lat Long):</label><br>
          {{ this.$route.query.latitude }},{{ this.$route.query.longitude }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <tinymce :height="150" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Upload Thumbnail / Cover Image:</label><br><br>
          <img
            data-v-c150da66=""
            class="img-fluid"
            style="width: 200px; height: 180px;"
            src="https://s3.ap-southeast-1.amazonaws.com/propnex-xserver-img/pnimgs/fileservice/1000059/propnex-today/2208/1000059-propnex-today-1661830665-PWS-II1920x1080R11.png"
          >
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <label for="">Event Date:</label>
          {{ this.$route.query.date }}
        </el-col>
        <el-col :span="16">
          <label for="">Time Range:</label>
          <!-- {{ this.$route.query.Category }} -->
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Determine number of PAX per slot:</label>
          {{ this.$route.query.PAX }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Capacity:</label>
          {{ this.$route.query.Capacity }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Detail of Guests:</label>
          {{ this.$route.query.details }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Login required:</label>
          {{ this.$route.query.Login }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <label for="">Auto Reply Email Message:</label>
          {{ this.$route.query.Category }}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <tinymce :height="150" />
        </el-col>
      </el-row>

    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'EightoneCalendarMgtAdd',
  components: { Tinymce },

  data() {
    return {

      // 富文本
      // content:
      // `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
      //   <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      // </ul>`,

      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      // 日期
      value1: '',
      // 时间
      startTime: '',
      endTime: '',
      // 单选框
      checked: true,
      // 计数
      radio: '1',
      num: 1,
      // 计数器
      checkList: ['选中且禁用', '复选框 A'],
      // 开关
      value1: false,
      value2: false,

      //
      value: ''

    }
  },

  mounted() {

  },

  created() {
    this.getParams()
  },

  methods: {
    // 传递数据
    getParams() {
      // 取到路由带过来的参数赋值给searchObj
      // this.id =this.$route.query.id
      // console.log('1', this.id)
      // this.name =this.$route.query.name
      // console.log('2', this.name)
      const routerParams = this.$route.query.id

      // this.id =this.$route.query.id
      // console.log('execute', this.id)
      // edit({
      //   id:this.id,
      //   name:this.editForm.name
      // }).then(resp=>{
      //   console.log(resp)
      // })
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 计数
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

  <style lang="scss" scoped>

  .el-row {
    margin: 10px;
  }

  label {
    font-size: 14px;
    font-weight: normal;
    color: #525252;
  }
  .title {
    font-size: 16px;
  }

  .box {
    width: 80%;
    margin: 0 auto;
  }

  .time-div {
    position: relative;
    display: inline-flex;
  }
  </style>
