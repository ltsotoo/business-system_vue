import request from './base'

export const entryCustomer = (customer) => {
    {
        return request({
            url: '/customer',
            method: 'POST',
            data:customer
        })
    }
}

export const delCustomer = (id) => {
    {
        return request({
            url: '/customer/' + id,
            method: 'DELETE',
        })
    }
}

export const editCustomer = (customer) => {
    {
        return request({
            url: '/customer',
            method: 'PUT',
            data:customer
        })
    }
}

export const queryCustomer = (id) => {
    {
        return request({
            url: '/customer/' + id,
            method: 'GET',
        })
    }
}

export const queryCustomers = (pageSize, pageNo,queryObject) => {
    {
        return request({
            url: '/customers',
            method: 'POST',
            data:queryObject,
            params: {
                "pageSize": pageSize,
                "pageNo": pageNo,
            }
        })
    }
}

export const queryCompanys = () => {
    {
        return request({
            url: '/companys',
            method: 'GET',
        })
    }
}

export const queryResearchGroupsByCompanyID = (companyID) =>{
    {
        return request({
            url: '/researchGroupsByCompanyID',
            method: 'GET',
            params: {
                "companyID": companyID,
            }
        })
    }
}