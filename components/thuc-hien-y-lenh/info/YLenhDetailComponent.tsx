import * as React from 'react';
import { ActivityIndicator, Alert, Dimensions, SafeAreaView, View, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from '../../thong-tin-benh-nhan/Info.style';
import YLenhChuaThucHienComponent from './YLenhChuaThucHienComponent';
import ThongTinBenhNhanComponent from '../../thong-tin-benh-nhan/ThongTinBenhNhanComponent';
import { connect } from 'react-redux';

import Axios from 'axios';
import {
    API_THUCHIENYLENH
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
    userObject: Object
}

class YLenhDetailComponent extends React.Component< MyProps, MyState > {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Thông tin bệnh nhân' },
                { key: 'second', title: 'Y lệnh chưa thực hiện' },
            ],
            soNhapVien: '',
            fetching : false,
            hasError : false,
            userObject: {}
        }
    }

    async componentDidMount() {
        let snv = this.props.navigation.state.params.soNhapVien;
        if( !snv ) {
            Alert.alert('Thông báo', "Không tìm thấy số nhập viện");
            this.props.navigation.navigate('thucHienYLenhPageNavigation')
            return false;
        }

        await this._getThongtinYLenh(snv);
        let routes = this.state.routes;
        routes[1].title = "Y lệnh chưa thực hiện";
        this.setState({
            routes
        });
    }

    _getThongtinYLenh = async(SoBenhAn : string)=> {
        if(this.state.fetching) return;
        this.setState({
            fetching: true
        });
        let url_encode = this.props.SettingReducer.hostname + API_THUCHIENYLENH;
        try {
            let {
                username, password
            } = this.props.UserReducer;
            let dataPost = {
                "UserName": username,
                "Password":password,
                "DataSign":"", 
                "SoBenhAn":SoBenhAn,
                "DaThucHien": 0
            }; 
            let res = await Axios.post(url_encode, JSON.stringify( dataPost ), {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            
            if( res.data && res.data.Data.length > 0 ) {
                let item = res.data.Data[0];
                this.setState({
                    userObject: item
                });
            }
            
        } catch(err) {
            Alert.alert('Thông báo', "Không thể tải được thông tin bệnh án. Vui lòng thử lại!");
            // this.props.navigation.navigate('thucHienYLenhPageNavigation')
            // return false;
            console.log(err.message)
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
            index, routes, fetching, hasError, userObject
        } = this.state;
        let screens = SceneMap({});
        if( !fetching ) {
            screens = SceneMap({
                first: ()=> <ThongTinBenhNhanComponent {...this.props} userData={userObject} />,
                second: ()=> <YLenhChuaThucHienComponent {...this.props} />,
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
                        <TouchableOpacity style={styles.btnAgain} onPress={()=> this.props.navigation.navigate('thucHienYLenhPageNavigation')}>
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
)(YLenhDetailComponent);

