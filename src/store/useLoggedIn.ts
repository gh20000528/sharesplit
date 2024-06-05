import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import exp from 'constants';

const $LOCAL_LOGGEDIN_KEY = 'my_app_logged_in'

interface IUser {
    username: string
}

interface ILoggedInStore {
    isLoggedIn: boolean
    userInfo: IUser | null
    setIsLoggedIn: (value: boolean, userInfo: IUser | null) => void;
    logout: () => void
}

const getInit = () => {
    return localStorage.getItem($LOCAL_LOGGEDIN_KEY) === 'true'
}

const useLoggedIn = create<ILoggedInStore>((set) => ({
    isLoggedIn: getInit(),
    userInfo: null,
    setIsLoggedIn: (value: boolean, userInfo: IUser | null) => {
        localStorage.setItem($LOCAL_LOGGEDIN_KEY, String(value))
        return set({ isLoggedIn: value, userInfo })
    },
    logout: () => {
        localStorage.removeItem($LOCAL_LOGGEDIN_KEY)
        return set({ isLoggedIn: false, userInfo: null })
    }
}))

if(process.env.NODE_ENV === 'development') {
    mountStoreDevtool('useLoggedIn', useLoggedIn)
}

export default useLoggedIn;