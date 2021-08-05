import request from './base'

export const queryOffices = () => {
    {
        return request({
            url: '/offices',
            method: 'GET',
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
            param: {
                "officeID": fficeID
            }
        })
    }
}

export const queryDepartmentsByOfficeID = (officeID) => {
    {
        return request({
            url: '/departmentsByOfficeID',
            method: 'GET',
            param: {
                "officeID": fficeID
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