import React from 'react'
import { useContext } from 'react'
import { userContext } from '../context/ContactContext'
import { modalContext } from './ModalProvider'
import styles from "./contactForm.module.css"


function ContactItem() {
    const {contacts=[],deleteContact,editContact,selectedIndex,setSelectedIndex,search=""} = useContext(userContext)
    const{state,openModal,closeModal} = useContext(modalContext)

   const filteredItem=(contacts|| []).filter((contact)=>(contact?.name?? "").toLowerCase().includes(search.toLowerCase())||
   (contact?.email?? "").toLowerCase().includes(search.toLowerCase())|| (contact?.phone??"").toLowerCase().includes(search.toLowerCase()) )
    
  return (
    <div>
         {filteredItem.length>0 &&( filteredItem.map((contact,index)=><div key={index} className={styles.text} >

        <p>{contact.name || "-"}</p> 
        <p>{contact.email || "-" }</p>
       <p>{contact.phone  || "-"  }</p> 

       <button onClick={()=>openModal({type:"delete" , data:{index}})}>Delete</button>

      
       <button onClick={()=>{editContact(index); openModal({type:"form"})}
        
       }>Edit</button>

       <input type="checkbox" name="" id="" checked={selectedIndex.includes(index)} 
        onChange={()=>setSelectedIndex(prev=>{
          if(prev.includes(index)){
          return prev.filter((i)=>i !==index)
        }else{return[...prev,index]}}
      )
      }/>
      </div>))
       }
        { state.modalType === "delete" &&  <div  className={styles.inputcontainer}   ><p>Are you sure to delelte this item?</p>
       <button onClick={()=>{deleteContact(state.payload.index);closeModal()}}>ok</button>
       <button  onClick={closeModal}>no</button>
       </div>}

    </div>
  )
}
export default ContactItem