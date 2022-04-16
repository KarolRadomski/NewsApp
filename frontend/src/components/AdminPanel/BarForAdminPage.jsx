import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import style from '../../styles/BarForAdminPage.module.css';
import { useState } from 'react';
import AddPopUp from './AddPopUp';
function BarForAdminPage() {
  const [addPopUpVisible, setAddPopUpVisible] = useState(false);
  const switchAddPopUpVisible = () => {
    setAddPopUpVisible(!addPopUpVisible);
  };
  return (
    <>
      {addPopUpVisible ? <AddPopUp exit={switchAddPopUpVisible} /> : ''}
      <div className={style.menu} onClick={switchAddPopUpVisible}>
        <IoAddCircleOutline className={style.addIcon} />
        <div className={style.addText}>Add</div>
      </div>
      <div className={style.legend}>
        <div className={style.title}>Title</div>
        <div className={style.date}>Created at</div>
        <div className={style.manage}>Manage</div>
      </div>
    </>
  );
}

export default BarForAdminPage;
