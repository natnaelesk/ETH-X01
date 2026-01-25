<div align="center">

# 🚀 ETH-X01 Community Platform

**A collaborative coding platform for Ethiopian tech enthusiasts to practice LeetCode DSA challenges and learn Python together**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

![LeetCode Challenges Page](readme%20img/challanges%20page%20for%20leetcode.png)

</div>

---

## 📖 About

**ETH-X01** is a community-driven platform designed for Ethiopian programmers and IT students to level up their coding skills together. This platform was built to create a supportive environment where tech nerds can:

- 🎯 **Practice LeetCode DSA challenges** with a competitive leaderboard system
- 🐍 **Learn Python from scratch** through structured daily lessons for beginners
- 💬 **Engage in discussions** and share knowledge with the community
- 📊 **Track progress** with personalized profiles and scoring system

> **Note:** This project is currently in maintenance mode as the community has been busy with other commitments. However, the codebase remains fully functional and ready for contributions!

---

## ✨ Features

### 🏆 LeetCode Challenge System
- Daily DSA challenges with difficulty levels
- Real-time leaderboard with top scorers
- Challenge details with problem descriptions
- Submission tracking and status updates
- Beautiful, responsive card-based UI

### 🐍 Python Crash Course
- Beginner-friendly daily Python lessons
- Step-by-step learning path inspired by Eric Matthes
- Interactive challenge cards with progress tracking
- Structured curriculum for building real skills

### 👥 Community Features
- User profiles with scores and achievements
- Discussion forum for sharing solutions and tips
- Google authentication for seamless login
- Admin panel for managing challenges

### 🎨 Modern UI/UX
- Dark mode support
- Responsive design (mobile-first)
- Smooth animations and transitions
- Intuitive navigation

---

## 🖼️ Screenshots

<div align="center">

### Home Page
![Home Page](readme%20img/home-page.png)

### LeetCode Challenges
![LeetCode Challenges](readme%20img/challanges%20page%20for%20leetcode.png)

### Python Crash Course
![Python Challenges](readme%20img/challanges%20page%20for%20python.png)

### Discussion Forum
![Discussion Page](readme%20img/discussion%20page.png)

### User Profile
![Profile Page](readme%20img/profile%20page%20with%20score.png)

</div>

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **Vite 7.0.4** - Build tool and dev server
- **React Router DOM 7.6.3** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Framer Motion 12.23.6** - Animation library
- **GSAP 3.13.0** - Advanced animations

### Backend & Services
- **Firebase 11.10.0** - Backend as a Service
  - Authentication (Google Sign-In)
  - Firestore Database
  - Cloud Functions

### UI Components
- **Headless UI 2.2.4** - Accessible UI components
- **Heroicons 2.2.0** - Icon library
- **React Icons 5.5.0** - Popular icon sets

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase account** (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/natnaelesk/ETH-X01.git
   cd ETH-X01
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Google Sign-In)
   - Create a Firestore database
   - Copy your Firebase config to `src/Firebase.js`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

---

## 📁 Project Structure

```
Community platform/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── PythonChallengePage.jsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── ChallengePage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── DiscussionPage.jsx
│   │   └── AdminPage.jsx
│   ├── Firebase.js          # Firebase configuration
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── functions/               # Firebase Cloud Functions
├── readme img/              # README screenshots
├── public/                  # Static assets
└── package.json
```

---

## 🎯 Key Features Explained

### Challenge System
- Challenges are stored in Firestore with metadata (difficulty, date, description)
- Users can view challenges, submit solutions, and track their progress
- Leaderboard updates in real-time based on user scores

### Python Learning Path
- Structured daily lessons for beginners
- Each lesson includes theory, examples, and practice challenges
- Progress tracking to help users stay consistent

### User Authentication
- Google OAuth integration for easy sign-in
- User profiles automatically created on first login
- Role-based access (member/admin)

---

## 🤝 Contributing

Contributions are welcome! Since this project is currently in maintenance mode, any contributions would be greatly appreciated:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Project Status

**Current Status:** 🟡 Maintenance Mode

This project was actively used by the community but is currently quiet as members have been busy with other commitments. The platform is fully functional and ready for:
- Community revival
- Feature additions
- Bug fixes
- Documentation improvements

---

## 🔗 Links

- **Repository:** [https://github.com/natnaelesk/ETH-X01](https://github.com/natnaelesk/ETH-X01)
- **Issues:** [Report a bug or request a feature](https://github.com/natnaelesk/ETH-X01/issues)

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Built with ❤️ by the ETH-X01 community

**Special thanks to all the community members who participated and made this platform a great learning space!**

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star! ⭐**

Made for the Ethiopian tech community 🇪🇹

</div>
