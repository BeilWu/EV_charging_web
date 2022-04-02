<template>
  <div class="app-container">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="供应渠道维护" name="first">
        <div class="tabStyle">
          <el-form>
            <el-form-item>
              <el-button size="large" type="primary" @click="addPane1"><li class="el-icon-plus el-icon--left"></li>新增</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <el-table :data="pane1.tableData1" border style="width: 100%">
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editPane1(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteData(scope.row.id, 1)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="供应渠道名称" prop="suppChannelName" align="center"></el-table-column>
            <el-table-column label="供应渠道ID" prop="suppChannelId" align="center"></el-table-column>
            <el-table-column label="供应渠道code" prop="suppChannelCode" align="center"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime" align="center"></el-table-column>
          </el-table>
          <!-- 对话框 -->
          <el-dialog center :visible.sync="pane1.showChannel" @close="cancelPane1">
            <el-form label-width="160px" ref="t1" :model="pane1.t"  :rules="infoRules1">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="供应渠道名称" prop="suppChannelName">
                    <el-input v-model="pane1.t.suppChannelName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" class="buttons" @click="submitPane1(pane1.flag)">提交</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="供应渠道code" prop="suppChannelCode">
                    <el-input v-model="pane1.t.suppChannelCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" class="buttons" @click="cancelPane1">取消</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item v-if="pane1.flag === 0" label="供应渠道ID">
                    <span>（自动生成）</span>
                  </el-form-item>
                  <el-form-item v-if="pane1.flag === 1" label="供应渠道ID">
                    {{ this.pane1.t.suppChannelId }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-dialog>
          <!--翻页-->
          <el-pagination
            @current-change="handleCurrentChange1"
            :current-page.sync='pane1.currentPage'
            :page-size="pane1.pageSize"
            layout="prev, pager, next,total,jumper"
            :total="pane1.count"
            class="pagination-wrapper">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="供应子渠道维护" name="second">
        <div class="tabStyle">
          <el-form>
            <el-form-item>
              <el-button size="large" type="primary" @click="addPane2"><li class="el-icon-plus el-icon--left"></li>新增</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="pane2.tableData2" border style="width: 100%">
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editPane2(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteData(scope.row.id, 2)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="供应商名称" prop="supplierName" align="center"></el-table-column>
            <el-table-column label="供应商ID" prop="supplierId" align="center"></el-table-column>
            <el-table-column label="供应商code" prop="supplierCode" align="center"></el-table-column>
            <el-table-column label="供应渠道" prop="suppChannelName" align="center"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime" align="center"></el-table-column>
          </el-table>
          <el-dialog center :visible.sync="pane2.showSubChannel" @close="cancelPane2">
            <el-form label-width="160px" ref="t2" :model="pane2.t"  :rules="infoRules2">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="供应商名称" prop="supplierName">
                    <el-input v-model="pane2.t.supplierName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" class="buttons" @click="submitPane2(pane2.flag)">提交</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="供应商code" prop="supplierCode">
                    <el-input v-model="pane2.t.supplierCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" class="buttons" @click="cancelPane2">取消</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item v-if="pane2.flag === 0" label="供应商ID">
                    <span>（自动生成）</span>
                  </el-form-item>
                  <el-form-item v-if="pane2.flag === 1" label="供应商ID">
                    {{ this.pane2.t.supplierId }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item v-if="pane2.flag === 0" label="供应渠道" prop="suppChannelId">
                  <el-select style="width:40%" v-model="pane2.t.suppChannelId" @change="changeChannel" clearable placeholder="请选择">
                    <el-option v-for="item in pane2.channelOptions" :key="item.suppChannelId" :label="item.suppChannelName" :value="item.suppChannelId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="pane2.flag === 1" label="供应渠道">
                  {{ this.pane2.t.suppChannelName }}
                </el-form-item>
              </el-row>
            </el-form>
          </el-dialog>
          <!--翻页-->
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page.sync='pane2.currentPage'
            :page-size="pane2.pageSize"
            layout="prev, pager, next,total,jumper"
            :total="pane2.count"
            class="pagination-wrapper">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="采购子渠道维护" name="third">
        <div class="tabStyle">
          <el-form>
            <el-form-item>
              <el-button size="large" type="primary" @click="addPane3"><li class="el-icon-plus el-icon--left"></li>新增</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="pane3.tableData3" border style="width: 100%">
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editPane3(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteData(scope.row.id, 3)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="业务类型" prop="business" align="center">
              <template slot-scope="scope">
                {{fscConst.businessType[scope.row.business]}}
              </template>
            </el-table-column>
            <el-table-column label="采购子渠道名称" prop="buyerName" align="center"></el-table-column>
            <el-table-column label="采购子渠道ID" prop="buyerId" align="center"></el-table-column>
            <el-table-column label="采购子渠道code" prop="buyerCode" align="center"></el-table-column>
            <el-table-column label="采购渠道" prop="buyerType" align="center">
              <template slot-scope="scope">
                {{fscConst.buyerType[scope.row.buyerType]}}
              </template>
            </el-table-column>
            <el-table-column label="修改时间" prop="updateTime" align="center"></el-table-column>
          </el-table>
          <el-dialog center :visible.sync="pane3.showSuppChannel" @close="cancelPane3">
            <el-form label-width="160px" ref="t3" :model="pane3.t"  :rules="infoRules3">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-form-item v-if="pane3.flag === 0" label="业务类型" prop="business">
                    <el-select v-model="pane3.t.business" placeholder="请选择">
                      <el-option v-for="(value, key, index) in fscConst.businessType" :key="index" :label="value" :value="key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="pane3.flag === 1" label="业务类型">
                    {{ fscConst.businessType[this.pane3.t.business] }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="采购子渠道名称" prop="buyerName">
                    <el-input v-model="pane3.t.buyerName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" class="buttons" @click="submitPane3(pane3.flag)">提交</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="采购子渠道code" prop="buyerCode">
                    <el-input v-model="pane3.t.buyerCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" class="buttons" @click="cancelPane3">取消</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item v-if="pane3.flag === 0" label="采购子渠道ID">
                    <span>（自动生成）</span>
                  </el-form-item>
                  <el-form-item v-if="pane3.flag === 1" label="采购子渠道ID">
                    {{ this.pane3.t.buyerId }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item v-if="pane3.flag === 0" label="采购渠道ID" prop="buyerType">
                  <el-select style="width:40%" v-model="pane3.t.buyerType" @change="changeBuyerChannel" clearable placeholder="请选择">
                    <el-option v-for="(value, key, index) in fscConst.buyerType" :key="index" :label="value" :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="pane3.flag === 1" label="采购渠道ID">
                  {{ fscConst.buyerType[this.pane3.t.buyerType] }}
                </el-form-item>
              </el-row>
            </el-form>
          </el-dialog>
          <!--翻页-->
          <el-pagination
            @current-change="handleCurrentChange3"
            :current-page.sync='pane3.currentPage'
            :page-size="pane3.pageSize"
            layout="prev, pager, next,total,jumper"
            :total="pane3.count"
            class="pagination-wrapper">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import UtilPager from '@/utils/UtilPager'
  import FscApi from '@/api/fsc'
  import FscConst from '@/assets/js/fsc/const'
  export default {
    data() {
      return {
        activeName2: 'first',
        fscConst: FscConst,
        pane1: {
          count: 0,
          start: 1,
          pageSize: 100,
          currentPage: 0,
          showChannel: false,
          tableData1: [],
          id: null,
          flag: 0, // 0是新增、1是修改
          maxId: 1004,
          t: {
            suppChannelName: '',
            suppChannelCode: '',
            suppChannelId: 1004
          }
        },
        pane2: {
          count: 0,
          start: 1,
          pageSize: 100,
          currentPage: 0,
          showSubChannel: false,
          tableData2: [],
          id: null,
          flag: 0, // 0是新增、1是修改
          maxId: 7,
          channelOptions: [],
          t: {
            supplierName: '',
            supplierCode: '',
            supplierId: 1,
            suppChannelCode: '',
            suppChannelName: '',
            suppChannelId: ''
          }
        },
        pane3: {
          count: 0,
          start: 1,
          pageSize: 100,
          currentPage: 0,
          showSuppChannel: false,
          tableData3: [],
          id: null,
          flag: 0, // 0是新增、1是修改
          maxId: 4,
          t: {
            business: '',
            buyerId: 1004,
            buyerCode: '',
            buyerName: '',
            buyerType: null
          }
        },
        infoRules1: {
          suppChannelName: [
            { required: true, message: '请填写供应渠道名称', trigger: 'blur' }
          ],
          suppChannelCode: [
            { required: true, message: '请填写供应渠道code', trigger: 'blur' }
          ]
        },
        infoRules2: {
          supplierName: [
            { required: true, message: '请填写供应商名称', trigger: 'blur' }
          ],
          supplierCode: [
            { required: true, message: '请填写供应商Code', trigger: 'blur' }
          ],
          suppChannelId: [
            { required: true, message: '请选择供应渠道', trigger: 'blur' }
          ]
        },
        infoRules3: {
          business: [
            { required: true, message: '请填写业务类型', trigger: 'blur' }
          ],
          buyerName: [
            { required: true, message: '请填写采购子渠道名称', trigger: 'blur' }
          ],
          buyerCode: [
            { required: true, message: '请填写采购子渠道Code', trigger: 'blur' }
          ],
          buyerType: [
            { required: true, message: '请选择采购渠道ID', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      UtilPager
    },
    methods: {
      // 查询列表数据
      getTableData1() {
        const sendData = {
          currentPage: this.pane1.currentPage,
          pageSize: this.pane1.pageSize
        }
        FscApi.post('/manager/queryChannelList', sendData).then(response => {
          if (response.success) {
            console.log(response)
            this.pane1.tableData1 = response.data.data
            this.pane1.count = response.data.total
            this.pane2.channelOptions = response.data.data
            for (const index in this.pane1.tableData1) {
              if (this.pane1.tableData1[index].suppChannelId > this.pane1.maxId) {
                this.pane1.maxId = this.pane1.tableData1[index].suppChannelId
              }
            }
          }
        })
      },
      getTableData2() {
        const sendData = {
          currentPage: this.pane2.currentPage,
          pageSize: this.pane2.pageSize
        }
        FscApi.post('/manager/queryChildSupplierList', sendData).then(response => {
          if (response.success) {
            // console.log(response)
            this.pane2.tableData2 = response.data.data
            this.pane2.count = response.data.total
          }
        })
      },
      getTableData3() {
        const sendData = {
          business: -1, // 搜索全部
          currentPage: this.pane3.currentPage,
          pageSize: this.pane3.pageSize
        }

        FscApi.post('/manager/queryChildBuyerList', sendData).then(response => {
          if (response.success) {
            console.log(response)
            this.pane3.tableData3 = response.data.data
            this.pane3.count = response.data.total
          }
        })
      },
      // 处理分页
      handleCurrentChange1(page) {
        this.pane1.start = (page - 1) * this.pane1.pageSize + 1
        this.pane1.currentPage = page
        this.getTableData1()
      },
      handleCurrentChange2(page) {
        this.pane2.start = (page - 1) * this.pane2.pageSize + 1
        this.pane2.currentPage = page
        this.getTableData2()
      },
      handleCurrentChange3(page) {
        this.pane3.start = (page - 1) * this.pane3.pageSize + 1
        this.pane3.currentPage = page
        this.getTableData3()
      },
      // pane2改变渠道
      changeChannel(val) {
        this.pane2.t.suppChannelId = val
        if (val === '') {
          this.pane2.t.suppChannelName = ''
          this.pane2.t.suppChannelCode = ''
        } else {
          this.pane2.t.suppChannelName = this.pane2.channelOptions.find(item => item.suppChannelId === val)['suppChannelName']
          this.pane2.t.suppChannelCode = this.pane2.channelOptions.find(item => item.suppChannelId === val)['suppChannelCode']
        }
      },
      // pane3修改采购渠道ID
      changeBuyerChannel(val) {
        this.pane3.t.buyerType = val
      },
      handleClick(tab, event) {
        //console.log(tab, event)
      },
      // 删除数据
      deleteData(id, flag) {
        const staff = {
          'uid': '456',
          'nameEn': '测试名',
          'nameCh': 'testName'
        }
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonLoading: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.showCancelButton = false
              // pane1中删除
              if (flag === 1) {
                const sendData = {
                  'id': id,
                  'delFlag': 1,
                  'staff': staff
                }
                FscApi.post('/manager/editChannelList', sendData).then(response => {
                  if (response.success) {
                    this.$message({
                      message: '删除成功！',
                      type: 'success'
                    })
                  }
                }).then(this.getTableData1)
                done()
              }
              // pane2中删除
              if (flag === 2) {
                const sendData = {
                  'id': id,
                  'delFlag': 1,
                  'staff': staff
                }
                FscApi.post('/manager/editChildSupplierList', sendData).then(response => {
                  if (response.success) {
                    this.$message({
                      message: '删除成功！',
                      type: 'success'
                    })
                  }
                }).then(this.getTableData2)
                done()
              }
              // pane3中删除
              if (flag === 3) {
                const sendData = {
                  'id': id,
                  'delFlag': 1,
                  'staff': staff
                }
                FscApi.post('/manager/editChildBuyerList', sendData).then(response => {
                  if (response.success) {
                    this.$message({
                      message: '删除成功！',
                      type: 'success'
                    })
                  }
                }).then(this.getTableData3)
                done()
              }
            } else {
              done()
            }
          }
        }).then(() => {
        })
      },
      // 新增数据
      addPane1() {
        if (this.$refs['t1'] !== undefined) {
          this.$refs['t1'].resetFields()
          this.pane1.t.suppChannelName = ''
          this.pane1.t.suppChannelCode = ''
        }
        this.pane1.showChannel = true
        this.pane1.flag = 0
      },
      addPane2() {
        if (this.$refs['t2'] !== undefined) {
          this.$refs['t2'].resetFields()
          this.pane2.t.supplierName = ''
          this.pane2.t.supplierCode = ''
          this.pane2.t.suppChannelCode = ''
          this.pane2.t.suppChannelName = ''
          this.pane2.t.suppChannelId = ''
        }
        this.pane2.showSubChannel = true
        this.pane2.flag = 0
      },
      addPane3() {
        if (this.$refs['t3'] !== undefined) {
          this.$refs['t3'].resetFields()
          this.pane3.t.business = ''
          this.pane3.t.buyerCode = ''
          this.pane3.t.buyerName = ''
          this.pane3.t.buyerType = ''
        }
        this.pane3.showSuppChannel = true
        this.pane3.flag = 0
      },
      // 编辑表单
      editPane1(row) {
        this.pane1.id = row.id
        this.pane1.t.suppChannelName = row.suppChannelName
        this.pane1.t.suppChannelCode = row.suppChannelCode
        this.pane1.t.suppChannelId = row.suppChannelId
        this.pane1.showChannel = true
        this.pane1.flag = 1
      },
      editPane2(row) {
        this.pane2.id = row.id
        this.pane2.t.supplierName = row.supplierName
        this.pane2.t.supplierCode = row.supplierCode
        this.pane2.t.supplierId = row.supplierId
        this.pane2.t.suppChannelCode = row.suppChannelCode
        this.pane2.t.suppChannelName = row.suppChannelName
        this.pane2.t.suppChannelId = row.suppChannelId
        this.pane2.showSubChannel = true
        this.pane2.flag = 1
      },
      editPane3(row) {
        this.pane3.id = row.id
        this.pane3.t.business = row.business
        this.pane3.t.buyerCode = row.buyerCode
        this.pane3.t.buyerName = row.buyerName
        this.pane3.t.buyerId = row.buyerId
        this.pane3.t.buyerType = row.buyerType
        this.pane3.showSuppChannel = true
        this.pane3.flag = 1
      },
      // 提交表单
      submitPane1(flag) {
        this.$refs.t1.validate(valid => {
          if (valid) {
            // 新增
            if (flag === 0) {
              this.pane1.t.suppChannelId = this.pane1.maxId + 1
              const sendData = {
                'suppChannelCode': this.pane1.t.suppChannelCode,
                'suppChannelName': this.pane1.t.suppChannelName,
                'suppChannelId': this.pane1.t.suppChannelId,
                'staff': {
                  'uid': '456',
                  'nameEn': '测试名',
                  'nameCh': 'testName'
                }
              }
              FscApi.post('/manager/editChannelList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '提交成功！',
                    duration: 2000,
                    type: 'success',
                    center: true
                  })
                  this.cancelPane1()
                }
              }).then(this.getTableData1)
            }
            // 修改
            if (flag === 1) {
              const sendData = {
                'id': this.pane1.id,
                'suppChannelCode': this.pane1.t.suppChannelCode,
                'suppChannelName': this.pane1.t.suppChannelName,
                'suppChannelId': this.pane1.t.suppChannelId,
                'staff': {
                  'uid': '456',
                  'nameEn': '测试名',
                  'nameCh': 'testName'
                }
              }
              FscApi.post('/manager/editChannelList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '修改成功！',
                    duration: 2000,
                    type: 'success',
                    center: true
                  })
                  this.cancelPane1()
                }
              }).then(this.getTableData1)
            }
          } else {
            this.$message({
              message: '表单信息有误，请重新确认！',
              duration: 2000,
              type: 'error',
              center: true
            })
          }
        })
      },
      submitPane2(flag) {
        this.$refs.t2.validate(valid => {
          if (valid) {
            // 新增 flag = 0
            if (flag === 0) {
              // alert(this.pane2.t.suppChannelId)
              this.pane2.t.supplierId = this.pane2.t.suppChannelId * 10000
              this.pane2.maxId = this.pane2.t.suppChannelId * 10000 + 7
              for (const index in this.pane2.tableData2) {
                const temp = this.pane2.tableData2[index]
                // alert(temp.supplierId.toString().substr(0, 4))
                // alert(temp.suppChannelId.toString())
                if (temp.supplierId.toString().substr(0, 4) === this.pane2.t.suppChannelId.toString() && temp.supplierId > this.pane2.maxId) {
                  // alert(this.pane2.maxId)
                  this.pane2.maxId = temp.supplierId
                }
              }
              this.pane2.t.supplierId = this.pane2.maxId + 1
              const sendData = {
                'suppChannelId': this.pane2.t.suppChannelId,
                'suppChannelCode': this.pane2.t.suppChannelCode,
                'suppChannelName': this.pane2.t.suppChannelName,
                'supplierCode': this.pane2.t.supplierCode,
                'supplierName': this.pane2.t.supplierName,
                'supplierId': this.pane2.t.supplierId,
                'staff': {
                  'uid': '456',
                  'nameEn': '测试名',
                  'nameCh': 'testName'
                }
              }
              FscApi.post('/manager/editChildSupplierList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '提交成功！',
                    duration: 2000,
                    type: 'success',
                    center: true
                  })
                  this.cancelPane2()
                }
              }).then(this.getTableData2)
            }
            // 修改 flag=1
            if (flag === 1) {
              const sendData = {
                'id': this.pane2.id,
                'suppChannelId': this.pane2.t.suppChannelId,
                'suppChannelCode': this.pane2.t.suppChannelCode,
                'suppChannelName': this.pane2.t.suppChannelName,
                'supplierCode': this.pane2.t.supplierCode,
                'supplierName': this.pane2.t.supplierName,
                'supplierId': this.pane2.t.supplierId,
                'staff': {
                  'uid': '456',
                  'nameEn': '测试名',
                  'nameCh': 'testName'
                }
              }
              FscApi.post('/manager/editChildSupplierList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '修改成功！',
                    duration: 2000,
                    type: 'success',
                    center: true
                  })
                  this.cancelPane2()
                }
              }).then(this.getTableData2)
            }
          } else {
            this.$message({
              message: '表单信息有误，请重新确认！',
              duration: 2000,
              type: 'error',
              center: true
            })
          }
        })
      },
      submitPane3(flag) {
        this.$refs.t3.validate(valid => {
          if (valid) {
            // 新增
            if (flag === 0) {
              let matchHeader = "";
              if (this.pane3.t.business == 1) {
                this.pane3.maxId = this.pane3.t.buyerType * 300000 + 4;
                matchHeader = (this.pane3.t.buyerType * 3).toString()
              } else if (this.pane3.t.business == 2) {
                this.pane3.maxId = 800000;
                matchHeader = this.pane3.maxId.toString().substr(0, 1)
              } else if (this.pane3.t.business == 3) {
                this.pane3.maxId = 900000;
                matchHeader = this.pane3.maxId.toString().substr(0, 1)
              }
              for (const index in this.pane3.tableData3) {
                const temp = this.pane3.tableData3[index]
                if (temp.buyerId.toString().substr(0, 1) === matchHeader && temp.buyerId > this.pane3.maxId) {
                  this.pane3.maxId = temp.buyerId
                }
              }
              this.pane3.t.buyerId = this.pane3.maxId + 1
              const sendData = {
                'business': this.pane3.t.business,
                'buyerId': this.pane3.t.buyerId, // .toString().substr(0, 1) === '1' ? this.pane3.t.buyerId.toString().replace(this.pane3.t.buyerId.toString().substr(0, 1), 'B') : this.pane3.t.buyerId.toString().replace(this.pane3.t.buyerId.toString().substr(0, 1), 'C'),
                'buyerCode': this.pane3.t.buyerCode,
                'buyerName': this.pane3.t.buyerName,
                'buyerType': this.pane3.t.buyerType,
                'staff': {
                  'uid': '456',
                  'nameEn': '测试名',
                  'nameCh': 'testName'
                }
              }
              FscApi.post('/manager/editChildBuyerList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '提交成功！',
                    duration: 2000,
                    type: 'success',
                    center: true
                  })
                  this.cancelPane3()
                }
              }).then(this.getTableData3)
            }
            // 修改
            if (flag === 1) {
              const sendData = {
                'id': this.pane3.id,
                'business': this.pane3.t.business,
                'buyerId': this.pane3.t.buyerId,
                'buyerCode': this.pane3.t.buyerCode,
                'buyerName': this.pane3.t.buyerName,
                'buyerType': this.pane3.t.buyerType,
                'staff': {
                  'uid': '456',
                  'nameEn': '测试名',
                  'nameCh': 'testName'
                }
              }
              FscApi.post('/manager/editChildBuyerList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '修改成功！',
                    duration: 2000,
                    type: 'success',
                    center: true
                  })
                  this.cancelPane3()
                }
              }).then(this.getTableData3)
            }
          } else {
            this.$message({
              message: '表单信息有误，请重新确认！',
              duration: 2000,
              type: 'error',
              center: true
            })
          }
        })
      },
      // pane取消
      cancelPane1() {
        this.pane1.showChannel = false
        this.$refs['t1'].resetFields
        this.pane1.t.suppChannelName = ''
        this.pane1.t.suppChannelCode = ''
      },
      cancelPane2() {
        this.pane2.showSubChannel = false
        this.$refs['t2'].resetFields()
        this.pane2.t.supplierName = ''
        this.pane2.t.supplierCode = ''
        this.pane2.t.suppChannelCode = ''
        this.pane2.t.suppChannelName = ''
        this.pane2.t.suppChannelId = ''
      },
      cancelPane3() {
        this.pane3.showSuppChannel = false
        this.$refs['t3'].resetFields()
        this.pane3.t.business = ''
        this.pane3.t.buyerCode = ''
        this.pane3.t.buyerName = ''
        this.pane3.t.buyerType = ''
      },
    },
    mounted() {
      this.getTableData1()
      this.getTableData2()
      this.getTableData3()
    }
  }
</script>

<style>
  .tabStyle {
    margin-top: 12px;
  }
  .buttons {
    width: 100px
  }
  .card-info {
    background: #f2f2f2;
  }
</style>
