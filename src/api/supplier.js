import request from './base'

export const entrySupplier = (supplier) => {
    return request({
        url: '/supplier',
        method: 'POST',
        data: supplier
    })
}

export const delSupplier = (uid) => {
    return request({
        url: '/supplier/' + uid,
        method: 'DELETE',
    })
}

export const editSupplier = (supplier) => {
    return request({
        url: '/supplier',
        method: 'PUT',
        data: supplier
    })
}

export const querySupplier = (uid) => {
    return request({
        url: '/supplier/' + uid,
        method: 'GET',
    })
}

export const querySuppliers = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/suppliers',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}