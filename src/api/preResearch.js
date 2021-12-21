import request from './base'

export const createPreResearch = (preResearch) => {
    return request({
        url: '/preResearch',
        method: 'POST',
        data: preResearch
    })
}

export const delPreResearch = (uid) => {
    return request({
        url: '/preResearch/' + uid,
        method: 'DELETE',
    })
}

export const editPreResearch = (preResearch) => {
    return request({
        url: '/preResearch',
        method: 'PUT',
        data: preResearch
    })
}

export const queryPreResearch = (uid) => {
    return request({
        url: '/preResearch/' + uid,
        method: 'GET',
    })
}

export const queryPreResearchs = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/preResearchs',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const queryPreResearchTask = (uid) => {
    return request({
        url: '/preResearchTask/' + uid,
        method: 'GET',
    })
}

export const queryPreResearchTasks = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/preResearchTasks',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const approve = (preResearchQuery) => {
    return request({
        url: '/approvePreResearch',
        method: 'PUT',
        data: preResearchQuery
    })
}

export const approveTask = (preResearchTask) => {
    return request({
        url: '/approvePreResearchTask',
        method: 'PUT',
        data: preResearchTask
    })
}