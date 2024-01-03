const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,}$/;
const url = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,}\.[a-z]{2,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$)/;
const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

module.exports = { password, url, email };
