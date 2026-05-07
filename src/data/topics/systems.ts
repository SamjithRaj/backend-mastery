import type { Topic } from "@/types/topic";

export const cppTopics: Topic[] = [
  {
    id: "smart-pointers", title: "Smart Pointers & RAII", category: "cpp", description: "unique_ptr, shared_ptr, weak_ptr — automatic memory management in C++.", difficulty: 3, estimatedMinutes: 40, xpReward: 55, prerequisites: [], tags: ["C++", "memory", "RAII"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Raw pointers in C++ are dangerous — forget to delete and you leak memory, delete twice and you crash. Smart pointers automate this. RAII (Resource Acquisition Is Initialization) ties resource lifetime to object lifetime: constructor acquires, destructor releases." },
      { id: "technical", type: "technical", title: "Smart Pointer Types", content: "## unique_ptr\n- **Sole ownership** of a resource\n- Cannot be copied, only moved\n- Zero overhead compared to raw pointer\n- Use for: single-owner resources\n\n## shared_ptr\n- **Shared ownership** via reference counting\n- Last shared_ptr to die frees the resource\n- Thread-safe reference counting (atomic increment/decrement)\n- Overhead: 2 pointers + control block\n- Watch out for: circular references!\n\n## weak_ptr\n- Non-owning reference to shared_ptr resource\n- Doesn't affect reference count\n- Must lock() to access (may return null if resource freed)\n- Breaks circular references\n\n## RAII Pattern\n```\nclass FileHandle {\n    FILE* f;\npublic:\n    FileHandle(const char* path) : f(fopen(path, \"r\")) {}\n    ~FileHandle() { if(f) fclose(f); }  // auto cleanup\n};\n```" },
      { id: "code", type: "code-walkthrough", title: "Code: Smart Pointers", content: "Modern C++ memory management:", codeSnippet: "#include <memory>\n\n// unique_ptr — sole ownership\nauto ptr = std::make_unique<int>(42);\n// auto copy = ptr;  // ERROR: can't copy\nauto moved = std::move(ptr);  // OK: transfer ownership\n\n// shared_ptr — shared ownership\nauto sp1 = std::make_shared<int>(42);\nauto sp2 = sp1;  // ref count = 2\nsp1.reset();      // ref count = 1\n// sp2 goes out of scope → freed\n\n// weak_ptr — break cycles\nstruct Node {\n    std::shared_ptr<Node> next;\n    std::weak_ptr<Node> prev;  // weak to avoid cycle\n};", language: "cpp" },
    ],
    quiz: [
      { id: "q1", question: "Which smart pointer has zero overhead?", options: ["shared_ptr", "weak_ptr", "unique_ptr", "All of them"], correctIndex: 2, explanation: "unique_ptr has zero overhead compared to raw pointer — it compiles to the same code." },
    ],
  },
  {
    id: "move-semantics", title: "Move Semantics", category: "cpp", description: "Rvalue references, std::move, perfect forwarding, and avoiding unnecessary copies.", difficulty: 4, estimatedMinutes: 45, xpReward: 60, prerequisites: ["smart-pointers"], tags: ["C++", "performance", "modern C++"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Copying a vector of 1M elements is expensive. But if the source is about to be destroyed anyway, why copy? Just steal its internal buffer. Move semantics let you transfer ownership of resources instead of copying them — like giving someone your house keys instead of building a duplicate house." },
      { id: "technical", type: "technical", title: "How It Works", content: "## Lvalues and Rvalues\n- **Lvalue**: Has a name, persists beyond expression (variables)\n- **Rvalue**: Temporary, about to be destroyed\n\n## Move Constructor & Assignment\n```cpp\nclass Buffer {\n    int* data;\n    size_t size;\npublic:\n    // Move constructor — steal resources\n    Buffer(Buffer&& other) noexcept \n        : data(other.data), size(other.size) {\n        other.data = nullptr;  // leave source in valid state\n        other.size = 0;\n    }\n};\n```\n\n## std::move\nDoesn't move anything! Just casts lvalue to rvalue reference.\n`std::move(x)` says: 'I'm done with x, you can steal from it.'\n\n## Rule of 5\nIf you define any of: destructor, copy constructor, copy assignment, move constructor, move assignment → define all 5." },
    ],
    quiz: [
      { id: "q1", question: "What does std::move actually do?", options: ["Moves the object", "Casts to rvalue reference", "Deletes the object", "Copies the object"], correctIndex: 1, explanation: "std::move is just a cast to rvalue reference. It doesn't move anything itself." },
    ],
  },
  {
    id: "cpp-multithreading", title: "C++ Multithreading", category: "cpp", description: "std::thread, mutex, condition variables, atomics, and thread-safe programming.", difficulty: 4, estimatedMinutes: 50, xpReward: 65, prerequisites: ["smart-pointers"], tags: ["C++", "concurrency", "threading"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "C++11 introduced built-in threading support. Creating threads is easy — making them correct is hard. You need to protect shared data with mutexes, coordinate with condition variables, and for peak performance, use lock-free atomics." },
      { id: "technical", type: "technical", title: "Threading Primitives", content: "## std::thread\n```cpp\nstd::thread t([] { compute_something(); });\nt.join();  // Wait for completion\n// or t.detach(); // Fire and forget\n```\n\n## std::mutex\n```cpp\nstd::mutex mtx;\n{\n    std::lock_guard<std::mutex> lock(mtx);  // RAII!\n    shared_data++;  // Protected\n}  // Lock released automatically\n```\n\n## std::condition_variable\nFor producer-consumer patterns:\n```cpp\nstd::condition_variable cv;\nbool ready = false;\n\n// Consumer waits\nstd::unique_lock<std::mutex> lock(mtx);\ncv.wait(lock, [&] { return ready; });\n\n// Producer signals\nready = true;\ncv.notify_one();\n```\n\n## std::atomic\nLock-free operations for simple types:\n```cpp\nstd::atomic<int> counter{0};\ncounter.fetch_add(1);  // Thread-safe increment\n```\n\n## Memory Ordering\n- `memory_order_seq_cst`: Default, strongest (safest)\n- `memory_order_acquire/release`: For synchronization pairs\n- `memory_order_relaxed`: No ordering guarantees (fastest)" },
    ],
    quiz: [
      { id: "q1", question: "Best RAII lock wrapper in C++?", options: ["raw mutex.lock()", "lock_guard", "No locking needed", "volatile keyword"], correctIndex: 1, explanation: "lock_guard provides RAII locking — automatically unlocks when scope exits." },
    ],
  },
];

