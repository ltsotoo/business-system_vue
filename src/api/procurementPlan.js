import request from './base'

export const entryProcurementPlan = (procurementPlan) => {
    return request({
        url: '/procurementPlan',
        method: 'POST',
        data: procurementPlan
    })
}

export const editProcurementPlan = (procurementPlan) => {
    return request({
        url: '/procurementPlan',
        method: 'PUT',
        data: procurementPlan
    })
}

export const queryProcurementPlan = (uid) => {
    return request({
        url: '/procurementPlan/' + uid,
        method: 'GET',
    })
}

export const queryProcurementPlans = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/procurementPlans',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}