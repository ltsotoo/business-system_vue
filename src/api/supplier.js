import request from './base'

export const entrySupplier = (supplier) => {
    return request({
        url: '/supplier',
        method: 'POST',
        data: supplier
    })
}

export const delSupplier = (id) => {
    return request({
        url: '/supplier/' + id,
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

export const querySupplier = (id) => {
    return request({
        url: '/supplier/' + id,
        method: 'GET',
    })
}

export const querySuppliers = (pageSize, pageNo, queryObject) => {
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