const crypto = require('crypto');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const [encodedHeader, encodedPayload, signature] = token.split(' ')[1].split('.');

    const signatureInput = encodedHeader + '.' + encodedPayload;

    const expectedSignature = crypto
    .createHmac('sha256', 'secret')
      .update(signatureInput)
      .digest('base64');
      
      if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid token signature.' });
    }

    const decodedPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
    
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: 'Token has expired.' });
    }

    req.user = decodedPayload.sub;
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
  verifyToken
}