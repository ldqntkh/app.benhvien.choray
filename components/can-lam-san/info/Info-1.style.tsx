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
});

export default styles;