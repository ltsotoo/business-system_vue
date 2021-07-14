import request from './service'

export const getImgCode = () => {
    return request({
        url:'/image/code',
        method:'get',
        responseType: "blob"
    })
}