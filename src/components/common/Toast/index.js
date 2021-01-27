import Toast from './Toast'
const obj = {}
obj.install = function (Vue){
  //1.创建组件构造器
  const toastconstructor = Vue.extend(Toast);

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastconstructor();

  //3.将组件对象手动得挂载在某一组件对象上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是上面创建的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj;