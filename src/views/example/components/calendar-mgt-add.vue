<template>
  <div class="app-container">
    <div class="filter-container" style="text-align: left;">
      <p class="title">Add Event</p>
    </div>

    <div style="width: 80%; margin: 0px auto;margin-top: -16px;">
      <el-form ref="eventForm" :model="eventForm" :rules="rules" class="el-form el-form--label-top" style="width: 100%;">
        <el-row>
          <el-col :span="12" class="bott">
            <el-form-item>
              <label for="type" class="el-form-item__label">
                <span>
                  Project Type:
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item prop="Type">
                <el-select v-model="eventForm.Type" placeholder="Please Select" style="width:100%;">
                  <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
                <!-- {{ eventForm.Type }} -->
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" class="bott">
            <el-form-item label="">
              <label for="type" class="el-form-item__label">
                <span>
                  Category:
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item prop="Category">
                <el-select
                  id="Category"
                  v-model="eventForm.Category"
                  name="Category"
                  placeholder="Please Select"
                  style="width:100%;"
                  @change="selectSupp"
                >
                  <el-option
                    v-for="item in Categorys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col v-show="reason" id="reason" :span="12">
            <el-form-item style="margin-left:20px;">
              <label for="type" class="el-form-item__label">
                <span>
                  Project:
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item prop="Project">
                <el-select
                  id="Project"
                  v-model="eventForm.Project"
                  name="Project"
                  placeholder="Please Select"
                  style="width:100%;"
                >
                  <el-option value="122">122</el-option>
                  <el-option value="87">87</el-option>
                  <el-option value="62">62</el-option>
                  <el-option value="4">4</el-option>
                  <el-option value="128">128</el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label for="type" class="el-form-item__label">
                <span>
                  Event Name (Please only restrict up to 80 chars):
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item prop="name">
                <el-input v-model="eventForm.name" placeholder="" />
              </el-form-item>
              <!-- {{ eventForm.name }} -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <p class="Location">Location</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="">
              <label class="el-form-item__label">Enter Address:</label>
              <el-form-item label="">
                <el-input
                  v-model="eventForm.address"
                  placeholder="Enter Address"
                  @keyup.enter.native="toAddress()"
                />
              </el-form-item>
            </el-form-item>
            <!-- 1:{{ address }} 2:{{ eventForm.address }} -->
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="" class="is-no-asterisk el-form-item--medium">
              <div class="el-form-item__content">
                <div class="form-div">
                  <label>Enter Lat Long</label>
                  <div class="time-div" style="width: 100%;">
                    <div class="el-input el-input--medium">
                      <input
                        v-model="eventForm.latitude"
                        type="number"
                        autocomplete="off"
                        placeholder="Enter Latitude ex. 1.00"
                        class="el-input__inner"
                        :step="0.000001"
                      >
                    </div>
                    <span>,</span>
                    <div class="el-input el-input--medium">
                      <input
                        v-model="eventForm.longitude"
                        type="number"
                        autocomplete="off"
                        placeholder="Enter Longitude ex. 103.00"
                        class="el-input__inner"
                        :step="0.000001"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <!-- {{ eventForm.evlatitu }} , {{ eventForm.longitude }} -->
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="">
              <label for="description" class="el-form-item__label">
                <span>
                  Description:
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item label="" prop="description">
                <tinymce v-model="eventForm.description" :height="150" />
              </el-form-item>
            </el-form-item>
            <!-- {{ eventForm.description }} -->
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="">
              <label for="description" class="el-form-item__label">
                <span>
                  Upload Thumbnail / Cover Image:
                  <label for="" style="color:red">*</label>
                </span>
              </label>

              <!-- <el-form-item label="">
                <el-upload
                  class="upload-demo"
                  action="//jsonplaceholder.typicode.com/posts/"
                  ref="upload"
                  name="file"
                  list-type="picture-card"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :on-change="onchange"
                  :class="{ hide: hideUpload }"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :file-list="fileList"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item> -->

              <!-- 上传图片 start -->
              <el-form-item>
                <el-upload
                  action=""
                  list-type="picture-card"
                  :on-remove="handleRemove"
                  :on-success="handleAvatarSuccess"
                  :on-change="changeUpload"
                  :limit="1"
                  :class="{ hide: hideUpload, uoloadSty:showBtnDealImg,disUoloadSty:noneBtnImg}"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <!-- 上传图片 end -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          v-for="(domain, index) in eventForm.domains"
          :key="domain.key"
          :label="'域名' + index"
          :prop="'domains.' + index + '.value'"
        >
          <el-col :span="8">
            <label for="Event Date" class="el-form-item__label timel">
              <span>
                Event Date:
                <label for="" style="color:red">*</label>
              </span>
            </label>
            <div class="block">
              <el-form-item label="" prop="date">
                <el-date-picker v-model="domain.date" type="date" placeholder="yyy-mm-dd" />
                <!-- <br>{{ domain.date }} -->
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="16">
            <label for="Choose Time Range (start and end time):" class="el-form-item__label timel">
              <span>
                Choose Time Range (start and end time):
                <label for="" style="color:red">*</label>
              </span>
            </label><br>
            <el-form-item label="" prop="time1" class="abreast" style="margin-right: 15px;">
              <el-time-picker
                v-model="domain.time1"
                format="A HH:mm:00"
                :picker-options="{
                  format: 'A HH:mm'
                }"
                placeholder="hh:mm"
              />
            </el-form-item>
            <el-form-item label="" prop="time2" class="abreast">
              <el-time-picker
                v-model="domain.time2"
                format="A HH:mm:00"
                :picker-options="{
                  format: 'A HH:mm'
                }"
                placeholder="hh:mm"
              />
            </el-form-item>
            <!-- <br>{{ domain.time1 }} | {{ domain.time2 }} -->
            <el-button
              v-if="index !== 0"
              type="danger"
              icon="el-icon-delete"
              circle
              @click.prevent="removeDomain(domain, index)"
            />
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" style="margin-bottom: 5px;">
            <el-checkbox v-model="checked" style="margin:5px 0;">Split into hourly interval</el-checkbox><br>
            <el-button type="primary" @click="addDomain">Add</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" style="margin-bottom: 5px;">
            <label for="type" class="el-form-item__label">Determine number of PAX per slot:</label>
            <el-form-item>
              <el-select v-model="eventForm.PAX" placeholder="Please Select" style="width:100%;">
                <el-option
                  v-for="item in PAXs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <!-- {{ eventForm.PAX }} -->
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="16">
                <label for="type" aria-required="required" style="font-weight: lighter;">Capacity:</label>
                <el-form-item>
                  <!-- <el-radio-group v-model="radio" @change="agreeChange">
                    <el-radio :label="1">Limited</el-radio>
                    <el-radio :label="2">UnLimited</el-radio>
                  </el-radio-group> -->
                  <el-radio-group v-model="eventForm.Capacity">
                    <el-radio v-model="radio" label="Limited" />
                    <el-radio v-model="radio" label="UnLimited" />
                  </el-radio-group>
                  <!-- 默认选中: {{ radio }} -->
                  <input
                    v-if="eventForm.Capacity == 'Limited'"
                    v-show="Lim"
                    v-model="Capacity"
                    type="number"
                    autocomplete="off"
                    placeholder="Enter Capacity"
                    class="el-input__inner"
                  >
                  <br>
                  <!-- e.Capacity: {{ eventForm.Capacity }}<br> -->
                  <!-- Capacity: {{ Capacity }} -->
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="16" style="margin-bottom:10px;">
                <label for="type" aria-required="required" style="font-weight: lighter;">Detail of Guests</label>
                <el-form-item prop="details">
                  <el-checkbox-group v-model="eventForm.details">
                    <el-checkbox label="name" name="details" />
                    <el-checkbox label="Phone" name="details" />
                    <el-checkbox label="Nric Number" name="details" />
                    <el-checkbox label="Email" name="details" />
                    <el-checkbox label="Mailing Address" name="details" />
                  </el-checkbox-group>
                  <!-- {{ eventForm.details }} -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 10px;">
          <el-col :span="24">
            <el-form-item>
              <label for="type" class="el-form-item__label">Auto Reply Email Message:</label>
              <el-form-item>
                <tinymce v-model="eventForm.reply" :height="150" />
              </el-form-item>
              <!-- {{ eventForm.reply }} -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-row style="margin-bottom: 10px;">
              <el-switch v-model="eventForm.Publish" active-value="Yes" inactive-value="No" active-text="Publish as story" />
            </el-row>
            <!-- {{  eventForm.Publish }} -->
            <el-row style="margin-bottom: 10px;">
              <el-switch v-model="eventForm.Login" active-value="Yes" inactive-value="No" active-text="Login required" />
              <!-- {{ eventForm.Login }} 灰色为fasle 蓝色为true -->
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin-top: 30px; margin-bottom: 40px; text-align: center;">
          <button
            data-v-0dc77527=""
            type="button"
            class="el-button el-button--primary el-button--medium is-round"
            style="width: 200px; height: 40px;"
            @click="onSubmit('eventForm')"
          >
            <span>Submit</span>
          </button>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/views/qiniu/upload.vue'
