export const fromDate = (maxAge: number) => {
    const currentDate = new Date();
    const expiryDate = new Date();
    const maxAgeMilliseconds = maxAge * 1000; // Convert maxAge to milliseconds
    expiryDate.setTime(currentDate.getTime() + maxAgeMilliseconds);
    return expiryDate.toISOString();
};
