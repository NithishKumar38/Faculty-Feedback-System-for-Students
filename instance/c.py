import sqlite3

# Connect to SQLite database
conn = sqlite3.connect("users.db")  # Replace with your actual database file
cursor = conn.cursor()

# Create a new table with specific constraints
cursor.execute("""
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
    );
""")

# Commit and close connection
conn.commit()
conn.close()

print("Table 'user' created successfully!")
