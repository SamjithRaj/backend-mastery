export const resources = {
  dsa: {
    videos: [
      { title: "NeetCode DSA Roadmap", url: "https://neetcode.io/roadmap", category: "Roadmap" },
      { title: "MIT 6.006 Introduction to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/", category: "Course" },
      { title: "Abdul Bari Algorithms", url: "https://www.youtube.com/@abdul_bari", category: "YouTube" },
    ],
    books: [
      { title: "Introduction to Algorithms (CLRS)", author: "Cormen, Leiserson, Rivest, Stein" },
      { title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell" },
      { title: "Elements of Programming Interviews", author: "Aziz, Lee, Prakash" },
    ],
    practice: [
      { title: "LeetCode", url: "https://leetcode.com", description: "Best for interview prep" },
      { title: "Codeforces", url: "https://codeforces.com", description: "Competitive programming" },
      { title: "AtCoder", url: "https://atcoder.jp", description: "Japanese CP platform" },
      { title: "HackerRank", url: "https://www.hackerrank.com", description: "Skill assessment" },
    ]
  },
  
  cpp: {
    videos: [
      { title: "The Cherno C++ Series", url: "https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb", category: "YouTube" },
      { title: "C++ Weekly with Jason Turner", url: "https://www.youtube.com/@cppweekly", category: "YouTube" },
      { title: "CppCon Talks", url: "https://www.youtube.com/@CppCon", category: "Conference" },
    ],
    books: [
      { title: "A Tour of C++", author: "Bjarne Stroustrup" },
      { title: "Effective Modern C++", author: "Scott Meyers" },
      { title: "C++ Primer", author: "Lippman, Lajoie, Moo" },
      { title: "The C++ Programming Language", author: "Bjarne Stroustrup" },
    ],
    websites: [
      { title: "cppreference.com", url: "https://en.cppreference.com", description: "C++ reference" },
      { title: "C++ Core Guidelines", url: "https://isocpp.github.io/CppCoreGuidelines/", description: "Best practices" },
      { title: "Compiler Explorer", url: "https://godbolt.org", description: "See assembly output" },
    ]
  },
  
  backend: {
    videos: [
      { title: "Hussein Nasser", url: "https://www.youtube.com/@hnasr", category: "YouTube", description: "Backend engineering deep dives" },
      { title: "ByteByteGo", url: "https://www.youtube.com/@ByteByteGo", category: "YouTube", description: "System design" },
      { title: "MIT 6.824 Distributed Systems", url: "https://pdos.csail.mit.edu/6.824/", category: "Course" },
    ],
    books: [
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
      { title: "System Design Interview", author: "Alex Xu" },
      { title: "Database Internals", author: "Alex Petrov" },
      { title: "Computer Networking: A Top-Down Approach", author: "Kurose, Ross" },
    ],
    documentation: [
      { title: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/", description: "Database docs" },
      { title: "Redis Documentation", url: "https://redis.io/docs/", description: "Cache/DB docs" },
      { title: "Nginx Documentation", url: "https://nginx.org/en/docs/", description: "Web server docs" },
      { title: "Docker Documentation", url: "https://docs.docker.com", description: "Container docs" },
    ]
  },
  
  networking: {
    books: [
      { title: "Computer Networks", author: "Andrew S. Tanenbaum" },
      { title: "TCP/IP Illustrated", author: "W. Richard Stevens" },
      { title: "High Performance Browser Networking", author: "Ilya Grigorik" },
    ],
    resources: [
      { title: "Beej's Guide to Network Programming", url: "https://beej.us/guide/bgnet/", description: "Socket programming" },
      { title: "HTTP/2 Explained", url: "https://http2-explained.haxx.se/", description: "HTTP/2 deep dive" },
    ]
  },
  
  systemDesign: {
    videos: [
      { title: "System Design Interview", url: "https://www.youtube.com/@SystemDesignInterview", category: "YouTube" },
      { title: "Gaurav Sen", url: "https://www.youtube.com/@gkcs", category: "YouTube" },
      { title: "Tech Dummies", url: "https://www.youtube.com/@TechDummiesNarendraL", category: "YouTube" },
    ],
    books: [
      { title: "System Design Interview Vol 1 & 2", author: "Alex Xu" },
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
    ],
    websites: [
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", description: "GitHub repo" },
      { title: "High Scalability", url: "http://highscalability.com", description: "Architecture blog" },
    ]
  },
  
  databases: {
    courses: [
      { title: "CMU 15-445 Database Systems", url: "https://15445.courses.cs.cmu.edu/", category: "Course" },
      { title: "Stanford CS145 Data Management", url: "https://cs145-fa19.github.io/", category: "Course" },
    ],
    books: [
      { title: "Database Internals", author: "Alex Petrov" },
      { title: "Database System Concepts", author: "Silberschatz, Korth, Sudarshan" },
    ]
  },
  
  operatingSystems: {
    courses: [
      { title: "MIT 6.828 Operating Systems", url: "https://pdos.csail.mit.edu/6.828/", category: "Course" },
      { title: "Berkeley CS162 Operating Systems", url: "https://cs162.org/", category: "Course" },
    ],
    books: [
      { title: "Operating Systems: Three Easy Pieces", author: "Remzi H. Arpaci-Dusseau" },
      { title: "Modern Operating Systems", author: "Andrew S. Tanenbaum" },
    ]
  },
  
  career: {
    jobBoards: [
      { title: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs", description: "Professional network" },
      { title: "levels.fyi", url: "https://www.levels.fyi", description: "Salary data" },
      { title: "Glassdoor", url: "https://www.glassdoor.com", description: "Company reviews" },
      { title: "Wellfound (AngelList)", url: "https://wellfound.com", description: "Startup jobs" },
    ],
    preparation: [
      { title: "Pramp", url: "https://www.pramp.com", description: "Mock interviews" },
      { title: "Interviewing.io", url: "https://interviewing.io", description: "Anonymous interviews" },
      { title: "TeamBlind", url: "https://www.teamblind.com", description: "Anonymous forum" },
    ],
    resume: [
      { title: "Resume.io", url: "https://resume.io", description: "Resume builder" },
      { title: "Overleaf", url: "https://www.overleaf.com", description: "LaTeX resumes" },
    ]
  },
  
  github: {
    awesome: [
      { title: "Awesome C++", url: "https://github.com/fffaraz/awesome-cpp", stars: "50k+" },
      { title: "Awesome System Design", url: "https://github.com/madd86/awesome-system-design", stars: "10k+" },
      { title: "Awesome Interview Questions", url: "https://github.com/DopplerHQ/awesome-interview-questions", stars: "60k+" },
      { title: "Coding Interview University", url: "https://github.com/jwasham/coding-interview-university", stars: "290k+" },
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", stars: "250k+" },
    ],
    projects: [
      { title: "Build Your Own X", url: "https://github.com/codecrafters-io/build-your-own-x", description: "Project tutorials" },
      { title: "Project Based Learning", url: "https://github.com/practical-tutorials/project-based-learning", description: "Learn by building" },
    ]
  }
}

export const learningPaths = {
  beginner: {
    title: "Complete Beginner (0-3 months)",
    path: [
      { week: 1, focus: "C++ Basics", topics: ["Variables", "Control Flow", "Functions"] },
      { week: 2, focus: "Pointers & References", topics: ["Memory", "Pointers", "References"] },
      { week: 3, focus: "Arrays & Strings", topics: ["Arrays", "Strings", "Basic Algorithms"] },
      { week: 4, focus: "OOP Basics", topics: ["Classes", "Objects", "Inheritance"] },
      { week: 5, focus: "STL Introduction", topics: ["Vector", "Map", "Set"] },
      { week: 6, focus: "Basic DSA", topics: ["Linked Lists", "Stacks", "Queues"] },
      { week: 7, focus: "Trees", topics: ["Binary Trees", "BST", "Traversals"] },
      { week: 8, focus: "Sorting & Searching", topics: ["QuickSort", "MergeSort", "Binary Search"] },
      { week: 9, focus: "Recursion & DP", topics: ["Recursion", "Memoization", "Simple DP"] },
      { week: 10, focus: "Graphs Basics", topics: ["DFS", "BFS", "Basic Graph Problems"] },
      { week: 11, focus: "Review & Practice", topics: ["Easy LeetCode Problems", "Revision"] },
      { week: 12, focus: "Project 1", topics: ["HTTP Server Basics"] },
    ]
  },
  
  intermediate: {
    title: "Intermediate (3-6 months)",
    path: [
      { week: 13, focus: "Advanced C++", topics: ["Smart Pointers", "Move Semantics", "RAII"] },
      { week: 14, focus: "Multithreading", topics: ["Threads", "Mutex", "Condition Variables"] },
      { week: 15, focus: "Networking", topics: ["Sockets", "TCP/IP", "HTTP"] },
      { week: 16, focus: "Project 2", topics: ["Multithreaded HTTP Server"] },
      { week: 17, focus: "Advanced DSA", topics: ["Advanced DP", "Graph Algorithms"] },
      { week: 18, focus: "System Design Basics", topics: ["Scalability", "CAP Theorem"] },
      { week: 19, focus: "Databases", topics: ["SQL", "Indexes", "Transactions"] },
      { week: 20, focus: "Caching", topics: ["Redis", "Cache Strategies", "LRU"] },
      { week: 21, focus: "Project 3", topics: ["Redis Clone"] },
      { week: 22, focus: "Interview Prep", topics: ["Medium Problems", "System Design"] },
      { week: 23, focus: "Mock Interviews", topics: ["Coding", "Behavioral"] },
      { week: 24, focus: "Applications", topics: ["Resume", "LinkedIn", "Apply"] },
    ]
  }
}
