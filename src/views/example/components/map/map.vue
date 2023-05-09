<template>
  <div class="amap-page-container">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" />
    <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo" :events="events">
      <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" />
    </el-amap>
    <div class="toolbar">position: [{{ lng }}, {{ lat }}] address: {{ address }}</div>
  </div>
</template>

<style>
.el-vue-amap-container.amap-demo {
	width: 960px;
	height: 516px;
}
.search-box {
	position: absolute;
	top: 55px;
	left: 20px;
}
.amap-page-container {
	position: relative;
}
</style>

<script>
export default {
  name: 'Mymap',
  data: function() {
    const self = this
    return {
      zoom: 20,
      center: [121.52014, 31.198862],
      searchOption: {
        city: '',
        citylimit: true
      },
      marker: {
        position: [121.52014, 31.198862]
      },
      mapInfo: {
        address: '',
        lng: '',
        lat: ''
      },
      address: '',
      events: {
        click(e) {
          const { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.mapInfo.lat = lat
          self.mapInfo.lng = lng
          self.marker.position = [lng, lat]
          // 这里通过高德 SDK 完成。
          // AMap.plugin(["AMap.Geocoder"]),function(){
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all',
            city: ''
          })
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.mapInfo.address = result.regeocode.formattedAddress
                self.$emit('listenToMap', self.mapInfo)
                self.$nextTick()
              }
            }
          })

          // }
        }
      },
      lng: 0,
      lat: 0
    }
  },
  methods: {
    onSearchResult(pois) {
      console.log(pois, 'pois')
      var lng = pois[0].lng
      var lat = pois[0].lat
      this.lng = pois[0].lng
      this.lat = pois[0].lat
      this.center = [lng, lat]
      this.marker.position = [lng, lat]
      this.address = pois[0].name
      this.mapInfo.lat = lat
      this.mapInfo.lng = lng
      this.mapInfo.address = pois[0].name
      this.$emit('listenToMap', this.mapInfo)
    }
  }
}
</script>

<!-- <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=xxxx&plugin=AMap.Geocoder"></script> -->
<!-- <script src="http://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script> -->
<!--引入高德地图JSAPI -->
<script src="//webapi.amap.com/maps?v=2.0&key=8180928274c86b53628ec3a27e356da4"></script>

<!--引入UI组件库（1.1版本） -->
<script src="//webapi.amap.com/ui/1.1/main.js"></script>
