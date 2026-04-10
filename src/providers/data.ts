// // import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// // import { API_URL } from "./constants";
// // export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
// //   apiURL: API_URL,
// // });


// import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
// import { data } from "react-router";
// import {MOCK_SUBJECT} from '../constants/mock-data'
// export const dataProvider: DataProvider = {
//   getList: async<TData extends BaseRecord = BaseRecord>({ resource }:
//     GetListParams): Promise<GetListResponse<TData>> => {
//     if (resource !== 'subjects'){
//        return { data: [] as TData[], total: 0 }
// }
//     return {
//       data: MOCK_SUBJECT as unknown as TData[], total:MOCK_SUBJECT.length

//     }
//   },

// getOne:async ()=>{ throw new Error('This function is not present in mock')},
// create:async ()=>{ throw new Error('This function is not present in mock')},
// update:async ()=>{ throw new Error('This function is not present in mock')},
// deleteOne:async ()=>{ throw new Error('This function is not present in mock')},

// getApiUrl:()=>''
// }




// // give this to ai to generate data
// // create mock subject data in typescrip fro three university courses each subjectt shoud include an id,crouse code, name, department and a breif description
// // // import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// // // import { API_URL } from "./constants";
// // // export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
// // //   apiURL: API_URL,
// // // });


// // import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
// // export const dataProvider: DataProvider = {
// //   getList: async<TData extends BaseRecord = BaseRecord>({ resource }:
// //     GetListParams): Promise<GetListResponse<TData>> => {
// //     if (resource !== 'subjects') return { data: [] as TData[], total: 0 }

// //     return {
// //       data: [], total: 0

// //     }
// //   },

// // getOne:async ()=>{ throw new Error('This function is not present in mock')},
// // create:async ()=>{ throw new Error('This function is not present in mock')},
// // update:async ()=>{ throw new Error('This function is not present in mock')},
// // deleteOne:async ()=>{ throw new Error('This function is not present in mock')},

// // getApiUrl:()=>''
// // }


import { BACKEND_BASE_URL } from '@/constants'
import { CreateResponse, GetOneResponse, ListResponse } from '@/types'
import { HttpError } from '@refinedev/core'
import { createDataProvider, CreateDataProviderOptions } from '@refinedev/rest'






if (!BACKEND_BASE_URL) {
  throw new Error('BACKEND_BASE_URL is not configured. Please set the VITE_BACKEND_BASE_URL in your .env file')
}





const buildHttpError = async (response: Response): Promise<HttpError>=> {
  let message = 'Request Failed'

  try {
    const payload = (await response.json()) as { message?: string }

    if (payload?.message) message = payload.message
  } catch (e) {
    console.log('arcject error')
  }

  return { message, statusCode: response.status }
}

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,// simple returning endpoint
    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1
      const pageSize = pagination?.pageSize ?? 10

      const params: Record<string, string | number> = { page, limit: pageSize }

      filters?.forEach((filter) => {
        const field = 'field' in filter ? filter.field : ''

        const value = String(filter.value)

        if (resource === 'subjects') {
          if (field === 'departments') params.department = value
          if (field === 'name' || field == 'code') params.search = value
        }
      })
      return params
    },
    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response)

      const payload: ListResponse = await response.clone().json()
      return payload.data ?? []//if payload.data does not exist just be empty array
    },
    getTotalCount: async (response) => {
      if (!response.ok) throw await buildHttpError(response)


      const payload: ListResponse = await response.clone().json()

      return payload.pagination?.total ?? payload.data?.length ?? 0 //this ts shit is confusing hahah
      // process flow
      // 1. Try payload.pagination?.total
      // 2. If null/undefined → try payload.data?.length
      // 3. If still null/undefined → use 0

    }
  },
  create:{
    getEndpoint:({resource})=>resource,
    buildBodyParams:async({variables})=>variables,
    mapResponse:async(response)=>{
      const json:CreateResponse=await response.json()
      return json.data??[]
    }
  },
  getOne:{
    getEndpoint:({resource,id})=>`${resource}/${id}`,
    mapResponse:async(response)=>{
      const json: GetOneResponse=await response.json()

      return json.data??[]
    }
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options)
export { dataProvider }