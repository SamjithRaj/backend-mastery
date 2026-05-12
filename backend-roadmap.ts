export const backendRoadmap = {
  "http": {
    title: "HTTP/HTTPS Fundamentals",
    difficulty: "easy",
    content: `
# HTTP/HTTPS Protocol

## What is HTTP?
HyperText Transfer Protocol - application-layer protocol for web communication.

## Request-Response Model
\`\`\`
Client                    Server
  |                         |
  |------- Request -------->|
  |                         |
  |<------ Response --------|
  |                         |
\`\`\`

## HTTP Request Structure
\`\`\`http
GET /api/users HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer token123

[Optional Body]
\`\`\`

## HTTP Methods

### GET - Retrieve Data
\`\`\`http
GET /api/users/123
\`\`\`
- Idempotent (same result on multiple calls)
- No body
- Cacheable

### POST - Create Resource
\`\`\`http
POST /api/users
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}
\`\`\`
- Not idempotent
- Has body
- Not cacheable

### PUT - Update Entire Resource
\`\`\`http
PUT /api/users/123
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john@example.com",
  "age": 30
}
\`\`\`
- Idempotent
- Replaces entire resource

### PATCH - Partial Update
\`\`\`http
PATCH /api/users/123
Content-Type: application/json

{
  "name": "John Updated"
}
\`\`\`
- Updates specific fields

### DELETE - Remove Resource
\`\`\`http
DELETE /api/users/123
\`\`\`
- Idempotent

## Status Codes

### 2xx Success
- **200 OK**: Request succeeded
- **201 Created**: Resource created
- **204 No Content**: Success, no response body

### 3xx Redirection
- **301 Moved Permanently**: Resource moved
- **302 Found**: Temporary redirect
- **304 Not Modified**: Use cached version

### 4xx Client Errors
- **400 Bad Request**: Invalid syntax
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: No permission
- **404 Not Found**: Resource doesn't exist
- **429 Too Many Requests**: Rate limited

### 5xx Server Errors
- **500 Internal Server Error**: Server crashed
- **502 Bad Gateway**: Upstream server error
- **503 Service Unavailable**: Server overloaded
- **504 Gateway Timeout**: Upstream timeout

## Headers

### Request Headers
\`\`\`http
Host: api.example.com
User-Agent: MyApp/1.0
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGc...
Cookie: sessionid=abc123
\`\`\`

### Response Headers
\`\`\`http
Content-Type: application/json
Content-Length: 1234
Cache-Control: max-age=3600
Set-Cookie: sessionid=xyz789; HttpOnly; Secure
Access-Control-Allow-Origin: *
\`\`\`

## HTTPS - Secure HTTP

### How HTTPS Works
1. **Client Hello**: Client initiates TLS handshake
2. **Server Hello**: Server sends certificate
3. **Key Exchange**: Establish encryption keys
4. **Encrypted Communication**: All data encrypted

### TLS/SSL
\`\`\`
HTTP  →  TCP  →  IP
HTTPS →  TLS/SSL  →  TCP  →  IP
\`\`\`

### Certificates
- Issued by Certificate Authority (CA)
- Contains public key
- Proves server identity
- Browser validates certificate chain

## Simple HTTP Server (C++)
\`\`\`cpp
#include <iostream>
#include <string>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

int main() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    
    sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);
    
    bind(server_fd, (struct sockaddr*)&address, sizeof(address));
    listen(server_fd, 10);
    
    std::cout << "Server listening on port 8080\\n";
    
    while (true) {
        int client_fd = accept(server_fd, nullptr, nullptr);
        
        char buffer[4096] = {0};
        read(client_fd, buffer, 4096);
        
        std::string response = 
            "HTTP/1.1 200 OK\\r\\n"
            "Content-Type: text/html\\r\\n"
            "Content-Length: 13\\r\\n"
            "\\r\\n"
            "Hello, World!";
        
        write(client_fd, response.c_str(), response.length());
        close(client_fd);
    }
    
    close(server_fd);
    return 0;
}
\`\`\`

## HTTP/2 vs HTTP/1.1

| Feature | HTTP/1.1 | HTTP/2 |
|---------|----------|--------|
| Binary Protocol | No (text) | Yes |
| Multiplexing | No | Yes |
| Header Compression | No | Yes (HPACK) |
| Server Push | No | Yes |
| Streams | 1 per connection | Multiple |

## REST API Best Practices
1. Use nouns for endpoints: `/users`, `/orders`
2. HTTP methods for actions: GET, POST, PUT, DELETE
3. Use plural names: `/users/123` not `/user/123`
4. Version your API: `/api/v1/users`
5. Return proper status codes
6. Use HTTPS in production

## Interview Questions
1. Difference between PUT and PATCH?
2. What makes HTTP stateless?
3. How does HTTPS encryption work?
4. Explain HTTP caching
5. What is CORS?
`,
    resources: [
      { title: "MDN HTTP Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" },
      { title: "HTTP/2 Explained", url: "https://http2-explained.haxx.se/" }
    ]
  },
  "tcpip": {
    title: "TCP/IP Networking",
    difficulty: "medium",
    content: `
# TCP/IP Protocol Stack

## OSI vs TCP/IP Model

\`\`\`
OSI Model              TCP/IP Model
-----------            ------------
Application            Application
Presentation           (HTTP, FTP, DNS)
Session                
                       
Transport              Transport
                       (TCP, UDP)
                       
Network                Internet
                       (IP, ICMP)
                       
Data Link              Network Access
Physical               (Ethernet, WiFi)
\`\`\`

## IP (Internet Protocol)

### IPv4 Address
\`\`\`
192.168.1.100
\`\`\`
- 32-bit address
- 4 octets (0-255)
- ~4.3 billion addresses

### IPv6 Address
\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
\`\`\`
- 128-bit address
- Hexadecimal notation
- 340 undecillion addresses

### IP Packet Structure
\`\`\`
+------------------+
| IP Header (20B)  |
| - Source IP      |
| - Dest IP        |
| - TTL            |
| - Protocol       |
+------------------+
| Data             |
+------------------+
\`\`\`

## TCP (Transmission Control Protocol)

### Characteristics
- **Connection-oriented**: 3-way handshake
- **Reliable**: Guarantees delivery
- **Ordered**: Packets arrive in order
- **Flow control**: Prevents overwhelm
- **Congestion control**: Network-aware

### 3-Way Handshake
\`\`\`
Client                Server
  |                     |
  |------ SYN --------->|
  |                     |
  |<--- SYN-ACK --------|
  |                     |
  |------ ACK --------->|
  |                     |
  |   Connected!        |
\`\`\`

### TCP Segment Structure
\`\`\`
+------------------+
| TCP Header (20B) |
| - Source Port    |
| - Dest Port      |
| - Seq Number     |
| - Ack Number     |
| - Flags          |
+------------------+
| Data             |
+------------------+
\`\`\`

### TCP Flags
- **SYN**: Synchronize sequence numbers
- **ACK**: Acknowledgment
- **FIN**: Finish, close connection
- **RST**: Reset connection
- **PSH**: Push data immediately
- **URG**: Urgent data

### Connection Termination (4-Way)
\`\`\`
Client                Server
  |                     |
  |------ FIN --------->|
  |                     |
  |<----- ACK ----------|
  |                     |
  |<----- FIN ----------|
  |                     |
  |------ ACK --------->|
  |                     |
  |   Closed!           |
\`\`\`

## UDP (User Datagram Protocol)

### Characteristics
- **Connectionless**: No handshake
- **Unreliable**: No delivery guarantee
- **Unordered**: Packets may arrive out of order
- **Fast**: Lower overhead
- **No flow control**

### Use Cases
- Video streaming
- Online gaming
- DNS queries
- VoIP

### UDP Datagram Structure
\`\`\`
+------------------+
| UDP Header (8B)  |
| - Source Port    |
| - Dest Port      |
| - Length         |
| - Checksum       |
+------------------+
| Data             |
+------------------+
\`\`\`

## Socket Programming

### TCP Server (C++)
\`\`\`cpp
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <iostream>

int main() {
    // Create socket
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    
    // Bind to address
    sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);
    
    bind(server_fd, (struct sockaddr*)&address, sizeof(address));
    
    // Listen
    listen(server_fd, 10);
    
    // Accept connections
    while (true) {
        int client_fd = accept(server_fd, nullptr, nullptr);
        
        // Handle client
        char buffer[1024] = {0};
        read(client_fd, buffer, 1024);
        std::cout << "Received: " << buffer << std::endl;
        
        write(client_fd, "Hello from server", 17);
        close(client_fd);
    }
    
    close(server_fd);
    return 0;
}
\`\`\`

### TCP Client (C++)
\`\`\`cpp
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    
    sockaddr_in serv_addr;
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr);
    
    connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));
    
    send(sock, "Hello Server", 12, 0);
    
    char buffer[1024] = {0};
    read(sock, buffer, 1024);
    std::cout << "Response: " << buffer << std::endl;
    
    close(sock);
    return 0;
}
\`\`\`

## Port Numbers

### Well-Known Ports (0-1023)
- **20/21**: FTP
- **22**: SSH
- **23**: Telnet
- **25**: SMTP (Email)
- **53**: DNS
- **80**: HTTP
- **443**: HTTPS
- **3306**: MySQL
- **5432**: PostgreSQL
- **6379**: Redis
- **27017**: MongoDB

### Registered Ports (1024-49151)
- **3000**: Node.js dev
- **5000**: Flask dev
- **8080**: Alternative HTTP

### Dynamic/Private (49152-65535)
- Ephemeral ports for clients

## NAT (Network Address Translation)
\`\`\`
Private Network (192.168.1.x)
     |
     |  NAT Router
     |  Public IP: 203.0.113.1
     |
Internet
\`\`\`

Maps private IPs to single public IP.

## Common Network Commands

### Linux/Mac
\`\`\`bash
# Show network interfaces
ifconfig
ip addr

# Test connectivity
ping google.com

# Trace route
traceroute google.com

# Show open ports
netstat -tuln
ss -tuln

# DNS lookup
nslookup google.com
dig google.com

# Capture packets
tcpdump -i eth0
\`\`\`

## Performance Optimization

### TCP Tuning
- Increase buffer sizes
- Enable window scaling
- Use TCP Fast Open
- Tune congestion control algorithm

### Connection Pooling
Reuse connections instead of creating new ones.

\`\`\`cpp
class ConnectionPool {
    queue<Connection*> available;
    int max_connections = 10;
    
public:
    Connection* acquire() {
        if (available.empty()) {
            if (total < max_connections) {
                return new Connection();
            }
            // Wait or throw
        }
        Connection* conn = available.front();
        available.pop();
        return conn;
    }
    
    void release(Connection* conn) {
        available.push(conn);
    }
};
\`\`\`

## Interview Questions
1. TCP vs UDP - when to use each?
2. Explain 3-way handshake
3. What is TIME_WAIT state?
4. How does TCP ensure reliability?
5. What is head-of-line blocking?
`,
    resources: [
      { title: "Beej's Guide to Network Programming", url: "https://beej.us/guide/bgnet/" },
      { title: "TCP/IP Illustrated", url: "https://en.wikipedia.org/wiki/TCP/IP_Illustrated" }
    ]
  },
  "concurrency": {
    title: "Concurrency & Multithreading",
    difficulty: "hard",
    content: `
# Concurrency & Multithreading

## Process vs Thread

### Process
- Independent execution unit
- Separate memory space
- Higher overhead
- Inter-process communication needed

### Thread
- Lightweight process
- Shared memory space
- Lower overhead
- Shared data access

\`\`\`
Process
+------------------------+
| Thread 1 | Thread 2    |
|          |             |
| Shared Memory          |
| - Heap                 |
| - Static data          |
|                        |
| Thread-local           |
| - Stack 1  | Stack 2   |
+------------------------+
\`\`\`

## C++11 Threading

### Creating Threads
\`\`\`cpp
#include <iostream>
#include <thread>

void worker(int id) {
    std::cout << "Thread " << id << std::endl;
}

int main() {
    std::thread t1(worker, 1);
    std::thread t2(worker, 2);
    
    t1.join();  // wait for t1
    t2.join();  // wait for t2
    
    return 0;
}
\`\`\`

### Lambda Threads
\`\`\`cpp
std::thread t([](int x) {
    std::cout << "Value: " << x << std::endl;
}, 42);
t.join();
\`\`\`

### Detached Threads
\`\`\`cpp
std::thread t(worker, 1);
t.detach();  // runs independently
// Cannot join detached thread
\`\`\`

## Synchronization

### Mutex (Mutual Exclusion)
\`\`\`cpp
#include <mutex>

std::mutex mtx;
int counter = 0;

void increment() {
    mtx.lock();
    counter++;
    mtx.unlock();
}

// Better: RAII with lock_guard
void incrementSafe() {
    std::lock_guard<std::mutex> lock(mtx);
    counter++;
} // automatically unlocks
\`\`\`

### unique_lock (More Flexible)
\`\`\`cpp
std::mutex mtx;

void process() {
    std::unique_lock<std::mutex> lock(mtx);
    // critical section
    
    lock.unlock();  // can unlock early
    // non-critical work
    
    lock.lock();    // can re-lock
    // more critical work
}
\`\`\`

### Recursive Mutex
\`\`\`cpp
std::recursive_mutex rmtx;

void recursiveFunction(int depth) {
    std::lock_guard<std::recursive_mutex> lock(rmtx);
    if (depth > 0) {
        recursiveFunction(depth - 1);  // can re-lock
    }
}
\`\`\`

## Condition Variables

### Producer-Consumer Pattern
\`\`\`cpp
#include <queue>
#include <mutex>
#include <condition_variable>

std::queue<int> buffer;
std::mutex mtx;
std::condition_variable cv;
const int MAX_SIZE = 10;

void producer() {
    for (int i = 0; i < 100; i++) {
        std::unique_lock<std::mutex> lock(mtx);
        
        // Wait if buffer full
        cv.wait(lock, []{ return buffer.size() < MAX_SIZE; });
        
        buffer.push(i);
        std::cout << "Produced: " << i << std::endl;
        
        cv.notify_one();  // wake up consumer
    }
}

void consumer() {
    while (true) {
        std::unique_lock<std::mutex> lock(mtx);
        
        // Wait if buffer empty
        cv.wait(lock, []{ return !buffer.empty(); });
        
        int item = buffer.front();
        buffer.pop();
        std::cout << "Consumed: " << item << std::endl;
        
        cv.notify_one();  // wake up producer
    }
}
\`\`\`

## Atomics (Lock-Free)

### Atomic Operations
\`\`\`cpp
#include <atomic>

std::atomic<int> counter(0);

void increment() {
    counter++;  // atomic, no lock needed
    // or
    counter.fetch_add(1);
}

void compare_exchange() {
    int expected = 5;
    int desired = 10;
    
    // Compare-and-swap
    if (counter.compare_exchange_strong(expected, desired)) {
        // Success: counter was 5, now 10
    } else {
        // Failed: expected now contains actual value
    }
}
\`\`\`

### Memory Ordering
\`\`\`cpp
std::atomic<int> x(0);
std::atomic<int> y(0);

// Thread 1
x.store(1, std::memory_order_release);

// Thread 2
while (x.load(std::memory_order_acquire) == 0);
y.store(1);  // happens after x
\`\`\`

## Common Patterns

### Thread Pool
\`\`\`cpp
class ThreadPool {
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex mtx;
    std::condition_variable cv;
    bool stop = false;
    
public:
    ThreadPool(size_t threads) {
        for (size_t i = 0; i < threads; i++) {
            workers.emplace_back([this] {
                while (true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(mtx);
                        cv.wait(lock, [this]{ 
                            return stop || !tasks.empty(); 
                        });
                        
                        if (stop && tasks.empty()) return;
                        
                        task = std::move(tasks.front());
                        tasks.pop();
                    }
                    task();
                }
            });
        }
    }
    
    template<class F>
    void enqueue(F&& f) {
        {
            std::unique_lock<std::mutex> lock(mtx);
            tasks.emplace(std::forward<F>(f));
        }
        cv.notify_one();
    }
    
    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(mtx);
            stop = true;
        }
        cv.notify_all();
        for (auto& worker : workers) {
            worker.join();
        }
    }
};
\`\`\`

### Read-Write Lock
\`\`\`cpp
#include <shared_mutex>

std::shared_mutex rw_mutex;
int shared_data = 0;

void read() {
    std::shared_lock<std::shared_mutex> lock(rw_mutex);
    // Multiple readers can acquire simultaneously
    std::cout << shared_data << std::endl;
}

void write(int value) {
    std::unique_lock<std::shared_mutex> lock(rw_mutex);
    // Only one writer, blocks all readers
    shared_data = value;
}
\`\`\`

## Common Issues

### Race Condition
\`\`\`cpp
// WRONG: Race condition
int counter = 0;

void increment() {
    counter++;  // read-modify-write is not atomic!
}

// Thread 1: reads 0, adds 1, writes 1
// Thread 2: reads 0, adds 1, writes 1
// Expected: 2, Actual: 1
\`\`\`

### Deadlock
\`\`\`cpp
std::mutex mtx1, mtx2;

// Thread 1
void thread1() {
    std::lock_guard<std::mutex> lock1(mtx1);
    std::lock_guard<std::mutex> lock2(mtx2);
}

// Thread 2
void thread2() {
    std::lock_guard<std::mutex> lock2(mtx2);
    std::lock_guard<std::mutex> lock1(mtx1);  // DEADLOCK!
}

// Solution: Lock in same order or use std::lock
void safe() {
    std::lock(mtx1, mtx2);
    std::lock_guard<std::mutex> lock1(mtx1, std::adopt_lock);
    std::lock_guard<std::mutex> lock2(mtx2, std::adopt_lock);
}
\`\`\`

### False Sharing
\`\`\`cpp
struct Bad {
    std::atomic<int> x;
    std::atomic<int> y;  // shares cache line with x
};

// Thread 1 writes x, Thread 2 writes y
// Cache line bouncing between cores!

struct Good {
    alignas(64) std::atomic<int> x;
    alignas(64) std::atomic<int> y;  // separate cache lines
};
\`\`\`

## async & future

### std::async
\`\`\`cpp
#include <future>

int compute(int x) {
    return x * x;
}

int main() {
    std::future<int> result = std::async(std::launch::async, compute, 10);
    
    // Do other work
    
    int value = result.get();  // blocks until ready
    std::cout << value << std::endl;  // 100
}
\`\`\`

### std::promise
\`\`\`cpp
void worker(std::promise<int> prom) {
    // Do work
    int result = 42;
    prom.set_value(result);
}

int main() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();
    
    std::thread t(worker, std::move(prom));
    
    int result = fut.get();
    t.join();
}
\`\`\`

## Performance Tips
1. Minimize lock contention
2. Use lock-free data structures when possible
3. Avoid false sharing
4. Use thread pools for task management
5. Profile before optimizing

## Interview Questions
1. Mutex vs Spinlock?
2. What is a race condition?
3. How to prevent deadlock?
4. When to use atomic vs mutex?
5. Explain false sharing
`,
    resources: [
      { title: "C++ Concurrency in Action", url: "https://www.manning.com/books/c-plus-plus-concurrency-in-action" },
      { title: "cppreference Threading", url: "https://en.cppreference.com/w/cpp/thread" }
    ]
  }
}
