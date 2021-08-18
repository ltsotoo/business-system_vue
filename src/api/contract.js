import request from './base'

export const entryContract = (contract) => {
    return request({
        url: '/contract',
        method: 'POST',
        data: contract
    })
}

export const delContract = (id) => {
    return request({
        url: '/contract/' + id,
        method: 'DELETE',
    })
}

export const editContract = (contract) => {
    return request({
        url: '/contract',
        method: 'PUT',
        data: contract
    })
}

export const queryContract = (id) => {
    return request({
        url: '/contract/' + id,
        method: 'GET',
    })
}

export const queryContracts = (pageSize, pageNo, queryObject) => {
    return request({
        url: '/contracts',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}