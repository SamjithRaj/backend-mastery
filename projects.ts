export const projectGuides = {
  "http-server": {
    title: "HTTP Server from Scratch",
    difficulty: "medium",
    description: "Build a fully functional HTTP/1.1 server in C++",
    skills: ["Sockets", "HTTP Protocol", "TCP/IP", "String Parsing"],
    architecture: `
# HTTP Server Architecture

## Components
1. Socket Manager - Handle connections
2. HTTP Parser - Parse requests
3. Router - Route to handlers
4. Response Builder - Build HTTP responses
5. File Server - Serve static files

## Flow
Client -> Socket -> Parser -> Router -> Handler -> Response -> Client
`,
    implementation: `
# Implementation Steps

## Step 1: Basic Socket Server
\`\`\`cpp
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>
#include <iostream>

class HTTPServer {
    int server_fd;
    int port;
    
public:
    HTTPServer(int p) : port(p) {}
    
    void start() {
        server_fd = socket(AF_INET, SOCK_STREAM, 0);
        
        int opt = 1;
        setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
        
        sockaddr_in address;
        address.sin_family = AF_INET;
        address.sin_addr.s_addr = INADDR_ANY;
        address.sin_port = htons(port);
        
        bind(server_fd, (struct sockaddr*)&address, sizeof(address));
        listen(server_fd, 10);
        
        std::cout << "Server listening on port " << port << std::endl;
        
        while (true) {
            int client_fd = accept(server_fd, nullptr, nullptr);
            handleClient(client_fd);
            close(client_fd);
        }
    }
    
    void handleClient(int client_fd) {
        char buffer[4096] = {0};
        read(client_fd, buffer, 4096);
        
        std::string response = 
            "HTTP/1.1 200 OK\\r\\n"
            "Content-Type: text/plain\\r\\n"
            "Content-Length: 13\\r\\n"
            "\\r\\n"
            "Hello, World!";
        
        write(client_fd, response.c_str(), response.length());
    }
};
\`\`\`

## Step 2: HTTP Request Parser
\`\`\`cpp
struct HTTPRequest {
    std::string method;
    std::string path;
    std::string version;
    std::unordered_map<std::string, std::string> headers;
    std::string body;
};

HTTPRequest parseRequest(const std::string& raw) {
    HTTPRequest req;
    std::istringstream stream(raw);
    std::string line;
    
    // Parse request line
    std::getline(stream, line);
    std::istringstream reqLine(line);
    reqLine >> req.method >> req.path >> req.version;
    
    // Parse headers
    while (std::getline(stream, line) && line != "\\r") {
        size_t colon = line.find(':');
        if (colon != std::string::npos) {
            std::string key = line.substr(0, colon);
            std::string value = line.substr(colon + 2);
            req.headers[key] = value;
        }
    }
    
    // Parse body
    std::string bodyLine;
    while (std::getline(stream, bodyLine)) {
        req.body += bodyLine;
    }
    
    return req;
}
\`\`\`

## Step 3: Router
\`\`\`cpp
class Router {
    using Handler = std::function<std::string(const HTTPRequest&)>;
    std::unordered_map<std::string, Handler> routes;
    
public:
    void addRoute(const std::string& path, Handler handler) {
        routes[path] = handler;
    }
    
    std::string route(const HTTPRequest& req) {
        if (routes.count(req.path)) {
            return routes[req.path](req);
        }
        return "HTTP/1.1 404 Not Found\\r\\n\\r\\n404 Not Found";
    }
};
\`\`\`

## Step 4: Response Builder
\`\`\`cpp
class ResponseBuilder {
public:
    static std::string build(int status, const std::string& body,
                            const std::string& contentType = "text/html") {
        std::string statusText;
        switch(status) {
            case 200: statusText = "OK"; break;
            case 404: statusText = "Not Found"; break;
            case 500: statusText = "Internal Server Error"; break;
        }
        
        std::ostringstream response;
        response << "HTTP/1.1 " << status << " " << statusText << "\\r\\n";
        response << "Content-Type: " << contentType << "\\r\\n";
        response << "Content-Length: " << body.length() << "\\r\\n";
        response << "\\r\\n";
        response << body;
        
        return response.str();
    }
};
\`\`\`

## Step 5: Complete Server
\`\`\`cpp
int main() {
    Router router;
    
    router.addRoute("/", [](const HTTPRequest& req) {
        return ResponseBuilder::build(200, "<h1>Welcome!</h1>");
    });
    
    router.addRoute("/api/users", [](const HTTPRequest& req) {
        return ResponseBuilder::build(200, 
            "{\\"users\\":[\\"Alice\\",\\"Bob\\"]}", 
            "application/json");
    });
    
    HTTPServer server(8080);
    server.start();
    
    return 0;
}
\`\`\`
`,
    features: [
      "GET/POST/PUT/DELETE support",
      "Query parameter parsing",
      "JSON request/response",
      "Static file serving",
      "Logging middleware",
      "Error handling"
    ]
  },
  "multithreaded-server": {
    title: "Multithreaded HTTP Server",
    difficulty: "hard",
    description: "Scale your HTTP server with thread pool",
    skills: ["Threading", "Concurrency", "Thread Pool", "Load Balancing"],
    architecture: `
# Multithreaded Server Architecture

## Thread Pool Design
\`\`\`
Main Thread (Accept)
    |
    +--> Task Queue
            |
            +--> Worker Thread 1
            +--> Worker Thread 2
            +--> Worker Thread 3
            +--> Worker Thread N
\`\`\`

## Components
1. Main thread accepts connections
2. Task queue holds pending work
3. Worker threads process requests
4. Connection pool reuses connections
`,
    implementation: `
# Implementation

## Thread Pool
\`\`\`cpp
class ThreadPool {
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex queue_mutex;
    std::condition_variable condition;
    bool stop;
    
public:
    ThreadPool(size_t threads) : stop(false) {
        for(size_t i = 0; i < threads; ++i) {
            workers.emplace_back([this] {
                while(true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(queue_mutex);
                        condition.wait(lock, [this]{ 
                            return stop || !tasks.empty(); 
                        });
                        
                        if(stop && tasks.empty()) return;
                        
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
            std::unique_lock<std::mutex> lock(queue_mutex);
            tasks.emplace(std::forward<F>(f));
        }
        condition.notify_one();
    }
    
    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            stop = true;
        }
        condition.notify_all();
        for(std::thread &worker: workers)
            worker.join();
    }
};
\`\`\`

## Multithreaded Server
\`\`\`cpp
class MultithreadedHTTPServer {
    int server_fd;
    ThreadPool pool;
    Router router;
    
public:
    MultithreadedHTTPServer(int port, size_t threads = 4) 
        : pool(threads) {
        server_fd = socket(AF_INET, SOCK_STREAM, 0);
        
        int opt = 1;
        setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
        
        sockaddr_in address;
        address.sin_family = AF_INET;
        address.sin_addr.s_addr = INADDR_ANY;
        address.sin_port = htons(port);
        
        bind(server_fd, (struct sockaddr*)&address, sizeof(address));
        listen(server_fd, 128);
    }
    
    void start() {
        while(true) {
            int client_fd = accept(server_fd, nullptr, nullptr);
            
            // Submit to thread pool
            pool.enqueue([this, client_fd]() {
                handleClient(client_fd);
                close(client_fd);
            });
        }
    }
    
    void handleClient(int client_fd) {
        char buffer[4096] = {0};
        read(client_fd, buffer, 4096);
        
        HTTPRequest req = parseRequest(buffer);
        std::string response = router.route(req);
        
        write(client_fd, response.c_str(), response.length());
    }
};
\`\`\`
`,
    optimizations: [
      "Connection pooling",
      "Keep-alive connections",
      "Non-blocking I/O",
      "epoll/kqueue for scaling",
      "Load balancing across threads"
    ]
  },
  "redis-clone": {
    title: "Mini Redis Clone",
    difficulty: "hard",
    description: "In-memory key-value store with persistence",
    skills: ["Data Structures", "Serialization", "Networking", "Persistence"],
    features: [
      "SET/GET/DEL operations",
      "Expiration (TTL)",
      "Persistence (RDB snapshots)",
      "Multiple data types (String, List, Hash)",
      "Pub/Sub",
      "Transactions"
    ],
    implementation: `
# Mini Redis Implementation

## Core Data Store
\`\`\`cpp
class RedisStore {
    struct Value {
        std::string data;
        std::chrono::system_clock::time_point expiry;
        bool hasExpiry = false;
    };
    
    std::unordered_map<std::string, Value> store;
    std::mutex store_mutex;
    
public:
    void set(const std::string& key, const std::string& value, 
             int ttl_seconds = -1) {
        std::lock_guard<std::mutex> lock(store_mutex);
        Value v;
        v.data = value;
        if (ttl_seconds > 0) {
            v.hasExpiry = true;
            v.expiry = std::chrono::system_clock::now() + 
                       std::chrono::seconds(ttl_seconds);
        }
        store[key] = v;
    }
    
    std::optional<std::string> get(const std::string& key) {
        std::lock_guard<std::mutex> lock(store_mutex);
        
        auto it = store.find(key);
        if (it == store.end()) return std::nullopt;
        
        // Check expiry
        if (it->second.hasExpiry && 
            std::chrono::system_clock::now() > it->second.expiry) {
            store.erase(it);
            return std::nullopt;
        }
        
        return it->second.data;
    }
    
    bool del(const std::string& key) {
        std::lock_guard<std::mutex> lock(store_mutex);
        return store.erase(key) > 0;
    }
};
\`\`\`

## RESP Protocol Parser
\`\`\`cpp
class RESPParser {
public:
    static std::vector<std::string> parse(const std::string& input) {
        // Simple array parsing: *3\\r\\n$3\\r\\nSET\\r\\n$3\\r\\nkey\\r\\n$5\\r\\nvalue\\r\\n
        std::vector<std::string> result;
        std::istringstream stream(input);
        std::string line;
        
        std::getline(stream, line); // *3
        int count = std::stoi(line.substr(1));
        
        for (int i = 0; i < count; i++) {
            std::getline(stream, line); // $3
            int len = std::stoi(line.substr(1));
            std::getline(stream, line); // actual data
            result.push_back(line);
        }
        
        return result;
    }
};
\`\`\`

## Command Handler
\`\`\`cpp
class CommandHandler {
    RedisStore& store;
    
public:
    CommandHandler(RedisStore& s) : store(s) {}
    
    std::string handle(const std::vector<std::string>& cmd) {
        if (cmd.empty()) return "-ERR empty command\\r\\n";
        
        std::string command = cmd[0];
        std::transform(command.begin(), command.end(), 
                      command.begin(), ::toupper);
        
        if (command == "SET") {
            if (cmd.size() < 3) return "-ERR wrong number of arguments\\r\\n";
            int ttl = cmd.size() > 3 ? std::stoi(cmd[3]) : -1;
            store.set(cmd[1], cmd[2], ttl);
            return "+OK\\r\\n";
        }
        else if (command == "GET") {
            if (cmd.size() < 2) return "-ERR wrong number of arguments\\r\\n";
            auto val = store.get(cmd[1]);
            if (val) return "$" + std::to_string(val->length()) + 
                            "\\r\\n" + *val + "\\r\\n";
            return "$-1\\r\\n"; // null
        }
        else if (command == "DEL") {
            if (cmd.size() < 2) return "-ERR wrong number of arguments\\r\\n";
            bool deleted = store.del(cmd[1]);
            return ":" + std::to_string(deleted ? 1 : 0) + "\\r\\n";
        }
        
        return "-ERR unknown command\\r\\n";
    }
};
\`\`\`
`
  },
  "rate-limiter": {
    title: "Rate Limiter",
    difficulty: "medium",
    description: "Implement token bucket and sliding window algorithms",
    algorithms: [
      "Token Bucket",
      "Leaky Bucket",
      "Fixed Window",
      "Sliding Window Log",
      "Sliding Window Counter"
    ],
    implementation: `
# Rate Limiter Implementations

## Token Bucket
\`\`\`cpp
class TokenBucket {
    int capacity;
    int tokens;
    int refill_rate; // tokens per second
    std::chrono::system_clock::time_point last_refill;
    std::mutex mtx;
    
public:
    TokenBucket(int cap, int rate) 
        : capacity(cap), tokens(cap), refill_rate(rate),
          last_refill(std::chrono::system_clock::now()) {}
    
    bool allowRequest() {
        std::lock_guard<std::mutex> lock(mtx);
        refill();
        
        if (tokens > 0) {
            tokens--;
            return true;
        }
        return false;
    }
    
private:
    void refill() {
        auto now = std::chrono::system_clock::now();
        auto elapsed = std::chrono::duration_cast<std::chrono::seconds>(
            now - last_refill).count();
        
        int new_tokens = elapsed * refill_rate;
        tokens = std::min(capacity, tokens + new_tokens);
        last_refill = now;
    }
};
\`\`\`

## Sliding Window Log
\`\`\`cpp
class SlidingWindowLog {
    int limit;
    int window_seconds;
    std::map<std::chrono::system_clock::time_point, int> log;
    std::mutex mtx;
    
public:
    SlidingWindowLog(int lim, int window) 
        : limit(lim), window_seconds(window) {}
    
    bool allowRequest() {
        std::lock_guard<std::mutex> lock(mtx);
        auto now = std::chrono::system_clock::now();
        auto window_start = now - std::chrono::seconds(window_seconds);
        
        // Remove old entries
        auto it = log.begin();
        while (it != log.end() && it->first < window_start) {
            it = log.erase(it);
        }
        
        // Count requests in window
        int count = 0;
        for (const auto& [time, cnt] : log) {
            count += cnt;
        }
        
        if (count < limit) {
            log[now]++;
            return true;
        }
        return false;
    }
};
\`\`\`

## Distributed Rate Limiter (Redis-based)
\`\`\`cpp
class DistributedRateLimiter {
    RedisClient redis;
    
public:
    bool allowRequest(const std::string& key, int limit, int window) {
        auto now = std::chrono::system_clock::now().time_since_epoch().count();
        
        // Sliding window using sorted set
        redis.zremrangebyscore(key, 0, now - window * 1000);
        int count = redis.zcard(key);
        
        if (count < limit) {
            redis.zadd(key, now, std::to_string(now));
            redis.expire(key, window);
            return true;
        }
        return false;
    }
};
\`\`\`
`
  },
  "url-shortener": {
    title: "URL Shortener",
    difficulty: "medium",
    description: "Build a scalable URL shortening service",
    features: [
      "Short URL generation",
      "Redirect service",
      "Analytics tracking",
      "Custom aliases",
      "Expiration",
      "Rate limiting"
    ],
    implementation: `
# URL Shortener

## Base62 Encoding
\`\`\`cpp
class Base62 {
    const std::string CHARS = 
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
public:
    std::string encode(long long num) {
        if (num == 0) return "0";
        
        std::string result;
        while (num > 0) {
            result = CHARS[num % 62] + result;
            num /= 62;
        }
        return result;
    }
    
    long long decode(const std::string& str) {
        long long result = 0;
        for (char c : str) {
            result = result * 62 + CHARS.find(c);
        }
        return result;
    }
};
\`\`\`

## URL Shortener Service
\`\`\`cpp
class URLShortener {
    std::unordered_map<std::string, std::string> url_map;
    std::atomic<long long> counter{1000000};
    Base62 encoder;
    std::mutex mtx;
    
public:
    std::string shorten(const std::string& long_url) {
        // Check if already exists
        for (const auto& [short_code, url] : url_map) {
            if (url == long_url) return short_code;
        }
        
        // Generate new short code
        long long id = counter.fetch_add(1);
        std::string short_code = encoder.encode(id);
        
        std::lock_guard<std::mutex> lock(mtx);
        url_map[short_code] = long_url;
        
        return short_code;
    }
    
    std::optional<std::string> expand(const std::string& short_code) {
        std::lock_guard<std::mutex> lock(mtx);
        auto it = url_map.find(short_code);
        if (it != url_map.end()) {
            return it->second;
        }
        return std::nullopt;
    }
};
\`\`\`

## With Analytics
\`\`\`cpp
struct URLData {
    std::string long_url;
    int clicks = 0;
    std::chrono::system_clock::time_point created;
    std::chrono::system_clock::time_point expires;
};

class URLShortenerWithAnalytics {
    std::unordered_map<std::string, URLData> url_map;
    std::atomic<long long> counter{1000000};
    Base62 encoder;
    std::mutex mtx;
    
public:
    std::string shorten(const std::string& long_url, int ttl_days = -1) {
        long long id = counter.fetch_add(1);
        std::string short_code = encoder.encode(id);
        
        URLData data;
        data.long_url = long_url;
        data.created = std::chrono::system_clock::now();
        
        if (ttl_days > 0) {
            data.expires = data.created + 
                          std::chrono::hours(24 * ttl_days);
        }
        
        std::lock_guard<std::mutex> lock(mtx);
        url_map[short_code] = data;
        
        return short_code;
    }
    
    std::optional<std::string> expand(const std::string& short_code) {
        std::lock_guard<std::mutex> lock(mtx);
        
        auto it = url_map.find(short_code);
        if (it == url_map.end()) return std::nullopt;
        
        // Check expiry
        auto now = std::chrono::system_clock::now();
        if (it->second.expires != std::chrono::system_clock::time_point() &&
            now > it->second.expires) {
            url_map.erase(it);
            return std::nullopt;
        }
        
        // Increment clicks
        it->second.clicks++;
        
        return it->second.long_url;
    }
    
    int getClicks(const std::string& short_code) {
        std::lock_guard<std::mutex> lock(mtx);
        auto it = url_map.find(short_code);
        return it != url_map.end() ? it->second.clicks : 0;
    }
};
\`\`\`
`
  }
}
