import { Outlet } from "react-router"
import AppNavBar from "./AppBar"
import Footer from "./Footer"

const AppLayout = () => {
    return (
    <>
        <AppNavBar  />
        <Outlet />
        <Footer />
    </>
    )
}

export default AppLayout