import type { Topic } from "@/types/topic";

export const networkingTopics: Topic[] = [
  {
    id: "tcp-handshake",
    title: "TCP 3-Way Handshake",
    category: "networking",
    description: "Understand how TCP establishes reliable connections through SYN, SYN-ACK, ACK.",
    difficulty: 2, estimatedMinutes: 40, xpReward: 50, prerequisites: [], tags: ["TCP", "networking", "protocols"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Before two computers can exchange data reliably, they need to agree on a connection. Think of it like a phone call — you dial, the other person picks up, and you confirm you can hear each other. TCP does exactly this with three messages: SYN → SYN-ACK → ACK." },
      { id: "analogy", type: "analogy", title: "Real-World Analogy", content: 'Imagine you\'re in a noisy room trying to talk to someone across the room.\n\n1. **You wave** (SYN): "Hey, can you hear me?"\n2. **They wave back** (SYN-ACK): "Yes I can hear you! Can you hear me?"\n3. **You nod** (ACK): "Yes! Let\'s talk."\n\nOnly after all three steps do you both KNOW the connection is reliable in both directions.' },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "Watch the TCP handshake unfold step by step.", animationId: "tcp-handshake" },
      { id: "technical", type: "technical", title: "Technical Deep Dive", content: "## TCP Segment Structure\n\nEach TCP segment contains:\n- **Sequence Number (seq)**: Identifies bytes in the stream\n- **Acknowledgment Number (ack)**: Next byte expected\n- **Flags**: SYN, ACK, FIN, RST, PSH, URG\n- **Window Size**: Flow control\n\n## The Three Steps\n\n### Step 1: SYN (Client → Server)\n- Client sends segment with `SYN=1`, `seq=x` (random ISN)\n- Client enters `SYN_SENT` state\n\n### Step 2: SYN-ACK (Server → Client)\n- Server responds with `SYN=1, ACK=1`, `seq=y, ack=x+1`\n- Server enters `SYN_RECEIVED` state\n\n### Step 3: ACK (Client → Server)\n- Client sends `ACK=1`, `seq=x+1, ack=y+1`\n- Both enter `ESTABLISHED` state" },
      { id: "deep-dive", type: "deep-dive", title: "Why Three Steps?", content: "## Why not two?\n\nA 2-way handshake would mean the server doesn't know if the client received its response. This leads to half-open connections.\n\n## SYN Flood Attack\n\nAttackers send many SYN packets without completing the handshake, exhausting server resources. Defenses:\n- **SYN cookies**: Server doesn't allocate state until ACK received\n- **Rate limiting**: Limit SYN packets per IP\n\n## TCP Fast Open\n\nTFO allows sending data in the SYN packet for repeat connections, eliminating the extra RTT." },
      { id: "code", type: "code-walkthrough", title: "Code: TCP Server", content: "TCP connections at the socket level:", codeSnippet: "import socket\n\nserver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nserver.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\nserver.bind(('0.0.0.0', 8080))\nserver.listen(5)\n\nwhile True:\n    client, addr = server.accept()  # 3-way handshake completes here\n    data = client.recv(1024)\n    client.send(b'ACK: ' + data)\n    client.close()", language: "python" },
      { id: "mistakes", type: "mistakes", title: "Common Mistakes", content: "1. **Confusing SYN with data transfer**: Handshake only establishes connection\n2. **Ignoring TIME_WAIT**: Socket stays in TIME_WAIT for ~2×MSL after closing\n3. **Not setting SO_REUSEADDR**: Server restart fails because port is in TIME_WAIT\n4. **Assuming TCP is always slow**: TCP Fast Open reduces latency for repeat connections" },
      { id: "interview-qs", type: "interview", title: "Interview Questions", content: "**Q1**: Why 3-way handshake instead of 2-way?\n**A**: Ensures both sides can send AND receive reliably.\n\n**Q2**: What happens if the final ACK is lost?\n**A**: Server retransmits SYN-ACK. Client responds with ACK again.\n\n**Q3**: What is a SYN flood attack?\n**A**: Attacker sends many SYNs without completing handshake. Mitigate with SYN cookies.\n\n**Q4**: Explain TCP Fast Open.\n**A**: Sends data in SYN packet for repeat hosts, saving one RTT." },
    ],
    quiz: [
      { id: "q1", question: "What flags does the server send in step 2?", options: ["SYN", "ACK", "SYN + ACK", "FIN + ACK"], correctIndex: 2, explanation: "Server responds with both SYN and ACK." },
      { id: "q2", question: "Client state after sending SYN?", options: ["ESTABLISHED", "SYN_SENT", "SYN_RECEIVED", "LISTEN"], correctIndex: 1, explanation: "Client enters SYN_SENT." },
      { id: "q3", question: "Why are ISNs randomized?", options: ["Performance", "Prevent sequence prediction attacks", "Required by HTTP", "Reduce packet size"], correctIndex: 1, explanation: "Random ISNs prevent session hijacking." },
      { id: "q4", question: "Purpose of TIME_WAIT?", options: ["Speed up connections", "Prevent old packets interfering", "Save memory", "Encrypt connection"], correctIndex: 1, explanation: "Ensures old packets expire before port reuse." },
    ],
  },
  {
    id: "dns-resolution",
    title: "DNS Resolution",
    category: "networking",
    description: "How domain names are translated to IP addresses through recursive and iterative DNS queries.",
    difficulty: 2, estimatedMinutes: 35, xpReward: 45, prerequisites: [], tags: ["DNS", "networking", "infrastructure"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Every time you type a URL, your browser needs to find the actual IP address of the server. DNS is like the internet's phone book — it translates human-readable names (google.com) to machine-readable IP addresses (142.250.80.46)." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "Watch how DNS resolves a domain name step by step.", animationId: "dns-resolution" },
      { id: "technical", type: "technical", title: "Technical Details", content: "## DNS Hierarchy\n\n1. **Browser Cache**: Check if domain was recently resolved\n2. **OS Cache**: Check system DNS cache\n3. **Recursive Resolver**: ISP's DNS server\n4. **Root Name Server**: Knows TLD servers (.com, .org)\n5. **TLD Server**: Knows authoritative servers for domains\n6. **Authoritative Server**: Has the actual IP record\n\n## Record Types\n\n- **A Record**: Maps domain → IPv4 address\n- **AAAA Record**: Maps domain → IPv6 address\n- **CNAME**: Alias from one domain to another\n- **MX**: Mail server records\n- **NS**: Nameserver records\n- **TXT**: Text records (SPF, DKIM verification)" },
      { id: "deep-dive", type: "deep-dive", title: "Performance & Caching", content: "## TTL (Time To Live)\n\nEach DNS record has a TTL specifying how long to cache it. Typical values:\n- CDN domains: 60 seconds\n- Static sites: 3600 seconds (1 hour)\n- Email: 86400 seconds (24 hours)\n\n## DNS over HTTPS (DoH)\n\nTraditional DNS is unencrypted. DoH encrypts DNS queries within HTTPS, preventing ISPs from seeing your queries.\n\n## DNS Load Balancing\n\nReturn multiple A records to distribute traffic. Can use round-robin or geographic-aware responses." },
      { id: "code", type: "code-walkthrough", title: "Code: DNS Lookup", content: "Python DNS lookup:", codeSnippet: "import socket\nimport dns.resolver\n\n# Basic lookup\nip = socket.gethostbyname('google.com')\nprint(f'IP: {ip}')\n\n# Detailed lookup with dnspython\nresult = dns.resolver.resolve('google.com', 'A')\nfor record in result:\n    print(f'A Record: {record}')\n\n# MX records\nmx = dns.resolver.resolve('google.com', 'MX')\nfor record in mx:\n    print(f'MX: {record.exchange} (priority: {record.preference})')", language: "python" },
      { id: "mistakes", type: "mistakes", title: "Common Mistakes", content: "1. **Ignoring TTL**: Setting TTL too high makes DNS changes slow to propagate\n2. **Not using DNS caching**: Repeated lookups add latency to every request\n3. **Single DNS provider**: No redundancy if provider goes down\n4. **Not understanding CNAME chains**: Multiple CNAME lookups add latency" },
    ],
    quiz: [
      { id: "q1", question: "What is the correct DNS resolution order?", options: ["Root → TLD → Authoritative", "Authoritative → TLD → Root", "TLD → Root → Authoritative", "Random"], correctIndex: 0, explanation: "DNS resolves: Root servers → TLD servers → Authoritative servers." },
      { id: "q2", question: "What does an A record map?", options: ["Domain to mail server", "Domain to IPv4 address", "Domain to another domain", "Domain to text"], correctIndex: 1, explanation: "A records map domain names to IPv4 addresses." },
    ],
  },
  {
    id: "http-protocol",
    title: "HTTP Protocol Deep Dive",
    category: "networking",
    description: "HTTP methods, status codes, headers, HTTP/2, HTTP/3, and how the web communicates.",
    difficulty: 1, estimatedMinutes: 45, xpReward: 50, prerequisites: [], tags: ["HTTP", "REST", "web"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "HTTP is the language browsers and servers speak. Every web page, API call, and file download uses HTTP. It's a request-response protocol: client sends a request, server returns a response." },
      { id: "technical", type: "technical", title: "HTTP Methods & Status Codes", content: "## HTTP Methods\n\n| Method | Purpose | Idempotent | Safe |\n|--------|---------|------------|------|\n| GET | Read data | Yes | Yes |\n| POST | Create data | No | No |\n| PUT | Replace data | Yes | No |\n| PATCH | Partial update | No | No |\n| DELETE | Remove data | Yes | No |\n| HEAD | Get headers only | Yes | Yes |\n| OPTIONS | Get allowed methods | Yes | Yes |\n\n## Status Codes\n\n- **2xx Success**: 200 OK, 201 Created, 204 No Content\n- **3xx Redirect**: 301 Permanent, 302 Temporary, 304 Not Modified\n- **4xx Client Error**: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests\n- **5xx Server Error**: 500 Internal Error, 502 Bad Gateway, 503 Service Unavailable" },
      { id: "deep-dive", type: "deep-dive", title: "HTTP/2 and HTTP/3", content: "## HTTP/1.1 Limitations\n\n- One request per connection (or pipelining with head-of-line blocking)\n- Text-based headers (verbose)\n- No server push\n\n## HTTP/2 Improvements\n\n- **Multiplexing**: Multiple requests over single connection\n- **Header compression**: HPACK reduces header size\n- **Server push**: Server can proactively send resources\n- **Binary framing**: More efficient than text\n\n## HTTP/3 (QUIC)\n\n- Built on **UDP** instead of TCP\n- **No head-of-line blocking**: Lost packets don't block other streams\n- **Faster connection**: 0-RTT for repeat connections\n- **Built-in encryption**: TLS 1.3 integrated" },
    ],
    quiz: [
      { id: "q1", question: "Which HTTP method is NOT idempotent?", options: ["GET", "PUT", "POST", "DELETE"], correctIndex: 2, explanation: "POST creates new resources each time, so it's not idempotent." },
      { id: "q2", question: "What transport protocol does HTTP/3 use?", options: ["TCP", "UDP", "SCTP", "WebSocket"], correctIndex: 1, explanation: "HTTP/3 uses QUIC which is built on UDP." },
    ],
  },
  {
    id: "websockets",
    title: "WebSocket Communication",
    category: "networking",
    description: "Full-duplex communication channels over a single TCP connection for real-time applications.",
    difficulty: 2, estimatedMinutes: 30, xpReward: 40, prerequisites: ["http-protocol"], tags: ["WebSocket", "real-time", "networking"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "HTTP is request-response: client asks, server answers. But what about real-time apps like chat, gaming, or live data? WebSockets provide a persistent, bidirectional connection where both sides can send messages anytime." },
      { id: "technical", type: "technical", title: "How WebSockets Work", content: "## The Upgrade Process\n\n1. Client sends HTTP request with `Upgrade: websocket` header\n2. Server responds with `101 Switching Protocols`\n3. TCP connection is now a WebSocket — both sides can send/receive\n\n## Frame Structure\n\n- **Opcode**: Text (0x1), Binary (0x2), Close (0x8), Ping (0x9), Pong (0xA)\n- **Payload length**: 7 bits, 16 bits, or 64 bits\n- **Masking**: Client-to-server frames must be masked\n\n## Use Cases\n\n- Chat applications (WhatsApp Web)\n- Live notifications\n- Multiplayer gaming\n- Financial data feeds\n- Collaborative editing (Google Docs)" },
      { id: "code", type: "code-walkthrough", title: "Code: WebSocket Server", content: "Simple WebSocket server:", codeSnippet: "import asyncio\nimport websockets\n\nconnected = set()\n\nasync def handler(ws):\n    connected.add(ws)\n    try:\n        async for message in ws:\n            # Broadcast to all connected clients\n            for client in connected:\n                if client != ws:\n                    await client.send(f'User: {message}')\n    finally:\n        connected.remove(ws)\n\nasync def main():\n    async with websockets.serve(handler, 'localhost', 8765):\n        await asyncio.Future()  # Run forever\n\nasyncio.run(main())", language: "python" },
    ],
    quiz: [
      { id: "q1", question: "How does a WebSocket connection start?", options: ["New TCP connection", "HTTP Upgrade request", "UDP handshake", "DNS lookup"], correctIndex: 1, explanation: "WebSockets start with an HTTP Upgrade request, then switch protocols." },
    ],
  },
  {
    id: "load-balancing",
    title: "Load Balancing",
    category: "networking",
    description: "Distributing traffic across multiple servers for scalability and reliability.",
    difficulty: 3, estimatedMinutes: 40, xpReward: 55, prerequisites: ["http-protocol"], tags: ["load balancing", "scaling", "infrastructure"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "When one server can't handle all the traffic, you add more servers. A load balancer sits in front and distributes requests across them — like a traffic cop at a busy intersection directing cars to different lanes." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "See different load balancing algorithms in action.", animationId: "load-balancer" },
      { id: "technical", type: "technical", title: "Algorithms", content: "## Load Balancing Algorithms\n\n### Round Robin\nRequests distributed sequentially: Server 1 → 2 → 3 → 1 → ...\nSimple but doesn't account for server capacity.\n\n### Weighted Round Robin\nServers with more capacity get more requests.\nServer 1 (weight 5) gets 5x more than Server 3 (weight 1).\n\n### Least Connections\nSend to the server with fewest active connections.\nBest for varying request durations.\n\n### IP Hash\nHash client IP to always route to same server.\nGood for session persistence.\n\n### Consistent Hashing\nUsed in distributed caches. Minimizes remapping when servers change.\n\n## L4 vs L7 Load Balancing\n\n- **L4 (Transport)**: Routes based on IP/port. Fast, no content inspection.\n- **L7 (Application)**: Routes based on HTTP content (URL, headers, cookies). More flexible." },
      { id: "deep-dive", type: "deep-dive", title: "Health Checks & HA", content: "## Health Checks\n\n- **Active**: Load balancer periodically pings servers\n- **Passive**: Monitor response codes from real traffic\n- Remove unhealthy servers from pool automatically\n\n## High Availability\n\n- Active-Passive: Standby LB takes over if primary fails\n- Active-Active: Multiple LBs share traffic\n- DNS-based: Multiple LB IPs in DNS records" },
    ],
    quiz: [
      { id: "q1", question: "Which algorithm is best for varying request durations?", options: ["Round Robin", "Least Connections", "IP Hash", "Random"], correctIndex: 1, explanation: "Least Connections sends new requests to the server handling the fewest active connections." },
    ],
  },
  {
    id: "tls-encryption",
    title: "TLS & HTTPS",
    category: "networking",
    description: "How TLS encrypts web traffic — certificates, handshake, cipher suites, and mTLS.",
    difficulty: 3, estimatedMinutes: 35, xpReward: 50, prerequisites: ["tcp-handshake"], tags: ["TLS", "security", "encryption"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "HTTP sends data in plaintext — anyone on the network can read it. TLS (Transport Layer Security) wraps HTTP in encryption, creating HTTPS. It ensures confidentiality (no eavesdropping), integrity (no tampering), and authentication (you're talking to the real server)." },
      { id: "technical", type: "technical", title: "TLS Handshake", content: "## TLS 1.3 Handshake (1-RTT)\n\n1. **Client Hello**: Supported cipher suites, key share, SNI\n2. **Server Hello**: Chosen cipher, server key share, certificate\n3. **Client Finished**: Verify certificate, derive session keys\n\n## Key Concepts\n\n- **Certificate**: Proves server identity, signed by CA\n- **Certificate Chain**: Server cert → Intermediate CA → Root CA\n- **Key Exchange**: ECDHE for perfect forward secrecy\n- **SNI**: Server Name Indication — which domain you're connecting to\n- **OCSP Stapling**: Server proves cert isn't revoked\n\n## mTLS (Mutual TLS)\n\nBoth client AND server present certificates. Used in:\n- Microservice communication\n- API authentication\n- Zero-trust networks" },
    ],
    quiz: [
      { id: "q1", question: "What does TLS provide?", options: ["Only encryption", "Only authentication", "Confidentiality, integrity, and authentication", "Only speed"], correctIndex: 2, explanation: "TLS provides all three: confidentiality, integrity, and authentication." },
    ],
  },
];
