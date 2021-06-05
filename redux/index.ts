import {combineReducers} from 'redux';

// import reducer
import SettingReducer from './SettingReducer';
import UserReducer from './UserReducer';

let AppServiceReducers = combineReducers({
    SettingReducer,
    UserReducer
});

export default AppServiceReducers;