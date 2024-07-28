import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

// Register api - called by authentication component
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

export const createEmployeeAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/create_employee`,reqBody,reqHeader)
}

// EmployeeListAPI
export const EmployeeListAPI = async(reqBody)=>{
    return await commonAPI("GET",`${SERVER_URL}/employee`,reqBody)
}

// deleteEmployeeAPI
export const deleteEmployeeAPI = async(_id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/employee/${_id}`,{},reqHeader)
}

// getSingleEmployeeDetailsAPI
export const getSingleEmployeeDetailsAPI = async(_id, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/single_employee/${_id}`, {}, reqHeader);
  }
  
// editEmployeeAPI
export const editEmployeeAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit_employee`,reqBody,reqHeader)
}