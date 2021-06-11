import * as React from 'react';
import { ActivityIndicator, Alert, Dimensions, SafeAreaView, View, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from './Info.style';
import BenhPhamDetailComponent from './BenhPhamDetailComponent';
import ThongTinBenhNhanComponent from '../../thong-tin-benh-nhan/ThongTinBenhNhanComponent';
import { connect } from 'react-redux';

import Axios from 'axios';
import {
    API_DSTHUCHIENYLENH
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
    userObject: Object,
    yLenhs : Array<Object>
}

class BenhPhamComponent extends React.Component< MyProps, MyState > {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Thông tin bệnh nhân' },
                { key: 'second', title: 'Mẫu bệnh phẩm' },
            ],
            soNhapVien: '',
            fetching : false,
            hasError : false,
            userObject: {},
            yLenhs: []
        }
    }

    async componentDidMount() {
        let snv = this.props.navigation.state.params.soNhapVien;
        if( !snv ) {
            Alert.alert('Thông báo', "Không tìm thấy số nhập viện");
            this.props.navigation.navigate('banGiaoChiDinhPageNavigation')
            return false;
        }

        await this._getThongtinBenhPham(snv);
        let routes = this.state.routes;
        routes[1].title = "Mẫu bệnh phẩm";
        this.setState({
            routes
        });
    }

    _getThongtinBenhPham = async(SoBenhAn : string)=> {
        if(this.state.fetching) return;
        this.setState({
            fetching: true
        });
        let url_encode = this.props.SettingReducer.hostname + API_DSTHUCHIENYLENH;
        try {
            let dataPost = {
                "UserName":"tichhop",
                "Password":"123456@a",
                "DataSign":"", 
                "SoBenhAn":SoBenhAn,
                "DaThucHien": 1
            }; 
            let res = await Axios.post(url_encode, JSON.stringify( dataPost ), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });

            if( res.data && res.data.Data && res.data.Data.length > 0 ) {
                let item = res.data.Data[0];
                this.setState({
                    userObject: item,
                    yLenhs: res.data.Data
                });
            } else {
                Alert.alert('Thông báo', "Không tồn tại mẫu bệnh phẩm của số bệnh án này. Vui lòng thử lại!");
                this.setState({
                    hasError: true
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
            index, routes, fetching, hasError, userObject, yLenhs
        } = this.state;
        let screens = SceneMap({});
        if( !fetching ) {
            screens = SceneMap({
                first: ()=> <ThongTinBenhNhanComponent {...this.props} userData={userObject}/>,
                second: ()=> <BenhPhamDetailComponent {...this.props} userData={userObject} yLenhs={yLenhs} 
                    _getThongtinBenhPham={this._getThongtinBenhPham}
                    soNhapVien={this.props.navigation.state.params.soNhapVien} />,
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
                        <TouchableOpacity style={styles.btnAgain} onPress={()=> this.props.navigation.navigate('banGiaoChiDinhPageNavigation')}>
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
)(BenhPhamComponent);

