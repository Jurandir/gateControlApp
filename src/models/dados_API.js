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
    return config
}

export default dados_API