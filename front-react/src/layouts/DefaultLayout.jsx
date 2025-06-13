import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Alert from "../components/ui/Alert";

export default function DefaultLayout () {


    return (

        <>
            <Header />

            <Alert />

            <Outlet />

            {/* <Footer /> */}
        </>

    );
};