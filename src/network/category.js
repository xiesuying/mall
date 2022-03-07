import { request } from '@/network/request';

export function getCategory() {
  return request({
    url: '/category'
  });
}


export function getCategoryDetail(miniWallkey,type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  });
}