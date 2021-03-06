import axios from 'axios';

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     {
//       //创建axios实例
//       const instance = axios.create({
//         baseURL: 'http://152.136.185.210:7878/api/hy66/home/data',
//         timeout: 5000
//       });
//       //发送真正的网络请求
//       instance(config)
//         .then(res => {
//           console.log(res);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   });
// }


export function request(config) {

  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 500000
  });


  //axios的拦截器
  //请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  });

  //响应拦截
  instance.interceptors.response.use(res => {
      return res.data;
    }, err => {
      console.log(err);
    }
  );


  //发送真正的网络请求
  return instance(config);
  // 本身返回一个promise
}
