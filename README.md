## Build Setup

``` bash
#项目部署步骤
1. 在计算机本地安装node.js，并配置好环境变量。
  用 node -v  查看node是否已安装；
  用 npm -v 查看npm的版本；

2. 在项目根目录安装npm依赖包
npm install

*注意：这一步直接用npm install安装依赖的话会非常慢，因为是从国外的服务器下载，因此可以换用cnpm进行安装
首先在cmd里执行如下命令，查看是否已安装cnpm
cnpm -v

若已经安装cnpm，则可以跳过这一步；
若没有安装cnpm，可以直接在cmd里执行如下命令，利用淘宝镜像安装cnpm：
npm install -g cnpm -registry=https://registry.npm.taobao.org

然后再用cnpm 安装依赖包（在项目根目录执行）
cnpm install

*注意，当安装好依赖后，项目目录里面会出现一个node_modules文件夹。

3. 在本地运行项目localhost:9528
npm run dev

#项目文件介绍
1. 项目主要的源码和资源都位于src文件夹下，下面先介绍src文件夹下的views文件夹。

  需要编写的业务代码全部位于src/views/文件夹下；
  
  与本次毕业设计相关的代码写在src/views/CitySimulation/文件夹下有两个文件，分别是PricingStrategy.vue，用来写定价的界面；还有一个CityFlow.vue文件，用来写CityFlow模拟车流；

  dashboard文件夹不用管；
  
  fsc文件夹下是参考代码，可以用它来照葫芦画瓢；
  
  layout文件夹是项目架子的布局文件，与业务无关；
  
  login文件夹下是负责登录界面的代码；

2. 项目最上面的build和config文件夹与项目配置相关。

3. src/api文件夹下面主要是js文件，里面的文件用来做前后端数据交互使用；

4. src/assets文件夹下存放系统相关的图片，样式等资源；

5. src/icons文件夹下存放了一些矢量图标，可以用来插入到项目里；

6. src/router文件夹下的文件用来管理项目菜单；

7.src/store文件夹好像没什么用，不用管；

8.src/styles文件夹存放了一些样式文件，不用管；

9.src/utils文件夹里面有一个工具文件，比如加密算法等等，不用管；

10.项目里面的其他乱七八糟的文件都不用管，唯一需要主要的是最下面的index.html文件，这个文件里面放的是最原始的html文件所需要的<head>和<body>,主要作用是，当整个项目被编译构建后，会将前面所有的文件里面信息插入到这里来，形成浏览器可以解析的html文件。
  
  
