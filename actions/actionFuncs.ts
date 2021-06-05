
import {
    SET_CONFIG_HOSTNAME,
    SET_CONFIG_HARDWARE,
    SET_USERDATA
} from './actionKeys';

// SETTING
const SetSettingHostname = (configHostname : Object) => ({
    type : SET_CONFIG_HOSTNAME,
    data : configHostname
});
const SetSettingHardware = (configHardware : Object) => ({
    type : SET_CONFIG_HARDWARE,
    data : configHardware
});

// USER 
const SetUserdata = (userdata : Object) => ({
    type : SET_USERDATA,
    data : userdata
});

export {
    SetSettingHostname,
    SetSettingHardware,
    SetUserdata
}