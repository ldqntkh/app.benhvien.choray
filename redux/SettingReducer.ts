
// import variable action
import {
    SET_CONFIG_HOSTNAME
} from '../actions/actionKeys';

/**
 * setting [
 *  { hostname: string }
 * ]
 */
interface SettingApp {
    hostname: string,
    save_hostname: boolean
}
const SettingReducer = (setting : SettingApp, action : any) => {
    let result : any = {...setting};
    switch (action.type) {
        case SET_CONFIG_HOSTNAME :
            result.hostname = action.data.hostname;
            result.save_hostname = action.data.save_hostname;
            return result;
        default :
            return result;
    }
}

export default SettingReducer;