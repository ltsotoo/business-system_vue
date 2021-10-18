import request from './base'

export const addPayment = (payment) => {
    return request({
        url: '/payment',
        method: 'POST',
        data: payment,
    })
}

export const queryPayments = (contractUID) => {
    return request({
        url: '/payments/' + contractUID,
        method: 'GET',
    })
}