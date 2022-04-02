<template>
  <div class="app-container">
    <el-table :data="tableData" border>
      <el-table-column prop="suppChannelName" label="渠道" align="center"></el-table-column>
      <el-table-column label="机票C端" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.buyerTypeC === 1 && scope.row.typeCStatus === 0" @click="editList(scope.row.idC, scope.row.suppChannelId, 2, 1)" type="text">开启</el-button>
          <el-button v-if="scope.row.buyerTypeC === 1 && scope.row.typeCStatus === 1" @click="editList(scope.row.idC, scope.row.suppChannelId, 2, 0)"  type="text">关闭</el-button>
        </template>
      </el-table-column>
      <el-table-column label="机票B端" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.buyerTypeB === 1 && scope.row.typeBStatus === 0" @click="editList(scope.row.idB, scope.row.suppChannelId, 1, 1)" type="text">开启</el-button>
          <el-button v-if="scope.row.buyerTypeB === 1 && scope.row.typeBStatus === 1" @click="editList(scope.row.idB, scope.row.suppChannelId, 1, 0)" type="text">关闭</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
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
export default {
  data() {
    return {
      tableData: [],
      tableTempData: [],
      count: 0,
      start: 1,
      pageSize: 100,
      currentPage: 1,
      repeat: 0
    }
  },
  methods: {
    getTableData() {
      const sendData = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      FscApi.post('/manager/queryBuyerChannelOnoffList', sendData).then(response => {
        if (response.success) {
          console.log(response)
          this.handleData(response.data.data)
          // alert(response.data.total)
          // alert(this.repeat)
          // alert(response.data.total - this.repeat)
          this.tableData = this.tableTempData
          this.count = this.tableTempData.length
        }
      })
    },
    handleData(data) {
      this.repeat = 0
      this.tableTempData = []
      // alert(data.length)
      for (let i = 0; i < data.length; i++) {
        if (data[i].suppChannelName === '') {
          this.repeat++
          continue
        }
        const tableDataItem = {
          suppChannelId: null,
          suppChannelName: null,
          buyerTypeB: 0, // 0代表没有, 1代表有
          buyerTypeC: 0,
          idB: null, // 有机票B端时对应的记录ID
          idC: null, // 有机票C端时对应的记录ID
          typeBStatus: null,
          typeCStatus: null
        }
        tableDataItem.suppChannelId = data[i].suppChannelId
        tableDataItem.suppChannelName = data[i].suppChannelName
        if (data[i].buyerType === 1) {
          tableDataItem.buyerTypeB = 1
          tableDataItem.idB = data[i].id
          tableDataItem.typeBStatus = data[i].status
        }
        if (data[i].buyerType === 2) {
          tableDataItem.buyerTypeC = 1
          tableDataItem.idC = data[i].id
          tableDataItem.typeCStatus = data[i].status
        }
        for (let j = i + 1; j < data.length; j++) {
          if (data[j].suppChannelName === data[i].suppChannelName) {
            this.repeat++
            tableDataItem.suppChannelId = data[i].suppChannelId
            tableDataItem.suppChannelName = data[i].suppChannelName
            if (data[i].buyerType === 1) {
              tableDataItem.buyerTypeB = 1
              tableDataItem.idB = data[i].id
              tableDataItem.typeBStatus = data[i].status
            }
            if (data[i].buyerType === 2) {
              tableDataItem.buyerTypeC = 1
              tableDataItem.idC = data[i].id
              tableDataItem.typeCStatus = data[i].status
            }
            if (data[j].buyerType === 1) {
              tableDataItem.buyerTypeB = 1
              tableDataItem.idB = data[j].id
              tableDataItem.typeBStatus = data[j].status
            }
            if (data[j].buyerType === 2) {
              tableDataItem.buyerTypeC = 1
              tableDataItem.idC = data[j].id
              tableDataItem.typeCStatus = data[j].status
            }
          }
        }
        let count = 0
        for (const index in this.tableTempData) {
          if (this.tableTempData[index].suppChannelName !== tableDataItem.suppChannelName) {
            count++
          }
        }
        if (count === this.tableTempData.length) {
          this.tableTempData.push(tableDataItem)
        }
      }
      console.log(this.tableTempData)
    },
    editList(id, suppChannelId, type, status) {
      const staff = {
        'uid': '456',
        'nameEn': '测试名',
        'nameCh': 'testName'
      }
      const sendData = {
        'id': id,
        'buyerType': type,
        'suppChannelId': suppChannelId,
        'status': status,
        'staff': staff
      }
      if (status === 1) {
        this.$confirm('确认要开启吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonLoading: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.showCancelButton = false
              FscApi.post('/manager/editBuyerChannelOnoffList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '已成功开启！',
                    type: 'success'
                  })
                }
              }).then(this.getTableData)
              // window.location.reload()
              done()
            } else {
              done()
            }
          }
        })
      }
      if (status === 0) {
        this.$confirm('确认要关闭吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonLoading: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.showCancelButton = false
              FscApi.post('/manager/editBuyerChannelOnoffList', sendData).then(response => {
                if (response.success) {
                  this.$message({
                    message: '已成功关闭！',
                    type: 'success'
                  })
                }
              }).then(this.getTableData)
              // window.location.reload()
              done()
            } else {
              done()
            }
          }
        })
      }
    },
    // 处理分页
    handleCurrentChange(page) {
      this.start = (page - 1) * this.pageSize + 1
      this.currentPage = page
      this.getTableData()
    }
  },
  mounted() {
    this.getTableData()
  }
}
</script>

<style>
</style>
