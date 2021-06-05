import React from 'react';
import {
    SafeAreaView, ScrollView, View, Text, Dimensions, Platform, TouchableOpacity
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from 'react-native-elements';

import styles from './Info-1.style';

import Modal from 'react-native-modal';
let {
    width
} = Dimensions.get('window');
let col2 = (width/2 - 20);
if( col2 < 180 ) {
    col2 = width - 20;
}

interface MyProps {
    navigation: any
}

interface MyStates {
    doTimeAt: Date,
    sample: any,
    notes: string,
    sampleDatas: any,
    showModalConfirm: boolean,
    userData: {
        fullname: string,
        maBenhNhan: string,
        soNhapVien: string,
        soBHYT: string,
        sex: string,
        phone: string,
        birthdayYear: number,
        age: number,
        personType: string
    }
}

class KetQuaClsComponent extends React.Component< MyProps, MyStates > {

    constructor(props : MyProps) {
        super(props);
    }

    componentDidMount() {
        
    }

    

    render() {
        let data = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollview}>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default KetQuaClsComponent;