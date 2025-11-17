import {  createContext, useReducer ,useState} from "react"
import ContactForm from "../components/ContactForm"
import ContactItem from "../components/ContactItem"
import SearchBar from "../components/SearchBar"


export const userContext = createContext()

const initialstate ={contacts:[], editIndex:null }


const reducer=(state,action)=>{
switch (action.type){
    case "ADD" :
    return {...state , contacts:[...state.contacts ,action.payload]}
    case "DELETE" :
    return {...state , contacts:[...state.contacts.filter((_,i)=>i !== action.payload)]}
    case "EDIT" :
    return {...state , editIndex:action.payload}
    case "SAVE_EDIT" :
    return {...state , contacts:state.contacts.map((data,i)=>i ===action.payload.index ?action.payload.updateContact:data),
        editIndex:null
    }
    case "DELETE_ALL" :
    return {...state , contacts:state.contacts.filter((_,i)=> !action.payload.includes(i))}
   
   
}
}


function ContactContext() {
const [state,dispatch] = useReducer(reducer,initialstate)
const[selectedIndex,setSelectedIndex] = useState([])
const[search,setSearch] = useState("")



const addContact = (name,email,phone)=>{
dispatch( {type : "ADD" ,payload :{name,email,phone}})
}
const deleteContact =(index)=>{

    dispatch({type : "DELETE" , payload:index})
}
const editContact =(index)=>{
    dispatch({type: "EDIT" , payload:index})
}

const saveEdit =(index,updateContact)=>{
    dispatch({type: "SAVE_EDIT" , payload:{index,updateContact}})
}

 const deleteAll =()=>{
     dispatch({type:"DELETE_ALL" , payload:selectedIndex})
     setSelectedIndex([])
 }





  return (
    <div> 
         <userContext.Provider value={{ addContact,search,setSearch,contacts:state.contacts,deleteContact,editContact,editIndex:state.editIndex,saveEdit,selectedIndex,setSelectedIndex,deleteAll}}>
          <SearchBar />
          <ContactForm />
          <ContactItem />
         
         
        </userContext.Provider>
    </div>
  )
}

export default ContactContext