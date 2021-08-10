import request from './base'

export const queryDictionarieTypeGroup = (module) => {
    {
        return request({
            url: '/dictionarieTextGroup',
            method: 'get',
            params: {"module": module}
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
            params: { "parentID":parentID,"module": "product", "name": "subtype" }
        })
    }
}