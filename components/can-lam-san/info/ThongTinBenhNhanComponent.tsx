import React from 'react';
import {
    SafeAreaView, View, 
    ScrollView, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Info.style';


interface MyProps {
    navigation: any
}

interface MyStates {
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

class ThongTinBenhNhanComponent extends React.Component< MyProps, MyStates > {

    constructor(props : MyProps) {
        super(props);
        this.state = {
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

    render() {
        let {
            userData
        } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Icon name="user" size={50} color={'green'} />
                    </View>
                    <ScrollView style={styles.scrollview}>
                        <View style={styles.lineItem}>
                            <Text>Tên bệnh nhân</Text>
                            <Text style={{color: 'green'}}>{userData.fullname}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Mã bệnh nhân</Text>
                            <Text>{userData.maBenhNhan}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Số nhập viện</Text>
                            <Text>{userData.soNhapVien}</Text>
                        </View>
                        <View style={{...styles.lineItem, marginBottom: 20}}>
                            <Text>Số BHYT</Text>
                            <Text>{userData.soBHYT}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Giới tính</Text>
                            <Text>{userData.sex}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Số điện thoại</Text>
                            <Text>{userData.phone}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Năm sinh</Text>
                            <Text>{userData.birthdayYear}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Tuổi</Text>
                            <Text>{userData.age}</Text>
                        </View>
                        <View style={styles.lineItem}>
                            <Text>Đối tượng</Text>
                            <Text>{userData.personType}</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default ThongTinBenhNhanComponent;