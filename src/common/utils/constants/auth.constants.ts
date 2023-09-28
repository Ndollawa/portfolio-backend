// username regex must start with a lowercase or uppercase laters and must be followed by lower or uppercase or digits,- or _ of 3 to 23 characters
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
// requires atleast 0ne uppercase, lowercase,digit, special character and a total of 8 t0 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export { USER_REGEX, PWD_REGEX, EMAIL_REGEX };
