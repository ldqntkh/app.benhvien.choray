import { createStore } from 'redux';

// import reducer
import AppReducers from '../redux/index';

const AppStore = createStore(AppReducers);

export default AppStore;