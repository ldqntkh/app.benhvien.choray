import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import constColor from '../../../constants/Colors';
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
        width: width
    },

    clsItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'silver',
        margin: 5,
        marginBottom: 10
    },
    headerItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        width: width-10,
    },
    lineItem: {
        padding: 10,
        paddingBottom: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    lineItemStatus: {
        width: width-10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'silver'
    },
    lineItemStatusNonBorder: {
        width: width-10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 5,
        paddingBottom: 5
    },
    borderLabel: {
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        marginRight: 5,
        borderLeftColor: 'blue',
        borderLeftWidth: 1,
        borderRightColor: 'blue',
        borderRightWidth: 1
    }
});

export default styles;