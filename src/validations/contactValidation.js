 import * as yup from "yup"
 
 const contactSchema = yup.object().shape({
    name:yup.string().required("name is required"),
    email:yup.string().email("invalid email").required("email is required"),
    phone:yup.string().matches(/^(\+98|0)?9\d{9}$/, "invalid number").required("phone is required")
})

export{contactSchema}