import React, { useContext } from 'react'
import {modalContext} from "./ModalProvider"
import { userContext } from '../context/ContactContext'

function EditContact({index}) {
    const{openModal}=useContext(modalContext)
    const{editContact}=useContext(userContext)
  return (
    <div>
      <button onClick={()=>{editContact(index); openModal({type:"form"})}
        
       }>Edit</button>


    </div>
  )
}

export default EditContact