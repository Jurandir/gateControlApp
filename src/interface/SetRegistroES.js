import LoadAPI from '../utils/LoadAPI'

const SetRegistroES = (dados_API,login_inicial,params) => {
    let retorno 
    return new Promise( async function(resolve, reject) {

        let method    = 'POST'
        let endpoint  = dados_API.endPoint_veiculoRegistraES
        let server    = `http://${dados_API.servidor}:${dados_API.porta}`

       try {
        
        retorno = await LoadAPI(method,endpoint,server,params,login_inicial.token)                    
        
        resolve(retorno)

       } catch(err) {

           retorno = {success: false, message: err.message, err: err}
           reject( retorno )
           
       }
     })
}

export default SetRegistroES