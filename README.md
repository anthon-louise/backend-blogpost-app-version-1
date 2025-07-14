<h1 align="center">✨ Blog App (Backend) 📝</h1>

<p align="center">
  A Node.js / Express REST API for blogging: posts, likes, comments, user management, and admin roles.  
</p>

---

## 🎯 Purpose of This Project

Hi there! 👋  
This project is a **simple, learning-focused backend** for a blog app. It allows users to:

✅ Create and manage blog posts  
✅ Comment and like posts  
✅ Sign up/login as users or admins  
✅ Manage personal settings

I’m actively learning and always happy for feedback! If you find any bugs 🐛 or have suggestions 💡, please **let me know**:

📧 [anthonlouisenoynay123@gmail.com](mailto:anthonlouisenoynay123@gmail.com)

---

## 🚀 Features
✨ Clean REST API built with **Node.js** and **Express**  
👥 **Roles**: User and Admin  
📝 Users can **create posts**, **like**, and **comment**  
🛡️ Admin can **view all users**  
⚙️ User **settings management**  
📦 Modular folder structure for easy maintenance  

---

## 🌐 API Routes

### 👤 User Routes
- `POST /api/user/signup` → User signup
- `POST /api/user/login` → User login
- `POST /api/user/admin/signup` → Admin signup
- `POST /api/user/admin/login` → Admin login

---

### 📝 Post Routes
- `POST /api/post/` → Create a new post
- `GET /api/post/` → Get all posts
- `GET /api/post/:id` → Get single post
- `PUT /api/post/:id` → Update post
- `DELETE /api/post/:id/` → Delete post
- `POST /api/post/:id/comment` → Add comment to post
- `GET /api/post/:id/comment` → Get comments for post

---

### ❤️ Like Routes
- `POST /api/post/:id` → Like a post
- `DELETE /api/post/:id` → Unlike a post
- `GET /api/post/:id` → Get likes

---

### 💬 Comment Routes
- `PUT /api/comment/:id` → Update a comment
- `DELETE /api/comment/:id` → Delete a comment

---

### 🛡️ Admin Routes
- `GET /api/admin/` → Get all users

---

### ⚙️ Settings Routes
- `GET /api/settings` → Get user settings
- `PUT /api/settings` → Update user settings

---

## 🛠️ Tech Stack

- 🌐 **Language**: NodeJS (ExpressJS), JavaScript
- 💾 **Database**: MongoDB
- 📦 **Libraries & Dependencies**:
  - `jsonwebtoken` → JWT Authentication
  - `bcrypt` → Password hashing
  - `joi` → Data validation
  - `cookie-parser` → Cookie handling

---

## 🤝 Collaboration

💌 I'm happy to network or collaborate!  
📧 Email: **[anthonlouisenoynay123@gmail.com](mailto:anthonlouisenoynay123@gmail.com)**

---
# Thank you for visiting 

<img src='https://media.tenor.com/G4LDTapZqRQAAAAi/thanks-bro.gif' align='center'>
