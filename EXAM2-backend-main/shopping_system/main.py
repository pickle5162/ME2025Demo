from flask import Flask, request, jsonify, render_template, session, redirect, url_for
import sqlite3
import re
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = "mysecret123"
DB_PATH = 'shopping_data.db'

def get_db_connection():
    if not os.path.exists(DB_PATH):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        # 使用者表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                password TEXT NOT NULL,
                email TEXT NOT NULL
            )
        """)
        # 商品表 (假設已經存在)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS shop_list_table (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                price INTEGER,
                gender TEXT,
                category TEXT
            )
        """)
        # 訂單表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                product_name TEXT NOT NULL,
                price INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                total INTEGER NOT NULL,
                order_time TEXT NOT NULL
            )
        """)
        conn.commit()
        conn.close()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# -----------------------------
# 註冊
# -----------------------------
@app.route('/page_register', methods=['GET', 'POST'])
def page_register():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        email = request.form.get('email', '').strip()

        # 密碼驗證
        errors = []
        if len(password) < 8:
            errors.append("密碼必須超過8個字元")
        if not re.search(r'(?=.*[a-z])(?=.*[A-Z])', password):
            errors.append("密碼必須包含大小寫英文")
        if errors:
            return f"<script>alert('{', '.join(errors)}，重新輸入');window.location.href='/page_register';</script>"

        # Email 驗證
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return "<script>alert('Email 格式不符，重新輸入');window.location.href='/page_register';</script>"

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=?", (username,))
        existing = cursor.fetchone()
        if existing:
            # 更新密碼或 email
            cursor.execute(
                "UPDATE users SET password=?, email=? WHERE username=?",
                (password, email, username)
            )
            conn.commit()
            conn.close()
            return "<script>alert('帳號已存在，成功修改密碼或信箱');window.location.href='/page_register';</script>"

        # 新增帳號
        cursor.execute(
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
            (username, password, email)
        )
        conn.commit()
        conn.close()
        return "<script>alert('註冊成功');window.location.href='/page_login';</script>"

    return render_template('page_register.html')

# -----------------------------
# 登入
# -----------------------------
def login_user(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    conn.close()
    return user is not None

@app.route('/page_login', methods=['GET', 'POST'])
def page_login():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        if login_user(username, password):
            session['username'] = username
            return "<script>alert('登入成功');window.location.href='/';</script>"
        else:
            return "<script>alert('帳號或密碼錯誤');window.location.href='/page_login';</script>"
    return render_template('page_login.html')

# -----------------------------
# 登出
# -----------------------------
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('page_login'))

# -----------------------------
# 購物介面
# -----------------------------
@app.route('/')
def index():
    username = session.get('username', '訪客')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM shop_list_table")
    products = cursor.fetchall()
    conn.close()
    return render_template('index.html', username=username, products=products)

# -----------------------------
# 下單
# -----------------------------
@app.route('/place_order', methods=['POST'])
def place_order():
    if 'username' not in session:
        return jsonify({"status": "error", "message": "請先登入"})

    data = request.get_json()
    order_items = data.get('order', [])
    total_price = 0
    conn = get_db_connection()
    cursor = conn.cursor()
    for item in order_items:
        name = item['name']
        price = item['price']
        qty = item['qty']
        total = price * qty
        total_price += total
        cursor.execute(
            "INSERT INTO orders (username, product_name, price, quantity, total, order_time) VALUES (?, ?, ?, ?, ?, ?)",
            (session['username'], name, price, qty, total, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        )
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "total_price": total_price})

# -----------------------------
if __name__ == '__main__':
    app.run(debug=True)