import React, {useState, useEffect} from 'react';
import {  View,           
          Text,           StyleSheet, 
          Alert,          Dimensions, Button
           } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

import GetVeiculo      from '../../interface/GetVeiculo'
import GetPosicaoAtual from '../../interface/GetPosicaoAtual'
import GetUsuario      from '../../interface/GetUsuario'

import patio_motivo        from '../../models/patio_motivo'
import patio_veiculo       from '../../models/patio_veiculo'
import patio_movimento     from '../../models/patio_movimento'

const deviceWidth = Dimensions.get('window').width
const reducao     = 140

export default function LerQRcode( props ) {
  let { navigation } = props
  let params         = props.route.params

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned]             = useState(false);

  let vdados_API       = params.vdados_API
  let vlogin_inicial   = params.vlogin_inicial
  let vpatio_motivo    = patio_motivo()
  let vpatio_veiculo   = patio_veiculo()
  let vpatio_movimento = patio_movimento()

  useEffect(() => {

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    
    if(type!=256){
      Alert.alert(`Tipo de IMAGEM não compatível !!!`);
      return
    }

    let ler = `${data}`
    let pos = ler.search('NrPlaca') 

    if( pos == -1 ){
      Alert.alert(`QRcode sem campo PLACA !!!`);
      return
    }

    let obj = JSON.parse(ler)
    let NrPlaca = obj.NrPlaca

    setScanned(true);

    // =============== DADOS DO VEICULO
    let veiculo = await GetVeiculo(vdados_API,vlogin_inicial,NrPlaca)

    if(!veiculo.success) {
      Alert.alert(`MSG: ${veiculo.message},   ${NrPlaca}, Veiculo.`);
      return
    }

    vpatio_movimento.NrPlaca    = NrPlaca
    vpatio_veiculo.NrPlaca      = NrPlaca
    vpatio_movimento.NrHodAtual = veiculo.data[0].NrHodAtual
    vpatio_veiculo.Base         = veiculo.Base
    vpatio_veiculo.NrHodAtual   = veiculo.data[0].NrHodAtual

    // ============== DADOS POSIÇÃO ATUAL
    let posicao = await GetPosicaoAtual(vdados_API,vlogin_inicial,vpatio_veiculo)

    if(!posicao.success) {
      Alert.alert(`MSG: ${posicao.message}, ${NrPlaca}, ${veiculo.Base}, Posição.`);
      return
    }

    vpatio_movimento.NrHodAtual       = posicao.data[0].NrHodAtual
    vpatio_movimento.CdEmpresa        = posicao.data[0].CdEmpresa
    vpatio_movimento.DsEmpresa        = posicao.data[0].DsEmpresa
    vpatio_movimento.DtEntradaSaida   = posicao.data[0].DtEntradaSaida
    vpatio_movimento.HrEntradaSaida   = posicao.data[0].HrEntradaSaida
    vpatio_movimento.InEntradaSaida   = posicao.data[0].InEntradaSaida
    vpatio_movimento.DsEntradaSaida   = posicao.data[0].DsEntradaSaida
    vpatio_movimento.CdMotivo         = posicao.data[0].CdMotivo
    vpatio_movimento.DsMotivo         = posicao.data[0].DsMotivo
    vpatio_movimento.CdMotorista      = posicao.data[0].CdMotorista
    vpatio_movimento.DsMotorista      = posicao.data[0].DsMotorista

    // ============== DADOS USUÁRIO / FUNCIONARIO
    let funcionario = await GetUsuario(vdados_API,vlogin_inicial,vpatio_veiculo)

    if(!funcionario.success) {
      Alert.alert(`MSG: ${posicao.message}, ${NrPlaca}, ${veiculo.Base}, Usuario.`);
      return
    }

    vpatio_movimento.CdFuncionario    = funcionario.data[0].CdFuncionario
    vpatio_movimento.DsFuncionario    = posicao.data[0].DsApelido

    // ============== MONTA PARAMETROS DE NAVEGAÇÃO
    let par_nav = {
      vdados_API:       vdados_API,
      vlogin_inicial:   vlogin_inicial,
      vpatio_veiculo:   vpatio_veiculo,
      vpatio_movimento: vpatio_movimento,
      vpatio_motivo:    vpatio_motivo,
    }
    navigation.navigate('MovimentoPatio',par_nav)  
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QRcode</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.absoluteFillObject}
        />
        {scanned && <Button title={' Click para nova leitura QRcode '} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteFillObject: {
    bottom: 100, 
    left: 20, 
    position: 'absolute', 
    right: 20, 
    top: 190
  },
  title: {
    marginTop: 10,
    top: 100,
    position: 'absolute', 
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    width: '90%',
    backgroundColor: "#35AAFF",
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    borderRadius: 10,
  },     
});
