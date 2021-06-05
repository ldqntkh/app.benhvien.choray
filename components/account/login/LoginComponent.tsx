import * as React from 'react';

import { ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import {
    View, TextInput,
    Text, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
    SetSettingHostname,
    SetSettingHardware,
    SetUserdata
} from '../../../actions/actionFuncs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as LocalAuthentication from 'expo-local-authentication';

import styles from './Login.style';

import {
    LocalStoreHardwareKey, LocalStoreAccountKey, LocalHostnameKey,
    API_ENCODE, API_LOGIN
} from '../../../constants/Variable';

interface MyProps  {
    navigation: any,
    SettingReducer: any,
    SetSettingHostname: any,

    SetSettingHardware: any,
    
    SetUserdata : any
}

interface MyStates  {
    username: string,
    errUserName: string,

    password: string,
    errPassword: string,

    hasHardware: boolean,
    hardwareSupport: Array<Number>,

    fetching: boolean
}

class LoginComponent extends React.Component<MyProps, MyStates> {
    
    constructor(props: MyProps) {
        super(props);
        this.state = {
            username: 'tichhop',
            errUserName: '',

            password: '123456@a',
            errPassword: '',

            hasHardware: false,
            hardwareSupport: [],

            fetching: false
        }
    }

    async componentDidMount() {
        await this._checkStorage();
    }

    _checkStorage = async()=> {
        try {
            // check hostname
            let configHostname : any = await AsyncStorage.getItem(LocalHostnameKey);
            if( !configHostname ) {
                // check từ redux
                if( !this.props.SettingReducer.hostname ) {
                    this._gotoSettingHostname();
                    return false;
                }
            } else {
                // save to redux
                if( !this.props.SettingReducer.hostname ) {
                    configHostname = JSON.parse(configHostname);
                    this.props.SetSettingHostname( {
                        hostname: configHostname.hostname,
                        save_hostname : configHostname.checked
                    } );
                }
            }
            
            let dataStoreHardware: any = await AsyncStorage.getItem(LocalStoreHardwareKey);
            if( dataStoreHardware ) {
                dataStoreHardware = JSON.parse(dataStoreHardware);
                if( dataStoreHardware.hasHardware && dataStoreHardware.hardwareSupport && dataStoreHardware.hardwareSupport.length > 0 ) {
                    this.setState({
                        hasHardware: true,
                        hardwareSupport: dataStoreHardware.hardwareSupport
                    });

                    // save to redux
                    this.props.SetSettingHardware({
                        hasHardware: true,
                        hardwareSupport: dataStoreHardware.hardwareSupport
                    })
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    _gotoSettingHostname = ()=> {
        this.props.navigation.navigate( 'configHostnameNavigation' )
    }

    _handleChangeInput = (value: string, name: string)=> {
        if( this.state.fetching ) return;
        if( name == 'username' ) {
            this.setState({
                username: value
            })
        } else {
            this.setState({
                password: value
            })
        }
    }

    _submitForm = async ()=> {
        if( this.state.fetching ) return;
        let {
            username, password
        } = this.state;

        if( username.trim() == '' ) {
            this.setState({
                errUserName: "Tên đăng nhập không hợp lệ"
            });
            return;
        } else {
            this.setState({
                errUserName: ""
            });
        }

        if( password.trim() == '' ) {
            this.setState({
                errPassword: "Mật khẩu không hợp lệ"
            });
            return;
        } else {
            this.setState({
                errPassword: ""
            });
        }

        try {
            this.setState({
                fetching: true
            });

            let url_encode = this.props.SettingReducer.hostname + API_ENCODE;
            let url_login = this.props.SettingReducer.hostname + API_LOGIN;

            let dataUser = {
                "UserName":username,
                "Password":password,
                "DataSign":"", 
                "DATA":"FPTCR"
            };

            let dataPass = {
                "UserName":username,
                "Password":password,
                "DataSign":"", 
                "DATA":"fptehos"
            };

            let encodeUser = '', encodePass = '';

            let resEncodeUserName = await Axios.post(url_encode, JSON.stringify( dataUser ), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            
            if( resEncodeUserName.data.ErrorCode == '00' ) {
                encodeUser = resEncodeUserName.data.ErrorMessage;
            } else {
                this.setState({
                    errPassword: "Sai thông tin đăng nhập"
                });
                return false;
            }
            // encode pass
            let resEncodeUserPass = await Axios.post(url_encode, JSON.stringify( dataPass ), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            
            if( resEncodeUserPass.data.ErrorCode == '00' ) {
                encodePass = resEncodeUserPass.data.ErrorMessage;
            } else {
                this.setState({
                    errPassword: "Sai thông tin đăng nhập"
                });
                return false;
            }

            // call func đăng nhập
            let resLogin = await Axios.post(url_login, JSON.stringify( {
                "UserName":username,
                "Password":password,
                "DataSign":"", 
                "TenDangNhap":encodeUser,
                "MatKhau":encodePass
            } ), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
           
            if( resLogin.data.ErrorCode != '00' ) {
                this.setState({
                    errPassword: resLogin.data.ErrorMessage
                });
                return false;
            } else {
                // save to redux
                let objUser = {
                    username,
                    password,
                    userid: resLogin.data.USERID,
                    fullname: resLogin.data.TENNHANVIEN,
                    user_idx: resLogin.data.NHANVIEN_IDX
                }
                this.props.SetUserdata(objUser);
                this.props.navigation.navigate( 'phongKhoaNavigation' );
            }
            
        } catch (err) {
            console.log(err.message)
            this.setState({
                errPassword: "Sai thông tin đăng nhập"
            });
        } finally {
            this.setState({
                fetching: false
            });
        }
    }

    _hardwareLogin = async()=> {
        try {
            let {
                hardwareSupport
            } = this.state;
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
            let checkStatus = await LocalAuthentication.isEnrolledAsync();
            if( checkStatus ) {
                let auth = await LocalAuthentication.authenticateAsync({
                    "promptMessage" : `Sử dụng ${label} để đăng nhập`,
                    cancelLabel: "Hủy",
                    fallbackLabel: "Xác thực không thành công",
                    disableDeviceFallback: true
                });
                if( auth.success ) {
                    // lấy thông tin account
                    let account : any = await AsyncStorage.getItem( LocalStoreAccountKey );
                    if( account ) {
                        account = JSON.parse(account);
                        this.setState({
                            username: account.username,
                            password: account.password
                        }, async()=> this._submitForm())
                    } else {
                        Alert.alert('Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập bằng tài khoản của bạn');
                        // xóa toàn bộ keys
                        await AsyncStorage.clear();
                        await this._checkStorage();
                    }
                }
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        let {
            username, errUserName,
            password, errPassword,
            hasHardware,
            fetching
        } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                
                <View style={styles.mainPage}>
                <KeyboardAvoidingView style={styles.mainPage} behavior="padding" enabled>
                    <View style={styles.rectangTop}></View>
                    <View style={styles.rectangBottom}></View>
                    <View style={styles.loginFrom}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tên đăng nhập</Text>
                            <View style={styles.inputBox}>
                                <TextInput autoCapitalize={"none"} style={styles.input} value={username} onChangeText={(value: string) => this._handleChangeInput( value, 'username' )} ></TextInput>
                            </View>
                            {
                                errUserName ? <Text style={styles.error}>{errUserName}</Text> : null
                            }
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <View style={styles.inputBox}>
                                <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={(value: string) => this._handleChangeInput( value, 'password' )}></TextInput>
                            </View>
                            {
                                errPassword ? <Text style={styles.error}>{errPassword}</Text> : null
                            }
                        </View>
                        <View style={styles.btns}>
                            {
                                fetching ? 
                                <View style={styles.btnGroup}>
                                    <ActivityIndicator size={30} color={'#00cdff'} />
                                </View>
                                :
                                <>
                                    <View style={styles.btnGroup}>
                                        <TouchableOpacity style={styles.btnLogin} onPress={this._submitForm}>
                                            <Text style={styles.btnLabel}>Đăng nhập</Text>
                                        </TouchableOpacity>
                                        {
                                            hasHardware &&
                                            <TouchableOpacity style={styles.btnLogin} onPress={this._hardwareLogin}>
                                                <Icon name="fingerprint" size={15}/>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View style={styles.boxSetting}>
                                        <TouchableOpacity style={styles.btnSetting} onPress={this._gotoSettingHostname}>
                                            <Text style={styles.btnLabelSetting}>Cấu hình hosting</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        </View>
                    </View>

                </KeyboardAvoidingView>
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
    SetSettingHostname : (configHostname : any) => dispatch(SetSettingHostname(configHostname)),
    SetSettingHardware : (configHardware : any) => dispatch(SetSettingHardware(configHardware)),
    SetUserdata : (userdata : any) => dispatch(SetUserdata(userdata))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);