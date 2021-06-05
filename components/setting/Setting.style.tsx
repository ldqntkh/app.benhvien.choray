import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import constColor from '../../constants/Colors';
let {
    width, height
} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'silver',
        borderBottomWidth: 1
    },
    scrollview: {
        width: width
    },
    lineItem: {
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: width,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#e8e8e8',
    },
    hardware: {
        width: width,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 30
    },
    inputGroup: {
        width: width-20,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        marginTop: 10
    },
    input: {
        padding: 10
    },
    btns: {
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    btn: {
        width: 300,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01cb34',
        borderRadius: 4
    },
    btnText: {
        color: 'white'
    }
});

export default styles;