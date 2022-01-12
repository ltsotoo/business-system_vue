import request from './base'

export const addPayment = (payment) => {
    return request({
        url: '/payment',
        method: 'POST',
        data: payment,
    })
}

export const editPayment = (payment) => {
    return request({
        url: '/payment',
        method: 'PUT',
        data: payment,
    })
}

export const changeCollectionStatus = (object) => {
    return request({
        url: '/changeCollectionStatus',
        method: 'POST',
        data: object,
    })
}

export const queryPayments = (contractUID) => {
    return request({
        url: '/payments/' + contractUID,
        method: 'GET',
    })
}

export const queryPrePayments = (contractUID) => {
    return request({
        url: '/prePayments/' + contractUID,
        method: 'GET',
    })
}