from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
# from passlib.hash import pbkdf2_sha256
import sqlite3


app = Flask(__name__)
# db.init_app(app)
app.secret_key = 'your_secret_key'


@app.route('/register', methods=['GET', 'POST'])
def register():
    print(request.method)
    if request.method == 'POST':
        data = request.form.to_dict()  # Get form data as dictionary
        print(data)
        username = data['username']
        password = generate_password_hash(data['password'])
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()

            # Execute your queries
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))   

            conn.commit()

        # return jsonify({'message': 'Registration successful.'})
        return render_template('login.html')

    return render_template('create-account.html')

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.data
#         password = request.form['password']
        # with sqlite3.connect('database.db') as conn:
        #     cursor = conn.cursor()

        #     # Execute your queries
        #     cursor = conn.cursor()
        #     cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        #     user = cursor.fetchone()
        #     conn.commit()

#         if user and check_password_hash(user[2], password):
#             session['user'] = username
#             return redirect(url_for('select_plan'))
#     print(request.method)
#     return render_template('login.html')


# app.py
@app.route('/')
def start():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' :
        data = request.json  # Get JSON data from the request

        username = data['username']
        password = data['password']

        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()

            # Execute your queries
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
            user = cursor.fetchone()
            conn.commit()
        if user[0] == username and check_password_hash(user[1], password):
            session['user'] = username
            return jsonify({'message': 'Login successful.'})

        return jsonify({'message': 'Invalid username or password.'}), 400
    return render_template('login.html')


@app.route('/subscription-plans')
def select_plan():
    return render_template('subscription-plans.html')

@app.route('/create_subscription', methods=['POST'])
def create_subscription():
    plan = request.json['plan']
    interval = request.json['interval']

    # Use Stripe API to create subscription here

    # For demonstration, we'll just return a JSON response
    return jsonify({'message': f'Subscribed to {plan} plan ({interval}).'})

if __name__ == '__main__':
    app.run(debug=True)
