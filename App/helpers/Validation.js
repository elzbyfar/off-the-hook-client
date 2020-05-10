import * as yup from "yup";

export default ValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  password: yup.string().label("Password").required(),
});
