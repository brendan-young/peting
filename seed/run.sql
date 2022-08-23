\i schema.sql

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE pets_id_seq RESTART WITH 1;
ALTER SEQUENCE toys_id_seq RESTART WITH 1;
ALTER SEQUENCE toy_reviews_id_seq RESTART WITH 1;


\i seed/users.sql
\i seed/pets.sql
\i seed/toys.sql
\i seed/toy_reviews.sql
