<template>
<div class="app-container">

    <div class="container-fluid py-4">
       <div class="row">
        <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">weekend</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize"><h3>充电站数量</h3></p>
                <h3 class="mb-0">{{ this.csNum }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">person</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize"><h3>区域总车流量</h3></p>
                <h3 class="mb-0"> {{ this.totalFlow }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">person</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize"><h3>平均定价</h3></p>
                <h3 class="mb-0">{{this.averagePrice}}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-4 flowmap">
        <div class="row">
            <div class="col-xl-8 col-sm-6 mapstyle mapborder" id="container"></div> 
            <div class="col-xl-3 col-sm-6 mapborder tablestyle">
            <span><h3 class="title text-center top-margin">不同区域车流量与定价</h3></span>
            <table>
                <tr>
                <th>区域</th>
                <th>车流量</th>
                <th>定价</th>
                </tr>
                <tr>
                <td>玄武区</td>
                <td>{{this.flowList[0]}}</td>
                <td>{{this.priceList[0]}}</td>
                </tr>
                <tr>
                <td>秦淮区</td>
                <td>{{this.flowList[1]}}</td>
                <td>{{this.priceList[1]}}</td>
                </tr>
                <tr>
                <td>鼓楼区</td>
                <td>{{this.flowList[2]}}</td>
                <td>{{this.priceList[2]}}</td>
                </tr>
                <tr>
                <td>建邺区</td>
                <td>{{this.flowList[3]}}</td>
                <td>{{this.priceList[3]}}</td>
                </tr>
                <tr>
                <td>雨花台区</td>
                <td>{{this.flowList[4]}}</td>
                <td>{{this.priceList[4]}}</td>
                </tr>
                <tr>
                <td>栖霞区</td>
                <td>{{this.flowList[5]}}</td>
                <td>{{this.priceList[5]}}</td>
                </tr>
                <tr>
                <td>浦口区</td>
                <td>{{this.flowList[6]}}</td>
                <td>{{this.priceList[6]}}</td>
                </tr>
                <tr>
                <td>江宁区</td>
                <td>{{this.flowList[7]}}</td>
                <td>{{this.priceList[7]}}</td>
                </tr>
            </table>

            <button type="button" class="btn bg-gradient-primary w-90 my-4 mb-2 butwbwstyle">
                刷新车流量</button>

            <button type="button" class="btn bg-gradient-primary w-90 my-4 mb-2 butwbwstyle">
                刷新充电站定价</button>

            <el-button type="primary" class="btn bg-gradient-primary w-90 my-4 mb-2 butwbwstyle" @click="clearMarker">显示/隐藏所有充电站</el-button>
            <!-- <button type="button"  @onclick="">
                显示/隐藏所有充电站</button> -->
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'pricing strategy',

      data() {
        return {
          csNum: 0,
          priceList: [],
          capacityList: [],
          markerFlag: true,
          markerList: [],
          lngList: [],
          lagList: [],
          flowList: [],
          titleList: [],
          totalFlow: 0,
          averagePrice: 0,
          map: null
        }
      },

      mounted() {
        window._AMapSecurityConfig = {
            securityJsCode:'bb658771cdbc443844db68f695938888',
        }

        var that = this
        that.dataCalculte()

        window.onLoad  = function(){
            var map = new AMap.Map('container', {
              center:[118.79974617919925,32.03257844955103],
              mapStyle: 'amap://styles/macaron', //设置地图的显示样式
              zoom:12
            });

            that.map = map

            // 定义点标记
            for(var i=0;i<that.csNum;i++) {
              var marker = new AMap.Marker({
                position: new AMap.LngLat(that.lngList[i], that.lagList[i]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                icon: '../../src/assets/newImg/marker.png',
                title: that.titleList[i]
              });

              marker.title = that.titleList[i]
              marker.price = that.priceList[i]
              marker.capacity = that.capacityList[i]
              marker.lng = that.lngList[i]
              marker.lag = that.lagList[i]

              that.markerList.push(marker);

              // 点击marker显示信息
              marker.on('click', function(p) {
                var textContent = '<h3 style="color:orange">'+ p.target.title +'</h3>' +
                                  '<ul>' +
                                  '<li>充电站定价：' + p.target.price + '</li>' + '<br/>' +
                                  '<li>充电站容量：' + p.target.capacity +  '</li>' + '<br/>' +
                                  '<li>经纬度：' +  p.target.lng +',' + p.target.lag  + '</li>' +
                                  '</ul>'
                                
                var infoWindow = new AMap.InfoWindow({
                    content: textContent,
                    offset: new AMap.Pixel(-10, -25)
                });
                //打开信息窗口
                infoWindow.open(map, [p.target.lng, p.target.lag]); //后面的参数指的是经纬度，在此显示窗口
              })
            }

            map.add(that.markerList);  // 在地图中显示点标记

        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=be28774464b26fe0cc480c0ef7b819b0&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
      },

      methods: {

        dataCalculte() {
          this.csNum = 8
          this.priceList = [85, 88, 84, 82, 90, 88, 84, 89]
          this.capacityList = [24, 20, 20, 28, 24, 18, 26, 32]
          this.markerFlag = true
          this.lngList = [118.81431200012209, 118.7945, 118.776519, 118.738569, 118.785445, 118.915423, 118.634604, 118.846567]
          this.lagList = [32.01735319216925, 32.03899, 32.072405, 32.00937, 31.997859, 32.1026, 32.064679, 31.958527]
          this.flowList = [269, 370, 470, 267, 304, 494, 585, 963]
          this.titleList = ["玄武区充电站", "秦淮区充电站", "鼓楼区充电站", "建邺区充电站", "雨花台区充电站", "栖霞区充电站", "浦口区充电站", "江宁区充电站"]

          var sumPrice = 0
          this.priceList.forEach(function(val){
            sumPrice += val
          })
          this.averagePrice = sumPrice / this.priceList.length

          var flowSum = 0
          this.flowList.forEach(function(val) {
            flowSum += val
          })
          this.totalFlow = flowSum
        },

        clearMarker() {
          if (this.markerFlag) {
              this.map.remove(this.markerList);
          } else {
              this.map.add(this.markerList);
          }
          this.markerFlag = !this.markerFlag;
        }
      }
    }
</script>

<style scoped src="../../assets/css/material-dashboard.css?v=3.0.0">
</style>
<style lang="scss" scoped>    
    .flowmap {
        margin-left: 15px;
    }

    .mapstyle {
        margin-right: 25px;
    }

    .top-margin {
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .mapborder {
        border:2px solid rgb(119, 107, 107);
        border-radius:15px;
    }

    #container {
        width: 70%; 
        height: 650px;
        /* margin-right: 24px; */
    }  

    .tablestyle {
        margin:0,auto;
    }

    table {
        margin:auto;
        width: 90%;
        align-items: center;
        border:3px solid black;
        table-layout: fixed;word-break: break-all; word-wrap: break-word;
    }

    th, td {
        font-size: large;
        text-align: center;
        height: 35px;
        background-color: gray;
        border:2px solid black;
        color: white;
    }

    td {
        background-color: white;
        color: black;
    }

    .butwbwstyle {
        margin-left: 20px;
        font-size: large;
    }
</style>
