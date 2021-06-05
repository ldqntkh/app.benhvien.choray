import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import constColor from '../../constants/Colors';

let {
    width
} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: constColor.borderColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    body: {
        // backgroundColor: 'red',
        
    },
    lstItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width,
        padding: 10,
        // backgroundColor: 'red'   
    },
    iconGroup : {
        padding: 10,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150
    },
    iconLabel: {
        marginTop: 10,
        fontWeight: "500"
    }
});

export default styles;