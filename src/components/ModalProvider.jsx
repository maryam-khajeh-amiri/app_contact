import React, { createContext, useReducer } from 'react'

export const modalContext = createContext()

const initialState ={isShow:false ,modalType :"", payload:null }
const reducer =(state,action)=>{
    switch(action.type){
        case "OPEN_MODAL" :
        return {...state , isShow:true,modalType :action.payload.type ,payload:action.payload.data}
        case "CLOSE_MODAL" :
          return{...state ,isShow:false,modalType:"",payload:null}
    }
}


function ModalProvider({children}) {
    const[state,dispatch]=useReducer(reducer,initialState)
    
    const openModal=(type)=>{
        dispatch( {type:"OPEN_MODAL" ,payload:type})
    }
    const closeModal =()=>{
      dispatch({type:"CLOSE_MODAL" ,  payload:null})
    }
  
  return (
    < modalContext.Provider value={{openModal,closeModal,state}}>
  {children}
    </modalContext.Provider>
    
  )
}

export default ModalProvider