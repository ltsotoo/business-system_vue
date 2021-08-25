import request from './base'


export const queryDictionaryType = (module, name) => {
    return request({
        url: '/dictionaryType',
        method: 'get',
        params: {
            "module": module,
            "name": name,
        }
    })
}

export const queryContractUnits = () => {
    return queryDictionaryType("contract", "unit")
}

export const queryProductSourceType = () => {
    return queryDictionaryType("product", "source_type")
}

export const queryDictionaryTypes = (module) => {
    return request({
        url: '/dictionaryTypes',
        method: 'get',
        params: { "module": module }
    })
}

export const createDictionary = (object) => {
    return request({
        url: '/dictionary',
        method: 'POST',
        data: object
    })
}

export const delDictionary = (uid) => {
    return request({
        url: '/dictionary/' + uid,
        method: 'DELETE',
    })
}

export const queryDictionaries = (parentUID, dictionaryTypeUID) => {
    return request({
        url: '/dictionaries',
        method: 'get',
        params: {
            "parentUID": parentUID,
            "dictionaryTypeUID": dictionaryTypeUID,
        }
    })
}

export const queryProductSubtype = (parentID) => {
    return queryDictionaries(parentID, null)
}