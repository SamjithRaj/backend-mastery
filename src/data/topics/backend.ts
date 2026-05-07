import type { Topic } from "@/types/topic";

export const backendTopics: Topic[] = [
  {
    id: "api-lifecycle", title: "API Request Lifecycle", category: "backend", description: "Trace the complete journey of an API request from client through the backend pipeline.", difficulty: 1, estimatedMinutes: 30, xpReward: 40, prerequisites: [], tags: ["backend", "API", "REST"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "When you hit an API endpoint, your request travels through DNS, load balancers, reverse proxies, middleware, auth, route handlers, database, and back. Understanding this full lifecycle is crucial for debugging and optimization." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "Follow a request through the backend pipeline.", animationId: "api-lifecycle" },
      { id: "technical", type: "technical", title: "The Pipeline", content: "## Request Flow\n\n1. **DNS Resolution**: Domain → IP address\n2. **Load Balancer**: Route to healthy server instance\n3. **Reverse Proxy**: Nginx/Caddy — SSL termination, compression\n4. **Middleware Stack**: Logging → CORS → Rate Limiting → Auth\n5. **Route Handler**: Match URL pattern, extract params\n6. **Business Logic**: Validate input, process data\n7. **Database Query**: Read/write data\n8. **Response Serialization**: Format response (JSON)\n9. **Response Headers**: Cache-Control, Content-Type, CORS\n10. **Send Response**: Status code + body back to client" },
    ],
    quiz: [
      { id: "q1", question: "Typical middleware order?", options: ["Auth → Logging", "Logging → CORS → Rate Limit → Auth", "Random", "Auth → CORS"], correctIndex: 1, explanation: "Log first, then CORS/rate limit, then auth." },
    ],
  },
  {
    id: "rate-limiter", title: "Rate Limiting Algorithms", category: "backend", description: "Token bucket, sliding window, and fixed window algorithms for API protection.", difficulty: 2, estimatedMinutes: 35, xpReward: 45, prerequisites: [], tags: ["backend", "rate limiting", "system design"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Rate limiting prevents abuse and protects servers. Like a bouncer at a club — only allowing a certain number of people in per time window." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "See token bucket rate limiting in action.", animationId: "rate-limiter" },
      { id: "technical", type: "technical", title: "Algorithms", content: "## Token Bucket\n- Bucket holds N tokens, refills at rate R\n- Each request takes 1 token\n- Empty bucket → reject request\n- Allows bursts up to bucket capacity\n\n## Sliding Window Log\n- Store timestamp of each request\n- Count requests in last N seconds\n- Precise but memory heavy\n\n## Sliding Window Counter\n- Combine fixed windows with weighted count\n- Good balance of accuracy and memory\n\n## Fixed Window\n- Count requests per time window (e.g., per minute)\n- Simple but burst at window boundaries" },
      { id: "code", type: "code-walkthrough", title: "Code: Token Bucket", content: "Redis-based rate limiter:", codeSnippet: "import time\n\nclass TokenBucket:\n    def __init__(self, capacity, refill_rate):\n        self.capacity = capacity\n        self.tokens = capacity\n        self.refill_rate = refill_rate\n        self.last_refill = time.time()\n    \n    def allow_request(self):\n        now = time.time()\n        elapsed = now - self.last_refill\n        self.tokens = min(\n            self.capacity,\n            self.tokens + elapsed * self.refill_rate\n        )\n        self.last_refill = now\n        \n        if self.tokens >= 1:\n            self.tokens -= 1\n            return True\n        return False\n\nlimiter = TokenBucket(capacity=10, refill_rate=1)\nprint(limiter.allow_request())  # True", language: "python" },
    ],
    quiz: [
      { id: "q1", question: "Which allows controlled bursts?", options: ["Fixed Window", "Token Bucket", "Leaky Bucket", "Sliding Log"], correctIndex: 1, explanation: "Token bucket allows bursts up to bucket capacity." },
    ],
  },
  {
    id: "auth-jwt", title: "Authentication & JWT", category: "backend", description: "JWT tokens, OAuth 2.0, session management, and authentication best practices.", difficulty: 2, estimatedMinutes: 40, xpReward: 50, prerequisites: ["api-lifecycle"], tags: ["backend", "auth", "JWT", "security"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Authentication verifies WHO you are. Authorization determines WHAT you can do. JWTs are self-contained tokens that carry user info, eliminating the need for server-side session storage." },
      { id: "technical", type: "technical", title: "JWT Structure", content: "## JWT = Header.Payload.Signature\n\n### Header\n```json\n{ \"alg\": \"HS256\", \"typ\": \"JWT\" }\n```\n\n### Payload (Claims)\n```json\n{ \"sub\": \"user123\", \"role\": \"admin\", \"exp\": 1710000000 }\n```\n\n### Signature\n```\nHMAC-SHA256(base64(header) + \".\" + base64(payload), secret)\n```\n\n## JWT vs Sessions\n\n| JWT | Sessions |\n|-----|----------|\n| Stateless (no server storage) | Stateful (server stores session) |\n| Can't revoke easily | Easy to invalidate |\n| Larger payload | Small session ID |\n| Good for microservices | Good for monoliths |\n\n## OAuth 2.0 Flows\n\n- **Authorization Code**: For server-side apps (most secure)\n- **PKCE**: For SPAs and mobile apps\n- **Client Credentials**: For machine-to-machine\n- **Refresh Tokens**: Long-lived token to get new access tokens" },
      { id: "code", type: "code-walkthrough", title: "Code: JWT Auth", content: "JWT implementation:", codeSnippet: "import jwt\nfrom datetime import datetime, timedelta\n\nSECRET = 'your-secret-key'\n\ndef create_token(user_id: str, role: str) -> str:\n    payload = {\n        'sub': user_id,\n        'role': role,\n        'iat': datetime.utcnow(),\n        'exp': datetime.utcnow() + timedelta(hours=1)\n    }\n    return jwt.encode(payload, SECRET, algorithm='HS256')\n\ndef verify_token(token: str) -> dict:\n    try:\n        return jwt.decode(token, SECRET, algorithms=['HS256'])\n    except jwt.ExpiredSignatureError:\n        raise Exception('Token expired')\n    except jwt.InvalidTokenError:\n        raise Exception('Invalid token')", language: "python" },
    ],
    quiz: [
      { id: "q1", question: "What's the main advantage of JWT?", options: ["Smaller size", "Stateless — no server storage", "Easier to revoke", "More secure"], correctIndex: 1, explanation: "JWTs are stateless — the server doesn't need to store session data." },
    ],
  },
  {
    id: "caching-strategies", title: "Caching Strategies", category: "backend", description: "Cache patterns, Redis operations, eviction policies, cache invalidation, and CDNs.", difficulty: 3, estimatedMinutes: 45, xpReward: 55, prerequisites: ["api-lifecycle"], tags: ["caching", "Redis", "performance"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Caching stores frequently accessed data closer to the consumer. Reading from cache is 100-1000x faster than reading from database. The hard part is keeping the cache consistent with the source of truth." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "See cache hit vs cache miss flow.", animationId: "cache-hit-miss" },
      { id: "technical", type: "technical", title: "Cache Patterns", content: "## Cache-Aside (Lazy Loading)\n1. Check cache first\n2. On miss: read from DB, write to cache\n3. On hit: return cached data\n\n## Write-Through\n1. Write to cache AND database\n2. Cache is always up-to-date\n3. Higher write latency\n\n## Write-Behind (Write-Back)\n1. Write to cache only\n2. Async write to database\n3. Risk of data loss\n\n## Eviction Policies\n- **LRU**: Evict least recently used\n- **LFU**: Evict least frequently used\n- **TTL**: Expire after time limit\n- **Random**: Evict random key\n\n## Cache Invalidation\n\nThe two hardest problems in CS: cache invalidation and naming things.\n- **TTL-based**: Set expiry time\n- **Event-based**: Invalidate on write\n- **Version-based**: Include version in cache key" },
      { id: "code", type: "code-walkthrough", title: "Code: Redis Cache", content: "Cache-aside pattern:", codeSnippet: "import redis\nimport json\n\nr = redis.Redis(host='localhost', port=6379)\n\ndef get_user(user_id: str) -> dict:\n    # 1. Check cache\n    cached = r.get(f'user:{user_id}')\n    if cached:\n        return json.loads(cached)  # Cache HIT\n    \n    # 2. Cache MISS - read from DB\n    user = db.query(f'SELECT * FROM users WHERE id = %s', user_id)\n    \n    # 3. Store in cache with TTL\n    r.setex(\n        f'user:{user_id}',\n        3600,  # 1 hour TTL\n        json.dumps(user)\n    )\n    return user", language: "python" },
    ],
    quiz: [
      { id: "q1", question: "Which pattern has risk of stale data?", options: ["Write-Through", "Cache-Aside", "Write-Behind", "All of them"], correctIndex: 1, explanation: "Cache-aside can serve stale data between DB write and cache invalidation." },
    ],
  },
  {
    id: "message-queues", title: "Message Queues", category: "backend", description: "Async processing with RabbitMQ, Kafka, SQS — producers, consumers, and delivery guarantees.", difficulty: 3, estimatedMinutes: 40, xpReward: 55, prerequisites: ["api-lifecycle"], tags: ["backend", "queues", "async", "Kafka"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Instead of processing everything synchronously (user waits), message queues let you decouple work. Send an email? Queue it. Process a payment? Queue it. Generate a report? Queue it. The producer sends a message, the consumer processes it later." },
      { id: "technical", type: "technical", title: "Queue Systems", content: "## RabbitMQ (Traditional Message Broker)\n- Point-to-point or pub/sub\n- Message acknowledged and removed\n- Good for task distribution\n- Supports complex routing\n\n## Apache Kafka (Event Streaming)\n- Distributed commit log\n- Messages persisted on disk\n- Consumer groups for parallel processing\n- Messages can be replayed\n- Good for event sourcing, real-time analytics\n\n## Delivery Guarantees\n\n- **At most once**: Fire and forget. May lose messages.\n- **At least once**: Retry on failure. May duplicate.\n- **Exactly once**: Most complex. Kafka supports via idempotent producers + transactions.\n\n## Key Concepts\n\n- **Topic**: Named channel for messages\n- **Partition**: Subdivision for parallel processing\n- **Consumer Group**: Multiple consumers sharing work\n- **Offset**: Position in the log\n- **Dead Letter Queue**: Where failed messages go" },
    ],
    quiz: [
      { id: "q1", question: "Key difference between RabbitMQ and Kafka?", options: ["Kafka is slower", "Kafka persists messages as a log", "RabbitMQ is distributed", "No difference"], correctIndex: 1, explanation: "Kafka persists messages as an immutable log, allowing replay. RabbitMQ removes messages after consumption." },
    ],
  },
];
