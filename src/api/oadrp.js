import request from './base'

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

export const queryAreas = () => {
    {
        return request({
            url: '/areas',
            method: 'GET',
        })
    }
}

export const queryAreasByOfficeID = (officeID) => {
    {
        return request({
            url: '/areasByOfficeID',
            method: 'GET',
            params: {
                "officeID": officeID
            }
        })
    }
}

export const queryDepartmentsByOfficeID = (officeID) => {
    {
        return request({
            url: '/departmentsByOfficeID',
            method: 'GET',
            params: {
                "officeID": officeID
            }
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