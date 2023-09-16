import { USER_INFO } from "./types";

export const userinfo=(formdata)=>{
    return{
        type:USER_INFO,
        payload:formdata
    }
}