
// import variable action
import {
    SET_USERDATA
} from '../actions/actionKeys';

/**
 * setting [
 *  { hostname: string }
 * ]
 */
interface UserData {
    hostname: string,
    save_hostname: boolean
}
const UserReducer = (setting : UserData, action : any) => {
    let result : any = {...setting};
    switch (action.type) {
        case SET_USERDATA :
            return action.data;
        default :
            return result;
    }
}

export default UserReducer;