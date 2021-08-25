import request from './base'

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

export const queryOffices = (name) => {
    return request({
        url: '/offices',
        method: 'GET',
        params: {
            "name": name
        }
    })
}

export const entryArea = (area) => {
    return request({
        url: '/area',
        method: 'POST',
        data: area
    })
}

export const delArea = (uid) => {
    return request({
        url: '/area/' + uid,
        method: 'DELETE',
    })
}

export const queryAreas = (area) => {
    return request({
        url: '/areas',
        method: 'POST',
        data: area
    })
}

export const editArea = (area) => {
    return request({
        url: '/area',
        method: 'PUT',
        data: area
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

export const queryDepartments = (querObject) => {
    return request({
        url: '/departments',
        method: 'POST',
        data: querObject
    })
}

export const queryRoles = () => {
    return request({
        url: '/roles',
        method: 'GET',
    })
}

export const queryPermissions = () => {
    return request({
        url: '/permissions',
        method: 'GET',
    })
}