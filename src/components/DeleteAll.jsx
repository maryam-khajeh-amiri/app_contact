import styles from "./contactForm.module.css"
import { useContext } from "react"
import { modalContext } from "./ModalProvider"
import {MdOutlineDeleteForever} from "react-icons/md"

function DeleteAll({deleteAll}) {

  const{state,openModal ,closeModal}=useContext(modalContext)

  return (
    <>
    <div className={styles.container}>
    <div>  <button onClick={()=>openModal({type:"delete_all"})} style={{fontSize:"20px"}} > <MdOutlineDeleteForever /></button></div>
    </div>

     <div >{state.modalType === "delete_all" && <div className={styles.inputcontainer}  >
        <p>Are you sure to delete all of these items?</p>
        <button onClick={()=>{deleteAll(),closeModal()}}>confirm</button>
        <button onClick={()=>closeModal()}>cancel</button>
        </div>}</div> 

    </>
  )
}

export default DeleteAll