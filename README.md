# Backend Engineering Mastery OS 🚀

> **A complete, production-grade platform to transform beginners into elite backend engineers in 3-6 months**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)

## 🎯 Mission

Take someone who only knows basic C++ syntax and transform them into a backend engineering candidate capable of landing:
- Backend Engineer roles
- Systems Engineer roles
- SDE roles
- Fintech/startup backend positions

**Timeline**: 3-6 months of rigorous following

## ✨ Features

### 🎨 Beautiful, Modern UI
- **Linear/Raycast-inspired design** - Premium, developer-focused interface
- **Smooth animations** with Framer Motion
- **Glassmorphism effects** and subtle gradients
- **Dark/Light mode** with seamless transitions
- **Fully responsive** - Works on desktop, tablet, and mobile

### 📊 Dashboard & Progress Tracking
- Daily task management
- Streak tracking system
- Weekly goals with progress bars
- Study time tracker with analytics
- Motivational quotes system
- Real-time statistics

### 💻 DSA Tracker
- **Categorized problems** (Arrays, Strings, Trees, Graphs, DP, etc.)
- **Blind 75** and NeetCode roadmap integration
- Difficulty-based filtering (Easy/Medium/Hard)
- **Interactive theory sections** with code examples
- Problem status tracking (Unsolved/Solved/Reviewed)
- Revision scheduler
- Pattern recognition guide
- Visual explanations and animations

### 🔧 C++ Mastery
Complete C++ learning path:
- Pointers & References
- Memory Management (Stack vs Heap)
- Smart Pointers (unique_ptr, shared_ptr, weak_ptr)
- RAII principles
- STL containers and algorithms
- Move semantics
- Multithreading
- OOP concepts
- Templates
- Interactive quizzes
- Memory visualization diagrams

### 🌐 Backend Engineering Roadmap
- **HTTP/HTTPS** fundamentals
- **TCP/IP** networking
- **Socket programming**
- REST API design
- **Concurrency & Multithreading**
- **Async systems**
- Database fundamentals
- Caching strategies (Redis)
- Load balancing
- Message queues
- **Distributed systems** basics
- Real code examples in C++

### 🚀 Project Guides
Full implementation guides for:
1. **HTTP Server** - Build from scratch
2. **Multithreaded HTTP Server** - Thread pool implementation
3. **Mini Redis Clone** - In-memory key-value store
4. **LRU Cache** - Cache implementation
5. **Rate Limiter** - Token bucket & sliding window
6. **URL Shortener** - Base62 encoding
7. **Trading Engine Simulation** - High-performance system

Each project includes:
- Architecture diagrams
- Step-by-step implementation
- Complete C++ code
- Performance optimization tips
- Interview talking points

### 🎤 Interview Preparation
- Backend engineering questions
- Operating Systems concepts
- Database systems (ACID, indexing, transactions)
- Computer networking
- Behavioral questions
- **Mock interview mode** (AI-powered)
- STAR method guidance

### 📝 Application Tracker
- Job application management
- Company & role tracking
- Status tracking (Applied → OA → Interview → Offer)
- Interview date scheduling
- Notes system
- Timeline visualization
- Resume resources
- Salary negotiation tips

### ⏱️ Study Timer
- Floating timer widget
- Category-based time tracking
- Session analytics
- Daily/weekly statistics
- Pomodoro support

### ⌨️ Command Palette
- Quick navigation (Ctrl/Cmd + K)
- Keyboard shortcuts
- Fast search across all sections

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Beautiful icon set
- **Shadcn/ui** - High-quality components
- **React Markdown** - Content rendering

### State Management
- **Zustand** - Lightweight state management
- Persistent storage with local storage

### Database
- **Prisma ORM** - Type-safe database access
- **SQLite** - Local database (can switch to PostgreSQL)

### Styling
- Custom CSS variables for theming
- Glassmorphism effects
- Smooth transitions
- Responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/backend-mastery-os.git
cd backend-mastery-os
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 📦 Project Structure

```
backend-mastery-os/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── dashboard/          # Dashboard components
│   ├── dsa/                # DSA tracker components
│   ├── cpp/                # C++ mastery components
│   ├── backend/            # Backend roadmap components
│   ├── projects/           # Projects section components
│   ├── interview/          # Interview prep components
│   ├── applications/       # Job tracker components
│   ├── study/              # Study timer components
│   ├── sidebar.tsx         # Navigation sidebar
│   ├── command-menu.tsx    # Command palette
│   └── theme-provider.tsx  # Theme management
├── data/                    # Learning content
│   ├── dsa-roadmap.ts      # DSA problems & theory
│   ├── cpp-mastery.ts      # C++ content
│   ├── backend-roadmap.ts  # Backend engineering content
│   └── projects.ts         # Project guides
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema
│   └── schema.prisma       # Prisma schema
├── store/                   # State management
│   └── index.ts            # Zustand stores
└── public/                  # Static assets
```

## 🎯 Learning Path

### Month 1-2: Foundations
- **Week 1-2**: C++ fundamentals, pointers, memory management
- **Week 3-4**: Data structures (arrays, linked lists, stacks, queues)
- **Week 5-6**: Trees and graphs
- **Week 7-8**: Basic algorithms, sorting, searching

### Month 3-4: Backend Fundamentals
- **Week 9-10**: HTTP/HTTPS, networking basics
- **Week 11-12**: Sockets, TCP/IP programming
- **Week 13-14**: Multithreading, concurrency
- **Week 15-16**: Database fundamentals

### Month 5-6: Projects & Interview Prep
- **Week 17-18**: HTTP server project
- **Week 19-20**: Redis clone project
- **Week 21-22**: Rate limiter & URL shortener
- **Week 23-24**: Interview preparation, mock interviews

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
```

### Database
Switch to PostgreSQL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🎨 Customization

### Theme Colors
Edit `app/globals.css` to customize colors:
```css
:root {
  --primary: 262 83% 58%;
  --secondary: 210 40% 96.1%;
  /* ... more variables */
}
```

### Add New Content
1. Edit data files in `/data` directory
2. Add new markdown content
3. Components auto-render the content

## 📱 Features Roadmap

- [ ] AI-powered interview simulator
- [ ] Code playground integration
- [ ] Peer learning community
- [ ] LinkedIn optimization tools
- [ ] Resume builder
- [ ] GitHub contribution tracker
- [ ] Leetcode API integration
- [ ] Study group matching
- [ ] Mentor connections
- [ ] Video course integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Linear, Raycast, and Notion's beautiful UIs
- DSA content inspired by NeetCode and Blind 75
- Backend engineering concepts from industry best practices
- Community contributions and feedback

## 📧 Contact

For questions or feedback, reach out:
- GitHub Issues: [Create an issue](https://github.com/yourusername/backend-mastery-os/issues)
- Email: your.email@example.com

## ⭐ Star History

If this project helped you, please consider giving it a star!

---

**Built with ❤️ for aspiring backend engineers worldwide**

*"The only way to do great work is to love what you do." - Steve Jobs*
