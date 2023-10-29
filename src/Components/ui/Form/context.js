import { createContext, useContext } from "react";

const FormContext = createContext(null);

export const FormContextProvider = FormContext.Provider;

export const FormContextConsumer = FormContext.Consumer;

export function useForm() {
  return useContext(FormContext);
}

export default FormContext;
