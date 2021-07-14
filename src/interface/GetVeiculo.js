import LoadAPI from '../utils/LoadAPI'

const GetVeiculo = (dados_API,login_inicial,NrPlaca) => {
    let retorno 
    return new Promise( async function(resolve, reject) {

        let method    = 'GET'
        let endpoint  = dados_API.endPoint_veiculo
        let server    = `http://${dados_API.servidor}:${dados_API.porta}`
        let params = {
            NrPlaca:  NrPlaca, 
        }

       try {
        
        retorno = await LoadAPI(method,endpoint,server,params,login_inicial.token)           
        
        resolve(retorno)

       } catch(err) {

           retorno = {success: false, message: err.message, err: err}
           reject( retorno )
           
       }
     })
}

export default GetVeiculo