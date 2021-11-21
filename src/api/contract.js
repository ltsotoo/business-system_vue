import request from './base'

export const entryContract = (contract) => {
    return request({
        url: '/contract',
        method: 'POST',
        data: contract
    })
}

export const delContract = (uid) => {
    return request({
        url: '/contract/' + uid,
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

export const queryContract = (uid) => {
    return request({
        url: '/contract/' + uid,
        method: 'GET',
    })
}

export const queryContracts = (queryObject, pageSize, pageNo) => {
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

export const rejectContract = (contract) => {
    return request({
        url: '/rejectContract',
        method: 'POST',
        data: contract
    })
}