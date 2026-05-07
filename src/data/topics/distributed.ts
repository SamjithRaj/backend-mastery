import type { Topic } from "@/types/topic";

export const distributedTopics: Topic[] = [
  {
    id: "consistent-hashing", title: "Consistent Hashing", category: "distributed", description: "Distribute data across nodes with minimal redistribution when nodes change.", difficulty: 3, estimatedMinutes: 40, xpReward: 55, prerequisites: [], tags: ["distributed", "hashing", "scaling"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Simple modulo hashing (key % N) breaks when servers change — almost all keys remap. Consistent hashing maps servers and keys onto a ring, so adding/removing a server only affects K/N keys." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "See consistent hashing with node addition.", animationId: "consistent-hashing" },
      { id: "technical", type: "technical", title: "How It Works", content: "## The Ring\n\n1. Hash both servers and keys to positions on a ring (0 to 2^32)\n2. Each key is assigned to the next server clockwise\n3. Adding a server only affects keys between it and the previous server\n\n## Virtual Nodes\n\nProblem: With few servers, distribution is uneven.\nSolution: Each physical server maps to multiple virtual nodes on the ring.\n- Server A → A1, A2, A3 (at different ring positions)\n- Improves balance significantly\n\n## Used In\n- Amazon DynamoDB\n- Apache Cassandra\n- Memcached\n- CDN routing\n- Discord server routing" },
    ],
    quiz: [
      { id: "q1", question: "Keys remapped when adding a node?", options: ["All keys", "~K/N keys", "None", "Half"], correctIndex: 1, explanation: "Only K/N keys remap — a massive improvement over modulo hashing." },
    ],
  },
  {
    id: "cap-theorem", title: "CAP Theorem", category: "distributed", description: "Consistency, Availability, Partition Tolerance — choose two (but really, it's about tradeoffs).", difficulty: 3, estimatedMinutes: 35, xpReward: 50, prerequisites: [], tags: ["distributed", "CAP", "theory"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "In a distributed system, network partitions WILL happen. When they do, you must choose: do you remain consistent (all nodes see same data) or available (all requests get a response)? You can't have both during a partition." },
      { id: "technical", type: "technical", title: "The Three Properties", content: "## Consistency (C)\nEvery read returns the most recent write. All nodes see the same data at the same time.\n\n## Availability (A)\nEvery request receives a response (success or failure). No request hangs forever.\n\n## Partition Tolerance (P)\nSystem continues operating despite network partitions between nodes.\n\n## The Tradeoff\n\nIn practice, P is non-negotiable (networks fail). So the real choice is:\n- **CP systems**: Consistent but may reject requests during partitions\n  - Examples: MongoDB, HBase, ZooKeeper\n- **AP systems**: Available but may return stale data\n  - Examples: Cassandra, DynamoDB, CouchDB\n\n## PACELC Theorem\n\nExtends CAP: Even when there's no partition (E), you still trade between latency (L) and consistency (C).\n\nExample: DynamoDB is PA/EL (available during partition, low latency when no partition)" },
    ],
    quiz: [
      { id: "q1", question: "What does CAP really force you to choose?", options: ["C or A or P", "C or A (during partitions)", "Only C", "All three"], correctIndex: 1, explanation: "P is required. During partitions, you choose between C (consistency) and A (availability)." },
    ],
  },
  {
    id: "consensus-algorithms", title: "Consensus Algorithms", category: "distributed", description: "Raft and Paxos — how distributed systems agree on values despite failures.", difficulty: 5, estimatedMinutes: 60, xpReward: 80, prerequisites: ["cap-theorem"], tags: ["distributed", "consensus", "Raft"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "How do 5 servers agree on who's the leader when any of them could crash? Consensus algorithms solve this — ensuring all non-faulty nodes agree on a single value, even when nodes fail or messages are lost." },
      { id: "technical", type: "technical", title: "Raft Algorithm", content: "## Raft — Designed for Understandability\n\n### Three Roles\n- **Leader**: Handles all client requests, replicates to followers\n- **Follower**: Passive, responds to leader\n- **Candidate**: Competing to become leader\n\n### Leader Election\n1. Followers expect heartbeats from leader\n2. No heartbeat → timeout → become candidate\n3. Request votes from all nodes\n4. Win majority → become leader\n5. Split vote → new election with random timeout\n\n### Log Replication\n1. Client sends command to leader\n2. Leader appends to its log\n3. Leader replicates to followers\n4. When majority confirms → commit entry\n5. Apply to state machine\n\n### Safety\n- Only nodes with up-to-date logs can become leader\n- Committed entries are never lost\n\n## Used In\n- etcd (Kubernetes)\n- Consul\n- CockroachDB\n- TiKV" },
    ],
    quiz: [
      { id: "q1", question: "What triggers a Raft leader election?", options: ["Client request", "Timer/no heartbeat", "Random", "Admin command"], correctIndex: 1, explanation: "Followers start election when they stop receiving heartbeats from the leader." },
    ],
  },
  {
    id: "event-driven-architecture", title: "Event-Driven Architecture", category: "distributed", description: "Event sourcing, CQRS, saga pattern, and building reactive distributed systems.", difficulty: 4, estimatedMinutes: 45, xpReward: 60, prerequisites: ["cap-theorem"], tags: ["distributed", "events", "architecture"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Instead of directly calling services, emit events. Other services react to those events. This decouples services, improves resilience, and enables complex workflows. Think of it like a newspaper — publishers don't know their readers, readers subscribe to topics they care about." },
      { id: "technical", type: "technical", title: "Patterns", content: "## Event Sourcing\nStore state as a sequence of events, not current state.\n- Events are immutable facts: 'OrderPlaced', 'PaymentReceived'\n- Current state = replay all events\n- Complete audit trail\n- Can rebuild state at any point in time\n\n## CQRS (Command Query Responsibility Segregation)\n- Separate models for reads and writes\n- Write model: normalized, event-sourced\n- Read model: denormalized, optimized for queries\n- Eventually consistent between the two\n\n## Saga Pattern\nDistributed transactions across services:\n- **Choreography**: Each service emits events, others react\n- **Orchestration**: Central coordinator manages the flow\n- Compensating transactions for rollback\n\n## Outbox Pattern\nEnsure events are published reliably:\n1. Write event to outbox table in same DB transaction\n2. Separate process reads outbox and publishes to broker\n3. Guarantees at-least-once delivery" },
    ],
    quiz: [
      { id: "q1", question: "What does event sourcing store?", options: ["Current state", "Sequence of events", "Only the latest event", "Snapshots only"], correctIndex: 1, explanation: "Event sourcing stores all events as immutable facts. Current state is derived by replaying events." },
    ],
  },
];
