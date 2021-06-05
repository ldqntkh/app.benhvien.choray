import React from 'react';
import {
    SafeAreaView, View, ScrollView,
    Text, TouchableOpacity, Button, Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import styles from './ThucHienYLenh.style';

interface MyProps {
    navigation: any
}

interface MyStates {
    soNhapVien: string
}

class THYL_PageInputCodeComponent extends React.Component< MyProps, MyStates > {

    constructor( props: MyProps ) {
        super(props);
        this.state = {
            soNhapVien: ''
        }
    }

    _handleChange = (value : string)=> {
        this.setState({
            soNhapVien: value
        })
    }

    _searchSoNhapVien = ()=> {
        let {
            soNhapVien
        } = this.state;
        if( soNhapVien.trim() == '' ) {
            Alert.alert('Vui lòng nhập số bệnh án');
            return false;
        } 
        this.props.navigation.navigate('ylenhDetailPageNavigation', { soNhapVien })
    }
    
    render() {
        let {
            soNhapVien
        } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.contentInput}>
                    <View style={styles.inputGroup} >
                        <Text>Vui lòng nhập số bệnh án</Text>
                        <View style={styles.borderInput}>
                            <TextInput style={styles.input} value={soNhapVien} onChangeText={this._handleChange} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={this._searchSoNhapVien}>
                        <Text style={styles.btnLabel}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default THYL_PageInputCodeComponent;