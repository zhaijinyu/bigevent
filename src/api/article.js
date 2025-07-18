import request from '@/utils/request.js'

export const artGetChannalsService = () => request.get('/my/article/cate')
export const artAddChannalsService = (data) =>
  request.post('/my/article/addcates', data)
export const artEditChannalsService = (data) =>
  request.post('/my/article/updatecate', data)
export const artDelChannalsService = (id) =>
  request.get(`/my/article/deletecate/${id}`)
export const artGetListService = (data) => request.get('/my/article/list', data)
