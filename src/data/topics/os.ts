import type { Topic } from "@/types/topic";

export const osTopics: Topic[] = [
  {
    id: "threads-vs-processes",
    title: "Threads vs Processes",
    category: "os",
    description: "Fundamental difference between threads and processes, memory models, and when to use each.",
    difficulty: 2, estimatedMinutes: 35, xpReward: 45, prerequisites: [], tags: ["OS", "concurrency", "threads"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "A process is a running program with its own memory space. A thread is a lightweight unit of execution within a process that shares the same memory. Multiple threads can run concurrently within a single process." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "See how processes and threads differ in memory layout.", animationId: "threads-vs-processes" },
      { id: "technical", type: "technical", title: "Memory Model", content: "## Process Memory Layout\n\nEach process has isolated:\n- **Code segment**: Executable instructions\n- **Data segment**: Global variables\n- **Heap**: Dynamic allocations (malloc/new)\n- **Stack**: Function calls, local variables\n\n## Thread Memory\n\nThreads within a process share:\n- Code, Data, Heap (shared)\n- File descriptors, signals\n\nEach thread has its own:\n- **Stack**: Local variables, function calls\n- **Registers**: CPU state\n- **Thread-local storage**: Per-thread globals\n\n## Communication\n\n- **Between processes**: IPC — pipes, sockets, shared memory, message queues\n- **Between threads**: Direct memory access (but needs synchronization!)" },
      { id: "deep-dive", type: "deep-dive", title: "When To Use Which", content: "## Use Processes When:\n- Isolation is critical (security, crash protection)\n- Different languages/runtimes\n- CPU-bound work on multi-core (Python GIL workaround)\n\n## Use Threads When:\n- Shared state needed\n- Low overhead for task switching\n- I/O-bound work (many network connections)\n- Tight coupling between tasks\n\n## Green Threads / Coroutines\n\nUser-space threads managed by runtime (Go goroutines, Python asyncio). Even lighter than OS threads — can have millions." },
      { id: "code", type: "code-walkthrough", title: "Code: Threads vs Processes", content: "Python comparison:", codeSnippet: "import threading\nimport multiprocessing\nimport os\n\n# Thread — shares memory\ndef thread_task():\n    print(f'Thread PID: {os.getpid()}')\n\nt = threading.Thread(target=thread_task)\nt.start()  # Same PID as parent\nt.join()\n\n# Process — separate memory\ndef process_task():\n    print(f'Process PID: {os.getpid()}')\n\np = multiprocessing.Process(target=process_task)\np.start()  # Different PID!\np.join()", language: "python" },
    ],
    quiz: [
      { id: "q1", question: "What do threads share?", options: ["Stack", "Registers", "Heap and code", "Nothing"], correctIndex: 2, explanation: "Threads share heap, code, and data segments but have own stack." },
      { id: "q2", question: "Best for CPU-bound Python work?", options: ["Threads", "Processes", "Coroutines", "No difference"], correctIndex: 1, explanation: "Python's GIL prevents true parallel threads, so processes are better for CPU-bound work." },
    ],
  },
  {
    id: "context-switching",
    title: "Context Switching",
    category: "os",
    description: "How the CPU switches between processes/threads, the overhead involved, and optimization strategies.",
    difficulty: 3, estimatedMinutes: 30, xpReward: 50, prerequisites: ["threads-vs-processes"], tags: ["OS", "scheduling", "performance"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "A CPU core can only run one thread at a time. When the OS needs to switch to another thread, it must save the current state (registers, program counter, stack pointer) and load the new thread's state. This is called a context switch, and it's expensive." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "Watch the CPU switch between processes.", animationId: "context-switch" },
      { id: "technical", type: "technical", title: "What Gets Saved", content: "## Context Switch Steps\n\n1. **Save registers** of current process to PCB (Process Control Block)\n2. **Save program counter** (where execution was)\n3. **Save stack pointer**\n4. **Flush TLB** (Translation Lookaside Buffer) — for process switches\n5. **Load new process's PCB**\n6. **Restore registers, PC, SP**\n7. **Resume execution**\n\n## Cost\n\n- **Direct cost**: ~1-10 microseconds\n- **Indirect cost**: Cache pollution (L1/L2/L3 caches become cold)\n- Thread switch < Process switch (no TLB flush, shared address space)\n\n## Triggers\n\n- Timer interrupt (preemptive scheduling)\n- I/O request (voluntary yield)\n- Higher priority process arrives\n- System call" },
    ],
    quiz: [
      { id: "q1", question: "Why are thread switches faster than process switches?", options: ["Threads run faster", "No TLB flush, shared address space", "Threads don't use registers", "No difference"], correctIndex: 1, explanation: "Thread switches skip TLB flush since threads share the same address space." },
    ],
  },
  {
    id: "deadlocks",
    title: "Deadlocks",
    category: "os",
    description: "Four conditions for deadlock, detection algorithms, and prevention strategies.",
    difficulty: 3, estimatedMinutes: 40, xpReward: 55, prerequisites: ["threads-vs-processes"], tags: ["OS", "concurrency", "deadlock"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "A deadlock is when two or more processes are stuck waiting for each other to release resources. Like two cars meeting on a one-lane bridge from opposite directions — neither can move forward, and neither will back up." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "Watch how deadlock occurs with circular wait.", animationId: "deadlock" },
      { id: "technical", type: "technical", title: "Coffman Conditions", content: "## Four Necessary Conditions\n\nAll four must hold simultaneously for deadlock:\n\n1. **Mutual Exclusion**: At least one resource is non-shareable\n2. **Hold and Wait**: Process holds resources while waiting for others\n3. **No Preemption**: Resources can't be forcibly taken away\n4. **Circular Wait**: A→B→C→A chain of waiting\n\n## Prevention (Break any one condition)\n\n- **Lock Ordering**: Always acquire locks in same global order (breaks circular wait)\n- **Lock Timeout**: Give up after X ms (breaks hold & wait)\n- **Try-Lock**: Non-blocking attempt, back off on failure\n- **All-or-Nothing**: Acquire all locks atomically or none\n\n## Detection\n\n- **Wait-for Graph**: Build graph of who-waits-for-whom. Cycle = deadlock.\n- **Timeout**: If a lock acquisition takes too long, assume deadlock." },
      { id: "code", type: "code-walkthrough", title: "Code: Deadlock Example", content: "Classic deadlock:", codeSnippet: "import threading\n\nlock_a = threading.Lock()\nlock_b = threading.Lock()\n\ndef thread_1():\n    lock_a.acquire()\n    # ... small delay ...\n    lock_b.acquire()  # BLOCKED! thread_2 holds lock_b\n    lock_b.release()\n    lock_a.release()\n\ndef thread_2():\n    lock_b.acquire()\n    # ... small delay ...\n    lock_a.acquire()  # BLOCKED! thread_1 holds lock_a\n    lock_a.release()\n    lock_b.release()\n\n# FIX: Always acquire in same order (a before b)\ndef thread_fixed():\n    lock_a.acquire()\n    lock_b.acquire()\n    lock_b.release()\n    lock_a.release()", language: "python" },
    ],
    quiz: [
      { id: "q1", question: "Which is NOT a Coffman condition?", options: ["Mutual Exclusion", "Circular Wait", "Starvation", "No Preemption"], correctIndex: 2, explanation: "Starvation is different from deadlock. The 4 conditions are: mutual exclusion, hold&wait, no preemption, circular wait." },
      { id: "q2", question: "Best way to prevent deadlock?", options: ["Use more threads", "Lock ordering", "Avoid mutexes entirely", "Use global locks"], correctIndex: 1, explanation: "Consistent lock ordering breaks the circular wait condition." },
    ],
  },
  {
    id: "cpu-scheduling",
    title: "CPU Scheduling",
    category: "os",
    description: "FCFS, SJF, Round Robin, Priority scheduling algorithms and their tradeoffs.",
    difficulty: 3, estimatedMinutes: 45, xpReward: 55, prerequisites: ["context-switching"], tags: ["OS", "scheduling", "algorithms"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Multiple processes compete for CPU time. The scheduler decides who runs next. Different algorithms optimize for different goals: throughput, latency, fairness, or responsiveness." },
      { id: "technical", type: "technical", title: "Scheduling Algorithms", content: "## First Come First Served (FCFS)\n- Simple FIFO queue\n- Problem: Convoy effect (long job blocks short ones)\n- Non-preemptive\n\n## Shortest Job First (SJF)\n- Run shortest job next\n- Optimal average waiting time\n- Problem: Starvation of long jobs, requires knowing burst time\n\n## Round Robin (RR)\n- Each process gets a time quantum (e.g., 10ms)\n- Preemptive — switch after quantum expires\n- Good for interactive systems\n- Tradeoff: Small quantum = more context switches\n\n## Priority Scheduling\n- Each process has priority\n- Run highest priority first\n- Problem: Starvation → Solution: Aging (increase priority over time)\n\n## Multi-Level Feedback Queue (MLFQ)\n- Multiple queues with different priorities\n- New processes start at highest priority\n- Demoted if they use full time quantum\n- Used by most modern OS (Linux CFS)" },
    ],
    quiz: [
      { id: "q1", question: "Which algorithm has the convoy effect problem?", options: ["Round Robin", "FCFS", "SJF", "Priority"], correctIndex: 1, explanation: "FCFS causes convoy effect — short jobs stuck behind long ones." },
    ],
  },
  {
    id: "memory-management",
    title: "Memory Management",
    category: "os",
    description: "Virtual memory, paging, page tables, TLB, memory allocation, and segmentation.",
    difficulty: 4, estimatedMinutes: 50, xpReward: 65, prerequisites: ["threads-vs-processes"], tags: ["OS", "memory", "virtual memory"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Each process thinks it has the entire memory space to itself. This illusion is created by virtual memory — the OS maps virtual addresses to physical addresses using page tables. This provides isolation, security, and allows running programs larger than physical RAM." },
      { id: "technical", type: "technical", title: "Virtual Memory", content: "## How It Works\n\n1. Process uses **virtual addresses**\n2. MMU (Memory Management Unit) translates to **physical addresses**\n3. Translation uses **page tables**\n\n## Paging\n\n- Memory divided into fixed-size **pages** (typically 4KB)\n- Physical memory divided into **frames** of same size\n- Page table maps page number → frame number\n\n## TLB (Translation Lookaside Buffer)\n\n- Cache for page table entries\n- TLB hit: ~1 cycle\n- TLB miss: ~100 cycles (walk page table)\n- Context switches may flush TLB\n\n## Page Faults\n\nWhen page isn't in RAM:\n1. OS traps to page fault handler\n2. Finds page on disk (swap)\n3. Loads into free frame\n4. Updates page table\n5. Resumes process\n\n## Page Replacement Algorithms\n- **LRU**: Evict least recently used page\n- **FIFO**: Evict oldest page\n- **Clock**: Approximation of LRU (used in practice)" },
    ],
    quiz: [
      { id: "q1", question: "What is the typical page size?", options: ["1KB", "4KB", "1MB", "64KB"], correctIndex: 1, explanation: "4KB is the standard page size on most systems." },
    ],
  },
];
