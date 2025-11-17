import React, { useEffect, useState } from 'react'
import { userContext } from '../context/ContactContext'
import { useContext } from 'react'
import { modalContext } from './ModalProvider'
import styles from "./contactForm.module.css"

function ContactForm() {
    const {addContact,contacts,editIndex,saveEdit,deleteAll} =useContext(userContext)
    const{openModal,closeModal,state}=useContext(modalContext)
    const[name,setName] =useState("")
    const[email,setEmail] = useState("")
    const[phone,setphone] =useState("")
    const[errors,setErrors]=useState({name:"" , email:"" , phone:""})
   
  
    
const validat =()=>{
const newErrors = {name:"" , email:"" ,phone:""}
if(name.trim() === ""){
  newErrors.name="please enter your name"
}
 if(email.trim()===""){
  newErrors.email="please enter your email"}
  else if(!/\S+@\S+\.\S+/.test(email)){
    newErrors.email="enter invalid email"
  }

 if( phone.trim()===""){
  newErrors.phone = "please enter phone"
}else if((!/^\d+$/.test(phone)) ){
  newErrors.phone="please enter valid number"
}
setErrors(newErrors)
return !newErrors.name && !newErrors.email && !newErrors.phone
}

   

    useEffect(()=>{
      if(editIndex !== null){
      const editData = contacts[editIndex]
    setName(editData.name)
    setEmail(editData.email)
    setphone(editData.phone)
    openModal({type:"form"})

    }else if(editIndex === null){
      setName("")
      setEmail("")
      setphone("")
    }
    
    },[editIndex,contacts])

    const addHandler=()=>{
      if(!validat())return

      if(editIndex === null){
        addContact(name,email,phone)
        setName ("")
        setEmail("")
        setphone("")
        openModal({type: "add", data:{name,email,phone}})
      }
        else if(editIndex !== null){
       saveEdit(editIndex,{name,email,phone})
       openModal({type :"form" ,data:{name,email,phone} } )
        }

       
       
    }
  return (
    <>
    <div className={styles.container}>
    <div>  <button onClick={()=>openModal({type:"delete_all"})} style={{fontSize:"20px"}} > Delete All</button></div>
  


 <div  >
   <button onClick={()=>openModal({type:"form"})}  style={{fontSize:"20px"}} >✏️</button>
   <div  >
   { state.isShow &&   state.modalType === "form" &&
   
       <div  className={styles.inputcontainer} > <input  type='text' placeholder='enter name' value={name} onChange={(e)=>setName(e.target.value)}/>
       {errors.name && <p>{errors.name}</p>}
        <input type='email'  placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/> 
        {errors.email && <p>{errors.email}</p>}
        <input type='text'  placeholder='enter phone' value={phone} onChange={(e)=>setphone(e.target.value)}/> 
        {errors.phone && <p>{errors.phone}</p>}
        <button onClick={addHandler}>{editIndex ===null ?"Add" : "Edit"}</button>

         </div> }
     
      
      {state.isShow && (
        <div>{state.modalType === "add" && <p className={styles.addData}>added successfuly</p>}
       
        
        <button onClick={()=>closeModal()}  className={styles.multiple}>×</button>
       
        </div>
      )}
      </div>

      <div >{state.modalType === "delete_all" && <div className={styles.inputcontainer}  >
        <p>Are you sure to delete all of these items?</p>
        <button onClick={()=>{deleteAll(),closeModal()}}>confirm</button>
        <button onClick={()=>closeModal()}>cancel</button>
        </div>}</div>
     
    </div> 
    </div>
    </>
  )
}

export default ContactForm