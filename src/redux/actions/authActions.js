import { SET_USER_STATE, USER_LOGGED_OUT, SET_USER_PROJECT, SET_USER_C_PROJECT } from 'redux/actionsTypes';

const setUserState = (user) => ({
    type: SET_USER_STATE,
    payload: {
        user
    }
})

const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

const setUserProjectIds = (projectIds) => ({
    type: SET_USER_PROJECT,
    payload: {
        projectIds
    }
})

const setCurrentProject = (project) => ({
    type: SET_USER_C_PROJECT,
    payload: {
        project
    }
})

const authActions = {
    setUserState,
    userLoggedOut,
    setUserProjectIds,
    setCurrentProject
}

export default authActions;