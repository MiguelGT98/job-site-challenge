const knex = require("../database/connection");
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

class User {
  id;
  email;
  name;
  password;

  constructor(id, email, name, password) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
  }

  // Creates a new user and inserts it into the database
  static create(userData) {
    return bcrypt.hash(userData.password, 10).then((encryptedPassword) => {
      delete userData.password;

      const newUser = new User(
        uuidv4(),
        userData.email,
        userData.name,
        encryptedPassword
      );

      return newUser.insert();
    });
  }

  // Logins a user
  // Returns a jwt if auth data is right, null if it's not
  static login(userData) {
    let user;

    return knex("users")
      .select(["email", "name", "password"])
      .where("email", userData.email)
      .then((users) => {
        if (users.length === 0) return null;

        user = users[0];

        return bcrypt.compare(userData.password, user.password);
      })
      .then((match) => {
        if (!match) {
          return null;
        }

        // Create a jwt for the user
        const token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.SECRET
        );

        return token;
      });
  }

  // Validates a jwt
  // Returns the decoded token if valid, null if invalid
  static validate(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch (err) {
      return null;
    }
  }

  // Inserts the user into the database
  // Returns token if inserted, false if it was not
  insert() {
    return knex("users")
      .insert({
        id: this.id,
        email: this.email,
        name: this.name,
        password: this.password,
      })
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((e) => {
        console.error("Error:", e);
        return false;
      });
  }
}

module.exports = User;
