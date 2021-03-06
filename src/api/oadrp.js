import request from './base'

export const topList = () => {
    return request({
        url: '/topList',
        method: 'GET',
    })
}

export const entryOffice = (office) => {
    return request({
        url: '/office',
        method: 'POST',
        data: office
    })
}

export const delOffice = (uid) => {
    return request({
        url: '/office/' + uid,
        method: 'DELETE',
    })
}

export const editOffice = (office) => {
    return request({
        url: '/office',
        method: 'PUT',
        data: office
    })
}

export const editOfficeMoney = (office) => {
    return request({
        url: '/officeMoney',
        method: 'PUT',
        data: office
    })
}

export const queryOffice = (uid) => {
    return request({
        url: '/office/' + uid,
        method: 'GET',
    })
}

export const queryOffices = (office) => {
    return request({
        url: '/offices',
        method: 'POST',
        data: office
    })
}

export const entryDepartment = (department) => {
    return request({
        url: '/department',
        method: 'POST',
        data: department
    })
}

export const delDepartment = (uid) => {
    return request({
        url: '/department/' + uid,
        method: 'DELETE',
    })
}

export const editDepartment = (department) => {
    return request({
        url: '/department',
        method: 'PUT',
        data: department
    })
}

export const queryDepartments = (querObject) => {
    return request({
        url: '/departments',
        method: 'POST',
        data: querObject
    })
}

export const addRole = (role) => {
    return request({
        url: '/role',
        method: 'POST',
        data: role
    })
}

export const editRole = (role) => {
    return request({
        url: '/role',
        method: 'PUT',
        data: role
    })
}

export const queryRole = (uid) => {
    return request({
        url: '/role/' + uid,
        method: 'GET',
    })
}

export const queryRoles = () => {
    return request({
        url: '/roles',
        method: 'GET',
    })
}

export const queryAllRoles = (name) => {
    return request({
        url: '/allRoles',
        method: 'GET',
        params: {
            "name": name,
        }
    })
}

export const queryPermissions = () => {
    return request({
        url: '/permissions',
        method: 'GET',
    })
}