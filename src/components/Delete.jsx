import { useContext } from "react";
import {modalContext} from "./ModalProvider"
import { userContext } from "../context/ContactContext";
import styles from "./contactForm.module.css" 

function Delete({index}) {
    
  const{openModal , closeModal ,state }= useContext(modalContext)
  const{deleteContact} =useContext(userContext)


  return (
    <div>
         <button onClick={()=>openModal({type:"delete" , data:{index}})}>Delete</button>

         { state.modalType === "delete" &&  <div  className={styles.inputcontainer}   ><p>Are you sure to delete this item?</p>
       <button onClick={()=>{deleteContact(state.payload.index);closeModal()}}>ok</button>
       <button  onClick={closeModal}>no</button>
       </div>}

    </div>
  )
}

export default Delete