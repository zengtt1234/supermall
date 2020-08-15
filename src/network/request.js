import axios from 'axios'
export function request(config){
  //1.创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
  //2创建axios的拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config=>{
    //console.log(config);
    //一般会在请求拦截中做什么
    //1.比如config中的一些信息不符合服务器要求
    //2.比如每次发送网路请求时，都希望在界面中显示一个请求的图标
    //3.某些网路请求（比如登陆（token））,必须携带一些特殊的信息
    return config;
  },err=>{
    console.log(err);
  });
  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    //console.log(res);
    //真正会用到的是rea.data
    //拦截处理完成后,记得把请求到的数据返回
    return res.data;
  },err=>{
    console.log(err);
  });
  //3.发送网络请求
  return instance(config)
    
}