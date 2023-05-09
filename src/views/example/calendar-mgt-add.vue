<template>
  <div class="app-container">
    <div class="filter-container" style="text-align: left;">
      <p class="title">Add Event-E</p>
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
              {{ eventForm.Category }}
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
              {{ eventForm.Project }}
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
              <el-form-item prop="Name">
                <el-input v-model="eventForm.Name" placeholder="" />
              </el-form-item>
              <!-- {{ eventForm.Name }} -->
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
              <el-form-item label="">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  action=""
                  name="file"
                  :auto-upload="false"
                  list-type="picture-card"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="onchange"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :file-list="fileList"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          v-for="(domain, index) in eventForm.domains"
          :key="domain.key"
          :label="'域名' + index"
          :prop="'domains.' + index + '.value'"
          style="margin-bottom:20px;"
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
            <el-form-item label="" prop="time1" style="float:left;">
              <el-time-picker
                v-model="domain.time1"
                format="A HH:mm:00"
                :picker-options="{
                  format: 'A HH:mm'
                }"
                placeholder="hh:mm"
              />
            </el-form-item>
            <el-form-item label="" prop="time2">
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
            &nbsp;
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
                    <el-checkbox label="Name" name="details" />
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
    const isName = (rule, value, callback) => {
      // console.log('isName', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Event Name is required!')
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
    const isdate = (rule, value, callback) => {
      console.log('isdate', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Event Date is required!')
      } else {
        callback()
      }
    }
    const istime1 = (rule, value, callback) => {
      console.log('istime1', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Event Date is required!')
      } else {
        callback()
      }
    }
    const istime2 = (rule, value, callback) => {
      console.log('istime2', value)
      if (value == 0) { // 如果值是 0，提示用户选择正确的选项
        return this.$message.error('Event Date is required!')
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
        Name: '',
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
          // { validator: isType, required: true, message: 'Please select', trigger: 'change' }
          { required: true, message: 'Please select', trigger: 'change' }
        ],
        Name: [
          // { validator: isName, trigger: 'input' },
          { required: true, message: 'title is required', trigger: 'change' | 'blur' }
        ],
        description: [
          // { validator: isde, required: true, trigger: 'input' },
          { required: true, message: 'Description of Project is required!', trigger: 'input' }
        ],
        date: [
          // { validator: isdate, required: true, trigger: 'change' },
          { type: 'date', required: true, message: 'Event Date is required!', trigger: 'change' }
        ],
        time1: [
          // { validator: istime1, required: true, trigger: 'change' },
          { type: 'date', required: true, message: 'Event Date is required!', trigger: 'change' }
        ],
        time2: [
          // { validator: istime2, required: true, trigger: 'change' },
          { type: 'date', required: true, message: 'Event Date is required!', trigger: 'change' }
        ],
        Category: [
          // { validator: isCategory, required: true,  trigger: 'change' }
          { required: true, message: 'Category is required!', trigger: 'change' }
        ],
        Project: [
          // { validator: isProject, required: true,  trigger: 'change' }
          { required: true, message: 'Project is required!', trigger: 'change' }
        ],
        details: [
          // { validator: isdetails, trigger: 'input' },
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
        {
          name: 'food2.jpeg',
          url: 'https://picx.zhimg.com/80/v2-6c5ff4ef0bb78991ed03ab720f1b2447_720w.webp?source=1940ef5c'
        }
      ],
      timer: 0, // 定义一个时间
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
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
    onSubmit(formName) {
      if (this.eventForm.Capacity == 'Limited') {
        this.eventForm.Capacity = this.Capacity
        // console.log('Limited_', this.eventForm.Capacity)
      } else if (this.eventForm.Capacity == 'UnLimited') {
        // console.log('UnLimited', this.eventForm.Capacity)
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(this.eventForm)
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
          console.log('————失败————')
          console.log(err)
        })
    },
    onchange(file, fileList) {
      console.log('改变')
      const imgN = file.name
      const imgU = file.url
      console.log('imgN', imgN)
      console.log('imgU', imgU)

      this.dialogImageUrl = file.url
      console.log(this.dialogImageUrl, fileList)
    },
    // 上传图片
    handleSuccess(res, file, fileList) {
      console.log('成功', res)
      // this.imageUrl = URL.createObjectURL(res.raw);
      // console.log(this.imageUrl)
    },
    handleError(err, file, fileList) {
      console.log(err)
    },
    handleRemove(file, fileList) {
      console.log('移出-名字', file.name)
      console.log('移出-路径', file.url)
      console.log('on-remove_', file, fileList)
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
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

<style lang="scss" scoped>
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
</style>
