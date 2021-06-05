import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import constColor from '../../../constants/Colors';
let {
    width, height
} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentInput: {
        width: width,
        marginTop: 20,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderInput: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 4
    },
    input: {
        width: 320,
        padding: 5
    },
    btn: {
        marginTop: 20,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 4,
        backgroundColor: "#42c7dd"
    },
    btnLabel: {
        color: 'white'
    }
});

export default styles;