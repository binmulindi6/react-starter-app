import { createContext } from "react"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const session = window.localStorage

export const NavContext = createContext()


export const NavProvider = ({children}) => {

    const [activeNav, setActiveNav] = useState()

    const changeNav = (nav) => {
        // console.log(nav)
        setActiveNav(nav)
        session.setItem('activeNav', JSON.stringify(nav))
    }

    const loadNav = () => {
        const savedNav = JSON.parse(session.getItem('activeNav'))
        savedNav && savedNav.name ? setActiveNav(savedNav) : setActiveNav('Dashboard')
        // window.location.assign(savedNav.link)

    }

    useEffect(()=>{
        !activeNav && loadNav()
    },[activeNav])

    return(
        <NavContext.Provider value={{activeNav, changeNav}}>
            {children}
        </NavContext.Provider>
    )

}


export const SessionContext = createContext()

export const getLoggedUser = () => {
    return JSON.parse(session.getItem('tnwrk-user'))
}

export const SessionProvider = ({children}) => {
    const [loggedUser,setloggedUser] = useState()
    // const [effect, setEffect] = useState()

    // const navigate = useNavigate()

    const StartSession = (user) => {
        session.getItem('tnwrk-user') === null && session.setItem('tnwrk-user', JSON.stringify(user))
        StoreSession(user)
        // setEffect(true)
        // console.log(loggedUser)
        // window.location.assign('/dashboard')
        // setEffect()
    }

    const StoreSession = (user) => {
        user && user.email && setloggedUser(user) 
        // : window.location.assign('/login')
    }

    const DestroySession = () => {
        session.removeItem('tnwrk-user')
        setloggedUser()
        window.location.assign('/')
    }

    useEffect(()=>{
        !loggedUser && StoreSession(JSON.parse(session.getItem('tnwrk-user')))
    },[loggedUser])

    return(
        <SessionContext.Provider value={{loggedUser,StartSession,DestroySession}}>
            {children}
        </SessionContext.Provider>
    )
}