
# 🎓 Faculty Feedback System

A web-based **Faculty Feedback System** built using **Flask**. This project allows students to log in, submit course/faculty feedback through forms, and securely store the responses in both a local **SQLite database** and **Google Sheets** for further analysis.

---

## 🚀 Features

* 🔐 **User Authentication** – Secure login & session management with Flask-Login & bcrypt.
* 📝 **Dynamic Feedback Forms** – Collects structured feedback (20+ questions).
* ☁️ **Google Sheets Integration** – Stores responses in Google Sheets via Google API.
* 🎓 **Student Dashboard** – Personalized dashboard based on department & year.
* 🧑‍🏫 **Faculty Mapping** – Each course is mapped to faculty members dynamically.
* 📊 **Data Persistence** – Local database (`SQLite`) for user management.

---

## 🛠️ Tech Stack

* **Backend:** Flask (Python)
* **Database:** SQLite (via SQLAlchemy)
* **Authentication:** Flask-Login, Flask-Bcrypt
* **Cloud Integration:** Google Sheets API (`gspread`)
* **Frontend:** HTML, Jinja2 Templates, Bootstrap

---

## ⚙️ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Set up Virtual Environment (Recommended)**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Linux/Mac
   venv\Scripts\activate      # On Windows
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Google Sheets API**

   * Create a Google Cloud project and enable **Google Sheets API**.
   * Download the JSON credentials file.
   * Update the path in `app.py` / `admin.py`:

     ```python
     CREDS = ServiceAccountCredentials.from_json_keyfile_name("your-credentials.json", SCOPE)
     ```

5. **Initialize Database**

   ```bash
   flask shell
   >>> from app import db
   >>> db.create_all()
   ```

6. **Run the Application**

   ```bash
   python app.py
   ```

---

## 📂 Project Structure

```
.
├── app.py                  # Main application entry point
├── admin.py                # Admin/dashboard logic
├── tempCodeRunnerFile.py   # Test runner file
├── users.db                # SQLite Database
├── templates/              # HTML Templates
├── static/                 # CSS, JS, images
└── requirements.txt        # Python dependencies
```



👉 Do you want me to also generate a **requirements.txt** file (with all the dependencies from your code) so your README setup becomes complete?
