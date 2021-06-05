import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import LoginComponent from '../components/account/login/LoginComponent';
import ConfigHostNameComponent from '../components/setting/ConfigHostNameComponent';
import PhongKhoaComponent from '../components/phong-khoa/PhongKhoaComponent';
import HomePageComponent from '../components/home/HomePageComponent';
// setting
import SettingComponent from '../components/setting/SettingComponent';
// thực hiện y lệnh
import ThucHienYLenhComponent from '../components/thuc-hien-y-lenh/search/ThucHienYLenhComponent';
import YLenhDetailComponent from '../components/thuc-hien-y-lenh/info/YLenhDetailComponent';

// bàn giao chỉ định
import BanGiaoChiDinhComponent from '../components/ban-giao-chi-dinh/search/BanGiaoChiDinhComponent';
import BenhPhamComponent from '../components/ban-giao-chi-dinh/info/BenhPhamComponent';

// cận lâm sàn
import CanLamSanComponent from '../components/can-lam-san/search/CanLamSanComponent';
import ClsDetailComponent from '../components/can-lam-san/info/ClsDetailComponent';

const HomeNavigatorStack = createStackNavigator({
    //Constant which holds all the screens like index of any book 
        loginNavigation: { 
            screen: LoginComponent,
            navigationOptions: {
                headerShown: false
            }
        }, 

        configHostnameNavigation: { 
            screen: ConfigHostNameComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Cấu hình hostname',
                headerBackTitle: 'Đăng nhập',
            }
        },

        // chọn phòng khoa
        phongKhoaNavigation: { 
            screen: PhongKhoaComponent,
            navigationOptions: {
                headerShown: false
            }
        },

        // homepage
        homePageNavigation: { 
            screen: HomePageComponent,
            navigationOptions: {
                headerShown: false
            }
        },

        // setting
        settingPageNavigation: { 
            screen: SettingComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Cấu hình',
                headerBackTitle: 'Trang chủ',
            }
        },

        // thucHienYLenh
        thucHienYLenhPageNavigation: { 
            screen: ThucHienYLenhComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Thực hiện y lệnh',
                headerBackTitle: 'Trang chủ',
            }
        },
        // y lệnh detail
        ylenhDetailPageNavigation: {
            screen: YLenhDetailComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Thực hiện y lệnh',
                headerBackTitle: 'Y lệnh',
            }
        },


        // bàn giao chỉ định
        banGiaoChiDinhPageNavigation: { 
            screen: BanGiaoChiDinhComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Nhận mẫu bệnh phẩm',
                headerBackTitle: 'Trang chủ',
            }
        },
        // chỉ định detail
        chidinhDetailPageNavigation: {
            screen: BenhPhamComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Nhận mẫu bệnh phẩm',
                headerBackTitle: 'Bệnh phẩm',
            }
        },

        // Cận lâm sàn
        canLamSanPageNavigation: { 
            screen: CanLamSanComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Thông tin CLS',
                headerBackTitle: 'Trang chủ',
            }
        },
        // // chi tiết CLS
        clsDetailPageNavigation: {
            screen: ClsDetailComponent,
            navigationOptions: {
                // headerShown: false
                headerTitle: 'Thông tin CLS',
                headerBackTitle: 'CLS',
            }
        },
    },
    {
        initialRouteName: 'loginNavigation',
        // headerMode: 'none'
    }
);
export default createAppContainer(HomeNavigatorStack);
