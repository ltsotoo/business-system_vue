import request from './base'

export const getImgCode = () => {
    return request({
        url:'/image/code',
        method:'get',
        responseType: "blob"
    })
}

export const login = (queryObject) => {
    return request({
        url: '/login',
        method: 'POST',
        data:queryObject,
    })
}