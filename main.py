"""
NHL v0.1 - Backend
Working version with all bugs fixed
Author: New Hemisphere Learning Team (Claude and me... I'm not sure if we should take credit for the XP bug fix, but let's be honest, it was a team effort)
"""

import os
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
import sqlite3

print("RUNNING FILE:", os.path.abspath(__file__))

# ============================================
# DATABASE SETUP
# ============================================

def init_database():
    """Initialize database tables"""
    conn = sqlite3.connect("nhl.db")
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            grade INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            total_xp INTEGER NOT NULL DEFAULT 0,
            level INTEGER NOT NULL DEFAULT 1
        )
    """)
    
    conn.commit()
    conn.close()
    print("✅ Database initialized")

init_database()

# ============================================
# DATABASE CONNECTION HELPER
# ============================================

def get_db():
    """Get database connection for each request"""
    db = sqlite3.connect("nhl.db")
    db.row_factory = sqlite3.Row
    try:
        yield db
    finally:
        db.close()

# ============================================
# PYDANTIC MODELS
# ============================================

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    grade: int

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    grade: int
    level: int
    total_xp: int
    created_at: str

# ============================================
# FASTAPI APP
# ============================================

app = FastAPI(
    title="NHL API",
    description="New Hemisphere Learning Backend",
    version="0.1"
)

# ============================================
# ENDPOINTS
# ============================================

@app.get("/")
def read_root():
    """Health check"""
    return {
        "message": "NHL Backend is running!",
        "version": "0.1",
        "status": "active"
    }

@app.post("/student", response_model=UserResponse)
def create_student(student: UserCreate, db: sqlite3.Connection = Depends(get_db)):
    """Create new student"""
    cursor = db.cursor()
    
    # Check if username exists
    cursor.execute("SELECT id FROM users WHERE username = ?", (student.username,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Check if email exists
    cursor.execute("SELECT id FROM users WHERE email = ?", (student.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Insert new user
    created_at = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO users (username, email, grade, created_at, total_xp, level)
        VALUES (?, ?, ?, ?, 0, 1)
    """, (student.username, student.email, student.grade, created_at))
    
    db.commit()
    
    # Get the created user
    user_id = cursor.lastrowid
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    
    return {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "grade": user["grade"],
        "level": user["level"],
        "total_xp": user["total_xp"],
        "created_at": user["created_at"]
    }

@app.get("/student/{username}", response_model=UserResponse)
def get_student(username: str, db: sqlite3.Connection = Depends(get_db)):
    """Get student by username"""
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "grade": user["grade"],
        "level": user["level"],
        "total_xp": user["total_xp"],
        "created_at": user["created_at"]
    }

@app.post("/student/{username}/xp")
def add_xp(username: str, xp_amount: int, db: sqlite3.Connection = Depends(get_db)):
    """Add XP to student - FIXED VERSION"""
    cursor = db.cursor()
    
    # Get current user
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Calculate new XP and level (ONCE, not twice!)
    old_xp = user["total_xp"]
    old_level = user["level"]
    new_xp = old_xp + xp_amount
    new_level = (new_xp // 100) + 1
    
    # Update database (ONCE!)
    cursor.execute("""
        UPDATE users 
        SET total_xp = ?, level = ?
        WHERE username = ?
    """, (new_xp, new_level, username))
    
    db.commit()
    
    leveled_up = new_level > old_level
    
    return {
        "username": username,
        "previous_xp": old_xp,
        "new_xp": new_xp,
        "previous_level": old_level,
        "new_level": new_level,
        "leveled_up": leveled_up,
        "xp_to_next_level": (new_level * 100) - new_xp
    }

@app.get("/students")
def list_students(db: sqlite3.Connection = Depends(get_db)):
    """List all students"""
    cursor = db.cursor()
    cursor.execute("SELECT username, email, grade, level, total_xp FROM users")
    users = cursor.fetchall()
    
    return {
        "total_students": len(users),
        "students": [
            {
                "username": user["username"],
                "email": user["email"],
                "grade": user["grade"],
                "level": user["level"],
                "total_xp": user["total_xp"]
            }
            for user in users
        ]
    }

# ============================================
# RUN APP
# ============================================

if __name__ == "__main__":
    import uvicorn
    print("\n🚀 Starting NHL Backend...")
    print("📍 API: http://localhost:8000")
    print("📚 Docs: http://localhost:8000/docs")
    print("Press CTRL+C to stop\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)