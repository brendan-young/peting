from flask import Flask, jsonify, g, request, session

from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
import os
import cloudinary.uploader

from .db import get_db, close_db


app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

@app.before_request
def connect_to_db():
    get_db()

@app.after_request
def disconnect_from_db(response):
    close_db()
    return response

# ===========================
# Users
# ===========================

# Route for users and all associated pets

@app.route('/users')
def users():
    query = 'SELECT * FROM users JOIN pets ON users.id = pets.user_id'
    g.db['cursor'].execute(query)
    users = g.db['cursor'].fetchall()
    return jsonify(users)

# Route for each user and associated pets

@app.route('/users/<user_id>')
def show_user(user_id):
    query = """
        SELECT * FROM users 
        JOIN pets ON users.id = pets.user_id
        WHERE users.id = %s
    """
    g.db['cursor'].execute(query, (user_id))
    user = g.db['cursor'].fetchall()
    return jsonify(user)

# Route to REGISTER with password hashing and SESSION

@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    password_hash = generate_password_hash(password)
    query = """
        INSERT INTO users
        (username, password_hash)
        VALUES (%s, %s)
        RETURNING id, username
    """
    cur = g.db['cursor']

    try: 
        cur.execute(query, (username, password_hash))
    except psycopg2.IntegrityError: 
        return jsonify(success=False, msg='Username already taken')

    g.db['connection'].commit()
    user = cur.fetchone()
    session['user'] = user
    return jsonify(success=True, user=user)

# Route for LOGIN and saving SESSION

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    query="""
        SELECT * FROM users
        WHERE username = %s 
    """
    cur = g.db['cursor']
    cur.execute(query, (username,))
    user = cur.fetchone()

    if user is None: 
        return jsonify(success=False, msg='Username or password is incorrect')

    password_matches = check_password_hash(user['password_hash'], password)

    if not password_matches: 
        return jsonify(success=False, msg='Username or password is incorrect')


    user.pop('password_hash')
    session['user'] = user
    return jsonify(success=True, user=user)

# Route for LOGOUT

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify(success=True)

@app.route('/is-authenticated')
def is_authenticated():
    user = session.get('user', None)
    if user:
        return jsonify(success=True, user=user)
    else:
        return jsonify(success=False, msg='User is not logged in')


# ===========================
# Pets
# ===========================

# Route for list of all pets

@app.route('/pets')
def home():
    query = 'SELECT * FROM pets'
    g.db['cursor'].execute(query)
    pets = g.db['cursor'].fetchall()
    return jsonify(pets)


# Route for pet and reviews that pet has, and users it the pet belongs to

@app.route('/pets/<pet_id>')
def show_pet_reviews(pet_id):
    # return toy_reviews_id
    query = """
    SELECT * FROM pets
    JOIN toy_reviews ON pets.id = toy_reviews.pet_id
    JOIN users ON pets.user_id = users.id
    WHERE pets.id = %s
    """
    g.db['cursor'].execute(query, (pet_id,))
    pet_reviews = g.db['cursor'].fetchone()
    return jsonify(pet_reviews)

#Route for new pet for a user that must be logged in

@app.route('/pets/new', methods=['POST'])
def new_pet():
    name = request.form['name']
    breed = request.form['breed']
    about = request.form['about']
    image = request.files['image']
    uploaded_image = cloudinary.uploader.upload(image)
    image_url = uploaded_image['url'] 

    user = session.get('user', None)

    if user is None: 
        return jsonify(success=False, msg='You must be logged in to create a pet')

    query = """
        INSERT INTO pets
        (name, breed, about, image_url, user_id)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
    """
    g.db['cursor'].execute(query, (name, breed, about, image_url, user['id']))
    g.db['connection'].commit()
    pet = g.db['cursor'].fetchone()
    return jsonify(pet)

# Route to update pets

