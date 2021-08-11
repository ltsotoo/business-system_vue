import request from './base'

export const QueryDictionaryTypes = (module) => {
    {
        return request({
            url: '/dictionaryTypes',
            method: 'get',
            params: { "module": module }
        })
    }
}

export const queryDictionaries = (queryParams) => {
    {
        return request({
            url: '/dictionaries',
            method: 'get',
            params: { "parentID": queryParams.parentID, "module": queryParams.module, "name": queryParams.name }
        })
    }
}

export const queryContractUnits = () => {
    {
        return request({
            url: '/dictionaries',
            method: 'get',
            params: { "module": "contract", "name": "unit" }
        })
    }
}

export const queryProductSourceType = () => {
    {
        return request({
            url: '/dictionaries',
            method: 'get',
            params: { "module": "product", "name": "sourceType" }
        })
    }
}

export const queryProductSubtype = (parentID) => {
    {
        return request({
            url: '/dictionaries',
            method: 'get',
            params: { "parentID": parentID }
        })
    }
}

export const createDictionary = (object) => {
    return request({
        url: '/dictionary',
        method: 'POST',
        data: object
    })
}