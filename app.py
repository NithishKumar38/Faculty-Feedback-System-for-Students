from flask import Flask, render_template, redirect, url_for, request, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Google Sheets API Authentication
SCOPE = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
CREDS = ServiceAccountCredentials.from_json_keyfile_name("metal-imprint-453415-q9-b5494fb00c71.json", SCOPE)
CLIENT = gspread.authorize(CREDS)

# Use the spreadsheet key to open the Google Sheet
SHEET_KEY = "1Ss261Rm7MvZJ_uqN3_tQe9q5uVleF3___qbDxZdyQHQ"
sheet = CLIENT.open_by_key(SHEET_KEY).sheet1 
app = Flask(__name__)
app.config['SECRET_KEY'] = 'a1b2c3d4e5f67890abcdef1234567890'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/form1.html', methods=["GET", "POST"])
def form():
    if request.method == "POST":
        faculty_id = request.args.get('facultyId', default=1, type=int) 
        responses = {
            f"{faculty_id}":[
            request.form.get("q1"), request.form.get("q2"), request.form.get("q3"),
            request.form.get("q4"), request.form.get("q5"), request.form.get("q6"),
            request.form.get("q7"), request.form.get("q8"), request.form.get("q9"),
            request.form.get("q10"),request.form.get("q11"), request.form.get("q12"), request.form.get("q13"),
            request.form.get("q14"), request.form.get("q15"), request.form.get("q16"),
            request.form.get("q17"), request.form.get("q18"), request.form.get("q19"),
            request.form.get("q20")]
        }

        if 'response' not in session:
            session['response'] = {}
        
        session['response'].update(responses)  # Store responses
        session.modified = True  # Ensure session updates

        print("Session Data after storing:", session['response'])  # Debugging

        return redirect("/dashboard")
    faculty_id = request.args.get('facultyId', default=1, type=int)  # Get facultyId from URL
    return render_template('form1.html', faculty_id=faculty_id)
    


@app.route("/submit", methods=["GET", "POST"])
@login_required
def submit():
    if request.method == "POST":
        if 'response' in session and session['response']:
            session['sorted_dict'] = {key: value for key, value in sorted(session['response'].items())}
            session['listt'] = [num for sublist in session['sorted_dict'].values() for num in sublist]
            session['listt'].insert(0, current_user.username)
            sheet.append_row(session['listt'])
            session.pop('response', None)
            session.modified = True  # Ensure session update
        else:
            flash("No responses to submit!", "danger")
    return render_template("thankyou.html")
    
    
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'danger')
    return render_template('index.html')

@app.route('/dashboard')
@login_required
def dashboard():
    if not current_user.is_authenticated or not current_user.username:
        flash("User not logged in properly", "danger")
        return redirect(url_for('login'))

    username = current_user.username  # Get the logged-in user's username
    if len(username) < 9:  # Ensure username has enough characters
        flash("Invalid username format", "danger")
        return redirect(url_for('login'))
    
    name = current_user.name
    
    batch = username[4:6]
    course = username[6:9]

    if batch == '22' and course == '104':
        return render_template('dashbord1.html',name=name)
    elif batch == '23' and course == '104':
        return render_template('register.html',name=name)
    
    flash("No valid course found", "danger")
    return redirect(url_for('home'))  

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
