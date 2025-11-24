import React, { useEffect } from 'react'
import { userContext } from '../context/ContactContext'
import { useContext } from 'react'
import { modalContext } from './ModalProvider'
import styles from "./contactForm.module.css"
import DeleteAll from './DeleteAll'
import { contactSchema } from "../validations/contactValidation"
import { yupResolver }  from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"


function ContactForm() {
const {addContact,contacts,editIndex,saveEdit,deleteAll} =useContext(userContext)
const{register,handleSubmit,formState:{errors},reset,setValue} =useForm({
  resolver :yupResolver(contactSchema)
})
const{openModal,closeModal,state}=useContext(modalContext)
   
   
  

    useEffect(()=>{
    if(editIndex !== null){
    const editData = contacts[editIndex]
    setValue("name",editData.name)
    setValue("email",editData.email)
    setValue("phone",editData.phone)
    openModal({type:"form"})
    }else {reset()}
    },[editIndex,contacts])



    const onSubmit= (data)=>{
  
    if(editIndex === null){
    addContact(data.name,data.email,data.phone)
    openModal({type: "add", data})
    reset()
      }
    else if(editIndex !== null){
    saveEdit(editIndex,data)
    openModal({type :"form" ,data } )
        }
    }
      



  return (
    <>
    <div>
    <DeleteAll  openModal={openModal}  closeModal={closeModal} deleteAll={deleteAll}  />
  
    <div>
     
   <button onClick={()=>openModal({type:"form"})}  style={{fontSize:"20px"}} >✏️</button>
   <div  >
   { state.isShow &&   state.modalType === "form" && (
   
       <form  onSubmit={handleSubmit(onSubmit)}      className={styles.inputcontainer} > 

       <input  type='text' placeholder='enter name' {...register("name",{required :"Name is required"})}/>
     {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <input type='email'  placeholder='enter email' {...register("email",{required :"Email is required"})}/> 
       {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input type='text'  placeholder='enter phone' {...register("phone",{required :"Email is required"})}  /> 
       {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <button  type='submit'  >{editIndex ===null ?"Add" : "Edit"}</button>

         </form> )}
     
      
      {state.isShow && (
        <div>{state.modalType === "add" && <p className={styles.addData}>added successfuly</p>}
       
        
        <button onClick={()=>closeModal()}  className={styles.multiple}>×</button>
       
        </div>
      )}
      </div>

     
     
    </div> 
    </div>
    </>
  )
}

export default ContactForm