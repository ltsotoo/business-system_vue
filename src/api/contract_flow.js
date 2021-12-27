import request from './base'

export const contractApprove = (data) => {
    return request({
        url: '/contract/flow/approve',
        method: 'PUT',
        data: data
    })
}

export const rejectContract = (contract) => {
    return request({
        url: '/contract/flow/reject',
        method: 'PUT',
        data: contract
    })
}

export const taskFlowApproveProductionStatusToFinish = (data) => {
    return request({
        url: '/contract/flow/approveProductionStatusToFinish',
        method: 'PUT',
        data: data
    })
}