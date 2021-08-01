import request from './base'

export const delTask = (id) => {
    {
        return request({
            url: '/task/' + id,
            method: 'DELETE',
        })
    }
}

export const queryTasksByContractID = (contractID) => {
    {
        return request({
            url: '/tasksByContractID',
            method: 'GET',
            params: {
                "contractID": contractID,
            }
        })
    }
}