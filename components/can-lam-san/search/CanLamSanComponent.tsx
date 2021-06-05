import * as React from 'react';
import { useWindowDimensions, SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from './CLS.style';
import CLS_PageQrCodeComponent from './CLS_PageQrcodeComponent';
import CLS_PageInputCodeComponent from './CLS_PageInputCodeComponent';


export default function CanLamSanComponent(props: any) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Quét mã' },
    { key: 'second', title: 'Nhập mã' },
  ]);

  const renderScene = SceneMap({
    first: ()=> <CLS_PageQrCodeComponent {...props}/>,
    second: ()=> <CLS_PageInputCodeComponent {...props}/>,
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

