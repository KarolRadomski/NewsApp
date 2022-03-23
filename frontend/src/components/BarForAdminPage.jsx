import React from 'react'
import {IoAddCircleOutline} from 'react-icons/io5'
import style from '../styles/BarForAdminPage.module.css'
import { useState } from 'react'
import AddPopUp from "../components/AddPopUp"
function BarForAdminPage() {


    const [editPopUpVisible, setEditPopUpVisible] = useState(false);
    const switchEditPopUpVisible = () => {
      setEditPopUpVisible(!editPopUpVisible);
    }
  return (
    <>
        {editPopUpVisible ? (<AddPopUp exit={switchEditPopUpVisible} />) : ('')}
        <div className={style.container} onClick={switchEditPopUpVisible}>
            <IoAddCircleOutline className={style.addIcon}/>
            <div className={style.addText}>Add</div>
        </div>
    </>
  )
}

export default BarForAdminPage