export const linuxTopics: Topic[] = [
  {
    id: "linux-processes", title: "Linux Process Management", category: "linux", description: "Process lifecycle, signals, daemons, and process monitoring in Linux.", difficulty: 2, estimatedMinutes: 35, xpReward: 45, prerequisites: [], tags: ["Linux", "processes", "sysadmin"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Every running program in Linux is a process. Understanding processes — how they're created (fork), how they communicate (signals, pipes), and how to manage them — is fundamental to systems engineering." },
      { id: "technical", type: "technical", title: "Process Fundamentals", content: "## Process States\n- **Running (R)**: Executing on CPU\n- **Sleeping (S)**: Waiting for I/O or event\n- **Stopped (T)**: Paused by signal (SIGSTOP)\n- **Zombie (Z)**: Finished but parent hasn't read exit status\n\n## Key Commands\n```bash\nps aux          # List all processes\ntop / htop      # Real-time process monitor\nkill PID        # Send SIGTERM\nkill -9 PID     # Send SIGKILL (force)\nnohup cmd &     # Run in background, survive logout\nstrace -p PID   # Trace system calls\nlsof -p PID     # List open files\n```\n\n## Signals\n- **SIGTERM (15)**: Polite 'please exit' (default kill)\n- **SIGKILL (9)**: Force kill (can't be caught)\n- **SIGHUP (1)**: Terminal hangup / reload config\n- **SIGINT (2)**: Ctrl+C\n- **SIGUSR1/2**: User-defined\n\n## fork() + exec()\n```\nPID child = fork();\nif (child == 0) {\n    exec(\"/bin/ls\");  // Replace child with new program\n} else {\n    wait(NULL);  // Parent waits for child\n}\n```" },
    ],
    quiz: [
      { id: "q1", question: "What signal does Ctrl+C send?", options: ["SIGTERM", "SIGKILL", "SIGINT", "SIGHUP"], correctIndex: 2, explanation: "Ctrl+C sends SIGINT (interrupt signal)." },
    ],
  },
  {
    id: "linux-filesystem", title: "Linux File System & Permissions", category: "linux", description: "Inodes, file descriptors, permissions, mount points, and everything about Linux FS.", difficulty: 2, estimatedMinutes: 35, xpReward: 45, prerequisites: [], tags: ["Linux", "filesystem", "permissions"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "In Linux, everything is a file — regular files, directories, devices, pipes, sockets. Understanding the filesystem hierarchy, permissions model, and how the kernel manages file access through inodes and file descriptors is essential." },
      { id: "technical", type: "technical", title: "Filesystem Internals", content: "## Inodes\nEvery file has an inode containing:\n- File size, timestamps\n- Owner, group, permissions\n- Pointers to data blocks\n- Hard link count\n\nFilenames are stored in directory entries, NOT in the inode.\n\n## File Descriptors\nProcess-local integer handles to open files:\n- 0: stdin\n- 1: stdout\n- 2: stderr\n\n## Permissions\n```\nrwxr-xr--  =  754\n│││││││││\n│││││││└─ Other: read only\n││││││└── Other: no execute\n│││││└─── Other: read\n│││└──── Group: execute\n││└───── Group: read\n│└────── Owner: execute\n└─────── Owner: read+write\n```\n\n## Special Permissions\n- **SUID**: Run as file owner\n- **SGID**: Run as file group\n- **Sticky bit**: Only owner can delete in directory" },
    ],
    quiz: [
      { id: "q1", question: "What does an inode NOT store?", options: ["File size", "Permissions", "Filename", "Timestamps"], correctIndex: 2, explanation: "Filenames are stored in directory entries, not in the inode." },
    ],
  },
];

