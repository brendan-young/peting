from fileinput import close
import json
from flask import Flask, jsonify, g, request

from .db import get_db, close_db


app = Flask(__name__)

@app.before_request
def connect_to_db():
    get_db()

# ===========================
# Users
# ===========================

# Route for users and all associated

@app.route('/users')
def users():
    db = get_db()
    query = 'SELECT * FROM users JOIN pets ON users.id = pets.user_id'
    db['cursor'].execute(query)
    users = db['cursor'].fetchall()
    close_db()
    return jsonify(users)

# ===========================
# Pets
# ===========================

# Route for list of all pets

@app.route('/pets')
def home():
    db = get_db()
    query = 'SELECT * FROM pets'
    db['cursor'].execute(query)
    pets = db['cursor'].fetchall()
    close_db()
    return jsonify(pets)


# Route for pet and reviews that pet has, and users it the pet belongs to

@app.route('/pets/<pet_id>')
def show_pet_reviews(pet_id):
    # return toy_reviews_id
    db = get_db()
    query = """
    SELECT * FROM pets
    JOIN toy_reviews ON pets.id = toy_reviews.pet_id
    JOIN users ON pets.user_id = users.id
    WHERE pets.id = %s
    """
    db['cursor'].execute(query, (pet_id,))
    pet_reviews = db['cursor'].fetchone()
    close_db()
    return jsonify(pet_reviews)

#Route for new pet for a user

@app.route('/pets/new', methods=['POST'])
def new_pet():
    name = request.json['name']
    breed = request.json['breed']
    about = request.json['about']
    image_url = request.json['image_url']
    user_id = request.json['user_id']
    db = get_db()
    query = """
        INSERT INTO pets
        (name, breed, about, image_url, user_id)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
    """
    db['cursor'].execute(query, (name, breed, about, image_url, 1))
    db['connection'].commit()
    pet = db['cursor'].fetchone()
    close_db()
    return jsonify(pet)

# Route to update pets

@app.route('/pets/<pet_id>', methods=['PUT'])
def update_pet(pet_id):
    name = request.json['name']
    breed = request.json['breed']
    about = request.json['about']
    image_url = request.json['image_url']
    user_id = request.json['user_id']
    db = get_db()
    query = """
      UPDATE pets
      SET name = %s, breed = %s, image_url = %s, user_id = %s, pet_id = %s 
      WHERE pets.id = %s
      RETURNING *
    """
    db['cursor'].execute(query, (name, breed, image_url, user_id, pet_id))
    db['connection'].commit()
    pet = db['cursor'].fetchone()
    close_db()
    return jsonify(pet)

# Route to DELETE pet

@app.route('/pets/<pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    db = get_db()
    query = """
      DELETE FROM pets
      WHERE id = %s
      RETURNING *
    """
    db['cursor'].execute(query, (pet_id))
    db['connection'].commit()
    pet = db['cursor'].fetchone()
    close_db()
    return jsonify(pet)

# ===========================
# Toys
# ===========================

# Route to show all toys 

@app.route('/toys')
def show_toys():
    db = get_db()
    query = 'SELECT * FROM toys'
    db['cursor'].execute(query)
    toys = db['cursor'].fetchall()
    close_db()
    return jsonify(toys)

# ===========================
# Reviews
# ===========================

# Route for each toy to see all reviews

@app.route('/toys/<toy_id>')
def show_toy_reviews(toy_id):
    # return toy_id
    db = get_db()
    query = """
    SELECT * FROM toys
    JOIN toy_reviews ON toys.id = toy_reviews.toy_id
    WHERE toys.id = %s
    """
    db['cursor'].execute(query, (toy_id,))
    toy_reviews = db['cursor'].fetchall()
    close_db()
    return jsonify(toy_reviews)


# Route to show all reviews

@app.route('/reviews')
def reviews():
    db = get_db()
    query = 'SELECT * FROM toy_reviews'
    db['cursor'].execute(query)
    reviews = db['cursor'].fetchall()
    close_db()
    return jsonify(reviews)

#Route to show single review

@app.route('/reviews/<review_id>')
def show_review(review_id):
    db = get_db()
    query = """
      SELECT * FROM toy_reviews
      WHERE toy_reviews.id = %s
    """
    db['cursor'].execute(query, (review_id,))
    show_review = db['cursor'].fetchone()
    close_db
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
    db = get_db()
    query = """
        INSERT INTO toy_reviews
        (headline, description, longevity, rating, enjoyment, repurchase, pet_id, toy_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """
    db['cursor'].execute(query, (headline, description, longevity, rating, enjoyment, repurchase, 1, 2))
    db['connection'].commit()
    review = db['cursor'].fetchone()
    close_db()
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
    db = get_db()
    query = """
      UPDATE toy_reviews
      SET headline = %s, description = %s,  longevity = %s, rating = %s, enjoyment = %s, repurchase = %s, pet_id = %s, toy_id = %s 
      WHERE toy_reviews.id = %s
      RETURNING *
    """
    db['cursor'].execute(query, (headline, description, longevity, rating, enjoyment, repurchase, pet_id, toy_id, review_id))
    db['connection'].commit()
    review = db['cursor'].fetchone()
    close_db()
    return jsonify(review)

# Route to DELETE a review

@app.route('/reviews/<review_id>', methods=['DELETE'])
def delete_review(review_id):
    db = get_db()
    query = """
      DELETE FROM toy_reviews
      WHERE id = %s
      RETURNING *
    """
    db['cursor'].execute(query, (review_id))
    db['connection'].commit()
    review = db['cursor'].fetchone()
    close_db()
    return jsonify(review)