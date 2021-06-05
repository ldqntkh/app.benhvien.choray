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
    mainPage: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height
    },
    rectangTop: {
        flex: 0.5,
        backgroundColor: '#00cdff',
        width: width
    },
    rectangBottom: {
        flex: 0.5,
        backgroundColor: '#eeeeee'
    },
    loginFrom: {
        position: 'absolute',
        width: width,
        maxWidth: 400,
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 10,
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
    error: {
        color: 'red',
        fontSize: 12,
        fontStyle: 'italic'
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
        width: width - 40,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btnGroup: {
        width: width - 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLogin: {
        backgroundColor: '#00cdff',
        padding: 10,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10
    },
    btnLabel: {
        color: 'white',
        fontWeight: "500",
        paddingLeft: 10,
        paddingRight: 10
    },
    boxSetting: {
        width: width - 40,
        maxWidth: 320,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    btnSetting: {
        borderBottomWidth: 1,
        borderBottomColor: '#00cdff'
    },
    btnLabelSetting: {
        color: '#00cdff',
        fontWeight: "500",
    }
});

export default styles;