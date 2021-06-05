import * as React from 'react';
import { useWindowDimensions, SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from './BanGiaoChiDinh.style';
import BGCD_PageQrCodeComponent from './BGCD_PageQrcodeComponent';
import BGCD_PageInputCodeComponent from './BGCD_PageInputCodeComponent';


export default function BanGiaoChiDinhComponent(props: any) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Quét mã' },
    { key: 'second', title: 'Nhập mã' },
  ]);

  const renderScene = SceneMap({
    first: ()=> <BGCD_PageQrCodeComponent {...props}/>,
    second: ()=> <BGCD_PageInputCodeComponent {...props}/>,
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

