import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

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
    checkAgain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400
    },
    btnAgain: {
        marginTop: 20,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 4,
        backgroundColor: "#42c7dd"
    },
    btnLabelAgain: {
        color: 'white'
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
        marginTop: 10,
        marginBottom: 20
    },
    inputGroup: {
        width: width-20,
        borderBottomColor: 'silver',
        borderBottomWidth: 2,
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