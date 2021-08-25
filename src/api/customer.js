import request from './base'

export const entryCustomer = (customer) => {
    return request({
        url: '/customer',
        method: 'POST',
        data: customer
    })
}

export const delCustomer = (uid) => {
    return request({
        url: '/customer/' + uid,
        method: 'DELETE',
    })
}

export const editCustomer = (customer) => {
    return request({
        url: '/customer',
        method: 'PUT',
        data: customer
    })
}

export const queryCustomer = (uid) => {
    return request({
        url: '/customer/' + uid,
        method: 'GET',
    })
}

export const queryCustomers = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/customers',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const queryCompanys = (company) => {
    return request({
        url: '/companys',
        method: 'POST',
        data: company
    })
}
