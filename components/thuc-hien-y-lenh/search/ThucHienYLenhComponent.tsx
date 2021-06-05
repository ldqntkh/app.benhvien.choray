import * as React from 'react';
import { View, useWindowDimensions, SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from './ThucHienYLenh.style';
import THYL_PageQrCodeComponent from './THYL_PageQrcodeComponent';
import THYL_PageInputCodeComponent from './THYL_PageInputCodeComponent';


export default function ThucHienYLenhComponent(props: any) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Quét mã' },
    { key: 'second', title: 'Nhập mã' },
  ]);

  const renderScene = SceneMap({
    first: ()=> <THYL_PageQrCodeComponent {...props}/>,
    second: ()=> <THYL_PageInputCodeComponent {...props}/>,
  });

  return (
    <SafeAreaView style={styles.container}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            />
    </SafeAreaView>
    
  );
}

// export default ThucHienYLenhComponent;

