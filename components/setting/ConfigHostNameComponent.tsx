import * as React from 'react';

import {
    View, Text, TextInput,
    TouchableOpacity
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import { connect } from 'react-redux';
import {
    SetSettingHostname
} from '../../actions/actionFuncs';

import styles from './ConfigHostName.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LocalHostnameKey
} from '../../constants/Variable';

interface MyProps  {
    navigation: any,
    SetSettingHostname: any
}

interface MyStates  {
    save_hostname: boolean,
    hostname: string
}

class ConfigHostNameComponent extends React.Component<MyProps, MyStates> {
    // static navigationOptions = {
    //     title: 'Danh sách quà tặng'
    // };
    constructor(props: MyProps) {
        super(props);
        this.state = {
            save_hostname: false,
            hostname: ''
        }
    }

    async componentDidMount() {
        try {
            let config : any = await AsyncStorage.getItem(LocalHostnameKey);
            if( config ) {
                config = JSON.parse(config);
                
                this.setState(config);
                this.props.SetSettingHostname( {
                    hostname: config.hostname,
                    save_hostname : config.checked
                } );
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    _onChangeCheckbox = ()=> {
        this.setState({
            save_hostname: !this.state.save_hostname
        })
    }

    _saveSetting = async ()=> {
        try {
            await AsyncStorage.setItem( LocalHostnameKey, JSON.stringify(this.state) );
            this.props.SetSettingHostname( {
                hostname: this.state.hostname,
                save_hostname : this.state.save_hostname
            } );
            this.props.navigation.navigate( 'loginNavigation' );
        } catch (err) {
            console.log(err.message);
        }
    }

    _setHostName = (value : string)=> {
        this.setState({
            hostname: value.trim()
        })
    }

    render() {
        let {
            save_hostname,
            hostname
        } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Cấu hình hosting</Text>
                        <View style={styles.inputBox}>
                            <TextInput style={styles.input} onChangeText={this._setHostName} value={hostname}></TextInput>
                        </View>
                    </View>
                    <CheckBox
                        disabled={false}
                        checked={save_hostname}
                        title='Ghi nhớ cho lần sau'
                        onPress={this._onChangeCheckbox}
                        containerStyle={styles.checkbox}
                    />
                    
                    <View style={styles.btns}>
                        <TouchableOpacity style={styles.btnSave} onPress={this._saveSetting}>
                            <Text style={styles.btnLabel}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state : any) => ({
    SettingReducer : state.SettingReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    SetSettingHostname : (configHostname : any) => dispatch(SetSettingHostname(configHostname))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigHostNameComponent);