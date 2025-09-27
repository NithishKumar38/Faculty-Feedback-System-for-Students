import sqlite3

# Connect to SQLite database
conn = sqlite3.connect("database.db")  # Replace with your actual database file
cursor = conn.cursor()

# Delete the table (use the correct table name)
cursor.execute("DROP TABLE IF EXISTS user;")

# Commit changes and close connection
conn.commit()
conn.close()

print("Table deleted successfully!")
