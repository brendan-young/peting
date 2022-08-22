DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS pets
DROP TABLE IF EXISTS toy_reviews
DROP TABLE IF EXISTS toys


CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100)
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  breed VARCHAR(100),
  about text,
  image_url VARCHAR DEFAULT 'https://res.cloudinary.com/dtfpk4gbd/image/upload/v1657589215/jkkoukty2ltng3bm45vu.jpg'
  user_id SERIAL REFERENCES users (id) ON DELETE CASCADE 
);

CREATE TABLE toy_reviews (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP DEFAULT current_timestamp,
  headline VARCHAR(255)
  description text,
  longevity int,
  rating int,
  enjoyment int,
  repurchase boolean,
  pet_id SERIAL REFERENCES pets (id) ON DELETE CASCADE
  toy_id SERIAL REFERENCES toy (id) ON DELETE CASCADE 
);

CREATE TABLE toys (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description text,
  price DECIMAL,
  image_url VARCHAR DEFAULT 'https://www.petcircle.com.au/petcircle-assets/images/products/p/tuffy-dinosaurs-t-rex.png'
)

