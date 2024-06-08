import { ALPHANUMERIC,EMAIL,REQUIRED,NUMERIC } from "./config"

export const Validations = {
  [REQUIRED]: {
    fn: (value) => value == null,
    message: "value is required"
  },
  [EMAIL]: {
    fn: (value) => !String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
    message: "Email is not valid"
  },
  [NUMERIC]: {
    fn: (value) => isNaN(value),
    message: "Only numerics allowed"
  },
  [ALPHANUMERIC]: {
    fn: (value) => !/^[a-zA-Z0-9]+$/.test(value),
    message: "only AlphaNumerics allowed"
  }   
}