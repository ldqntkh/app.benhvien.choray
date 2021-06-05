import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import constColor from '../../constants/Colors';

let {
    width, height
} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        marginBottom: 100
    },
    form: {
        position: 'absolute',
        width: width,
        maxWidth: 360,
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 10,
        justifyContent: 'flex-start',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    inputGroup: {
        width: width - 40,
        maxWidth: 320,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 'auto',
        marginRight: 'auto'
        // backgroundColor: 'silver'
    },
    label: {

    },
    inputBox: {
        width: width - 40,
        maxWidth: 320,
        borderColor: constColor.borderColor,
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 5
    },
    input: {
        // backgroundColor: 'red',
        width: width - 40,
        maxWidth: 320,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14
    },
    btns: {
        width: width,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 0,
        fontWeight: 'normal',
        // marginLeft: 'auto',
        marginRight: 'auto'
    },
    btnSave: {
        backgroundColor: '#00cdff',
        padding: 10,
        borderRadius: 4,
        width: width,
        maxWidth: 320,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLabel: {
        color: 'white',
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10
    },
});

export default styles;