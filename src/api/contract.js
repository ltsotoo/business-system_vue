import request from './base'

export const saveContract = (contract) => {
    return request({
        url: '/contractSave',
        method: 'POST',
        data: contract
    })
}

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

export const queryContract = (uid) => {
    return request({
        url: '/contract/' + uid,
        method: 'GET',
    })
}

export const querySimpleContract = (uid) => {
    return request({
        url: '/simpleContract/' + uid,
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

export const editPreContract = (contract) => {
    return request({
        url: '/preContract',
        method: 'PUT',
        data: contract
    })
}
