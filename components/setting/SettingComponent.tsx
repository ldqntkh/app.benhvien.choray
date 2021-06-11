import React from 'react';
import {
    SafeAreaView, View, ScrollView,
    Text, TouchableOpacity,
    Alert, Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import {
    SetSettingHostname
} from '../../actions/actionFuncs';
import {
    LocalHostnameKey, LocalStoreAccountKey, LocalStoreHardwareKey
} from '../../constants/Variable';

import * as LocalAuthentication from 'expo-local-authentication';

import styles from './Setting.style';
import { TextInput } from 'react-native-gesture-handler';

interface MyProps {
    navigation: any,
    SettingReducer : any,
    UserReducer : any,
    SetSettingHostname: any
}

interface MyStates {
    userData: {
        username: string,
        fullname: string,
        sex: string,
        phone: string,
        birthday: string,
        email: string,
        // khoa: string
    },
    hasHardware: boolean,
    useHardware: boolean,
    hardwareSupport: Array<Number>,
    hostname: string
}

class SettingComponent extends React.Component< MyProps, MyStates > {

    constructor(props: MyProps) {
        super(props);
        this.state = {
            userData: {
                username: '',
                fullname: '',
                sex: 'Nam',
                phone: '0123456789',
                birthday: '30/01/2021',
                email: 'sontm@mail.com',
                // khoa: 'Nội tổng hợp'
            },
            hasHardware: false,
            useHardware: false,
            hardwareSupport: [],
            hostname: ''
        }
    }

    async componentDidMount() {
        // lấy thông tin hardware từ store trước
        try {
            let dataStoreHardware: any = await AsyncStorage.getItem(LocalStoreHardwareKey);
            if( !dataStoreHardware ) {
                let item: any = {};
                let status = await LocalAuthentication.hasHardwareAsync();
                item.hasHardware = status;
                if( status ) {
                    let responseHardware = await LocalAuthentication.supportedAuthenticationTypesAsync();
                    if( responseHardware && responseHardware.length > 0 ) {
                        this.setState({
                            hardwareSupport: responseHardware
                        })
                        item.hardwareSupport = responseHardware;
                    }
                }
                this.setState({
                    hasHardware: status
                });
                if( item.hasHardware && item.hardwareSupport && item.hardwareSupport.length > 0 ) {
                    await AsyncStorage.setItem( LocalStoreHardwareKey, JSON.stringify(item) );
                }
            } else {
                dataStoreHardware = JSON.parse(dataStoreHardware);
                

                this.setState({
                    hasHardware: dataStoreHardware.hasHardware,
                    hardwareSupport: dataStoreHardware.hardwareSupport,
                    useHardware: dataStoreHardware.useHardware
                })
            }
            
        } catch (err) {
            console.log(err.message);
        }

        // set user data
        let UserReducer = this.props.UserReducer;
        let userData = {
            username: UserReducer.username,
            fullname: UserReducer.fullname,
            sex: UserReducer.sex,
            phone: UserReducer.dienthoai,
            birthday: UserReducer.ngaysinh,
            email: UserReducer.email,
            // khoa: 'Nội tổng hợp'
        }
        
        this.setState({
            userData,
            hostname: this.props.SettingReducer.hostname
        });
    }

    _checkPermission = async()=> {
        try {
            let {
                hasHardware, hardwareSupport
            } = this.state;
            
            if( hasHardware ) {
                return new Promise((resolve)=>{
                    let label = '';
                    if( hardwareSupport.includes(1) ) {
                        label = 'vân tay';
                    }
                    if( hardwareSupport.includes(2) ) {
                        if( label == '')
                            label = 'FaceID';
                        else label += ' ,FaceID';
                    }
                    if( hardwareSupport.includes(3) ) {
                        if( label == '')
                            label = 'mống mắt';
                        else label += ' ,mống mắt';
                    }
                    Alert.alert(
                        `Xin vui lòng cho phép sử dụng ${label}`,
                        `Chúng tôi cần quyền truy cập ${label} thực hiện đăng nhập trên ứng dụng.`,
                        [
                            {
                                text: 'Ok',
                                onPress: async () =>{
                                    if( hardwareSupport.length > 0 ) {
                                        let checkStatus = await LocalAuthentication.isEnrolledAsync();
                                        if( checkStatus ) {
                                            let auth = await LocalAuthentication.authenticateAsync({
                                                "promptMessage" : `Sử dụng ${label} để đăng nhập`,
                                                cancelLabel: "Hủy",
                                                fallbackLabel: "Xác thực không thành công",
                                                disableDeviceFallback: true
                                            });
                                            if( auth.success ) {
                                                // show popup bắt nhập lại mật khẩu
                                                // ok thì ghi vào localstorage
                                                this.setState({
                                                    useHardware: true
                                                });
                                                let dataStoreHardware: any = await AsyncStorage.getItem(LocalStoreHardwareKey);
                                                if( !dataStoreHardware ) dataStoreHardware = {};
                                                else dataStoreHardware = JSON.parse(dataStoreHardware);
                                                
                                                dataStoreHardware.useHardware = true;
                                                if( dataStoreHardware.hasHardware && dataStoreHardware.hardwareSupport && dataStoreHardware.hardwareSupport.length > 0 ) {
                                                    
                                                    await AsyncStorage.setItem( LocalStoreHardwareKey, JSON.stringify(dataStoreHardware) );
                                                    // lưu lại tài khoản và mật khẩu
                                                    let account : any = {
                                                        username: this.props.UserReducer.username,
                                                        password: this.props.UserReducer.password
                                                    }
                                                    await AsyncStorage.setItem( LocalStoreAccountKey, JSON.stringify(account) );
                                                }
                                            }
                                        } else {
                                            Alert.alert("Bạn chưa cấu hình xác thực trên thiết bị này!")
                                        }
                                    }
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    } 

    _toggleSwitch = async (value: any)=> {
        if( value ) {
            await this._checkPermission()
        } else {
            // clear storage
            try {
                await AsyncStorage.clear();
                this.setState({
                    useHardware: false
                })
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    _saveConfig = async()=> {
        try {
            let data = {
                hostname: this.state.hostname,
                save_hostname : this.props.SettingReducer.save_hostname
            }
            await AsyncStorage.setItem( LocalHostnameKey, JSON.stringify(data) );
            this.props.SetSettingHostname( data );
            Alert.alert("Thông báo", "Đã lưu cấu hình");
        } catch (err) {
            console.log(err.message);
            Alert.alert("Thông báo", err.message);
        }
    }

    _setHostName = (value : string)=> {
        this.setState({
            hostname: value.trim()
        })
    }

    render() {
        let {
            userData,
            hasHardware,
            useHardware,
            hostname
        } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Icon name="user" size={50} color={'green'} />
                    </View>
                    <ScrollView style={styles.scrollview}>
                        <View style={styles.lineItem}>
                            <Text>Tên đăng nhập</Text>
                            <Text style={{color: 'green'}}>{userData.username}</Text>
                        </View>
                        <View style={{...styles.lineItem, marginBottom:5}}>
                            <Text>Họ và tên</Text>
                            <Text style={{color: 'green'}}>{userData.fullname}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Giới tính</Text>
                            <Text>{userData.sex}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Số điện thoại</Text>
                            <Text>{userData.phone}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Ngày sinh</Text>
                            <Text>{userData.birthday}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Email</Text>
                            <Text>{userData.email}</Text>
                        </View>
                        {/* <View style={styles.lineItem}>
                            <Text>Khoa làm việc</Text>
                            <Text>{userData.khoa}</Text>
                        </View> */}

                        {/* đăng nhập vân tay */}
                        {
                            
                            <View style={styles.hardware}>
                                {
                                    hasHardware &&
                                    <View style={styles.lineItem}>
                                        <Text>Sử dụng xác thực để đăng nhập</Text>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#b5f7bf" }}
                                            thumbColor={useHardware ? "#4dd162" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={this._toggleSwitch}
                                            value={useHardware}
                                        />
                                    </View>
                                }
                                <View style={{...styles.lineItem, flexWrap: 'wrap', height: 80, paddingTop: 10}}>
                                    <Text>Hostname</Text>
                                    <View style={styles.inputGroup}>
                                        <TextInput style={styles.input} value={hostname} onChangeText={this._setHostName} />
                                    </View>
                                </View>
                            </View>
                        }
                        <View style={styles.btns}>
                            <TouchableOpacity style={styles.btn} onPress={this._saveConfig}>
                                <Text style={styles.btnText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state : any) => ({
    SettingReducer : state.SettingReducer,
    UserReducer : state.UserReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    SetSettingHostname : (configHostname : any) => dispatch(SetSettingHostname(configHostname))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingComponent);