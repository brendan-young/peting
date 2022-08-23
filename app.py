from flask import Flask, jsonify, g, request

from werkzeug.security import generate_password_hash

from .db import get_db, close_db


app = Flask(__name__)

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

#Route for new pet for a user

@app.route('/pets/new', methods=['POST'])
def new_pet():
    name = request.json['name']
    breed = request.json['breed']
    about = request.json['about']
    image_url = request.json['image_url']
    user_id = request.json['user_id']
    query = """
        INSERT INTO pets
        (name, breed, about, image_url, user_id)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
    """
    g.db['cursor'].execute(query, (name, breed, about, image_url, 1))
    g.db['connection'].commit()
    pet = g.db['cursor'].fetchone()
    return jsonify(pet)

# Route to update pets

@app.route('/pets/<pet_id>', methods=['PUT'])
def update_pet(pet_id):
    name = request.json['name']
    breed = request.json['breed']
    about = request.json['about']
    image_url = request.json['image_url']
    user_id = request.json['user_id']
    query = """
      UPDATE pets
      SET name = %s, breed = %s, image_url = %s, user_id = %s, pet_id = %s 
      WHERE pets.id = %s
      RETURNING *
    """
    g.db['cursor'].execute(query, (name, breed, image_url, user_id, pet_id))
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