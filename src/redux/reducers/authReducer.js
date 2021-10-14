import { SET_USER_STATE, USER_LOGGED_OUT, SET_USER_PROJECT, SET_USER_C_PROJECT } from "redux/actionsTypes";

const initialState = {
    user: {},
    userProjectIds: null,
    project: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_STATE: {
        const user = action.payload.user;
        return {
            ...state,
            user: { ...user}
        }
    }
    case USER_LOGGED_OUT: {
        return {
            ...state,
            user: {},
            userProjectIds: null
        }
    }
    case SET_USER_PROJECT : {
        const projectIds = action.payload.projectIds;
        return {
            ...state,
            userProjectIds: [...projectIds]
        }
    }
    case SET_USER_C_PROJECT : {
        const project = action.payload.project;
        return {
            ...state,
            project: {...project}
        }
    }
    default:
      return state;
  }
}
