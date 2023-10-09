import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string().required("Name is required"),
})