import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
let {
    width, height
} = Dimensions.get('window');

let col2 = (width/2 - 20);
if( col2 < 180 ) {
    col2 = width - 20;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollview: {
        width: width,
        height: height - 60
    },
    groupInput: {
        width: width,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        zIndex: 20
    },
    col_2: {
        width: col2,
        marginBottom: 10,
        marginRight: col2 < (width - 20) ? 10 : 0
    },
    inputGroup: {
        borderColor: 'silver',
        borderWidth: 1,
        borderRadius: 4
    },
    
    input: {
        padding: 12
    },

    samples: {
        display: 'flex',
        flexDirection: 'column',
        width: width - 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 10,
        zIndex: 10
    },
    sampleItem: {
        // backgroundColor: 'red',
        position: 'relative',
        width: width - 20,
        // height: 200,
        marginBottom: 30,
        zIndex: 10
    },
    boxSub: {
        width: 10,
        height: 10,
        borderWidth: 1,
        position: 'absolute',
        top: 0,
        backgroundColor: 'white',
        zIndex: 2,
    },
    hLine: {
        position: 'absolute',
        width: 0,
        left: 4,
        top: 0,
        bottom: 10,
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: .5,
        zIndex: 1,
    },
    checkboxPr: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 0,
        fontWeight: 'normal',
        marginRight: 'auto',
        marginTop: -17,
        marginLeft: 20,
        marginBottom: -10
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 0,
        fontWeight: 'normal',
        marginRight: 'auto',
        marginTop: 7,
        marginBottom: 0,
        padding: 1,
        marginLeft: 5,
        width: width - 80
    },
    sub_sample: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    vLine: {
        // position: 'absolute',
        // left: 5,
        top: 5,
        width: 30,
        height: 0,
        borderStyle: 'dashed',
        borderRadius: 1,
        borderWidth: .5,
        zIndex: 1
    },
    bs_chidinh: {
        position: 'absolute',
        right: 0,
        top: -10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        zIndex: 10
    },
    bs_chidinh_text: {
        color: 'grey',
        fontStyle: 'italic'
    },

    btns: {
        width: width,
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    btn: {
        width: 140,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01cb34',
        borderRadius: 4,
        margin: 10
    },
    btnText: {
        color: 'white'
    },

    modalBody: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 4
    },
    modalBodyContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        textAlign: 'center'
    },
    modalBtns: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    }
});

export default styles;