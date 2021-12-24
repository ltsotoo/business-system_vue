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