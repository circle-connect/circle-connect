const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const {
    first_name,
    last_name,
    phone_no,
    email,
    password,
    role_id,
  } = req.body;
  const saltRounds = parseInt(process.env.SALT);

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const query = `INSERT INTO admin (first_name, last_name, phone_no, 
       email, password,role_id) VALUES ($1,$2,$3,$4,$5,$6)`;
    const VALUES = [
      first_name,
      last_name,
      phone_no,
      email.toLowerCase(),
      encryptedPassword,
      role_id,
          ];

    pool
      .query(query, VALUES)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Account created successfully",
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err: err.message,
        });
      });
  } catch (error) {
    throw Error;
  }
};
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM admin WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              Phone_Number: result.rows[0].phone_no,
              first_name: result.rows[0].first_name,
              last_name: result.rows[0].last_name,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                success: true,
                message: `Valid login credentials`,
                token,
                userId: result.rows[0].id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,

            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message: "server erro",
        err: err.message,
      });
    });
};

module.exports = {
  register,
  login,
};
