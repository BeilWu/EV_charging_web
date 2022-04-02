import request from './request';
import url from './url';
// 查询列表
function searchForbidSale(params){
  return request.post(url.queryList, params).then(res => {
    if(res.success) {
      return res.data;
    };
  });
}

// 查询详情
function forbidSaleDetail(params){
  return request.post(url.queryDetail, params).then(res => {
    if(res.success) {
      return res.data;
    };
  });
}

// 新增禁售
function addforbidSale(params){
  return request.post(url.saveOrUpdate, params).then(res => {
    if(res.success) {
      return res.data;
    };
  });
}

// 更新禁售状态
function updateforbidSale(params){
  return request.post(url.updateStatus, params).then(res => {
    if(res.success) {
      return res.data;
    };
  });
}

export default {
  searchForbidSale,
  forbidSaleDetail,
  addforbidSale,
  updateforbidSale
}