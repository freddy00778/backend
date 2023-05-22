export const randomChars = count => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: count }, () => possible[Math.floor(Math.random() * possible.length)]).join('');
};

export const generateVerificationCode = () => {
    const numbers = Math.floor(1000 + Math.random() * 9000);
    const fourLetterString = randomChars(4)
    return `${fourLetterString}-${numbers}`
}