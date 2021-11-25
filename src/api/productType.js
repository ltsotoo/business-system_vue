import request from './base'

export const addProductType = (productType) => {
    return request({
        url: '/productType',
        method: 'POST',
        data: productType
    })
}

export const delProductType = (uid) => {
    return request({
        url: '/productType/' + uid,
        method: 'DELETE',
    })
}

export const editProductType = (productType) => {
    return request({
        url: '/productType',
        method: 'PUT',
        data: productType
    })
}

export const queryProductTypes = (queryObject) => {
    return request({
        url: '/productTypes',
        method: 'POST',
        data: queryObject,
    })
}