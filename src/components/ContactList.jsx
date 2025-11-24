import { useContext, useEffect } from "react"
import { userContext } from "../context/ContactContext"





function ContactList() {
const {jsonContact } = useContext(userContext)

useEffect(()=>{

  const dataJson=()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>res.json())
        .then((json)=>{
         const formatData=json.map((user)=>({
                name:user.name,
                email:user.email,
                phone:user.phone
            }

            ))
            jsonContact(formatData)
        }
        )
        
    }
    dataJson()
},[])


  return (
     <div>
   
     </div>
  )
}

export default ContactList