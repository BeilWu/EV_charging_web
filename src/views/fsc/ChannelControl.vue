<template>
  <div class="app-container">
      <!--查询信息-->
      <el-form label-width="150px" :model="search">
        <el-row>
          <el-col :span="6">
            <el-form-item label="采购渠道">
              <el-select clearable placeholder="请选择" v-model="search.buyerType" style="width: 100%" @change="changeBuyerType">
                <el-option v-for="item in buyerOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应渠道">
              <el-select clearable placeholder="请选择" v-model="search.suppChannelId" style="width: 100%" @change="changeSupp">
                <el-option v-for="item in suppChannelOptions" :key="item.suppChannelId" :label="item.suppChannelName" :value="item.suppChannelId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :push="3" :span="6">
            <el-form-item>
              <el-button type="primary" style="width: 60%" @click="add">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="采购子渠道">
                <el-select clearable placeholder="请选择" v-model="search.buyerId" style="width: 100%" :disabled="flagB">
                  <el-option v-for="item in chBuyerChannelOptions" :key="item.buyerId" :label="item.buyerName" :value="item.buyerId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="供应子渠道">
                <el-select clearable placeholder="请选择" v-model="search.supplierId" style="width: 100%" :disabled="flagS">
                  <el-option v-for="item in chSuppChannelOptions" :key="item.supplierId" :label="item.supplierName" :value="item.supplierId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :push="3" :span="6">
              <el-form-item >
                <el-button type="primary" style="width: 60%" @click="getInfoList">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <el-table :data="infoList" border style="width: 100%">
        <el-table-column label="操作" align="center">
          <template slot-scope="scope" align="center">
            <el-button type="text" @click="modify(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="buyerType" label="采购渠道" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.buyerType === 1">B端</template>
            <template v-if="scope.row.buyerType === 2">C端</template>
          </template>
        </el-table-column>
        <el-table-column prop="buyerName" label="采购子渠道" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.buyerName === this.yin"></template>
            <template v-else>
              {{scope.row.buyerName}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="suppChannelName" label="供应渠道" align="center"></el-table-column>
        <el-table-column prop="controlType" label="控制方式" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.controlType === 1">全部</template>
            <template v-if="scope.row.controlType === 2">包含</template>
            <template v-if="scope.row.controlType === 3">排除</template>
          </template>
        </el-table-column>
        <el-table-column prop="supplierName" label="供应子渠道" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.supplierName === yin"></template>
            <template v-else>
              {{scope.row.supplierName}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
      </el-table>
    <!--增加弹窗-->
    <el-dialog class="dialogAdd" :visible.sync="dAddVisible" width="650px">
      <el-form label-width="150px" :model="dAdd">
        <el-form-item label="采购渠道：">
          <el-select clearable placeholder="请选择" v-model="dAdd.buyerType" style="width: 50%" @change="changeAddBuyer">
            <el-option v-for="item in buyerOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购子渠道：">
          <el-button type="text" size="large" @click="addBuyer" class="text-btn" :disabled="flagB_add">编辑</el-button>
        </el-form-item>
        <el-form-item label="供应渠道：">
          <el-select clearable placeholder="请选择" v-model="dAdd.suppChannelId" style="width: 50%" @change="changeAddSupp" ref="suppRef">
            <el-option v-for="item in suppChannelOptions" :key="item.suppChannelId" :label="item.suppChannelName" :value="item.suppChannelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="控制方式：">
          <el-radio-group v-model="dAdd.controlType" label="控制方式" @change="changeCtrl">
            <el-radio :label = 1>全部</el-radio>
            <el-radio :label = 2>包含</el-radio>
            <el-radio :label = 3>排除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="供应子渠道：">
          <el-button type="text" size="large" @click="addSupp" class="text-btn" :disabled="flagS_add">编辑</el-button>
        </el-form-item>
        <!--增加采购子渠道弹窗-->
        <el-dialog class="dialogAddBuyer" :visible.sync="dAddBuyerVisible" title="采购子渠道" append-to-body @open="showBuyer">
          <el-table :data="addBuyerInfo" border @selection-change = "changeBuyer" ref="_buyerTab">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="buyerName" label="子渠道名称" align="center"></el-table-column>
            <el-table-column prop="buyerCode" label="子渠道Code" align="center"></el-table-column>
          </el-table>
          <div class="dialog-footer">
            <el-button type="primary" class="footer-btn" @click="subBuyerAdd">提 交</el-button>
            <el-button type="primary" class="footer-btn" @click="cleBuyerAdd">清 空</el-button>
          </div>
        </el-dialog>
        <!--增加供应渠道弹窗-->
        <el-dialog class="dialogAddSupp" :visible.sync="dAddSuppVisible" title="供应子渠道" append-to-body @open="showSupplier">
          <el-table :data="addSuppInfo" border @selection-change = "changeChSupp" ref="_chSuppTab">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
            <el-table-column prop="supplierId" label="供应商ID" align="center"></el-table-column>
          </el-table>
          <div class="dialog-footer">
            <el-button type="primary" class="footer-btn" @click="subSuppAdd">提 交</el-button>
            <el-button type="primary" class="footer-btn" @click="cleSuppAdd">清 空</el-button>
          </div>
        </el-dialog>
      </el-form>
      <div style="margin-top: 10px; margin-left: 40%; width: 20%">
        <el-button type="primary" style="width: 100%" @click="submitAdd">提 交</el-button>
      </div>
    </el-dialog>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync='currentPage'
      :page-size="pageSize"
      layout="prev, pager, next,total,jumper"
      :total="count"
      class="pagination-wrapper">
    </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
  import FscApi from '@/api/fsc'
  import vue from 'vue'
export default {
    name: 'channel-control',
    data() {
      return {
        search: {
          buyerType: '',
          suppChannelId: '',
          buyerId: '',
          supplierId: ''
        },
        suppAdd: {
          id: '',
          suppChannelId: '',
          suppChannelName: '',
          suppChannelCode: '',
          except: '',
          selected: ''
        },
        dAdd: {
          id: '',
          buyerType: '',
          suppChannelId: '',
          suppChannelName: '',
          supplierId: '',
          supplierNames: '',
          buyerId: '',
          buyerNames: '',
          controlType: Number,
          delFlag: 0,
          staff: {
            uid: '456',
            nameEn: 'Jarvis',
            nameCh: '张三'
          }
        },
        addBuyerInfo: [],
        yin: '\"\"',
        addSuppInfo: [],
        buyerOptions: [{
          label: 'B端',
          value: 1
        }, {
          label: 'C端',
          value: 2
        }],
        _buyer: [], // 可多选
        _chSupp: [], // 可多选
        _buyerTab: [],
        _chSuppTab: [],
        flagB: true,
        flagS: true,
        flagB_add: true,
        flagS_add: true,
        flag: true, // 是否新增
        infoList: [],
        suppRef: '',
        suppChannelOptions: [],
        chSuppChannelOptions: [],
        chBuyerChannelOptions: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        start: 1,
        dAddVisible: false,
        dAddBuyerVisible: false,
        dAddSuppVisible: false,
        dAddChSuppVisible: false
      }
    },
    methods: {
      // 新增窗口弹出
      add() {
        this.dAdd = {
          buyerType: '',
          suppChannelId: '',
          suppChannelName: '',
          supplierId: '',
          supplierNames: '',
          buyerId: '',
          buyerNames: '',
          controlType: Number,
          delFlag: 0,
          staff: {
            uid: '456',
            nameEn: 'Jarvis',
            nameCh: '张三'
          }
        }
        this.flagB_add = true
        this.flagS_add = true
        this.dAddVisible = true
        this.flag = true
      },
      // 删除
      deleteRow(row) {
        this.$confirm('确定删除吗, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          const sendData = {
            id: row.id - 0,
            delFlag: 1,
            staff: {
              uid: '',
              nameEn: '',
              nameCh: ''
            }
          }
          FscApi.post('/manager/editBuyerSuppControlList', sendData).then(response => {
            if (response.success) {
              this.$message({
                message: '已成功删除',
                type: 'success'
              })
            }
            this.getInfoList()
          })
        })
      },
      // 修改
      modify(row) {
        this.flag = false
        this.dAdd.id = row.id
        this.dAdd.buyerType = row.buyerType
        this.dAdd.suppChannelId = row.suppChannelId
        this.dAdd.supplierId = row.supplierId
        this.dAdd.buyerId = row.buyerId
        this.dAdd.controlType = row.controlType
        this.dAdd.delFlag = 0
        this.flagB_add = false
        this.flagS_add = (row.controlType === 1)
        this.getChBuyerChannelAdd()
        this.getChSuppChannelAdd()
        this.dAddVisible = true
      },
      // 新增或修改窗口提交
      submitAdd() {
        console.log(this.dAdd.controlType)
        if (this.dAdd.buyerType === '') {
          this.$message({
            message: '请选择采购商',
            type: 'error'
          })
          return ''
        }
        if (this.dAdd.suppChannelId === '') {
          this.$message({
            message: '请选择供应商',
            type: 'error'
          })
          return ''
        }
        if (this.dAdd.controlType !== 1 && this.dAdd.controlType !== 2 && this.dAdd.controlType !== 3) {
          this.$message({
            message: '请选择控制方式',
            type: 'error'
          })
          return ''
        }
        if (this.dAdd.buyerType === '') {
          this.$message({
            message: '请选择采购渠道',
            type: 'error'
          })
          return ''
        }
        if (this.dAdd.suppChannelId === '') {
          this.$message({
            message: '请选择供应渠道',
            type: 'error'
          })
          return ''
        }
        if (this.dAdd.buyerId === '') {
          console.log(this.dAdd.buyerId)
          this.$message({
            message: '请选择采购子渠道',
            type: 'error'
          })
          return ''
        }
        if (this.dAdd.supplierId === '' && this.dAdd.controlType !== 1) {
          this.$message({
            message: '请选择供应子渠道',
            type: 'error'
          })
          return ''
        }
        this.$confirm('确定提交吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonLoading: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.showCancelButton = false
              const sendData = {
                delFlag: 0,
                buyerType: this.dAdd.buyerType - 0,
                buyerId: this.dAdd.buyerId,
                suppChannelId: this.dAdd.suppChannelId - 0,
                suppChannelName: this.$refs.suppRef.selectedLabel,
                supplierId: this.dAdd.supplierId,
                supplierName: this.dAdd.supplierNames,
                buyerName: this.dAdd.buyerNames,
                controlType: this.dAdd.controlType - 0,
                staff: {
                  uid: '',
                  nameEn: '',
                  nameCh: ''
                }
              }
              if (!this.flag) {
                sendData.id = this.dAdd.id
              }
              FscApi.post('/manager/editBuyerSuppControlList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '已成功提交',
                    type: 'success'
                  })
                  this.dAddVisible = false
                  this.getInfoList()
                }
                done()
              })
            } else {
              done()
            }
          }
        }).then(() => {
        })
      },
      // 处理分页
      handleCurrentChange(page) {
        this.start = (page - 1) * this.pageSize + 1
        this.currentPage = page
        this.getInfoList()
      },
      // 新增窗口改变采购商
      changeAddBuyer() {
        this.getChBuyerChannelAdd()
        if (!this.dAdd.buyerType) {
          this.flagB_add = true
          this.dAdd.buyerId = ''
        } else {
          this.flagB_add = false
        }
      },
      // 修改时选中原数据
      showBuyer() {
        vue.nextTick(_ => {
          const selectedId = this.dAdd.buyerId.split(',')
          selectedId.forEach(i => {
            this.$refs._buyerTab.toggleRowSelection(this.addBuyerInfo.find(d => parseInt(d.buyerId) === parseInt(i)), true) // 设置默认选中
          })
        })
      },
      // 修改时选中原数据
      showSupplier() {
        vue.nextTick(_ => {
          const selectedId = this.dAdd.supplierId.split(',')
          selectedId.forEach(i => {
            this.$refs._chSuppTab.toggleRowSelection(this.addSuppInfo.find(d => parseInt(d.supplierId) === parseInt(i)), true) // 设置默认选中
          })
        })
      },
      // 新增窗口改变供应商
      changeAddSupp() {
        this.getChSuppChannelAdd()
        if (!this.dAdd.suppChannelId) {
          this.flagS_add = true
          this.dAdd.supplierId = ''
        } else if (this.dAdd.controlType !== 1) {
          this.flagS_add = false
        }
      },
      // 更改控制方式
      changeCtrl() {
        if (this.dAdd.controlType === 1) {
          this.flagS_add = true
        } else if (this.dAdd.suppChannelId) {
          this.flagS_add = false
        }
      },
      // 新增窗口提交采购商子渠道
      subBuyerAdd() {
        this.dAdd.buyerNames = ''
        this.dAdd.buyerId = ''
        for(let i = 0;i < this._buyer.length;i++){
          if(typeof(this._buyer[i]) === 'undefined'){
            this._buyer.splice(i, 1)
          }
        }
        if (this._buyer.length < 1) {
          this.$message({
            message: '请至少选择一个采购商子渠道',
            type: 'error'
          })
          return ''
        }
        for (const index in this._buyer) {
          if (index !== '0') {
            this.dAdd.buyerId += ','
            this.dAdd.buyerNames += ','
          }
          this.dAdd.buyerId += this._buyer[index].buyerId
          this.dAdd.buyerNames += this._buyer[index].buyerName
        }
        this.dAddBuyerVisible = false
      },
      // 新增窗口清空采购商渠道
      cleBuyerAdd() {
        this.$refs._buyerTab.clearSelection()
      },
      // 新增窗口提交供应商子渠道
      subSuppAdd() {
        this.dAdd.supplierNames = ''
        this.dAdd.supplierId = ''
        for(let i = 0;i < this._chSupp.length;i++){
          if(typeof(this._chSupp[i]) === 'undefined'){
            this._chSupp.splice(i, 1)
          }
        }
        if (this._chSupp.length < 1) {
          this.$message({
            message: '请至少选择一个供应商子渠道',
            type: 'error'
          })
          return ''
        }
        for (const index in this._chSupp) {
          if (index !== '0') {
            this.dAdd.supplierId += ','
            this.dAdd.supplierNames += ','
          }
          this.dAdd.supplierId += this._chSupp[index].supplierId
          this.dAdd.supplierNames += this._chSupp[index].supplierName
        }
        this.dAddSuppVisible = false
      },
      // 新增窗口清空供应商渠道
      cleSuppAdd() {
        this.$refs._chSuppTab.clearSelection()
      },
      // 采购商子渠道添加
      addBuyer() {
        this.dAddBuyerVisible = true
      },
      // 供应商渠道添加
      addSupp() {
        this.dAddSuppVisible = true
      },
      // 搜索里改变buyerType下拉框
      changeBuyerType() {
        this.getChBuyerChannelList()
        if (!this.search.buyerType) {
          this.flagB = true
          this.search.buyerId = ''
        } else {
          this.flagB = false
        }
      },
      // 搜索里改变Supp下拉框
      changeSupp() {
        this.getChSuppChannelList()
        if (!this.search.suppChannelId) {
          this.flagS = true
          this.search.supplierId = ''
        } else {
          this.flagS = false
        }
      },
      // 选择采购子渠道
      changeBuyer(val) {
        this._buyer = val
      },
      // 选择供应子渠道
      changeChSupp(val) {
        this._chSupp = val
      },
      // 获取表内信息
      getInfoList() {
        const sendData = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        if (this.search.buyerId !== '') {
          sendData.buyerId = this.search.buyerId - 0
        }
        if (this.search.buyerType !== '') {
          sendData.buyerType = this.search.buyerType - 0
        }
        if (this.search.supplierId !== '') {
          sendData.supplierId = this.search.supplierId - 0
        }
        if (this.search.suppChannelId !== '') {
          sendData.suppChannelId = this.search.suppChannelId - 0
        }
        FscApi.post('/manager/queryBuyerSuppControlList', sendData).then(response => {
          if (response.success) {
            this.infoList = response.data.data
            this.count = response.data.total
          }
        })
      },
      // 获取供应商渠道
      getSuppChannelList() {
        const sendData = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        FscApi.post('/manager/queryChannelList', sendData).then(response => {
          if (response.success) {
            this.suppChannelOptions = response.data.data
          }
        })
      },
      // 获取供应商子渠道
      getChSuppChannelList() {
        const sendData = {
          suppChannelId: this.search.suppChannelId - 0,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        FscApi.post('/manager/queryChildSupplierList', sendData).then(response => {
          if (response.success) {
            this.chSuppChannelOptions = response.data.data
          }
        })
      },
      // 增加弹窗内获取供应商子渠道
      getChSuppChannelAdd() {
        const sendData = {
          suppChannelId: this.dAdd.suppChannelId - 0,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        FscApi.post('/manager/queryChildSupplierList', sendData).then(response => {
          if (response.success) {
            this.addSuppInfo = response.data.data
          }
        })
      },
      // 获取采购商子渠道
      getChBuyerChannelList() {
        const sendData = {
          buyerType: this.search.buyerType - 0,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        FscApi.post('/manager/queryChildBuyerList', sendData).then(response => {
          if (response.success) {
            this.chBuyerChannelOptions = response.data.data
          }
        })
      },
      // 增加弹窗内获取采购商子渠道
      getChBuyerChannelAdd() {
        const sendData = {
          buyerType: this.dAdd.buyerType - 0,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        FscApi.post('/manager/queryChildBuyerList', sendData).then(response => {
          if (response.success) {
            this.addBuyerInfo = response.data.data
          }
        })
      }
    },
    mounted() {
      this.getSuppChannelList()
      this.getChSuppChannelList()
      this.getChBuyerChannelList()
      this.getInfoList()
    }
}
</script>

<style lang="scss" scoped>
  .text-btn {
    margin-top: -5px;
  }
  .dialog-footer {
    padding-top: 60px;
    margin-left: 70%;
    .footer-btn {
      margin-left: 20px;
    }
  }
</style>
