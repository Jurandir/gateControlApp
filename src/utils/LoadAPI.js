import { post, get } from 'axios'

async function LoadAPI(method, endpoint, server, params, token ) {
    let config
    let ret
    if(token) {
        config = { headers: { "Content-Type": 'application/json', Authorization: `Bearer ${token}`   } }    
    } else {
        config = { headers: { "Content-Type": 'application/json' } }
    }        
    let url = server + endpoint
    try {
        if (method == 'POST') {
            ret = await post(url, params, config)
        } else {
            config.params = params
            ret = await get(url, config)
        }
        dados                = ret.data
        dados.isErr          = false
        dados.isAxiosError   = false
        return dados
    } catch (err) {
        dados = { success: false, message: 'ERRO', url: url, err, Err: true, isAxiosError: true }
        if (err.message) {
            dados.message  = err.message
        }
        return dados
    }
}
export default LoadAPI
