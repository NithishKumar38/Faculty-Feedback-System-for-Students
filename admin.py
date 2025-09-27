from flask import Flask, render_template, redirect, url_for, request, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Google Sheets API Authentication
SCOPE = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
CREDS = ServiceAccountCredentials.from_json_keyfile_name(r"E:\FINAL-WEB\metal-imprint-453415-q9-b5494fb00c71.json", SCOPE)
CLIENT = gspread.authorize(CREDS)

SHEET_KEY = "1Ss261Rm7MvZJ_uqN3_tQe9q5uVleF3___qbDxZdyQHQ"
sheet = CLIENT.open_by_key(SHEET_KEY).sheet1 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    year = db.Column(db.String(20), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

faculty_data = {
    "CSE": {
        "2nd Year": [
            {"name": "Mrs. S. Anuba", "course": "Big Data Analytics", "code": "CCS334", "image": "anuba.png"},
            {"name": "Mrs. S.S. Jaya", "course": "Cloud Computing", "code": "CCS335", "image": "jaya.png"}
        ],
        "3rd Year": [
            {"name": "Ms. K.P. Mythili", "course": "Embedded Systems & IOT", "code": "CC3691", "image": "mythili.png"}
        ]
    },
    "ECE": {
        "Final Year": [
            {"name": "Ms. R. Thenmalar", "course": "Network Security", "code": "CCS354", "image": "thenmalar.png"}
        ]
    }
}

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
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/dashboard')
@login_required
def dashboard():
    username = current_user.username
    name = current_user.name
    
    # Extract batch and course info from username
    batch = username[4:6]
    course = username[6:9]
    
    department_map = {'104': 'cse', '105': 'ece', '106': 'eee', '107': 'aids'}
    year_map = {'22': 'final_year', '23': '3rd_year', '24': '2nd_year'}
    
    department = department_map.get(course, 'unknown')
    year = year_map.get(batch, 'unknown')
    
    faculty_list = faculty_data.get(department, {}).get(year, [])
    
    return render_template('dashboard.html', name=name, faculty_list=faculty_list)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
