const extractToken = (req) =>{

    const token = req.headers.authorization;

    if(!token || !token.startsWith("Bearer ")) {
        return null;
    }

    return token.split(" ")[1];
}

module.exports = extractToken;