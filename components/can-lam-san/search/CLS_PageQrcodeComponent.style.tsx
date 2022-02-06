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
    barcodeControl: {
        height: 300,
        width: width,
        position: 'relative',
    },
    rectBarcode: {
        height: 300,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1
    },
    realBarcode: {
        height: 300,
        width: width,
        position: 'absolute',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    realBarcode_1: {
        width: width,
        height: 25,
        backgroundColor: 'black',
        opacity: 0.7
    },
    realBarcode_2: {
        width: (width - 250)/2,
        height: 250,
        backgroundColor: 'black',
        opacity: 0.7
    },
    realBarcode_3: {
        width: 250,
        height: 250
    },
    realBarcode_4: {
        width: (width - 250)/2,
        height: 250,
        backgroundColor: 'black',
        opacity: 0.7
    },
    realBarcode_5: {
        width: width,
        height: 25,
        backgroundColor: 'black',
        opacity: 0.7
    },
    checkAgain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
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
});

export default styles;