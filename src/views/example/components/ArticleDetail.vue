<template>
  <div class="app-container">
    <div class="filter-container" style="text-align: left;">
      <p class="title">Update Event</p>
    </div>

    <!-- <div style="width: 80%; margin: 0px auto;">
      <el-form ref="ruleForm" :model="ruleForm" class="el-form el-form--label-top" style="width: 100%;">
        <el-row style="margin-left: -10px; margin-right: -10px; margin-bottom: 0px;">
          <el-col :span="12" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="" class="el-form-item is-required is-no-asterisk el-form-item--medium">
              <label for="type" class="el-form-item__label">
                <span>
                  Project Type:
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item>
                <el-select placeholder="Please Select" style="width:100%;">
                  <el-option>Private</el-option>
                  <el-option>Public</el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-left: -10px; margin-right: -10px; margin-bottom: 0px;">
          <el-col :span="12" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="" class="el-form-item is-required is-no-asterisk el-form-item--medium">
              <label for="type" class="el-form-item__label">
                <span>
                  Category:
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item>
                <el-select placeholder="Please Select" style="width:100%;">
                  <el-option>Project</el-option>
                  <el-option>General</el-option>
                  <el-option>Training</el-option>
                  <el-option>Friends</el-option>
                  <el-option>Virtual</el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-left: -10px; margin-right: -10px; margin-bottom: 0px;">
          <el-col :span="12" style="padding-left: 10px; padding-right: 10px;">
            <el-form-item label="" class="el-form-item is-required is-no-asterisk el-form-item--medium">
              <label for="type" class="el-form-item__label">
                <span>
                  Event Name (Please only restrict up to 80 chars):
                  <label for="" style="color:red">*</label>
                </span>
              </label>
              <el-form-item>
                <el-input placeholder=""></el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <p class="title">Location</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="">
              <label class="el-form-item__label">Enter Address:</label>
              <el-form-item label="">
                <el-input placeholder="Enter Address"></el-input>
              </el-form-item>
            </el-form-item>
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
                      <input type="number" autocomplete="off" placeholder="Enter Latitude ex. 1.00"
                        class="el-input__inner">
                    </div>
                    <span>,</span>
                    <div class="el-input el-input--medium">
                      <input type="number" autocomplete="off" placeholder="Enter Longitude ex. 103.00"
                        class="el-input__inner">
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
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
              <el-form-item label="">
                <tinymce :height="150" />
              </el-form-item>
            </el-form-item>
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
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="8">
                <label for="Event Date" class="el-form-item__label">
                  <span>
                    Event Date:
                    <label for="" style="color:red">*</label>
                  </span>
                </label>
                <div class="block">
                  <el-date-picker v-model="value1" type="date" placeholder="yyy-mm-dd">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="16">
                <label for="Choose Time Range (start and end time):" class="el-form-item__label">
                  <span>
                    Choose Time Range (start and end time):
                    <label for="" style="color:red">*</label>
                  </span>
                </label><br>
                <el-time-select placeholder="hh:mm" v-model="startTime" :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }">
                </el-time-select>
                -
                <el-time-select placeholder="hh:mm" v-model="endTime" :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime
                }">
                </el-time-select>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col>
                <el-checkbox v-model="checked">Split into hourly interval</el-checkbox>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col>
                <el-button type="primary">Add</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <label for="type" class="el-form-item__label">Determine number of PAX per slot:</label>
            <el-form-item>
              <el-select placeholder="Please Select" style="width:100%;">
                <el-option>1</el-option>
                <el-option>2</el-option>
                <el-option>3</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="16">
            <label for="type" aria-required="required">Capacity:</label>
            <el-form-item>
              <el-radio v-model="radio" label="1">Limited</el-radio>
              <el-radio v-model="radio" label="2">UnLimited</el-radio>
              <input type="number" autocomplete="off" placeholder="Enter Capacity" class="el-input__inner">
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="16">
            <label for="type" aria-required="required">Detail of Guests</label>
            <el-form-item>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="Name"></el-checkbox>
                <el-checkbox label="Phone"></el-checkbox>
                <el-checkbox label="Nric Number"></el-checkbox>
                <el-checkbox label="Email"></el-checkbox>
                <el-checkbox label="Mailing Address"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="" class="el-form-item is-required is-no-asterisk el-form-item--medium">
              <label for="type" class="el-form-item__label">Auto Reply Email Message:</label>
              <el-form-item>
                <tinymce :height="150" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-row style="margin-bottom: 10px;">
              <el-switch v-model="value1" active-text="Publish as story">
              </el-switch>
            </el-row>
            <el-row style="margin-bottom: 10px;">
              <el-switch v-model="value2" active-text="Login required">
              </el-switch>
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin-top: 30px; margin-bottom: 40px; text-align: center;">
          <button data-v-0dc77527="" type="button" class="el-button el-button--primary el-button--medium is-round" style="width: 200px; height: 40px;">
            <span>Submit</span>
          </button>
        </el-row>

      </el-form>
    </div> -->

    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                Title
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.author"
                      :remote-method="getRemoteUserList"
                      filterable
                      default-first-option
                      remote
                      placeholder="Search user"
                    >
                      <el-option v-for="(item, index) in userListOptions" :key="item + index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="120px" label="Publish Time:" class="postInfo-container-item">
                    <el-date-picker
                      v-model="displayTime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      placeholder="Select date and time"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
          <el-input
            v-model="postForm.content_short"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="Please enter the content"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
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
      value: '',

      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.el-row {
  margin: 10px;
}

label {
  font-size: 14px;
  font-weight: normal;
  color: #525252;
}

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
