import React, {useState, useEffect} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {  Alert,     View,      Modal, SafeAreaView,       Text, 
          TextInput, TouchableOpacity, TouchableHighlight, StyleSheet 
       } from 'react-native';

import SetRegistroES from '../../interface/SetRegistroES'

export default function MovimentoPatio( props ) {
  const { navigation } = props 
  let params           = props.route.params

  const [modalVisible, setModalVisible] = useState(false);
  const [placas      , setPlacas]       = useState(null);
  const [motorista   , setMotorista]    = useState(null);
  const [motivo      , setMotivo]       = useState(null);
  const [CdMotivo    , setCdMotivo]     = useState(null);
  const [observacao  , setObservacao]   = useState('');
  const [btnConfirma , setBtnConfirma]  = useState(false)


  const [hodometro, setHodometro ] = useState(null);
  const [labelES  , setLabelES]    = useState('Patio');
  const [Base     , setBase]       = useState(null);
  const [aviso    , setAviso]      = useState('');
  
  const [vdados_API      , setDdados_API]      = useState({});
  const [vlogin_inicial  , setLogin_inicial]   = useState({});
  const [vpatio_veiculo  , setPatio_veiculo]   = useState({});
  const [vpatio_movimento, setPatio_movimento] = useState({});
  const [vpatio_motivo,    setPatio_motivo]    = useState({});

  useEffect( () => {
    setDdados_API(params.vdados_API)
    setLogin_inicial(params.vlogin_inicial)
    setPatio_veiculo(params.vpatio_veiculo)
    setPatio_movimento(params.vpatio_movimento)
    setPatio_motivo(params.vpatio_motivo)
    setBtnConfirma(true)    
  }, []);

  useEffect( () => {
    setPlacas(vpatio_veiculo.NrPlaca)
    setHodometro(`${vpatio_veiculo.NrHodAtual}`)
    setMotorista(vpatio_movimento.CdMotorista)
    setLabelES(vpatio_movimento.DsEntradaSaida)
    setBase(vpatio_veiculo.Base)
  },[vpatio_veiculo.Base]);

  function paddy(num, padlen, padchar) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }

  // Confirmação do registro ES
  const confirma = () => {
    Alert.alert('Confirmação:', `Registra ${labelES} do veiculo ${placas} ?`,
    [{
      text: 'SIM',
      onPress: confirmaRegistro,
      style: 'default'
    },{
      text: 'NÃO',
      onPress: () => {},
      style: 'default'
    }],
    { cancelable: false })
  }

  // Registra EouS
  const confirmaRegistro = () => {
    let cpf  = parseInt(motorista)
    let sCpf = paddy(cpf,14)
    let tipo_es = `${labelES}`.substr(0,1)

    setMotorista(sCpf)

    if(motivo==null) {
      Alert.alert('Motivo não informado !!!')
      return 0
    }

    let params = {
      Base:              Base,
      TpMovimento:       tipo_es,
      CdEmpresa:         vlogin_inicial.empresa, 
      InEntradaSaida:    ( tipo_es=='E' ? 1 : 0 ), 
      CdFuncionario:     vlogin_inicial.CdFuncionario, 
      NrPlaca:           vpatio_veiculo.NrPlaca,
      CdMotorista:       motorista,
      InTpVeiculo:       0, 
      NrHodEntradaSaida: hodometro, 
      DsVeiculo:         `Placa: ${placas}`, 
      CdMotivo:          CdMotivo, 
      DsObs:             observacao, 
      InCarregado:       0
    }

    setAviso('Registrando...')

    SetRegistroES(vdados_API,vlogin_inicial,params).then(ret=>{
        setAviso('')
        if(ret.success) {
          setLabelES('Confirmado')
          setBtnConfirma(false)
        } else {
          Alert.alert('Aviso:', ret.message )
        }     
    }).catch((err)=>{
        setAviso('')
        Alert.alert('Erro:', err.message )
    })

  }

    // =================================== TELA MODAL TIPO DE OPERAÇÃO
    function ItemModalMotivo(props) {
      function OnPressOperacao(DsApelido,CdMotivo) {
        console.log('>',DsApelido,CdMotivo)
        setMotivo(DsApelido);
        setCdMotivo(CdMotivo);
        setModalVisible(!modalVisible);
      }   
      return (
          <TouchableHighlight
              style={{ ...styles.buttonModal, backgroundColor: "#2196F3" }}
              onPress={()=>{OnPressOperacao(props.DsApelido,props.CdMotivo)}}
            >
          <Text style={styles.textStyle}>{props.DsMotivo}</Text>
        </TouchableHighlight>
      )
    }

    // ==================================== LOOP MOTIVOS
    function LoopMotivos() {
        return (
            <View style={styles.modalView}> 
               <Text style={styles.modalText}>Motivos:</Text>
               {vpatio_motivo.data.map(r => {
                  return <ItemModalMotivo key={r.CdMotivo} CdMotivo={r.CdMotivo} DsMotivo={r.DsMotivo} DsApelido={r.DsApelido}/>
                }
              )}
            </View>
        )
    }

  // ==================================================== VISUAL REACT =========================================
  return (
    <SafeAreaView style={styles.background}>

        <Text style={styles.title}>{labelES}</Text>
        <Text style={styles.LabelTitulo}>{Base}</Text>
        <Text style={styles.LabelAviso}>{aviso}</Text>

        { /* ================= Placas */}
        <Text style={styles.LabelText}>Placas:</Text>
        <View style={{flexDirection: 'row'}}>
        <TextInput
          value={placas}
          style={styles.inputModal}
          editable = {false}
          placeholder="Placas"
          autoCorrect={false}
          onChangeText={(text)=> { setPlacas(text)}}
        />
          <TouchableHighlight 
              style={styles.openModal} 
              onPress={() => { navigation.goBack() }}
          >
              <AntDesign name="qrcode" size={34} color="#FFF" />
          </TouchableHighlight>
        </View>

        { /* ================= Hodômetro */}
        <Text style={styles.LabelText}>Hodômetro:</Text>
        <TextInput
          value={hodometro}
          style={styles.input}
          keyboardType='numeric'
          maxLength={10}
          placeholder="Hodômetro"
          autoCorrect={false}
          onChangeText={(text)=> { setHodometro(text)}}
        />

        { /* ================= Motorista */}
        <Text style={styles.LabelText}>CPF do Motorista:</Text>
        <TextInput
          value={motorista}
          style={styles.input}
          editable = {true}
          keyboardType='numeric'
          maxLength={14}
          placeholder="CPF do Motorista"
          autoCorrect={false}
          onChangeText={(text)=> { setMotorista(text)}}
        />

        { /* ================= Motivo */}
        <Text style={styles.LabelText}>Motivo:</Text>
        <View style={{flexDirection: 'row'}}>
        <TextInput
          value={motivo}
          style={styles.inputModal}
          editable = {false}
          placeholder="Motivo"
          autoCorrect={false}
          onChangeText={(text)=> { setMotivo(text)}}
        />
          <TouchableHighlight 
              style={styles.openModal} 
              onPress={() => { setModalVisible(!modalVisible)}}
          >
              <AntDesign name="caretdown" size={32} color="#FFF" />
          </TouchableHighlight>
        </View>

        { /* ================= Observações */}
        <Text style={styles.LabelText}>Observações:</Text>
        <TextInput
          value={observacao}
          style={styles.input}
          placeholder="Observações"
          autoCorrect={false}
          onChangeText={(text)=> { setObservacao(text)}}
        />

        { /* ================= Buttons ( Confirma & Sair ) */}
        <View style={styles.containerBTN}>
          { btnConfirma &&
          <TouchableOpacity 
              style={styles.btnImagens}
              onPress={ confirma }
          >
            <Text style={styles.submitText}>
                Confirma
            </Text>
          </TouchableOpacity>
          }

          <TouchableOpacity 
              style={styles.btnSair}
              onPress={ () => { navigation.navigate('Login') } }
          >
            <Text style={styles.submitText}>
                Sair
            </Text>

          </TouchableOpacity>        
        </View>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { Alert.alert("Modal has been closed."); }}
        >
            <View style={styles.centeredView}>
                <LoopMotivos />
            </View>

      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerBTN:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#191919',
    marginTop:20,
  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 10,
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginTop:5,
    marginBottom:10,
    color:'#000',
    fontSize: 17,
    borderRadius: 7,
    padding: 5,
  },
  inputModal:{
    backgroundColor: '#FFF',
    width: '78%',
    marginTop:5,
    marginBottom:10,
    color:'#000',
    fontSize: 17,
    borderRadius: 7,
    padding: 5,
  },
  openModal: {
    marginTop:5,
    marginLeft:2,
    width: '12%',
    height: 40,    
    backgroundColor: "#35AAFF",
    borderRadius: 7,
    paddingTop: 3,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 5,
    elevation: 2
  },  
  btnImagens:{
    backgroundColor: '#35AAFF',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  btnSair:{
    backgroundColor: '#35AAFF',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  submitText:{
    color: '#FFF',
    fontSize: 20,
  },
  LabelText:{
    color: '#FFF',
    textAlign: "left",
    alignSelf: 'stretch',
    marginLeft: 20,
  },
  LabelTitulo:{
    color: '#FFF',
    textAlign: "center",
    marginTop: 2,
    fontSize: 14
  },
  LabelStatus:{
    backgroundColor: '#35AAFF',
    color: '#fff',
    paddingVertical:1,
    paddingHorizontal:6,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12
  },
  LabelAviso:{
    color: 'yellow',
    textAlign: "center",
    marginTop: 0,
    fontSize: 30
  },  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  buttonModal: {
    width: '90%',
    margin: 5,
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "white",
    width: '90%',
    backgroundColor: "#35AAFF",
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    borderRadius: 10,
  },      
});

