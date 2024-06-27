import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required")
})

export const signupSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phonenumber: yup.string().required("Phone Number is required"),
  password: yup.string().required("Password is required")
})