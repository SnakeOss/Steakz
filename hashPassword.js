const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'admin123';  // This is the password you want to hash
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);  // This should log the hashed password
}

hashPassword();
