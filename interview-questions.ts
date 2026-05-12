export const interviewQuestions = {
  systemDesign: [
    {
      title: "Design a URL Shortener",
      difficulty: "medium",
      topics: ["Hashing", "Database Design", "Scalability"],
      solution: `
# URL Shortener Design

## Requirements
- Generate short URLs from long URLs
- Redirect short URLs to original URLs
- Track analytics (clicks, timestamps)
- Handle 1M+ URLs
- Low latency (<100ms)

## High-Level Design
\`\`\`
Client → Load Balancer → App Servers → Cache → Database
\`\`\`

## Components

### 1. URL Generation
- Use Base62 encoding (a-zA-Z0-9)
- 6 characters = 62^6 = 56 billion URLs
- Use auto-incrementing ID + Base62 encoding
- Or use hash function (MD5/SHA256) + truncate

### 2. Database Schema
\`\`\`sql
CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    long_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    clicks INTEGER DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
\`\`\`

### 3. API Design
\`\`\`
POST /api/shorten
Body: { "url": "https://example.com/very/long/url" }
Response: { "short_url": "https://short.io/abc123" }

GET /{short_code}
Response: 302 Redirect to long_url
\`\`\`

### 4. Caching Strategy
- Cache hot URLs in Redis
- LRU eviction policy
- TTL: 24 hours
- Cache hit ratio: >80%

### 5. Scalability
- Horizontal scaling with stateless servers
- Database sharding by short_code hash
- CDN for static content
- Rate limiting per IP

## Code Implementation
\`\`\`cpp
class Base62 {
    const string CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
public:
    string encode(long long num) {
        if (num == 0) return "0";
        string result;
        while (num > 0) {
            result = CHARS[num % 62] + result;
            num /= 62;
        }
        return result;
    }
};
\`\`\`

## Trade-offs
- **Auto-increment**: Sequential, predictable, fast
- **Hash**: Random, collision handling needed
- **Hybrid**: Range-based IDs per server
`
    },
    {
      title: "Design a Rate Limiter",
      difficulty: "medium",
      topics: ["Algorithms", "Distributed Systems", "Redis"],
      solution: `
# Rate Limiter Design

## Requirements
- Limit requests per user/IP
- Support multiple rate limits (per second, minute, hour)
- Low latency overhead
- Distributed system support
- Accurate counting

## Algorithms

### 1. Token Bucket
\`\`\`cpp
class TokenBucket {
    int capacity;
    int tokens;
    int refill_rate;
    time_point last_refill;
    
    bool allow_request() {
        refill_tokens();
        if (tokens > 0) {
            tokens--;
            return true;
        }
        return false;
    }
    
    void refill_tokens() {
        auto now = steady_clock::now();
        auto elapsed = duration_cast<seconds>(now - last_refill).count();
        tokens = min(capacity, tokens + elapsed * refill_rate);
        last_refill = now;
    }
};
\`\`\`

### 2. Sliding Window Log
\`\`\`cpp
class SlidingWindowLog {
    map<time_t, int> log;
    int limit;
    int window_seconds;
    
    bool allow_request() {
        auto now = time(nullptr);
        auto window_start = now - window_seconds;
        
        // Remove old entries
        auto it = log.begin();
        while (it != log.end() && it->first < window_start) {
            it = log.erase(it);
        }
        
        // Count requests
        int count = 0;
        for (const auto& [ts, cnt] : log) count += cnt;
        
        if (count < limit) {
            log[now]++;
            return true;
        }
        return false;
    }
};
\`\`\`

## Distributed Implementation (Redis)
\`\`\`lua
-- Redis Lua script for atomic rate limiting
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

-- Remove old entries
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)

-- Count current entries
local count = redis.call('ZCARD', key)

if count < limit then
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, window)
    return 1
else
    return 0
end
\`\`\`

## Architecture
\`\`\`
Client → API Gateway → Rate Limiter → Backend Service
                ↓
              Redis Cluster
\`\`\`

## Comparison

| Algorithm | Memory | Accuracy | Complexity |
|-----------|--------|----------|------------|
| Token Bucket | O(1) | Approximate | Simple |
| Leaky Bucket | O(1) | Exact | Simple |
| Fixed Window | O(1) | Approximate | Simple |
| Sliding Window Log | O(N) | Exact | Medium |
| Sliding Window Counter | O(1) | Approximate | Medium |

## Interview Points
- Discuss trade-offs between accuracy and performance
- Explain distributed challenges (race conditions)
- Mention Redis atomic operations
- Consider multi-tier rate limiting (per user, per IP, global)
`
    }
  ],
  
  coding: [
    {
      title: "Implement LRU Cache",
      difficulty: "medium",
      topics: ["Hash Table", "Doubly Linked List", "Design"],
      solution: `
# LRU Cache Implementation

## Requirements
- get(key): Get value in O(1)
- put(key, value): Put value in O(1)
- Evict least recently used when capacity reached

## Approach
Use Hash Table + Doubly Linked List

\`\`\`cpp
class LRUCache {
    struct Node {
        int key, value;
        Node *prev, *next;
        Node(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}
    };
    
    int capacity;
    unordered_map<int, Node*> cache;
    Node *head, *tail;
    
    void addToFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void moveToFront(Node* node) {
        removeNode(node);
        addToFront(node);
    }
    
public:
    LRUCache(int capacity) : capacity(capacity) {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        Node* node = cache[key];
        moveToFront(node);
        return node->value;
    }
    
    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            Node* node = cache[key];
            node->value = value;
            moveToFront(node);
        } else {
            if (cache.size() == capacity) {
                Node* lru = tail->prev;
                cache.erase(lru->key);
                removeNode(lru);
                delete lru;
            }
            Node* newNode = new Node(key, value);
            cache[key] = newNode;
            addToFront(newNode);
        }
    }
};
\`\`\`

## Complexity
- Time: O(1) for both get and put
- Space: O(capacity)

## Interview Tips
- Explain why hash table + doubly linked list
- Discuss dummy head/tail nodes
- Handle edge cases (capacity = 1)
- Mention thread safety considerations
`
    }
  ]
}
