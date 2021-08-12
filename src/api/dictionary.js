import request from './base'

export const createDictionary = (object) => {
    return request({
        url: '/dictionary',
        method: 'POST',
        data: object
    })
}

export const delDictionary = (id) => {
    return request({
        url: '/dictionary/' + id,
        method: 'DELETE',
    })
}

export const queryDictionaryTypes = (module) => {
    return request({
        url: '/dictionaryTypes',
        method: 'get',
        params: { "module": module }
    })
}

export const queryDictionaries = (parentID, dictionaryTypeID) => {
    return request({
        url: '/dictionaries',
        method: 'get',
        params: {
            "parentID": parentID,
            "dictionaryTypeID": dictionaryTypeID,
        }
    })
}

export const queryDictionariesByDictionaryType = (module, name) => {
    return request({
        url: '/dictionariesByDictionaryType',
        method: 'get',
        params: {
            "module": module,
            "name": name,
        }
    })
}

export const queryContractUnits = () => {
    return queryDictionariesByDictionaryType("contract", "unit")
}

export const queryProductSourceType = () => {
    return queryDictionariesByDictionaryType("product", "source_type")
}

export const queryProductSubtype = (parentID) => {
    return queryDictionaries(parentID, null)
}