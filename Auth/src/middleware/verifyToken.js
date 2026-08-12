import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // 1. Get the token from the request headers
    const authHeader = req.headers.authorization;

    // Check if the header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // 2. Extract the actual token (removes the "Bearer " part)
    const token = authHeader.split(" ")[1];

    try {
        // 3. Verify the token using your secret key
        const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key';
        const decoded = jwt.verify(token, JWT_SECRET);

        // 4. Attach the decoded user data (shopId, shopType) to the request object
        req.user = decoded;

        // 5. Move on to the actual controller function
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or Expired Token." });
    }
};