export const devopsTopics: Topic[] = [
  {
    id: "docker-containers", title: "Docker & Containers", category: "devops", description: "Container concepts, Dockerfiles, images, networking, and orchestration basics.", difficulty: 2, estimatedMinutes: 45, xpReward: 55, prerequisites: [], tags: ["Docker", "containers", "DevOps"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Containers package your app with ALL its dependencies — code, runtime, libraries, configs — into a single portable unit. 'Works on my machine' becomes 'works everywhere.' Containers share the host OS kernel, making them lighter than VMs." },
      { id: "technical", type: "technical", title: "Docker Concepts", content: "## Containers vs VMs\n\n| Containers | VMs |\n|-----------|-----|\n| Share host kernel | Full OS per VM |\n| MB-sized | GB-sized |\n| Starts in seconds | Starts in minutes |\n| Process isolation | Hardware isolation |\n\n## Dockerfile\n```dockerfile\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nEXPOSE 8080\nCMD [\"python\", \"app.py\"]\n```\n\n## Key Commands\n```bash\ndocker build -t myapp .\ndocker run -p 8080:8080 myapp\ndocker-compose up -d\ndocker ps            # List containers\ndocker logs <id>     # View logs\ndocker exec -it <id> bash  # Shell into container\n```\n\n## Docker Networking\n- **bridge**: Default, containers on same host\n- **host**: Share host network stack\n- **overlay**: Multi-host networking (Swarm/K8s)\n\n## Multi-Stage Builds\nReduce image size by separating build and runtime:\n```dockerfile\nFROM golang AS builder\nRUN go build -o app\n\nFROM alpine\nCOPY --from=builder /app /app\nCMD [\"/app\"]\n```" },
    ],
    quiz: [
      { id: "q1", question: "Key difference between containers and VMs?", options: ["Containers are slower", "Containers share host kernel", "VMs are lighter", "No difference"], correctIndex: 1, explanation: "Containers share the host OS kernel, making them much lighter than VMs." },
    ],
  },
  {
    id: "cicd-pipelines", title: "CI/CD Pipelines", category: "devops", description: "Continuous integration and deployment — automated testing, building, and deploying.", difficulty: 2, estimatedMinutes: 30, xpReward: 40, prerequisites: ["docker-containers"], tags: ["CI/CD", "DevOps", "automation"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "CI/CD automates your workflow: every code push triggers tests, builds, and deployment. No more 'I forgot to run tests.' No more 'manual deployment Friday at 3am.' Push code → it's automatically tested and deployed." },
      { id: "technical", type: "technical", title: "Pipeline Stages", content: "## Continuous Integration (CI)\n1. Developer pushes code\n2. Automated tests run\n3. Code is compiled/built\n4. Static analysis, linting\n5. Build artifact created\n\n## Continuous Deployment (CD)\n6. Deploy to staging\n7. Integration/E2E tests\n8. Deploy to production\n9. Health checks\n10. Rollback if needed\n\n## Strategies\n- **Blue/Green**: Two identical environments, switch traffic\n- **Canary**: Gradual rollout (1% → 10% → 100%)\n- **Rolling**: Update instances one at a time\n- **Feature Flags**: Deploy code but toggle features\n\n## Tools\n- GitHub Actions, GitLab CI, Jenkins\n- ArgoCD, Flux (GitOps)\n- Terraform (Infrastructure as Code)" },
    ],
    quiz: [
      { id: "q1", question: "What is canary deployment?", options: ["Deploy to all servers", "Gradual rollout to subset", "Deploy and rollback", "Manual deployment"], correctIndex: 1, explanation: "Canary deploys to a small subset first, then gradually increases." },
    ],
  },
];
