import request from './base'

export const entryTaskProcurement = (taskProcurement) => {
    return request({
        url: '/taskProcurement',
        method: 'POST',
        data: taskProcurement
    })
}

export const nextTaskProcurement = (taskProcurement) => {
    return request({
        url: '/nextTaskProcurements',
        method: 'PUT',
        data: taskProcurement
    })
}

export const queryTaskProcurements = (taskUID) => {
    return request({
        url: '/taskProcurement/'+taskUID,
        method: 'GET',
    })
}

export const queryMyApplicationTaskProcurements = () => {
    return request({
        url: '/myApplicationTaskProcurements',
        method: 'GET',
    })
}

export const queryMyTaskProcurements = () => {
    return request({
        url: '/myTaskProcurements',
        method: 'GET',
    })
}