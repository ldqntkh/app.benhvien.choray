import React from 'react';
import {
    SafeAreaView, View, StyleSheet,
    Text, TouchableOpacity, Button,
    Alert
} from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './BGCD_PageQrcodeComponent.style';

interface MyProps {
    navigation: any
}

interface MyStates {
    hasCameraPermission: boolean,
    scanned: boolean,
    barcodes: String
}

class THYL_PageQrCodeComponent extends React.Component< MyProps, MyStates > {

    constructor( props : MyProps ) {
        super(props);
        this.state = {
            hasCameraPermission: false,
            scanned: false,
            barcodes: ''
        }
    }

    async componentDidMount() {
        await this._cameraRollPermissionModal();
    }

    _cameraRollPermissionModal = async ()=>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status !== 'granted') {
            return new Promise((resolve)=>{
                Alert.alert(
                `Xin vui lòng cho phép sử dụng camera`,
                `Chúng tôi cần quyền truy cập camera để quét mã Barcode bệnh án.`,
                [
                  {
                    text: 'Ok',
                    onPress: async () =>{
                        console.log(resolve)
                        await this._requestCameraPermission()
                    },
                  },
                ],
                { cancelable: false }
              );
            })
        } else {
            this.setState({
                hasCameraPermission: status === 'granted',
            });
        }
        
    }

    _requestCameraPermission = async () => {
        // const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Ứng dụng cần quyền truy cập máy ảnh để quét Barcode bệnh án. Vui lòng cho phép sử dụng tính năng này');
        }
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = async (result: any) => {
        if(this.state.scanned) return;
        let barcodes = result.data;
        this.setState({
            scanned: true,
            barcodes: barcodes
        })
        return new Promise((resolve)=>{
            Alert.alert(
            `Số sổ bệnh án: ${barcodes}`,
            `Xem chi tiết thông tin bệnh nhân?`,
            [
              {
                text: 'Xác nhận',
                onPress: () =>{
                    this.props.navigation.navigate('chidinhDetailPageNavigation', {soNhapVien: barcodes});
                    this.setState({
                        scanned: false,
                        barcodes: ''
                    })
                },
              },
              {
                text: 'Quét lại?',
                onPress: () =>{
                    this.setState({
                        scanned: false,
                        barcodes: ''
                    })
                },
              },
            ],
            { cancelable: false }
          );
        })
        
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.barcodeControl}>
                    <BarCodeScanner
                            onBarCodeScanned={this._handleBarCodeRead}
                            // onBarCodeRead={this._handleBarCodeRead}
                            style={styles.rectBarcode} />
                    <View style={styles.realBarcode}>
                        <View style={styles.realBarcode_1}></View>
                        <View style={styles.realBarcode_2}></View>
                        <View style={styles.realBarcode_3}></View>
                        <View style={styles.realBarcode_4}></View>
                        <View style={styles.realBarcode_5}></View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default THYL_PageQrCodeComponent;