import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>
    ) {
        console.log('param : ', param)
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            console.log('BaseService ? ', param)
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response)
                    console.log('resolve : ', response)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                    console.log('reject : ', errors)
                })
        })
    },
}

export default ApiService
