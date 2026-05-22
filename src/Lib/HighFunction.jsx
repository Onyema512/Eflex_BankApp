export const ValidateInputs = (userData, error, setErrorMsg) => {
    if (
        !error.err &&
        userData.fullName &&
        userData.emailAddress &&
        userData.password &&
        userData.confirmPassword
    ) {
        return true;
    } else {
        setErrorMsg({
            err: true,
            name: "general",
            msg: "Please fill in all fields correctly",
        })
        return false;
    }
};