import request from './base'

export const contractApprove = (data) => {
    return request({
        url: '/task/contract/approve',
        method: 'PUT',
        data: data
    })
}

export const contractFinalApprove = (data) => {
    return request({
        url: '/task/contract/finalApprove',
        method: 'PUT',
        data: data
    })
}

export const calculate = (data) => {
    return request({
        url: '/calculatePushMoney',
        method: 'POST',
        data: data
    })
}

export const getContractPushMoney = (contractUID) => {
    return request({
        url: '/contractPushMoney/' + contractUID,
        method: 'GET',
    })
}