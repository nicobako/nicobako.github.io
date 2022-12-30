
import {Outlet} from "react-router-dom";

import styles from "./root.module.css"
import Header from "../components/header"

const Root = ()=>{
    return (
        <div className={styles.rootContainer}>
        <Header />
        
        <div>
            < Outlet />
        </div>
        </div>
    )
}

export default Root;