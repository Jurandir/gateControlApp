import React, {useState, useEffect} from 'react';
import {  View,           KeyboardAvoidingView, 
          TextInput,      TouchableOpacity, 
          Text,           StyleSheet, 
          Animated,       Keyboard,
          Alert,          Dimensions, Modal , Button
           } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

const deviceWidth = Dimensions.get('window').width
const reducao     = 140

export default function LerQRcode( props ) {
  let { navigation } = props
  let params         = props.route.params

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned]             = useState(false);

  const [vdados_API      , setDdados_API]      = useState({});
  const [vlogin_inicial  , setLogin_inicial]   = useState({});
  const [vpatil_veiculo  , setPatil_veiculo]   = useState({});
  const [vpatio_movimento, setPatio_movimento] = useState({});

  let xpatil_veiculo
  let xpatio_movimento

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    xpatil_veiculo = {
      Base: 'softran_termaco',
      NrPlaca: 'POC1909',
      NrHodAtual: 700001,
    }

    xpatio_movimento = {
      NrPlaca: "POC1909",
      NrHodAtual: 705110,
      CdEmpresa: 20,
      DsEmpresa: "TERMACO TRANSPORTES",
      DtEntradaSaida: "2021-07-08",
      HrEntradaSaida: "09:24:25",
      InEntradaSaida: 1,
      DsEntradaSaida: "Saída",
      CdMotivo: 1,
      DsMotivo: "DESCARREGAR",
      CdFuncionario: 5814,
      DsFuncionario: "JURANDIR BRITO FERREIRA JUNIOR",
      CdMotorista: "00046579001372",
      DsMotorista: "JOSE ARGEMIRO NUNES LINS",
    }

    setDdados_API(params.vdados_API)
    setLogin_inicial(params.vlogin_inicial)
    setPatil_veiculo(xpatil_veiculo) 
    setPatio_movimento(xpatio_movimento) 
  }, []);

  useEffect(() => {
    console.log('LerQRcode:')
  });    

  const handleBarCodeScanned = ({ type, data }) => {
    
    if(type!=256){
      console.log('************************************************   SEARCH:', 256 )
      return
    }

    let ler = `${data}`
    let pos = ler.search('NrPlaca') 

    if(pos==0){
      console.log('************************************************   SEARCH:', 0 )
      return
    }

    let obj = JSON.parse(ler)
    let NrPlaca = obj.NrPlaca
    console.log('************************************************   SEARCH:', NrPlaca )

    setScanned(true);

    // =============== ATUALIZA PLACAS
    let new_veiculo = vpatil_veiculo
    new_veiculo.NrPlaca = NrPlaca
    setPatil_veiculo(new_veiculo)

    // ============== MONTA PARAMETROS DE NAVEGAÇÃO
    let par_nav = {
      vdados_API: vdados_API,
      vlogin_inicial: vlogin_inicial,
      vpatil_veiculo: new_veiculo,
      vpatio_movimento: vpatio_movimento
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.absoluteFillObject}
      />
      {scanned && <Button title={'Nova leitura QRcode'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  absoluteFillObject: {bottom: 100, left: 20, position: 'absolute', right: 20, top: 100}
});
