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

然后再用cnpm 安装依赖包（直接打开cmd运行即可）
cnpm install

3. 在本地运行项目localhost:9528
npm run dev
