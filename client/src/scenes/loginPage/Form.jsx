import * as yup from "yup";

//Validate the inputs for registering
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

//Validate the inputs for logging in
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

//Set initial values for registering
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

//Set initial values for logging in
const initialValuesLogin = {
    email: "",
    password: "",
}