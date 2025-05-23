export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const nameParts = name.split(" ");
    let initials = "";

    for (let i = 0; i < nameParts.length; i++) {
        initials += nameParts[i][0];
    } 

    return initials.toUpperCase();
}