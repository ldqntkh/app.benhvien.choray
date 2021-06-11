import React from 'react';
import {
    SafeAreaView, ScrollView, View, Text, Dimensions
} from 'react-native';

import styles from './Info-1.style';

let {
    width
} = Dimensions.get('window');
let col2 = (width/2 - 20);
if( col2 < 180 ) {
    col2 = width - 20;
}

interface MyProps {
    navigation: any,
    ketQuaCls: Array<Object>
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
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    {
                        this._renderListCls()
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }

    _renderListCls = ()=> {
        let ketQuaCls = this.props.ketQuaCls;
        if( ketQuaCls.length == 0 ) return null;

        // gom nhóm dịch vụ
        let objectRs : any = {};
        for(let i = 0; i < ketQuaCls.length; i++) {
            let cls : any = ketQuaCls[i];
            if( objectRs[ cls.MANHOMDICHVU ] ) {
                let datas = objectRs[ cls.MANHOMDICHVU ];
                datas.items.push( cls );
            } else {
                objectRs[ cls.MANHOMDICHVU ] = {
                    "TENNHOMDICHVU" : cls.TENNHOMDICHVU
                };
                objectRs[ cls.MANHOMDICHVU ]['items'] = [];
                objectRs[ cls.MANHOMDICHVU ]['items'].push(cls);
            }
        }
        
        let rs = [];
        let keys = Object.keys(objectRs);
        for( let i = 0; i < keys.length; i++ ) {
            let cls = objectRs[keys[i]];
            rs.push(
                <View style={styles.clsItem} key={keys[i]}>
                    <View style={styles.headerItem}>
                        <Text style={{fontWeight: 'bold'}}>Nhóm: {cls.TENNHOMDICHVU}</Text>
                    </View>
                    {
                        cls.items && cls.items.map( (item : any, index: number) => {
                            let styleItem : Object = styles.lineItemStatus;
                            if( index == cls.items.length -1 ) styleItem = styles.lineItemStatusNonBorder;
                            return(
                                <View style={styles.lineItem} key={index}>
                                    <Text numberOfLines={2}>
                                        {`${index+1}. ${item.DICHVU_IDX} - ${item.TENDICHVU}`}
                                    </Text>
                                    <View style={styleItem}>
                                        <Text style={{ color: 'blue' }}>{item.TRANGTHAIKETQUA}</Text>
                                        <View style={styles.borderLabel}>
                                            <Text style={{ color: 'blue' }}>{item.PHONGBANTHUCHIEN}</Text>
                                        </View>
                                        <Text numberOfLines={1} style={{ color: 'blue', width: 160, overflow: 'hidden' }}>{item.NGAYTHUCHIEN}</Text>
                                    </View>
                                </View>
                            )
                        } )
                    }
                </View>
            )
        }
        return rs;
    }
}

export default KetQuaClsComponent;