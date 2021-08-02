import axios from "axios"
import Message from '../components/base/message/index'

// 让请求在浏览器中允许跨域携带cookie
// axios.defaults.withCredentials = true

const service = axios.create({
    //公共路由
    baseURL: 'http://localhost:8088/api/v1',
    // baseURL: 'http://192.168.1.150:8088/api/v1',
    //请求最大响应时间
    timeout: 9000
})

//请求拦截器
service.interceptors.request.use(config => {
    //请求头带上token
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject()
})

//响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.status === 666) {
                return Promise.resolve(response.data)
            }else{
                Message.error(response.data.message);
                return Promise.reject(response)
            }
        } else {
            return Promise.reject(response)
        }
    }, error => {
        if (400 <= error.response.status < 500) {
            Message.error(`用户信息过期，请重新登陆`)
            localStorage.removeItem("token")
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
        } else {
            if (error.response.status >= 500) {
                alert("服务器开小差了，请稍后再试！");
            } else {
                alert("服务器开小差了，请稍后再试！");
                return Promise.reject(error)
            }
        }
    }
)

export default service

