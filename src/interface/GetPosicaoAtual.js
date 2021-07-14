import LoadAPI from '../utils/LoadAPI'

const GetPosicaoAtual = (dados_API,login_inicial,vpatio_veiculo) => {
    let retorno 
    return new Promise( async function(resolve, reject) {

        let method    = 'GET'
        let endpoint  = dados_API.endPoint_veiculoPosicaoAtual
        let server    = `http://${dados_API.servidor}:${dados_API.porta}`
        let params = {
            Base: vpatio_veiculo.Base,
            NrPlaca:  vpatio_veiculo.NrPlaca, 
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

export default GetPosicaoAtual