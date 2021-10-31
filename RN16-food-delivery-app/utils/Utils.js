function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value == "") {
    setEmailError("");
  } else if (isValidEmail(value)) {
    setEmailError("");
  } else {
    setEmailError("Invalid Email");
  }
}

function validatePassword(value, setPasswordError) {
  if (value == "") {
    setPasswordError("");
  } else if (value.length < 9) {
    setPasswordError("Password must be 9 characters");
  } else {
    setPasswordError("");
  }
}

function validateInput(value, maxLength, setCardNumberError) {
  if (value === "") {
    setCardNumberError("");
  } else if (value.trim().length < maxLength) {
    setCardNumberError("Invalid Input");
  } else {
    setCardNumberError("");
  }
}

const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validateInput,
};

export default utils;
