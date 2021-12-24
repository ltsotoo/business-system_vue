import request from './base'

export const queryTasks = (queryObject) => {
    return request({
        url: '/tasks',
        method: 'POST',
        data: queryObject
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