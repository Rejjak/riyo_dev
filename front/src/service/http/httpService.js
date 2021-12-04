import axios from 'axios';
let api_url = 'http://localhost:5000/';

class OtherInfo{
    /**
     * common messages
     */
    appMessege = {
        'internet_error'    :   'Internet not connected',
        'server_error'      :   'Invalid server response, please try again!',
        'network_error'     :   'Can not connect to server',
        'timeout_error'     :   'Unable to reach server',
        'unknown_error'     :   'Something went wrong, please try again!',
        'invalidResponse'   :   'Error: Invalid server response'
    }
}

class HttpService extends OtherInfo{
    /**
     * Http calling with post request
     * @param {Object} senddata | {url:'api-end-point',data:{key1:value1,key2:value2...},authtoken:''}
     */
    postHttpCall = async(senddata) =>{
        const token = senddata.authtoken !== undefined ? 'Bearer '+senddata.authtoken : '';
        let option = {
            headers:{'Content-Type': 'application/json'}
        };
        if(token !== ''){
            option = {
                headers:{'Content-Type': 'application/json','Authorization':token}
            };
        }
        return axios.post(api_url+senddata.url,JSON.stringify(senddata.data),option).then((res)=>{
            return Promise.resolve(res.data);
        }).catch((error)=>{
            if(error.code === 'ECONNABORTED'){
                throw {'status':500,'message':this.appMessege.timeout_error}
            }else{
                if (error.response){
                    const errorMsg = error.response.data.message;
                    if(typeof errorMsg !== 'object' && errorMsg !== '' && errorMsg !== undefined && errorMsg !== null){
                        const networkError = errorMsg.search('Network');
                        const serverError = errorMsg.search('Failed');
                        if(networkError !== '' && serverError >= 0){
                            throw {'status':500,'message':this.appMessege.server_error}
                        }
                        else if(serverError !=='' && networkError >= 0){
                            throw {'status':500,'message':this.appMessege.network_error}
                        }else{
                            if(error.response.status){
                                throw {'status':error.response.status,'message':errorMsg.substr(0,100)}
                            }else{
                                throw {'status':500,'message':this.appMessege.unknown_error}
                            }
                        }
                    }else{
                        if(error.response.status){
                            throw {'status':error.response.status,'message':this.appMessege.invalidResponse}
                        }else{
                            throw {'status':500,'message':this.appMessege.unknown_error}
                        }
                    }
                }else{
                    if(error !== undefined && error !== null){
                        const networkError = error.toString().search('Network');
                        if(networkError >= 0){
                            throw {'status':500,'message':this.appMessege.network_error}
                        }else{
                            const cancelError = error.toString().search('Cancel');
                            if(cancelError >= 0){
                                throw {'status':499,'message':'Last request has been canceled!'}
                            }else{
                                throw {'status':500,'message':this.appMessege.unknown_error}
                            }
                        }
                    }else{
                        throw {'status':500,'message':this.appMessege.unknown_error}
                    }
                }
            }
        });
    }

    /**
     * Http calling with get request
     * @param {Object} senddata | {url:'api-end-point',data:{key1:value1,key2:value2...},authtoken:''}
     */
    getHttpCall = async(senddata) =>{
        const token = senddata.authtoken !== undefined ? 'Bearer '+senddata.authtoken : '';
        let option = {
            headers:{'Content-Type': 'application/json'}
        };
        if(token !== ''){
            option = {
                headers:{'Content-Type': 'application/json','Authorization':token}
            };
        }
        
        return axios.get(api_url+senddata.url,option).then((res)=>{
            return Promise.resolve(res.data);
        }).catch((error)=>{
            console.log(error);
            if(error.code === 'ECONNABORTED'){
                throw {'status':500,'message':this.appMessege.timeout_error}
            }else{
                if (error.response){
                    const errorMsg = error.response.data.message;
                    if(typeof errorMsg !== 'object' && errorMsg !== '' && errorMsg !== undefined && errorMsg !== null){
                        const networkError = errorMsg.search('Network');
                        const serverError = errorMsg.search('Failed');
                        if(networkError !== '' && serverError >= 0){
                            throw {'status':500,'message':this.appMessege.server_error}
                        }
                        else if(serverError !=='' && networkError >= 0){
                            throw {'status':500,'message':this.appMessege.network_error}
                        }else{
                            if(error.response.status){
                                throw {'status':error.response.status,'message':errorMsg.substr(0,100)}
                            }else{
                                throw {'status':500,'message':this.appMessege.unknown_error}
                            }
                        }
                    }else{
                        if(error.response.status){
                            throw {'status':error.response.status,'message':this.appMessege.invalidResponse}
                        }else{
                            throw {'status':500,'message':this.appMessege.unknown_error}
                        }
                    }
                }else{
                    if(error !== undefined && error !== null){
                        const networkError = error.toString().search('Network');
                        if(networkError >= 0){
                            throw {'status':4,'message':this.appMessege.network_error}
                        }else{
                            throw {'status':500,'message':this.appMessege.unknown_error}
                        }
                    }else{
                        throw {'status':500,'message':this.appMessege.unknown_error}
                    }
                }
            }
        });
    }
}

export default new HttpService();

