import request from './base'

export const queryTasks = (queryObject) => {
    return request({
        url: '/tasks',
        method: 'POST',
        data: queryObject
    })
}

export const queryMyTasks = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/mytasks',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const queryTaskRemarks = (taskUID) => {
    return request({
        url: '/taskRemarks',
        method: 'GET',
        params: {
            "taskUID": taskUID,
        }
    })
}