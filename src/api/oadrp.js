import request from './base'

export const entryOffice = (office) => {
    return request({
        url: '/office',
        method: 'POST',
        data: office
    })
}

export const delOffice = (id) => {
    return request({
        url: '/office/' + id,
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

export const delArea = (id) => {
    return request({
        url: '/area/' + id,
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

export const delDepartment = (id) => {
    return request({
        url: '/department/' + id,
        method: 'DELETE',
    })
}

export const queryDepartments = (department) => {
    return request({
        url: '/departments',
        method: 'POST',
        data: department
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