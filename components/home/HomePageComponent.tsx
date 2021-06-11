import React from 'react';

import {
    SafeAreaView, View, ScrollView,
    Text, TouchableOpacity,
    Linking
} from 'react-native';
import constColor from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import styles from './HomePage.style';

interface MyProps {
    navigation: any,
    UserReducer: any
}

interface MyStates {
    show: boolean
}

class HomePageComponent extends React.Component< MyProps, MyStates > {
    constructor( props: MyProps ) {
        super( props );
        this.state = {
            show: false
        }
    }
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Xin chào {this.props.UserReducer.fullname}</Text>
                </View>
                <ScrollView style={styles.body}>
                    <View style={styles.lstItems}>
                        <TouchableOpacity style={styles.iconGroup} onPress={()=> this.props.navigation.navigate( 'thucHienYLenhPageNavigation' ) }>
                            <Icon name="calendar-check-o" size={100} color={constColor.iconColor}/>
                            <Text style={{...styles.iconLabel, paddingRight: 8}}>Thực hiện y lệnh</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconGroup} onPress={()=> this.props.navigation.navigate( 'banGiaoChiDinhPageNavigation' ) }>
                            <IconMaterial name="folder-account" size={100} color={constColor.iconColor}/>
                            <Text style={{...styles.iconLabel, paddingRight: 0}}>Bàn giao chỉ định</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconGroup} onPress={()=> this.props.navigation.navigate( 'canLamSanPageNavigation' ) }>
                            <Icon name="list-alt" size={100} color={constColor.iconColor}/>
                            <Text style={{...styles.iconLabel, paddingRight: 0}}>Kết quả CLS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconGroup} onPress={ ()=>{ Linking.openURL('http://10.16.0.20/khangsinh')}}>
                            <Icon5 name="book-medical" size={100} color={constColor.iconColor}/>
                            <Text style={{...styles.iconLabel, paddingRight: 0}}>Tra cứu kháng sinh</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconGroup} onPress={()=> this.props.navigation.navigate( 'settingPageNavigation' ) }>
                            <Icon name="gears" size={100} color={constColor.iconColor}/>
                            <Text style={{...styles.iconLabel, paddingRight: 0}}>Cấu hình</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconGroup} onPress={()=> this.props.navigation.navigate( 'loginNavigation' ) }>
                            <MaterialIcons name="logout" size={100} color={constColor.iconColor}/>
                            <Text style={{...styles.iconLabel, paddingRight: 0}}>Đăng xuất</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state : any) => ({
    UserReducer : state.UserReducer
});

const mapDispatchToProps = (dispatch: any) => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageComponent);