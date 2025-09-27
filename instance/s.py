import sqlite3

# Provide the correct path to the existing database file
db_path = r"D:\HOST\instance\users.db"  # Change this to the actual path

# Connect to the existing SQLite database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Check if the 'users' table exists
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables in database:", tables)  # Debugging: See all tables

# Fetch and display data if 'users' table exists
#cursor.execute("DROP TABLE user;")
cursor.execute("select * from user;")
#cursor.execute("CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username INTEGER NOT NULL UNIQUE, password DATE NOT NULL);")
users = cursor.fetchall()

print("\nStored Users in Database:")
print("-------------------------")
for user in users:
    print(user)

# Close the connection
conn.close()
