(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b5333af"],{"190f":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("br"),t._v(" 数据id: "+t._s(this.$route.query.id)+" "),a("hr"),t._m(0),a("el-form",{staticStyle:{width:"80%",margin:"0 auto"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Project Type:")]),t._v(" "+t._s(this.$route.query.Type)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Category:")]),t._v(" "+t._s(this.$route.query.Category)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Event Name:")]),t._v(" "+t._s(this.$route.query.name)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Location (Address):")]),t._v(" "+t._s(this.$route.query.address)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Location (Lat Long):")]),a("br"),t._v(" "+t._s(this.$route.query.latitude)+","+t._s(this.$route.query.longitude)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("tinymce",{attrs:{height:150}})],1)],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Upload Thumbnail / Cover Image:")]),a("br"),a("br"),a("img",{staticClass:"img-fluid",staticStyle:{width:"200px",height:"180px"},attrs:{"data-v-c150da66":"",src:"https://s3.ap-southeast-1.amazonaws.com/propnex-xserver-img/pnimgs/fileservice/1000059/propnex-today/2208/1000059-propnex-today-1661830665-PWS-II1920x1080R11.png"}})])],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("label",{attrs:{for:""}},[t._v("Event Date:")]),t._v(" "+t._s(this.$route.query.date)+" ")]),a("el-col",{attrs:{span:16}},[a("label",{attrs:{for:""}},[t._v("Time Range:")])])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Determine number of PAX per slot:")]),t._v(" "+t._s(this.$route.query.PAX)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Capacity:")]),t._v(" "+t._s(this.$route.query.Capacity)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Detail of Guests:")]),t._v(" "+t._s(this.$route.query.details)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Login required:")]),t._v(" "+t._s(this.$route.query.Login)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("label",{attrs:{for:""}},[t._v("Auto Reply Email Message:")]),t._v(" "+t._s(this.$route.query.Category)+" ")])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("tinymce",{attrs:{height:150}})],1)],1)],1)],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"filter-container",staticStyle:{"text-align":"left"}},[a("span",{staticClass:"title"},[t._v("Event Details")])])}],l=a("ade3"),o=a("8256"),i={name:"EightoneCalendarMgtAdd",components:{Tinymce:o["a"]},data:function(){var t;return t={dialogImageUrl:"",dialogVisible:!1,value1:"",startTime:"",endTime:"",checked:!0,radio:"1",num:1,checkList:["选中且禁用","复选框 A"]},Object(l["a"])(t,"value1",!1),Object(l["a"])(t,"value2",!1),Object(l["a"])(t,"value",""),t},mounted:function(){},created:function(){this.getParams()},methods:{getParams:function(){this.$route.query.id},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleChange:function(t){console.log(t)}}},n=i,c=(a("8a89"),a("2877")),u=Object(c["a"])(n,r,s,!1,null,"07aee961",null);e["default"]=u.exports},"8a89":function(t,e,a){"use strict";a("c188")},c188:function(t,e,a){}}]);