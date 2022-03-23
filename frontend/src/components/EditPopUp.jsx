import style from '../styles/EditPopUp.module.css'

function EditPopUp({ news, exit }) {
   return (
      <div className={style.modal}>
         <div className={style.modal_content}>
            <span className={style.close} onClick={() => exit()}>&times;   </span>

            <form className={style.form}>
               <label >Title: &nbsp;
                  <input type="text" value={news.title} />
               </label>
               <label >Description: &nbsp;
                  <input className={style.descriptionInput} type="textarea" value={news.description} />
               </label>
               <label >Img URL: &nbsp;
                  <input type="text" value={news.img} />
               </label>
               <label >Category: &nbsp;
                  <input type="text" value={news.category} />

               </label>
               <button type="submit"> Wyslij </button>
            </form>

         </div>
      </div>
   )
}

export default EditPopUp