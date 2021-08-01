import request from './base'

export const getImgCode = () => {
    return request({
        url:'/image/code',
        method:'get',
        responseType: "blob"
    })
}