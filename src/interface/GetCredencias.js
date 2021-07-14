import LoadAPI from '../utils/LoadAPI'

const GetCredencias = (dados_API,empresa,usuario,senha) => {
    let retorno 
    return new Promise( async function(resolve, reject) {

        let method    = 'POST'
        let endpoint  = dados_API.endPoint_token
        let server    = `http://${dados_API.servidor}:${dados_API.porta}`
        let params = {
            CdEmpresa:  empresa, 
            DsApelido:  usuario,
            DsSenha:    senha
        }

       try {
        
        retorno = await LoadAPI(method,endpoint,server,params)           
        
        resolve(retorno)

       } catch(err) {

           retorno = {success: false, message: err.message, err: err}
           reject( retorno )
           
       }
     })
}

export default GetCredencias