import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// See https://github.com/awesomejerry/react-native-qrcode-svg
import SvgQRCode from 'react-native-qrcode-svg';

// See https://github.com/eddyoc/react-native-custom-qr-codes-expo
import { QRCode as CustomQRCode } from 'react-native-custom-qr-codes-expo';

const logoFromFile = require('./assets/logo.png');


// Simple usage, defaults for all but the value
function Simple() {
  return <SvgQRCode size={150} logo={logoFromFile} value="{valor:'',tipo:'',data:''}" />;
}

// 20% (default) sized logo from local file string with white logo backdrop
function LogoFromFile() {

  return <SvgQRCode value="Just some string value" logo={logoFromFile} />;
}

export default function App() {
  return (
    <View style={styles.container}>
 
      <CustomQRCode 
      logo={logoFromFile}
      codeStyle="circle" 
      content="QR code with circles" />

      {/* Web preview on Snack seems to inherit the codeStyle from previous call
          and the linearGradient colours don't change. The gradient doesn't work
          at all on Android */}

      <CustomQRCode
        size={180}
        linearGradient={['red','green']}
        content="QR code with gradient"
      />
      
      <Simple/>

      <LogoFromFile/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});
