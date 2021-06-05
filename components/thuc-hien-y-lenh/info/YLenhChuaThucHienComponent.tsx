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

var TimeOut : any = null;

class YLenhChuaThucHienComponent extends React.Component< MyProps, MyStates > {

    constructor(props : MyProps) {
        super(props);
        this.state = {
            showModalConfirm: false,
            doTimeAt: new Date(),
            sample: '-1',
            notes: '',
            sampleDatas: {
                "mau" : {
                    ten_mau: "Máu",
                    bs_chidinh: "Nguyễn Minh C",
                    timeAt: "10-12-2021 10:20:00",
                    sample: [
                        {
                            ten_mau: "XN.Huyết học",
                            status: false,
                            subs: [
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false },
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false },
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false }
                            ]
                        },
                        {
                            ten_mau: "XN.Sinh hóa",
                            status: false,
                            subs: [
                                { ten_mau: "Định lượng Ure máu", status: false },
                                { ten_mau: "Định lượng Ure máu", status: false },
                                { ten_mau: "Định lượng Ure máu", status: false }
                            ]
                        }
                    ]
                },
                "nuoc_tieu" : {
                    ten_mau: "Nước tiểu",
                    bs_chidinh: "Nguyễn Minh C",
                    timeAt: "10-12-2021 10:20:00",
                    sample: [
                        {
                            ten_mau: "XN.Huyết học",
                            status: false,
                            subs: [
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false },
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false },
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false }
                            ]
                        },
                        {
                            ten_mau: "XN.Sinh hóa",
                            status: false,
                            subs: [
                                { ten_mau: "Định lượng Ure máu", status: false },
                                { ten_mau: "Định lượng Ure máu", status: false },
                                { ten_mau: "Định lượng Ure máu", status: false }
                            ]
                        }
                    ]
                },
                "phan" : {
                    ten_mau: "Phân",
                    bs_chidinh: "Nguyễn Minh C",
                    timeAt: "10-12-2021 10:20:00",
                    sample: [
                        {
                            ten_mau: "XN.Huyết học",
                            status: false,
                            subs: [
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false },
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false },
                                { ten_mau: "Tổng phân tích tế bào máu ngoại vi", status: false }
                            ]
                        },
                        {
                            ten_mau: "XN.Sinh hóa",
                            status: false,
                            subs: [
                                { ten_mau: "Định lượng Ure máu", status: false },
                                { ten_mau: "Định lượng Ure máu", status: false },
                                { ten_mau: "Định lượng Ure máu", status: false }
                            ]
                        }
                    ]
                }
            },
            userData: {
                fullname: "Nguyễn Thị B",
                maBenhNhan: '20802218',
                soNhapVien: '20802218',
                soBHYT: '20802218',
                sex: 'Nữ',
                phone: '0392891227',
                birthdayYear: 1950,
                age: 60,
                personType: 'Viện phí'
            }
        }
    }

    componentDidMount() {
        let that = this;
        TimeOut = setInterval(()=> {
            that.setState({ doTimeAt: new Date() })
        }, 1000);
    }

    componentWillUnmount() {
        if( TimeOut !== null ) clearInterval(TimeOut);
    }

    _renderBenhPham = ()=> {
        let {
            sample, sampleDatas
        } = this.state;
        if( Platform.OS === 'ios' ) {
            let items = [{label: 'Chọn mẫu bệnh phẩm', value: '-1' }];
            if( sampleDatas &&  Object.keys(sampleDatas).length > 0 ) {
                let keys = Object.keys(sampleDatas);
                for( let i = 0; i < keys.length; i++ ) {
                    items.push( {label: sampleDatas[keys[i]].ten_mau, value: keys[i] } )
                }
            }
            
            return (
                <DropDownPicker
                    items={items}
                    defaultValue={sample}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa',width: col2}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        sample: item.value
                    })}
                />
            )
        } else {
            let items = [<Picker.Item key={-1} label="Chọn mẫu bệnh phẩm" value="-1" />];
            if( sampleDatas &&  Object.keys(sampleDatas).length > 0 ) {
                let keys = Object.keys(sampleDatas);
                for( let i = 0; i < keys.length; i++ ) {
                    items.push( <Picker.Item key={keys[i]} label={sampleDatas[keys[i]].ten_mau} value={keys[i]} /> )
                }
            }
            return (
                <Picker
                    style={{ width: col2 }}
                    selectedValue={sample}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                            sample: itemValue
                        })
                    }} >
                    {
                        items
                    }
                </Picker>
            )
        }
    }

    _handleCheckbox = (event: any, key: string)=> {
        let {
            sample,
            sampleDatas
        } = this.state;

        key = key.split('sample_')[1];
        let keys = key.split('_');
        
        if( keys.length > 1 ) {
            let status = sampleDatas[sample].sample[keys[0]].subs[keys[1]].status;
            sampleDatas[sample].sample[keys[0]].subs[keys[1]].status = !status;

            // check all sub is checked 
            let total = sampleDatas[sample].sample[keys[0]].subs.length;
            let totalCheck = 0;
            for( let i = 0; i < total; i++ ) {
                if( sampleDatas[sample].sample[keys[0]].subs[i].status ) totalCheck ++;
            }
            if( totalCheck == total ) {
                sampleDatas[sample].sample[keys[0]].status = true
            } else {
                sampleDatas[sample].sample[keys[0]].status = false
            }
            this.setState({
                sampleDatas
            })
        } else {
            let status = sampleDatas[sample].sample[keys[0]].status;
            sampleDatas[sample].sample[keys[0]].status = !status;
            // set all subs
            for( let i = 0; i < sampleDatas[sample].sample[keys[0]].subs.length; i++ ) {
                sampleDatas[sample].sample[keys[0]].subs[i].status = !status;
            }
            this.setState({
                sampleDatas
            })
        }
        
    }

    _renderMauBenhPham = ()=> {
        let {
            sample,
            sampleDatas
        } = this.state;
        if( sample == '' || sample == -1 ) return null;
        let itemSample = sampleDatas[sample];
        if( !itemSample ) return null;

        return(
            
            <>
                {
                    itemSample.sample.map( (sp : any, index: number) => {
                        return (
                            <View style={ styles.sampleItem } key={index}>
                                <View style={styles.boxSub}></View>
                                <View style={styles.hLine}></View>
                                <View style={styles.bs_chidinh}>
                                    <Text style={styles.bs_chidinh_text}>{itemSample.bs_chidinh}</Text>
                                    <Text style={styles.bs_chidinh_text}>{itemSample.timeAt}</Text>
                                </View>
                                <View >
                                    <CheckBox
                                            disabled={false}
                                            checked={sp.status}
                                            title={sp.ten_mau}
                                            onPress={(event) => this._handleCheckbox( event, `${sample}_sample_${index}` )}
                                            textStyle={{ fontWeight: '400', marginLeft: 0 }}
                                            containerStyle={styles.checkboxPr}
                                        />
                                </View>
                                {
                                    sp.subs.map( (sub: any, indexSub: number) => {
                                        return (
                                            <View style={styles.sub_sample} key={`${index}_${indexSub}`}>
                                                <View style={styles.vLine}></View>
                                                <CheckBox
                                                        disabled={false}
                                                        checked={sub.status}
                                                        title={ sub.ten_mau }
                                                        onPress={(event) => this._handleCheckbox( event, `${sample}_sample_${index}_${indexSub}` )}
                                                        textStyle={{ fontWeight: '400', marginLeft: 0 }}
                                                        containerStyle={styles.checkbox}
                                                    />
                                            </View>
                                        )
                                    } )
                                }
                            </View>
                        )
                    } )
                }
                
            </>
        )
    }

    _handleXacNhanBenhPham = ()=> {
        this.setState({
            showModalConfirm: true
        })
    }

    render() {
        let data = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    <View style={styles.groupInput}>
                        <View style={{...styles.col_2, width: col2}}>
                            <Text>Thời gian thực hiện</Text>
                            <View style={{...styles.inputGroup, width: col2 }}>
                                <Text style={styles.input}>{data.doTimeAt.toLocaleString()}</Text>
                            </View>
                        </View>
                        <View style={{...styles.col_2, width: col2, zIndex: 20}}>
                            <Text>Bệnh phẩm</Text>
                            <View style={{...styles.inputGroup, width: col2, zIndex: 20 }}>
                                { this._renderBenhPham() }
                            </View>
                        </View>
                        <View style={{...styles.col_2, width: col2, zIndex: 10}}>
                            <Text>Ghi chú</Text>
                            <View style={{...styles.inputGroup, width: width-20 }}>
                                <Text style={styles.input}>{data.notes}</Text>
                            </View>
                        </View>
                    </View>
                    {/* render checkbox bệnh phẩm */}
                    <View style={styles.samples}>
                        { this._renderMauBenhPham() }
                    </View>

                    {
                        data.sample.trim() != '-1' &&
                        <View style={styles.btns}>
                            <TouchableOpacity style={{...styles.btn, backgroundColor: 'silver'}}
                                onPress={()=> this.props.navigation.navigate('thucHienYLenhPageNavigation')}
                            >
                                <Text style={styles.btnText}>Thoát</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={this._handleXacNhanBenhPham}>
                                <Text style={styles.btnText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView>
                <Modal isVisible={data.showModalConfirm}>
                    <View style={styles.modalBody}>
                        <View style={styles.modalBodyContent}>
                            <Text style={{...styles.modalText, fontSize: 12}}>Bạn có muốn xác nhận thực hiện y lệnh cho bệnh nhân</Text>
                            <Text style={styles.modalText}>{data.userData.fullname} - Số nhập viện: {data.userData.soNhapVien}</Text>
                        </View>
                        <View style={styles.modalBtns}>
                            <TouchableOpacity style={{...styles.btn, backgroundColor: 'silver'}}
                                onPress={()=> this.setState({
                                    showModalConfirm: false
                                })}
                            >
                                <Text style={styles.btnText}>Thoát</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate('thucHienYLenhPageNavigation')}>
                                <Text style={styles.btnText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default YLenhChuaThucHienComponent;