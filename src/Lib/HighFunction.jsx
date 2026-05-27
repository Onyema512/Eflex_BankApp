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

export const BaseURL = import.meta.env.VITE_BASE_URL;

export const GetProfile = (profileName) => {
    const profile = profileName?.charAt(0);
    return profile;
}

export const getInitials = (profile) => {
    const initials = profile
    ?.split(" ")
    ?.map((name) =>name.charAt(0))
    ?.join("")
    return initials;
}