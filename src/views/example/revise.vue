<template>
  <div class="app-container">
    <div class="filter-container" style="text-align: left;">
      <p class="title">Update Event</p>
    </div>

    <div style="width: 80%; margin: 0px auto;margin-top: -16px;">
      <el-form ref="editForm" :model="editForm" class="el-form el-form--label-top" style="width: 100%;">
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
                <el-select v-model="editForm.Type" placeholder="Please Select" style="width:100%;">
                  <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
                <!-- {{ editForm.Type }} -->
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
                  v-model="editForm.Category"
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
              {{ editForm.Category }}
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
                  v-model="editForm.Project"
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
              {{ editForm.Project }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item>
              <label for="type" class="el-form-item__label">
                <span>
                  Event name (Please only restrict up to 80 chars):
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item prop="name">
                <el-input v-model="editForm.name" placeholder="" />
              </el-form-item>
              <!-- {{ editForm.name }} -->
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
                  v-model="editForm.address"
                  placeholder="Enter Address"
                  @keyup.enter.native="toAddress()"
                />
              </el-form-item>
            </el-form-item>
            <!-- 1:{{ address }} 2:{{ editForm.address }} -->
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
                        v-model="editForm.latitude"
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
                        v-model="editForm.longitude"
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
            <!-- {{ editForm.evlatitu }} , {{ editForm.longitude }} -->
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
                <tinymce v-model="editForm.description" :height="150" />
              </el-form-item>
            </el-form-item>
            <!-- {{ editForm.description }} -->
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
          v-for="(domain, index) in editForm.domains"
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
                <br>{{ domain.date }}
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
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
            <el-form-item label="" prop="time2" style="float:right;">
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
            <!-- &nbsp; -->
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
              <el-select v-model="editForm.PAX" placeholder="Please Select" style="width:100%;">
                <el-option
                  v-for="item in PAXs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <!-- {{ editForm.PAX }} -->
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
                  <el-radio-group v-model="editForm.Capacity">
                    <el-radio v-model="radio" label="Limited" />
                    <el-radio v-model="radio" label="UnLimited" />
                  </el-radio-group>
                  <!-- 默认选中: {{ radio }} -->
                  <input
                    v-if="editForm.Capacity == 'Limited'"
                    v-show="Lim"
                    v-model="Capacity"
                    type="number"
                    autocomplete="off"
                    placeholder="Enter Capacity"
                    class="el-input__inner"
                  >
                  <br>
                  <!-- e.Capacity: {{ editForm.Capacity }}<br> -->
                  <!-- Capacity: {{ Capacity }} -->
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="16" style="margin-bottom:10px;">
                <label for="type" aria-required="required" style="font-weight: lighter;">Detail of Guests</label>
                <el-form-item prop="details">
                  <el-checkbox-group v-model="editForm.details">
                    <el-checkbox label="name" name="details" />
                    <el-checkbox label="Phone" name="details" />
                    <el-checkbox label="Nric Number" name="details" />
                    <el-checkbox label="Email" name="details" />
                    <el-checkbox label="Mailing Address" name="details" />
                  </el-checkbox-group>
                  <!-- {{ editForm.details }} -->
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
                <tinymce v-model="editForm.reply" :height="150" />
              </el-form-item>
              <!-- {{ editForm.reply }} -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-row style="margin-bottom: 10px;">
              <el-switch v-model="editForm.Publish" active-value="Yes" inactive-value="No" active-text="Publish as story" />
            </el-row>
            <!-- {{  editForm.Publish }} -->
            <el-row style="margin-bottom: 10px;">
              <el-switch v-model="editForm.Login" active-value="Yes" inactive-value="No" active-text="Login required" />
              <!-- {{ editForm.Login }} 灰色为fasle 蓝色为true -->
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin-top: 30px; margin-bottom: 40px; text-align: center;">
          <button
            data-v-0dc77527=""
            type="button"
            class="el-button el-button--primary el-button--medium is-round"
            style="width: 200px; height: 40px;"
            @click="onSubmit('editForm')"
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
import { edit } from '@/api/user'

export default {
  name: 'EditFormmgtadd',
  components: { Tinymce },

  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      props: {
        'id': String
      },
      id: '',
      editForm: {
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
      return this.editForm.address
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
    this.getParams()
  },

  created() {
    // console.log(id, 'ID')
    // this.editForm = Object.assign({}, row);

    // this.showChart()
    // this.getList()
  },

  methods: {
    // getList(id) {
    //   console.log('id')
    //   axios.post('/api/pageList').then((res) => {
    //     console.log('revise data')
    //     console.log(res.data)
    //     // this.testDatas = res.data
    //   }).catch((err) => {
    //     console.log(err)
    //   });
    // },
    getParams() {
      // 取到路由带过来的参数赋值给searchObj
      this.id = this.$route.query.id
      console.log('id', this.id)

      axios.post('/api/pageList').then((res) => {
        // let ListDatas = res.data
        // console.log(ListDatas, 'revise data')
        // console.log('1_', editForm)
        // let editForm = {}
        // console.log('2_', editForm)
        this.ListDatas = res.data
        console.log('3_', this.ListDatas)
        const editForm = this.ListDatas.find((item) => {
          // console.log(item) // 一次输出数据
          // console.log(item.id) // id紧跟其后
          // console.log(this.id)  // '输出选中的id'
          return item.id === this.id
          // 筛选出匹配数据，是对应数据的整个对象
        })
        console.log('4_', editForm)
        this.editForm.name = editForm.name // 对啦
      }).catch((err) => {
        console.log(err)
      })

      // this.name =this.$route.query.name
      // console.log('2', this.name)

      // edit({
      //   id:this.id,
      //   name:this.editForm.name
      // }).then(resp=>{
      //   console.log(resp)
      // })
      // console.log('1', this.tableList)
      // console.log('2', this.editForm)
      // console.log('3', this.editForm)

      // const index =  this.eventForm.findIndex((role) => role.id === id)
      // let that = this;
      // axios.get('/api/pageList').then(res => {
      //   let datas = response.data
      //   console.log('1', datas)
      // })
      // var that = this
      // console.log('???', that)
      // this.editForm = Object.assign({}, row);
      // console.log('123', this.editForm)
      // const url =  `../views/example/table.vue/${this.id}`;
      // axios.get(url)
      //   .then(res => {
      //     console.log('shuju', res)
      //   })
      // axios.post('/api/pageList/edit', this.editForm)
      // .then(res => {
      //   console.log('???', res)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
      // console.log('data', this.eventForm)
      // console.log('data', this.editForm)
    },

    onSubmit(formname) {
      // this.getParams()

      if (this.editForm.Capacity == 'Limited') {
        this.editForm.Capacity = this.Capacity
        // console.log('Limited_', this.editForm.Capacity)
      } else if (this.editForm.Capacity == 'UnLimited') {
        // console.log('UnLimited', this.editForm.Capacity)
      }
      // 编辑
      this.$refs[formname].validate((valid) => {
        if (valid) {
          axios.post('/api/pageList/edit', this.editForm)
          // console.log('1.', this.editForm)
            .then(res => {
              console.log('2.', res)
              if (res.data.code == '0') {
                this.$router.push({ path: `/example/table` })
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
          alert('submit!')
          console.log('3.编辑后的数据', this.editForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })

      // axios.get('../components/calendar-mgt-add.vue').then((res) => {
      //   console.log('__add__')
      //   console.log(this.editForm)
      //   alert('submit!');
      // })
    },
    // 地址
    toAddress() {
      var key = '7ec46393f655ebc45ef04ccd4830cdc1'
      axios.get('https://restapi.amap.com/v3/geocode/geo?' + 'key=' + key + '&address=' + this.editForm.address)
        .then(res => {
          // console.log('输入的地址', this.editForm.address)
          // console.log('获取坐标——', res.data)
          const coordinate = res.data.geocodes[0].location
          const split = coordinate.split(',')
          const lon = split[0]
          const lat = split[1]
          this.editForm.longitude = lon
          this.editForm.latitude = lat
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
      this.editForm.domains.push({
        date: '',
        time1: '',
        time2: '',
        key: Date.now()
      })
    },
    removeDomain(item, index) {
      var index = this.editForm.domains.indexOf(item)
      if (index !== -1) {
        this.editForm.domains.splice(index, 1)
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
