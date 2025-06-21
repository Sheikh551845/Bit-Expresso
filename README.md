# ☕ Bit Expresso - Coffee Product Showcase Web App

Live Demo: [https://bitcode-expresso.web.app/](https://bitcode-expresso.web.app/)

---

## 🚧 Submission Note

We encourage submission even if the project is not 100% complete. Due to time constraints and balancing other responsibilities, some optimizations and edge cases were not fully implemented. However, the core functionality and UI are in place to demonstrate the project's capability.

---

## 💡 Thinking Process

The idea was to build a coffee product showcase and interaction platform. The main goal was to:

- Display a collection of coffee items.
- Allow users to **like**, **comment**, and **reply** to comments.
- Enable **product sorting** and **view details** functionality.
- Deliver a clean, responsive, and user-friendly interface with a warm color theme matching a coffee brand aesthetic.

---

## ✨ Feature Design

### 1. Product Listing & Sorting
- Implemented a page that lists all products and allows **sorting by likes** and **price**.
- Sorting is handled client-side for fast UI response.

### 2. Product Details Page
- Displays individual product data including image, description, price, etc.
- Shows **like and comment count** with interactive UI using `FaHeart` and `FaComment` icons.

### 3. Like System
- Each user can **like only once per product**.
- Likes are tracked via a dedicated `LikedInfo` collection (`uid` + `pid`).
- Backend ensures **no duplicate likes** from the same user.

### 4. Comment System
- Users can **comment**, **reply**, and **nested reply** up to 3 levels.
- Comments are organized using parent-child IDs.
- UI reflects real-time actions like delete and edit.

### 5. Authentication
- Login and Registration integrated with Firebase Authentication.
- Redirects users to intended page after login.

---

## 🏗 Architecture Decisions

### Frontend
- **React**: Chosen for its component-based structure and state management ease.
- **Tailwind CSS**: For rapid responsive design with a utility-first approach.
- **React Router DOM**: For route management.
- **React Toastify**: To provide clean and non-intrusive notifications.

### Backend
- **Express.js + MongoDB**:
  - Express provides a lightweight server for building RESTful APIs.
  - MongoDB allows flexibility with nested data structures (comments, likes, replies).
- **Vercel** used for backend/serverless deployment.

---

## 🧑‍💻 Code Style

- **Component-based**: Each UI block (e.g., `FamousCard`, `Comment`, `Reply`) is modular and reusable.
- **Naming Convention**: Follows camelCase for variables and PascalCase for components.
- **Folder Structure**:
