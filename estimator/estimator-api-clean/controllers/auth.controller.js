const {db} = require('../db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function sign(user) {
  try{
    const header = {
      alg: 'HS256', 
      typ: 'JWT', 
    };
    const payload = {
      email: user.email,
      password: user.password
    };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signatureInput = encodedHeader + '.' + encodedPayload;
    
    const signature = crypto
    .createHmac('sha256', 'secret')
    .update(signatureInput)
    .digest('base64');
    console.log(`${encodedHeader}.${encodedPayload}.${signature}`);
  
    
    return ( {token: `${encodedHeader}.${encodedPayload}.${signature}`});
  } catch (e){
    return null
  }
}

class AuthController {
  async signIn(req, res) {
    try{
      const {email, password} = req.body;
      const user = await db.query('SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1', [email]);
      if (!user.rows.length) {
        throw new Error('User not found');
      }
      const validatePassword = await bcrypt.compareSync(password, user.rows[0].password);
      if (validatePassword) {
        res.json( await sign(user.rows[0]))
      }
      else{
        throw new Error('Invalid password or email');
      }
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }

  async signUp(req, res) {
    try{
      const {email, password} = req.body;
      const query = `SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1`;
      const user = await db.query(query, [email]);
      if (user.rows.length) {
        throw new Error('User already exists');
      }
      const hashPassword = bcrypt.hashSync(password, 7);
     
      const newUser = await db.query('INSERT INTO "users" ("email", "password", "firstName", "lastName") VALUES ($1, $2, $3, $4)', [email, hashPassword, req.body.firstName, req.body.lastName]);
      res.json( await sign({email, hashPassword}))
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
}

module.exports = new AuthController();