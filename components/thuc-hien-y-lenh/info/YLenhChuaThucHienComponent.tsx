import React from 'react';
import {
    SafeAreaView, ScrollView, View, Text, Dimensions, Platform, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from 'react-native-elements';
import {
    API_THUCHIENYLENH,
    API_DANHSACH_BENHPHAM
} from '../../../constants/Variable';
import styles from './Info-1.style';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Axios from 'axios';

let {
    width
} = Dimensions.get('window');
let col2 = (width/2 - 20);
if( col2 < 180 ) {
    col2 = width - 20;
}

interface MyProps {
    navigation: any,
    yLenhs: Array<Object>,
    userData: any,
    UserReducer: any,
    SettingReducer: any,
    _getThongtinYLenh: any,
    soNhapVien: any
}

interface MyStates {
    doTimeAt: Date,
    sample_all: any,
    sample: any,
    notes: string,
    sampleDatas: any,
    showModalConfirm: boolean,
    fetching: boolean,
    YeuCau_Ids: Array<any>,
    BenhPhams: Array<any>
    // userData: {
    //     fullname: string,
    //     maBenhNhan: string,
    //     soNhapVien: string,
    //     soBHYT: string,
    //     sex: string,
    //     phone: string,
    //     birthdayYear: number,
    //     age: number,
    //     personType: string
    // }
}

var TimeOut : any = null;

class YLenhChuaThucHienComponent extends React.Component< MyProps, MyStates > {

    constructor(props : MyProps) {
        super(props);
        this.state = {
            showModalConfirm: false,
            doTimeAt: new Date(),
            sample_all: '0',
            sample: -1,
            notes: '',
            fetching: false,
            sampleDatas: [],
            YeuCau_Ids: [],
            BenhPhams: []
        }
    }

    async componentDidMount() {
        let that = this;
        TimeOut = setInterval(()=> {
            that.setState({ doTimeAt: new Date() })
        }, 1000);

        // lấy danh sach mẫu bênh phẩm
        await this._getBenhPham();
        // lọc mẫu bênh phẩm
        this._filterDataBenhPham();
    }

    componentWillUnmount() {
        if( TimeOut !== null ) clearInterval(TimeOut);
    }

    _getBenhPham = async()=> {
        let url_encode = this.props.SettingReducer.hostname + API_DANHSACH_BENHPHAM;
        try {
            let dataPost = {
                "UserName":"tichhop",
                "Password":"123456@a",
                "DataSign":"", 
                "DataGroup":"DM_MAUBENHPHAM"
            }; 
            let res = await Axios.post(url_encode, JSON.stringify( dataPost ), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            
            if( res.data && res.data.Data && res.data.Data.length > 0 ) {
                this.setState({
                    BenhPhams: res.data.Data
                });
            } else {
                Alert.alert("Thông báo", "Không tồn tại thôn tin bệnh phẩm", 
                [
                    {
                    text: 'Ok',
                    onPress: async () =>{
                        return null
                    },
                    },
                ]);
            }
            
        } catch(err) {
            Alert.alert("Thông báo", "Không tồn tại thôn tin bệnh phẩm", 
            [
                {
                text: 'Ok',
                onPress: async () =>{
                    return null
                },
                },
            ]);
            console.log(err.message);
        } finally {
            this.setState({
                fetching: false
            });
        }
    }

    _filterDataBenhPham = ()=> {
        let {
            yLenhs
        } = this.props;
        let {
            sample_all
        } = this.state;
        
        let rs : any = {};
        for( let i = 0; i < yLenhs.length; i++ ) {
            let item : any = yLenhs[i];
            
            if( !rs[sample_all] ) {
                rs[sample_all] = {};
                
                let benhpham : any = rs[sample_all];
                benhpham.BENHPHAM_IDX = sample_all;
                benhpham.ten_mau = item.TENBENHPHAM;
                rs[sample_all] = benhpham;
            }

            let benhpham : any = rs[sample_all];
            if( benhpham.sample && benhpham.sample.length > 0 ) {
                let added = false;
                for( let i = 0; i < benhpham.sample.length; i++ ) {
                    if( benhpham.sample[i].id_mau == item.MANHOMDICHVU ) {
                        benhpham.sample[i].subs.push({ 
                            DICHVU_IDX: item.DICHVU_IDX, 
                            YEUCAU_IDX: item.YEUCAU_IDX, 
                            id_mau: item.MADICHVU, 
                            ten_mau: item.TENDICHVU, 
                            status: false 
                        });
                        added = true;
                        break;
                    }
                }
                if( !added ) {
                    let benhPhamItem : any = {};
                
                    benhPhamItem.id_mau = item.MANHOMDICHVU;
                    benhPhamItem.ten_mau = item.TENNHOMDICHVU;
                    benhPhamItem.status = false;
                    benhPhamItem.subs = [];
                    benhPhamItem.subs.push({ 
                        DICHVU_IDX: item.DICHVU_IDX, 
                        YEUCAU_IDX: item.YEUCAU_IDX, 
                        id_mau: item.MADICHVU, 
                        ten_mau: item.TENDICHVU, 
                        status: false 
                    });
                    benhpham.sample.push(benhPhamItem);
                }
            } else {
                benhpham.sample = [];
                
                let benhPhamItem : any = {};
                
                benhPhamItem.id_mau = item.MANHOMDICHVU;
                benhPhamItem.ten_mau = item.TENNHOMDICHVU;
                benhPhamItem.status = false;
                benhPhamItem.subs = [];
                benhPhamItem.subs.push({ 
                    DICHVU_IDX: item.DICHVU_IDX, 
                    YEUCAU_IDX: item.YEUCAU_IDX, 
                    id_mau: item.MADICHVU, 
                    ten_mau: item.TENDICHVU, 
                    status: false 
                });
                benhpham.sample.push(benhPhamItem);
            }
            rs[sample_all] = benhpham;
        }
        
        this.setState({
            sampleDatas: rs
        })
    }

    _renderBenhPham = ()=> {
        let {
            BenhPhams, sample
        } = this.state;

        
        if( Platform.OS === 'ios' ) {
            let items = [{label: 'Chọn mẫu bệnh phẩm', value: -1 }];
            for( let i = 0; i < BenhPhams.length; i++ ) {
                if( !BenhPhams[i].ENABLED ) continue;
                items.push( {label: BenhPhams[i].FIELDNAME, value: BenhPhams[i].FIELDCODE } )
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
            let items = [<Picker.Item key={-1} label="Chọn mẫu bệnh phẩm" value={-1} />];
            for( let i = 0; i < BenhPhams.length; i++ ) {
                if( !BenhPhams[i].ENABLED ) continue;
                items.push( <Picker.Item key={BenhPhams[i].FIELDCODE} label={BenhPhams[i].FIELDNAME} value={BenhPhams[i].FIELDCODE} /> )
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
            sample_all,
            sampleDatas,
            YeuCau_Ids
        } = this.state;

        key = key.split('sample_')[1];
        let keys = key.split('_');
        
        if( keys.length > 1 ) {
            let status = sampleDatas[sample_all].sample[keys[0]].subs[keys[1]].status;
            sampleDatas[sample_all].sample[keys[0]].subs[keys[1]].status = !status;

            // check all sub is checked 
            let total = sampleDatas[sample_all].sample[keys[0]].subs.length;
            let totalCheck = 0;
            for( let i = 0; i < total; i++ ) {
                if( sampleDatas[sample_all].sample[keys[0]].subs[i].status ) {
                    totalCheck ++;
                    if( YeuCau_Ids.indexOf(sampleDatas[sample_all].sample[keys[0]].subs[i].YEUCAU_IDX) < 0) {
                        YeuCau_Ids.push( sampleDatas[sample_all].sample[keys[0]].subs[i].YEUCAU_IDX );
                    }
                } else {
                    let index = YeuCau_Ids.indexOf( sampleDatas[sample_all].sample[keys[0]].subs[i].YEUCAU_IDX );
                    if(index > -1)
                        YeuCau_Ids.splice(index, 1);
                }
            }
            if( totalCheck == total ) {
                sampleDatas[sample_all].sample[keys[0]].status = true
            } else {
                sampleDatas[sample_all].sample[keys[0]].status = false
            }
            this.setState({
                sampleDatas,
                YeuCau_Ids
            })
        } else {
            let status = sampleDatas[sample_all].sample[keys[0]].status;
            sampleDatas[sample_all].sample[keys[0]].status = !status;
            // set all subs
            for( let i = 0; i < sampleDatas[sample_all].sample[keys[0]].subs.length; i++ ) {
                sampleDatas[sample_all].sample[keys[0]].subs[i].status = !status;
                if( status ) {
                    let index = YeuCau_Ids.indexOf( sampleDatas[sample_all].sample[keys[0]].subs[i].YEUCAU_IDX );
                    if(index > -1)
                        YeuCau_Ids.splice(index, 1);
                } else {
                    if( YeuCau_Ids.indexOf(sampleDatas[sample_all].sample[keys[0]].subs[i].YEUCAU_IDX) < 0) {
                        YeuCau_Ids.push( sampleDatas[sample_all].sample[keys[0]].subs[i].YEUCAU_IDX );
                    }
                }
            }
            this.setState({
                sampleDatas,
                YeuCau_Ids
            })
        }
        
    }

    _renderMauBenhPham = ()=> {
        let {
            sample_all,
            sampleDatas
        } = this.state;
        if( sampleDatas.length == 0 ) return null;
        // if( sample == '' || sample == -1 ) return null;
        let itemSample = sampleDatas[sample_all];
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
                                            onPress={(event) => this._handleCheckbox( event, `${sample_all}_sample_${index}` )}
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
                                                        onPress={(event) => this._handleCheckbox( event, `${sample_all}_sample_${index}_${indexSub}` )}
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

    _submitThucHienYLenh = async()=> {
        let {
            YeuCau_Ids,
            sample,
            fetching
        } = this.state;
        
        if( YeuCau_Ids.length == 0 || fetching) return;


        this.setState({
            fetching: true
        });
        
        let url = this.props.SettingReducer.hostname + API_THUCHIENYLENH;
        // for trong toàn bộ sample sub với status true
        let hasErr = false;
        try {
            for( let i = 0 ; i < YeuCau_Ids.length; i++) {
                try {
                    let {
                        user_idx
                    } = this.props.UserReducer;
                    let dataPost = {
                        "UserName":"tichhop",
                        "Password":"123456@a",
                        "DataSign":"", 
                        "ThoiGianThucHien": "",
                        "DieuDuong_Id": user_idx,
                        "YLenh_Id": null,
                        "YeuCau_Id": YeuCau_Ids[i],
                        "MauBenhPham_Id" : sample
                    }; 
                    
                    let res = await Axios.post(url, JSON.stringify( dataPost ), {
                        headers: { 
                            'Content-Type': 'application/json'
                        }
                    });
                    
                } catch(err) {
                    Alert.alert('Thông báo', "Không thể cập nhật được thông tin bệnh án. Vui lòng thử lại!");
                    // this.props.navigation.navigate('thucHienYLenhPageNavigation')
                    // return false;
                    console.log(err.message);
                    hasErr = true;
                } finally {
                    this.setState({
                        fetching: false
                    });
                }
            }
        } catch (err) {
            console.log(err)
        }
        this.setState({
            showModalConfirm: false
        });
        if( hasErr ) {
            await this.props._getThongtinYLenh(this.props.soNhapVien);
        } else {
            await this.props._getThongtinYLenh(this.props.soNhapVien);
            Alert.alert("Thông báo", "Cập nhật thông tin thành công", 
            [
                {
                    text: 'Ok',
                    onPress: () =>{
                        
                    },
                },
            ]);
        }
    }

    render() {
        let data = this.state;
        let {
            userData
        } = this.props;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollview}>
                    <View style={styles.groupInput}>
                        <View style={{...styles.col_2, width: col2}}>
                            <Text>Thời gian thực hiện</Text>
                            <View style={{...styles.inputGroup, width: col2 }}>
                                <Text style={styles.input}>{`${data.doTimeAt.getDate()}/${data.doTimeAt.getMonth()+1}/${data.doTimeAt.getFullYear()} ${data.doTimeAt.getHours()}:${data.doTimeAt.getMinutes()}:${data.doTimeAt.getSeconds()}`}</Text>
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
                </ScrollView>
                {
                    data.sample != -1 &&
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
                <Modal isVisible={data.showModalConfirm}>
                    <View style={styles.modalBody}>
                        <View style={styles.modalBodyContent}>
                            <Text style={{...styles.modalText, fontSize: 12}}>Bạn có muốn xác nhận thực hiện y lệnh cho bệnh nhân</Text>
                            <Text style={styles.modalText}>{userData.TENBENHNHAN} - Số nhập viện: {userData.SONHAPVIEN}</Text>
                        </View>
                        <View style={styles.modalBtns}>
                            {
                                data.fetching ?
                                <ActivityIndicator size={30} color={'#00cdff'} />
                                :
                                <>
                                    <TouchableOpacity style={{...styles.btn, backgroundColor: 'silver'}}
                                        onPress={()=> this.setState({
                                            showModalConfirm: false
                                        })}
                                    >
                                        <Text style={styles.btnText}>Thoát</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btn} onPress={this._submitThucHienYLenh}>
                                        <Text style={styles.btnText}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </>
                            }
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state : any) => ({
    SettingReducer : state.SettingReducer,
    UserReducer : state.UserReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(YLenhChuaThucHienComponent);