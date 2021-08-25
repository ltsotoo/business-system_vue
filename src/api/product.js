import request from './base'

export const entryProduct = (product) => {
    return request({
        url: '/product',
        method: 'POST',
        data: product
    })
}

export const delProduct = (uid) => {
    return request({
        url: '/product/' + uid,
        method: 'DELETE',
    })
}

export const editProduct = (product) => {
    return request({
        url: '/product',
        method: 'PUT',
        data: product
    })
}

export const queryProduct = (uid) => {
    return request({
        url: '/product/' + uid,
        method: 'GET',
    })
}

export const queryProducts = (queryObject,pageSize, pageNo) => {
    return request({
        url: '/products',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}