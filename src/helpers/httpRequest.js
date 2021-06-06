import axios from 'axios'
/***Generic method to call APIs ***/
const httpRequest = async({method='get', url, data=null})=>{
    try{
        const response = axios[method](url, data)
        return response
    } catch(error){
        return error
    }
}

export default httpRequest