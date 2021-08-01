import request from './base'

export const queryDictionaries = (name, parentID) => {
    {
        return request({
            url: '/dictionaries',
            method: 'get',
            params: { "name": name, "parentID": parentID }
        })
    }
}