from flask import Flask, render_template, request, redirect, url_for, flash
import os
import sqlite3
app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "users.db")
@app.route('/')
def index():
    return render_template('login.html')
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("資料庫裡的表格:", tables)
    cursor.execute("SELECT * FROM teachers")
    all_teachers = cursor.fetchall()
    print("teachers 表內容:", all_teachers)
    cursor.execute("SELECT * FROM teachers WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()
    if not user:
        return redirect(url_for('index', error_type='username'))
    elif user[1] != password:
        return redirect(url_for('index', error_type='password'))
    return redirect(url_for('grades', teacher_name=username))
@app.route('/grades')
def grades():
    teacher_name = request.args.get('teacher_name')
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM grades ORDER BY student_id ASC")
    all_grades = cursor.fetchall()
    conn.close()
    return render_template('grades.html', grades=all_grades, teacher_name=teacher_name)
@app.route('/add_grade', methods=['POST'])
def add_grade():
    name = request.form.get('student_name')
    student_id = request.form.get('student_id')
    score = request.form.get('grade')
    teacher_name = request.form.get('teacher_name')
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO grades (name, student_id, score) VALUES (?, ?, ?)",
        (name, student_id, score)
    )
    conn.commit()
    conn.close()
    return redirect(url_for('grades', teacher_name=teacher_name))
@app.route('/delete_grade', methods=['POST'])
def delete_grade():
    student_id = request.form.get('student_id')
    teacher_name = request.form.get('teacher_name')
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM grades WHERE student_id=?", (student_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('grades', teacher_name=teacher_name))
if __name__ == '__main__':
    app.run(debug=True)