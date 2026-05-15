import bcrypt from "bcrypt";
import db from "../../db";
import ServerError from "../../errors/serverError";

export const signupService = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) => {
  // verifiying if the user email already exists in db
  const { rows: userByEmail } = await db.query(
    `SELECT * FROM users WHERE email = '${email}'`,
  );
  if (userByEmail.length > 0)
    throw new ServerError("User already exists", "duplicate email", 409);

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // inserting the user into the db
  const user = await db.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstname, lastname, email, hashedPassword],
  );

  return user.rows[0];
};
