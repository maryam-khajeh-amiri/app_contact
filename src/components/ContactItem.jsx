import React from 'react'
import { useContext } from 'react'
import { userContext } from '../context/ContactContext'
import styles from "./contactForm.module.css"
import Delete from './Delete'
import EditContact from './EditContact'


function ContactItem() {
    const {contacts=[],selectedIndex,setSelectedIndex,search=""} = useContext(userContext)
   

   const filteredItem=(contacts|| []).filter((contact)=>(contact?.name?? "").toLowerCase().includes(search.toLowerCase())||
   (contact?.email?? "").toLowerCase().includes(search.toLowerCase())|| (contact?.phone??"").toLowerCase().includes(search.toLowerCase()) )
    
  return (
    <div>
         {filteredItem.length>0 &&( filteredItem.map((contact,index)=><div key={index} className={styles.text} >

        <p>{contact.name || "-"}</p> 
        <p>{contact.email || "-" }</p>
       <p>{contact.phone  || "-"  }</p> 

      
      <Delete  index={index}/>
      
       <EditContact  index={index}  />

       <input type="checkbox" name="" id="" checked={selectedIndex.includes(index)} 
        onChange={()=>setSelectedIndex(prev=>{
          if(prev.includes(index)){
          return prev.filter((i)=>i !==index)
        }else{return[...prev,index]}}
      )
      }/>
      </div>))
       }
       

    </div>
  )
}
export default ContactItem