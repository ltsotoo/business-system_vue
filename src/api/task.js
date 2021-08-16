import request from './base'

export const delTask = (id) => {
    {
        return request({
            url: '/task/' + id,
            method: 'DELETE',
        })
    }
}

export const queryTasks = (task) => {
    {
        return request({
            url: '/tasks',
            method: 'POST',
            data:task
        })
    }
}