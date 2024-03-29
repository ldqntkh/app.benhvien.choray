import React from 'react';
import {
    SafeAreaView, View, 
    ScrollView, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Info.style';


interface MyProps {
    navigation: any,
    userData: any
}

interface MyStates {
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

class ThongTinBenhNhanComponent extends React.Component< MyProps, MyStates > {

    constructor(props : MyProps) {
        super(props);
    } 

    render() {
        let {
            userData
        } = this.props;
        
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Icon name="user" size={50} color={'green'} />
                    </View>
                    <ScrollView style={styles.scrollview}>
                        <View style={styles.lineItem}>
                            <Text>Tên bệnh nhân</Text>
                            <Text style={{color: 'green'}}>{userData.TENBENHNHAN}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Mã bệnh nhân</Text>
                            <Text>{userData.MABENHNHAN}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Số nhập viện</Text>
                            <Text>{userData.SONHAPVIEN}</Text>
                        </View>
                        <View style={{...styles.lineItem, marginBottom: 7}}>
                            <Text>Số BHYT</Text>
                            <Text>{userData.SOTHEBHYT}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Giới tính</Text>
                            <Text>{userData.GIOITINH}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Số điện thoại</Text>
                            <Text>{userData.DIENTHOAI}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Năm sinh</Text>
                            <Text>{userData.NAMSINH}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Tuổi</Text>
                            <Text>{userData.TUOI}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Đối tượng</Text>
                            <Text>{userData.DOITUONG}</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default ThongTinBenhNhanComponent;