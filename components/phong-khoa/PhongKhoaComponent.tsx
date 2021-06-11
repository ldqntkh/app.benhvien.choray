import * as React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, TextInput, Platform } from 'react-native';
import {
    View, Text,
    TouchableOpacity
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import styles from './PhongKhoa.style';

import {
    API_PHONGBAN
} from '../../constants/Variable';

interface MyProps  {
    navigation: any,
    UserReducer: any,
    SettingReducer: any
}

interface MyStates  {
    phongkhoa: any,
    search_text: string,
    phongbans: Array<Object>,
    fetching: boolean
}

class PhongKhoaComponent extends React.Component<MyProps, MyStates> {
    // static navigationOptions = {
    //     title: 'Danh sách quà tặng'
    // };
    constructor(props: MyProps) {
        super(props);
        this.state = {
            phongkhoa: '',
            search_text: '',
            fetching: false,
            phongbans: []
        }
    }

    async componentDidMount() {
        await this._loadPhongKhoa()
    }

    _loadPhongKhoa = async()=> {
        if( this.state.fetching ) return false;
        this.setState({
            fetching: true
        });
        let {
            username
        } = this.props.UserReducer;
        try {
            let data = {
                "UserName":"tichhop",
                "Password":"123456@a",
                "DataSign":"", 
                "TenDangNhap":username
            }
            let url = this.props.SettingReducer.hostname + API_PHONGBAN;
            let res = await Axios.post( url, JSON.stringify(data), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            } );
            
            this.setState({
                phongbans: res.data.Data
            });
        } catch (err) {
            console.log(err.message);
            Alert.alert('Thông báo', 'Dữ liệu không chính xác. Vui lòng thực hiện Đăng Xuất và Đăng nhập lại.');
        } finally {
            this.setState({
                fetching: false
            });
        }
    }

    _selectPhongKhoa = ()=> {
        if( this.state.phongkhoa == '' ) {
            Alert.alert('Thông báo', 'Vui lòng chọn phòng khoa làm việc');
            return false;
        }
        this.props.navigation.navigate( 'homePageNavigation' )
    }

    removeVietnameseTones = (str:string) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g," ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        return str;
    }

    _checkIncludeString = (tenKhoa: string)=> {
        let {
            search_text
        } = this.state;

        let searchs = search_text.trim().split(' ');
        for( let i = 0; i < searchs.length; i++ ) {
            if( this.removeVietnameseTones(tenKhoa).toLocaleLowerCase().match(new RegExp(this.removeVietnameseTones(searchs[i]).trim().toLocaleLowerCase())) ) {
                return true;
            }
        }

        return false;
    }

    render() {
        let {
            phongkhoa, fetching, phongbans, search_text
        } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.form}>
                    {
                        fetching ? 
                        <ActivityIndicator size={40}  color={'#00cdff'} />
                        :
                        <>
                            <View style={styles.inputGroup}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Vui lòng chọn khoa làm việc</Text>
                                {
                                    Platform.OS == 'ios' &&
                                    <View style={styles.inputGroup}>
                                        <View style={styles.inputBox}>
                                            <TextInput placeholder="Nhập tên phòng khoa để tìm nhanh" autoCapitalize={"none"} style={styles.input} value={search_text} onChangeText={(value: string) => this.setState({ search_text : value }) } ></TextInput>
                                        </View>
                                    </View>
                                }
                                <Picker
                                    style={styles.inputSelect}
                                    selectedValue={phongkhoa}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({
                                            phongkhoa: itemValue
                                        })
                                    }} >
                                    <Picker.Item label="Chọn phòng khoa" value="" />
                                    {
                                        phongbans && phongbans.map( (item : any, index) => {
                                            if( search_text.trim() == '' ) {
                                                return( <Picker.Item key={item.IDX} label={item.TEN} value={item.IDX} /> )
                                            } else if( this._checkIncludeString(item.TEN) ) {
                                                return( <Picker.Item key={item.IDX} label={item.TEN} value={item.IDX} /> )
                                            } else return null
                                        } )
                                    }
                                </Picker>
                            </View>
                            <View style={styles.btns}>
                                <TouchableOpacity style={styles.btnSave} onPress={this._selectPhongKhoa}>
                                    <Text style={styles.btnLabel}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>
            </View>
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
)(PhongKhoaComponent);