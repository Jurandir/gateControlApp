import React, {useState, useEffect} from 'react';
import {  View,           KeyboardAvoidingView, 
          TextInput,      TouchableOpacity, 
          Text,           StyleSheet, 
          Animated,       Keyboard,
          Alert,          Dimensions, Modal
           } from 'react-native';

import dados_API from '../../models/dados_API'           

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
  let vdados_API
  let vlogin_inicial

  useEffect(()=> {

    vlogin_inicial = {
      rotina         : 0,
      empresa        : 20,
      usuario        : 'SUPERVISOR',
      CdFuncionario  : 5529,
      token          : '',
      createIn       : '',
      expiresIn      : '',
    }
    vdados_API = dados_API()
  })

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
    
    vlogin_inicial.rotina  = rotina
    vlogin_inicial.empresa = codigoEmpresa
    vlogin_inicial.usuario = userName

    if(rotina==0) {
      let par_nav = {
        vdados_API: vdados_API,
        vlogin_inicial: vlogin_inicial
      }
      navigation.navigate('LerQRcode',par_nav)  
    } else {
      alert(`Rotina ABASTECIMENTO ainda não implementado !!!`);
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
