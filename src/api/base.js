import axios from "axios"
import Message from '../components/base/message/index'

// 让请求在浏览器中允许跨域携带cookie
// axios.defaults.withCredentials = true

const service = axios.create({
    //公共路由
    baseURL: 'http://127.0.0.1:8088/api/v1',
    // baseURL: 'http://101.201.51.200:8080/api/v1',
    //请求最大响应时间
    timeout: 9000
})

//请求拦截器
service.interceptors.request.use(config => {
    //请求头带上token
    if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization')
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
            if (response.data.status > 1100 && response.data.status < 1200) {
                Message.error(response.data.message);
                window.localStorage.clear()
            }
            if (response.data.status === 666) {
                return Promise.resolve(response.data)
            } else {
                Message.error(response.data.message);
                return Promise.reject(response)
            }
        } else {
            return Promise.reject(response)
        }
    }, error => {
        alert("服务器开小差了，请稍后再试！");
        // localStorage.clear()
        setTimeout(() => {
            window.location.href = '/'
        }, 300)
    }
)

export default service

