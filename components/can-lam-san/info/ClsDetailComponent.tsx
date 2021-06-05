import * as React from 'react';
import { ActivityIndicator, Alert, Dimensions, SafeAreaView, View, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from './Info.style';
import KetQuaClsComponent from './KetQuaClsComponent';
import ThongTinBenhNhanComponent from '../../thong-tin-benh-nhan/ThongTinBenhNhanComponent';
import { connect } from 'react-redux';

import Axios from 'axios';
import {
    API_DANHSACH_CLS
} from '../../../constants/Variable';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface MyProps {
    navigation : any,
    SettingReducer : any,
    UserReducer : any
}
interface MyState {
    index: number,
    routes: any,
    soNhapVien: string,
    fetching: boolean,
    hasError: boolean,
    ketQuaCls: Array<Object>,
    userObject: Object
}

class ClsDetailComponent extends React.Component< MyProps, MyState > {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Thông tin bệnh nhân' },
                { key: 'second', title: 'Kết quả CLS' },
            ],
            soNhapVien: '',
            fetching : false,
            hasError : false,
            ketQuaCls : [],
            userObject: {}
        }
    }

    async componentDidMount() {
        let snv = this.props.navigation.state.params.soNhapVien;
        if( !snv ) {
            Alert.alert('Thông báo', "Không tìm thấy số nhập viện");
            this.props.navigation.navigate('canLamSanPageNavigation')
            return false;
        }

        await this._getThongtinCLS(snv);
    }

    _getThongtinCLS = async(SoBenhAn : string)=> {
        if(this.state.fetching) return;
        this.setState({
            fetching: true
        });
        let url_encode = this.props.SettingReducer.hostname + API_DANHSACH_CLS;
        try {
            let {
                username, password
            } = this.props.UserReducer;
            let dataPost = {
                "UserName": username,
                "Password":password,
                "DataSign":"", 
                "SoBenhAn":SoBenhAn
            }; 
            let res = await Axios.post(url_encode, JSON.stringify( dataPost ), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            
            if( res.data && res.data.Data.length > 0 ) {
                let item = res.data.Data[0];
                this.setState({
                    ketQuaCls: res.data.Data,
                    userObject: item
                });
            }
        } catch(err) {
            Alert.alert('Thông báo', "Không thể tải được thông tin bệnh án. Vui lòng thử lại!");
            // this.props.navigation.navigate('thucHienYLenhPageNavigation')
            // return false;
            this.setState({
                hasError: true
            });
        } finally {
            this.setState({
                fetching: false
            });
        }
    }

    _setIndex = (index: number) => this.setState({index});

    render() {
        
        let {
            index, routes, fetching, hasError, ketQuaCls, userObject
        } = this.state;
        let screens = SceneMap({});
        if( !fetching ) {
            screens = SceneMap({
                first: ()=> <ThongTinBenhNhanComponent {...this.props} userData={userObject}/>,
                second: ()=> <KetQuaClsComponent {...this.props} ketQuaCls={ketQuaCls}/>,
            })
        }
        return (
            <SafeAreaView style={styles.container}>
                {
                    fetching ? 
                    <ActivityIndicator size={40}  color={'#00cdff'} />
                    :
                    hasError ? 
                    <View style={styles.checkAgain}>
                        <TouchableOpacity style={styles.btnAgain} onPress={()=> this.props.navigation.navigate('canLamSanPageNavigation')}>
                            <Text style={styles.btnLabelAgain}>Kiểm tra lại số bệnh án</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={screens}
                        onIndexChange={this._setIndex}
                        initialLayout={{ width: Dimensions.get('screen').width }}
                        />
                }
            </SafeAreaView>
            
        );
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
)(ClsDetailComponent);