import axios from 'axios'
import { format } from 'path'
import VueRouter from 'vue-router'

export default {
  name: 'EventFormmgtadd',
  components: { Tinymce },

  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const isType = (rule, value, callback) => {
      // console.log('isType_', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Project Type is required!')
      } else {
        callback()
      }
    }
    const isname = (rule, value, callback) => {
      // console.log('isname', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Event name is required!')
      } else {
        callback()
      }
    }
    const isde = (rule, value, callback) => {
      // console.log('isde', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Description of Project is required!')
      } else {
        callback()
      }
    }
    const isCategory = (rule, value, callback) => {
      // console.log('isCategory_', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Category is required!')
      } else {
        callback()
      }
    }
    const isProject = (rule, value, callback) => {
      // console.log('isProject', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Project is required!')
      } else {
        callback()
      }
    }

    const isdetails = (rule, value, callback) => {
      // console.log('isdetails', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Detail of Guests is required!')
      } else {
        callback()
      }
    }

    return {
      eventForm: {
        Type: '',
        Category: '',
        Project: '',
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        description: '',
        PAX: 0,
        Capacity: 'Limited',
        details: [],
        reply: '',
        Publish: false,
        Login: false,
        domains: [{
          date: '',
          time1: '',
          time2: ''
        }]
      },
      rules: {
        Type: [
          { required: true, message: 'Please select', trigger: 'change' }
        ],
        name: [
          { required: true, message: 'title is required', trigger: 'change' | 'blur' }
        ],
        description: [
          { required: true, message: 'Description of Project is required!', trigger: 'input' }
        ],
        Category: [
          { required: true, message: 'Category is required!', trigger: 'change' }
        ],
        details: [
          { type: 'array', required: true, message: 'guest eetails is required', trigger: 'change' }
        ]
      },
      types: [
        { value: 1, label: 'Public' }, { value: 2, label: 'Private' }
      ],
      Categorys: [
        { value: 1, label: 'Project' }, { value: 2, label: 'General' }, { value: 3, label: 'Training' }, { value: 4, label: 'Friends' }, { value: 5, label: 'Virtual' }
      ],
      PAXs: [
        { value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' },
        { value: 6, label: '6' }, { value: 7, label: '7' }, { value: 8, label: '8' }, { value: 9, label: '9' }, { value: 10, label: '10' }
      ],
      fileList: [
        // {
        //   imgN: '',
        //   imgU: '',
        // }
        // {
        //   name: 'food2.jpeg',
        //   url: 'https://picx.zhimg.com/80/v2-6c5ff4ef0bb78991ed03ab720f1b2447_720w.webp?source=1940ef5c'
        // }
      ],
      timer: 0, // 定义一个时间
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      // 隐藏上传框
      hideUpload: false,
      showBtnDealImg: true,
      noneBtnImg: false,
      limitCountImg: 3, // 上传图片的最大数量
      listLength: 0,
      // 多选框
      checked: false,
      // 计数
      radio: 'Limited',
      Capacity: '',
      Lim: true,
      value: '',
      reason: false
    }
  },
  computed: {
    newAddress() {
      return this.eventForm.address
    }
  },
  watch: {
    newAddress(value) {
      // console.log(value) // 打印出输入input的值
      if (this.timer === 0) {
        this.timer = setTimeout(() => {
          this.toAddress()
        }, 500)
      } else {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.toAddress()
        }, 500)
      }
    }
  },

  mounted() {

  },

  methods: {
    onSubmit(formname) {
      if (this.eventForm.Capacity == 'Limited') {
        this.eventForm.Capacity = this.Capacity
        // console.log('Limited_', this.eventForm.Capacity)
      } else if (this.eventForm.Capacity == 'UnLimited') {
        // console.log('UnLimited', this.eventForm.Capacity)
      }

      this.$refs[formname].validate((valid) => {
        if (valid) {
          // console.log('__add__')
          axios.post('/api/pageList/add', this.eventForm)
            .then(res => {
              // console.log(res, '添加res')
              if (res.data.code == '0') {
                this.$router.push({ path: `/example/table` })
                this.$message({
                  type: 'success',
                  message: '新建成功！'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
          alert('submit!')
          console.log('数据', this.eventForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 地址
    toAddress() {
      var key = '7ec46393f655ebc45ef04ccd4830cdc1'
      axios.get('https://restapi.amap.com/v3/geocode/geo?' + 'key=' + key + '&address=' + this.eventForm.address)
        .then(res => {
          // console.log('输入的地址', this.eventForm.address)
          // console.log('获取坐标——', res.data)
          const coordinate = res.data.geocodes[0].location
          const split = coordinate.split(',')
          const lon = split[0]
          const lat = split[1]
          this.eventForm.longitude = lon
          this.eventForm.latitude = lat
        })
        .catch(err => {
          // console.log('————失败————')
          // console.log(err)
        })
    },
    // 上传图片 start
    // onchange(file, fileList) {
    //   console.log('onchange')
    //   const imgName = file.name
    //   const imgUrl = file.url

    //   this.disabled = false
    //   this.dialogImageUrl = file.url;
    //   console.log('图片个数', fileList.length)  // 1
    //   this.hideUpload = fileList.length >= 1
    // },
    // handleSuccess(res, file, fileList) {
    //   console.log('成功', res)
    //   this.imageUrl = URL.createObjectURL(res.raw);
    //   console.log(this.imageUrl)
    //   this.listLength = fileList.length
    // },
    // handleError(err, file, fileList) {
    //   console.log(err);
    // },
    // handleRemove(file, fileList) {
    //   console.log('移出-名字', file.name);
    //   console.log('移出-路径', file.url);
    //   console.log('on-remove_', file, fileList);
    //   this.hideUpload = fileList.length >= 1
    //   this.listLength = fileList.length
    // },
    // beforeUpload(file) {
    //   console.log('beforeUpload', beforeUpload)
    // },
    // handlePreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // 上传图片 end

    // 上传图片 start
    handleRemove(file, fileList) {
      console.log('移除')
      console.log(file, fileList)
      this.hideUpload = fileList.length >= 1
    },
    handleAvatarSuccess(res, file) {
      console.log('上传成功')
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    changeUpload(file, fileList) {
      // console.log('更换/上传')
      // console.log('file', file)
      // console.log('fileList', fileList) // length: 1 [{…}, __ob__: Observer]

      this.disabled = false
      this.dialogImageUrl = file.url
      // console.log('图片个数', fileList.length) // 1
      this.hideUpload = fileList.length >= 1
    },
    // 上传图片 end

    selectSupp(event) {
      // console.log(event)  // 获取点击的option value
      if (event == 'Project') {
        this.reason = true
      } else {
        this.reason = false
      }
    },
    // 日期
    addDomain(item) {
      this.eventForm.domains.push({
        date: '',
        time1: '',
        time2: '',
        key: Date.now()
      })
    },
    removeDomain(item, index) {
      var index = this.eventForm.domains.indexOf(item)
      if (index !== -1) {
        this.eventForm.domains.splice(index, 1)
      }
    },
    agreeChange: function(val) {
      // console.log(val)
      this.Lim = (val === 1)
    }
  }
}
</script>

<style>

.title {
  font-size: 16px;
  margin-top: 0px;
}

.location {
  margin-top: -10px;
}

.box {
  width: 80%;
  margin: 0 auto;
}

.time-div {
  position: relative;
  display: inline-flex;
}

.timel {
  margin-bottom: -5px;
}

.el-form-item__label {
  margin-bottom: -10px;
}

.el-col {
  margin-bottom: -17px;
}

.abreast {
  display: inline-block !important;
}

/* // 隐藏样式  >>> 根据需要添加(如果用的脚手架样式不能覆盖) */
.hide_box >>> .el-upload--picture-card{
  display: none;
}

/* .uoloadSty .el-upload--picture-card{
  border:1px solid red;

} */
.disUoloadSty .el-upload--picture-card{
  border:1px solid orange;
  display:none;
}
</style>
