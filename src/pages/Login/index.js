import React, {useState, useEffect} from 'react';
import {  View,           KeyboardAvoidingView, 
          TextInput,      TouchableOpacity, 
          Text,           StyleSheet, 
          Animated,       Keyboard,
          Alert,          Dimensions, 
           } from 'react-native';

import { getData, setData } from '../../utils/dataStorage'; 
import dados_API            from '../../models/dados_API'
import GetCredencias        from '../../interface/GetCredencias'
import login_inicial        from '../../models/login_inicial'
       
const deviceWidth = Dimensions.get('window').width
const reducao     = 140

export default function Login( props ) {
  let { navigation } = props

  const [offset]  = useState(new Animated.ValueXY({x: 0,y: 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo]    = useState(new Animated.ValueXY({x: deviceWidth-reducao, y: deviceWidth-reducao})); // 180

  const [codigoEmpresa , setCodigoEmpresa]  = useState('');
  const [userName      , setUsername]       = useState('');
  const [userPassword  , setUserpassword]   = useState('');
  const [labelRotina   , setLabelRotina]    = useState('Controle de Pátio');
  const [rotina        , setRotina]         = useState(0);

  let vdados_API     = dados_API()
  let vlogin_inicial = login_inicial()

  useEffect(()=> {
    getData('@login_inicial').then(ret=>{
        if(ret.success) {
          
          vlogin_inicial.empresa       = ret.data.empresa
          vlogin_inicial.usuario       = ret.data.usuario
          vlogin_inicial.rotina        = ret.data.rotina
          vlogin_inicial.token         = ret.data.token
          vlogin_inicial.CdFuncionario = ret.data.CdFuncionario
          vlogin_inicial.createIn      = ret.data.createIn
          vlogin_inicial.expiresIn     = ret.data.expiresIn
          setCodigoEmpresa(`${vlogin_inicial.empresa}`)
          setUsername(vlogin_inicial.usuario)
          setRotina(vlogin_inicial.rotina)
      
        } else {
          setCodigoEmpresa(`${vlogin_inicial.empresa}`)
          setUsername(vlogin_inicial.usuario)
          setRotina(vlogin_inicial.rotina)      
        }
    })
  },[])

  const swapRotina = () => {
    let swap  = rotina == 0 ? 1 : 0
    let label = swap == 0   ? 'Controle de Pátio' : 'Abastecimento'

    setRotina(swap) 
    setLabelRotina(label)

    // console.log(rotina,labelRotina,swap,label)
  }

    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow',keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide',keyboardDidHide);
 
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        useNativeDriver: false,
        bounciness: 20, // efeito estiling
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      })  
    ]).start();

    function keyboardDidShow(){
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: (deviceWidth-reducao)/2,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(logo.y, {
          toValue: (deviceWidth-reducao)/2,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }

    function keyboardDidHide(){
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: deviceWidth-reducao,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(logo.y, {
          toValue: deviceWidth-reducao,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    }

  const userLogin = () => {
    
    vlogin_inicial.rotina  = rotina || 0
    vlogin_inicial.empresa = codigoEmpresa
    vlogin_inicial.usuario = userName

    if(rotina==0) {
      GetCredencias(vdados_API,codigoEmpresa,userName,userPassword).then((ret)=>{
        if(ret.success) {

            vlogin_inicial.token     = ret.token.Bearer
            vlogin_inicial.createIn  = ret.token.createIn
            vlogin_inicial.expiresIn = ret.token.expiresIn

            let par_nav = {
              vdados_API: vdados_API,
              vlogin_inicial: vlogin_inicial
            }
            
            setData('@login_inicial',vlogin_inicial).then(ret=>{
              if(ret.success){
                navigation.navigate('LerQRcode',par_nav)
              } else {
                Alert.alert(`Erro interno (setData @login_inicial) !!!`);
              }
            })

          } else {
            Alert.alert(`MSG: ${ret.message}`);
        }
  
      }).catch((err)=>{
        console.log('GetCredencias ERR',err)
        Alert.alert(`ERR: ${err.message}`);
      })

    } else {
      Alert.alert(`Rotina ABASTECIMENTO ainda não implementado !!!`);
    }  

  }  

  // VISUAL REACT
  return (
    <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
            borderRadius: 15,
            marginBottom: 5,
          }} 
          source={require('../../../assets/logo.png')}
          />
        </View>

        <Text 
          style={styles.LabelTitulo}
          onPress={swapRotina}
        >
          {labelRotina}
        </Text>

        <Animated.View 
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [
              {translateY: offset.y }
            ]
          }
        ]}>

        <TextInput
        value={codigoEmpresa}
        autoCapitalize="none"
        style={styles.input}
        placeholder="Código Empresa"
        autoCorrect={false}
        onChangeText={(text)=> setCodigoEmpresa(text)}
        />

        <TextInput
        value={userName}
        autoCapitalize="none"
        style={styles.input}
        placeholder="Usuário Sistema Sênior"
        autoCorrect={false}
        onChangeText={(text)=> setUsername(text)}
        />

        <TextInput
        value={userPassword}
        autoCapitalize="none"
        secureTextEntry={true}
        password={true}
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={(text)=> setUserpassword(text)}
        />

        <TouchableOpacity 
          style={styles.btnSubmit}
          onPress={ userLogin }
        >
          <Text style={styles.submitText}>
              Acessar
          </Text>

        </TouchableOpacity>

      </Animated.View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo:{
    flex:1,
    justifyContent: 'center',
    paddingTop: 25,
  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 20,
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom:5,
    color:'#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 7,
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
  },
  LabelTitulo:{
    color: '#FFF',
    textAlign: "center",
    marginBottom: 15,
    marginTop: -25,
    fontWeight: 'bold',
    fontSize: 18
  },
});
