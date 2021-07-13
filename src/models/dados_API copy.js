import { getData, setData } from '../utils/dataStorage';

const dados_API = () => {
    let config = {
        servidor                     : '192.168.1.139',
        porta                        : 4999,
        endPoint_token               : '/senior/tokenControlePatio',
        endPoint_motorista           : '/senior/motorista',
        endPoint_funcionario         : '/senior/funcionario',
        endPoint_usuario             : '/senior/usuario',
        endPoint_empresa             : '/senior/empresa',
        endPoint_motivoEntradaSaida  : '/senior/motivoEntradaSaida',
        endPoint_veiculo             : '/senior/veiculo',
        endPoint_veiculoEntradaSaida : '/senior/veiculoEntradaSaida',
        endPoint_veiculoPosicaoAtual : '/senior/veiculoPosicaoAtual',
        endPoint_veiculoRegistraES   : '/senior/veiculoRegistraES',
    }

    getData('@dados_API').then((sto) =>{
        if(!sto.data) {
           sto.data = []
        }         
        if(sto.data.length>0) {
           navigation.navigate('Picture')
        } else {
          Alert.alert('Não existe dados relacionados !!!')
        }
     })



    setData('@dados_API',{ config: config })
    return config
}

export default dados_API