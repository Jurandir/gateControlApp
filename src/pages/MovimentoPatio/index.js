import React, {useState, useEffect} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {  Alert,          View,
          Modal,          SafeAreaView,
          TextInput,      TouchableOpacity,
          TouchableHighlight,          Text, 
          StyleSheet , Button
             } from 'react-native';


export default function MovimentoPatio( props ) {
  const { navigation } = props 
  let params           = props.route.params

  const [modalVisible, setModalVisible] = useState(false);
  const [placas      , setPlacas]       = useState(null);
  const [motorista   , setMotorista]    = useState(null);
  const [motivo      , setMotivo]       = useState(null);
  const [observacao  , setObservacao]   = useState(null);    


  const [hodometro, setHodometro ] = useState(null);
  const [labelES  , setLabelES]    = useState('Patio');
  
  const [vdados_API      , setDdados_API]      = useState({});
  const [vlogin_inicial  , setLogin_inicial]   = useState({});
  const [vpatio_veiculo  , setPatio_veiculo]   = useState({});
  const [vpatio_movimento, setPatio_movimento] = useState({});

  useEffect( () => {
    console.log('MovimentoPatio: 0')
    setDdados_API(params.vdados_API)
    setLogin_inicial(params.vlogin_inicial)
    setPatio_veiculo(params.vpatio_veiculo)
    setPatio_movimento(params.vpatio_movimento)
    
  }, []);

  useEffect( () => {
    console.log('MovimentoPatio: 1')
    setPlacas(vpatio_veiculo.NrPlaca)
    setHodometro(`${vpatio_veiculo.NrHodAtual}`)
    setMotorista(vpatio_movimento.CdMotorista)
    setLabelES(vpatio_movimento.DsEntradaSaida)
  });

  const confirma = () => {
    if(motivo==null) {
      Alert.alert('Motivo não informado !!!')
    }
  }


  // VISUAL REACT
  return (
    <SafeAreaView style={styles.background}>

        <Text style={styles.title}>{labelES}</Text>

        <Text style={styles.LabelTitulo}>softran_transporte</Text>
        <Text style={styles.LabelCartaFrete}>TESTE 01</Text>

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

        <Text style={styles.LabelText}>Hodômetro:</Text>
        <TextInput
          value={hodometro}
          style={styles.input}
          placeholder="Hodômetro"
          autoCorrect={false}
          onChangeText={(text)=> { setHodometro(text)}}
        />

        <Text style={styles.LabelText}>CPF do Motorista:</Text>
        <TextInput
          value={motorista}
          style={styles.input}
          editable = {false}
          placeholder="CPF do Motorista"
          autoCorrect={false}
          onChangeText={(text)=> { setMotorista(text)}}
        />

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

        <Text style={styles.LabelText}>Observações:</Text>
        <TextInput
          value={observacao}
          style={styles.input}
          placeholder="Observações"
          autoCorrect={false}
          onChangeText={(text)=> { setObservacao(text)}}
        />

        <View style={styles.containerBTN}>
          <TouchableOpacity 
              style={styles.btnImagens}
              onPress={ confirma }
          >
            <Text style={styles.submitText}>
                Confirma
            </Text>

          </TouchableOpacity>

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
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Motivos:</Text>
                <Button title={'OK'} onPress={() => setModalVisible(!modalVisible)} />

              </View>
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
  LabelCartaFrete:{
    color: '#FFF',
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
    textAlign: "center"
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

