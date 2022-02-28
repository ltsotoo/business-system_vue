import request from './base'

export const entryExpense = (expense) => {
    return request({
        url: '/expense',
        method: 'POST',
        data: expense
    })
}

export const delExpense = (uid) => {
    return request({
        url: '/expense/' + uid,
        method: 'DELETE',
    })
}

export const approvalExpense = (expense) => {
    return request({
        url: '/expense',
        method: 'PUT',
        data: expense
    })
}

export const queryExpense = (uid) => {
    return request({
        url: '/expense/' + uid,
        method: 'GET',
    })
}

export const queryExpenses = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/expenses',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}