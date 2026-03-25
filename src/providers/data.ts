// import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// import { API_URL } from "./constants";
// export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
//   apiURL: API_URL,
// });


import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import { data } from "react-router";
import {MOCK_SUBJECT} from '../constants/mock-data'
export const dataProvider: DataProvider = {
  getList: async<TData extends BaseRecord = BaseRecord>({ resource }:
    GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== 'subjects'){
       return { data: [] as TData[], total: 0 }
}
    return {
      data: MOCK_SUBJECT as unknown as TData[], total:MOCK_SUBJECT.length

    }
  },

getOne:async ()=>{ throw new Error('This function is not present in mock')},
create:async ()=>{ throw new Error('This function is not present in mock')},
update:async ()=>{ throw new Error('This function is not present in mock')},
deleteOne:async ()=>{ throw new Error('This function is not present in mock')},

getApiUrl:()=>''
}




// give this to ai to generate data
// create mock subject data in typescrip fro three university courses each subjectt shoud include an id,crouse code, name, department and a breif description
// // import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// // import { API_URL } from "./constants";
// // export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
// //   apiURL: API_URL,
// // });


// import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
// export const dataProvider: DataProvider = {
//   getList: async<TData extends BaseRecord = BaseRecord>({ resource }:
//     GetListParams): Promise<GetListResponse<TData>> => {
//     if (resource !== 'subjects') return { data: [] as TData[], total: 0 }

//     return {
//       data: [], total: 0

//     }
//   },

// getOne:async ()=>{ throw new Error('This function is not present in mock')},
// create:async ()=>{ throw new Error('This function is not present in mock')},
// update:async ()=>{ throw new Error('This function is not present in mock')},
// deleteOne:async ()=>{ throw new Error('This function is not present in mock')},

// getApiUrl:()=>''
// }