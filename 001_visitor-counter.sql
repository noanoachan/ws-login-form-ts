CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  roles VARCHAR(255) DEFAULT NULL
  );
  
  SELECT * FROM users WHERE username = 'username' AND password = 'password';