@app.route('/pets/<pet_id>', methods=['PUT'])
def update_pet(pet_id):
    name = request.form['name']
    breed = request.form['breed']
    about = request.form['about']
    image = request.files['image']
    uploaded_image = cloudinary.uploader.upload(image)
    image_url = uploaded_image['url'] 
    query = """
      UPDATE pets
      SET name = %s, breed = %s, about = %s, image_url = %s
      WHERE pets.id = %s
      RETURNING *
    """
    g.db['cursor'].execute(query, (name, breed, about, image_url, pet_id))
    g.db['connection'].commit()
    pet = g.db['cursor'].fetchone()
    return jsonify(pet)

# Route to DELETE pet

@app.route('/pets/<pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    query = """
      DELETE FROM pets
      WHERE id = %s
      RETURNING *
    """
    g.db['cursor'].execute(query, (pet_id))
    g.db['connection'].commit()
    pet = g.db['cursor'].fetchone()
    return jsonify(pet)

# ===========================
# Toys
# ===========================

# Route to show all toys 

@app.route('/toys')
def show_toys():
    query = 'SELECT * FROM toys'
    g.db['cursor'].execute(query)
    toys = g.db['cursor'].fetchall()
    return jsonify(toys)

# ===========================
# Reviews
# ===========================

# Route for each toy to see all reviews

@app.route('/toys/<toy_id>')
def show_toy_reviews(toy_id):
    # return toy_id
    query = """
    SELECT * FROM toys
    JOIN toy_reviews ON toys.id = toy_reviews.toy_id
    JOIN pets ON toy_reviews.pet_id = pets.id
    WHERE toys.id = %s
    """
    g.db['cursor'].execute(query, (toy_id,))
    toy_reviews = g.db['cursor'].fetchall()
    return jsonify(toy_reviews)


# Route to show all reviews

@app.route('/reviews')
def reviews():
    query = 'SELECT * FROM toy_reviews'
    g.db['cursor'].execute(query)
    reviews = g.db['cursor'].fetchall()
    return jsonify(reviews)

#Route to show single review

@app.route('/reviews/<review_id>')
def show_review(review_id):
    query = """
      SELECT * FROM toy_reviews
      WHERE toy_reviews.id = %s
    """
    g.db['cursor'].execute(query, (review_id,))
    show_review = g.db['cursor'].fetchone()
    return jsonify(show_review)


# Route for new review of toy

@app.route('/reviews/new', methods=['POST'])
def new_review():
    headline = request.json['headline']
    description = request.json['description']
    longevity = request.json['longevity']
    rating = request.json['rating']
    enjoyment = request.json['enjoyment']
    repurchase = request.json['repurchase']
    pet_id = request.json['pet_id']
    toy_id = request.json['toy_id']
    query = """
        INSERT INTO toy_reviews
        (headline, description, longevity, rating, enjoyment, repurchase, pet_id, toy_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """
    g.db['cursor'].execute(query, (headline, description, longevity, rating, enjoyment, repurchase, 1, 2))
    g.db['connection'].commit()
    review = g.db['cursor'].fetchone()
    return jsonify(review)

# Route to update a toy review

@app.route('/reviews/<review_id>', methods=['PUT'])
def update_review(review_id):
    headline = request.json['headline']
    description = request.json['description']
    longevity = request.json['longevity']
    rating = request.json['rating']
    enjoyment = request.json['enjoyment']
    repurchase = request.json['repurchase']
    pet_id = request.json['pet_id']
    toy_id = request.json['toy_id']
    query = """
      UPDATE toy_reviews
      SET headline = %s, description = %s,  longevity = %s, rating = %s, enjoyment = %s, repurchase = %s, pet_id = %s, toy_id = %s 
      WHERE toy_reviews.id = %s
      RETURNING *
    """
    g.db['cursor'].execute(query, (headline, description, longevity, rating, enjoyment, repurchase, pet_id, toy_id, review_id))
    g.db['connection'].commit()
    review = g.db['cursor'].fetchone()
    return jsonify(review)

# Route to DELETE a review

@app.route('/reviews/<review_id>', methods=['DELETE'])
def delete_review(review_id):
    query = """
      DELETE FROM toy_reviews
      WHERE id = %s
      RETURNING *
    """
    g.db['cursor'].execute(query, (review_id))
    g.db['connection'].commit()
    review = g.db['cursor'].fetchone()
    return jsonify(review)


