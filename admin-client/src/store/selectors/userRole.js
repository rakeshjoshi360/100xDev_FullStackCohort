import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userRoleState = selector({
    key: "userRoleState",
    get: ({get}) => {
        const state = get(userState)
        return state.role
    }
})