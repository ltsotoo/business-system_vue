import axios from "axios"
import Message from '../components/message/index'

axios.defaults.withCredentials = true

const service = axios.create({
    //公共路由
    baseURL:'http://localhost:8080/api',
    //请求最大响应时间
    timeout:9000
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
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response)
        }
    }, error => {
        if (400 <= error.response.status < 500) {
            // alert("用户信息过期，请重新登陆")
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

