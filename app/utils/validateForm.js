export const isValidateConfirmPassword = (password, passwordConfirm) => {
    return password === passwordConfirm;
}
export const isValidatePassword = (password) => {
    const checkPass = /^(?=.*\d)(?=.*[a-z])(?=.*?[_.,\+*&!^&%$()#@?])([a-zA-Z0-9_.,\+*!^&%$()#@?]{6,})$/;
    return checkPass.test(password);
};

export const utilityIsValidEmail = (email) => {
    const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};