import request from './base'

export const entryOffice = (office) => {
    return request({
        url: '/office',
        method: 'POST',
        data: office
    })
}

export const queryOffices = (name) => {
    {
        return request({
            url: '/offices',
            method: 'GET',
            params: {
                "name": name
            }
        })
    }
}

export const entryArea = (area) => {
    return request({
        url: '/area',
        method: 'POST',
        data: area
    })
}

export const queryAreas = (area) => {
    {
        return request({
            url: '/areas',
            method: 'POST',
            data: area
        })
    }
}

export const entryDepartment = (department) => {
    return request({
        url: '/department',
        method: 'POST',
        data: department
    })
}

export const queryDepartments = (department) => {
    {
        return request({
            url: '/departments',
            method: 'POST',
            data: department
        })
    }
}

export const queryRoles = () => {
    {
        return request({
            url: '/roles',
            method: 'GET',
        })
    }
}

export const queryPermissions = () => {
    {
        return request({
            url: '/permissions',
            method: 'GET',
        })
    }
}