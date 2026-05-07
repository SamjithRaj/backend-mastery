import type { Topic } from "@/types/topic";

export const databaseTopics: Topic[] = [
  {
    id: "bplus-tree", title: "B+ Trees & Indexing", category: "databases", description: "B+ tree structure, operations, and how databases use them for efficient indexing.", difficulty: 3, estimatedMinutes: 50, xpReward: 65, prerequisites: [], tags: ["databases", "indexing", "B+ tree"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Databases need to find rows quickly. Scanning every row is O(n) — too slow. B+ trees provide O(log n) lookups by organizing data in a balanced tree where all values are in leaf nodes connected by pointers for efficient range queries." },
      { id: "visual", type: "visual", title: "Visual Explanation", content: "Watch how a B+ tree grows as we insert values.", animationId: "bplus-tree" },
      { id: "technical", type: "technical", title: "B+ Tree Properties", content: "## Structure\n\n- **Internal nodes**: Only store keys for navigation\n- **Leaf nodes**: Store actual data records/pointers\n- **Leaf chain**: All leaves linked for range scans\n- **Balanced**: All leaves at same depth\n\n## Operations\n\n### Search O(log n)\n1. Start at root\n2. At each node, binary search for correct child\n3. Follow pointer to leaf\n\n### Insert\n1. Find correct leaf\n2. Insert key in sorted order\n3. If leaf overflows → split and push middle key up\n4. Splits can cascade to root\n\n### Delete\n1. Find key in leaf\n2. Remove it\n3. If underflow → borrow from sibling or merge nodes\n\n## Why B+ Tree (not B Tree)?\n\n- All data in leaves → better for range queries\n- Internal nodes smaller → more keys per node → shallower tree\n- Sequential leaf access → great for disk I/O" },
      { id: "code", type: "code-walkthrough", title: "Code: Creating an Index", content: "SQL indexing:", codeSnippet: "-- Create a B+ tree index\nCREATE INDEX idx_users_email ON users(email);\n\n-- Composite index (column order matters!)\nCREATE INDEX idx_orders_user_date \n  ON orders(user_id, created_at DESC);\n\n-- Check if your query uses the index\nEXPLAIN ANALYZE\n  SELECT * FROM users WHERE email = 'test@example.com';\n\n-- Covering index (all columns in query)\nCREATE INDEX idx_covering \n  ON orders(user_id, status) INCLUDE (total);", language: "sql" },
    ],
    quiz: [
      { id: "q1", question: "Where are records in a B+ tree?", options: ["Root", "Internal nodes", "Leaf nodes", "All nodes"], correctIndex: 2, explanation: "All data records are in leaf nodes. Internal nodes only store keys." },
      { id: "q2", question: "Why are leaves linked?", options: ["For balancing", "For efficient range queries", "To save memory", "For encryption"], correctIndex: 1, explanation: "Linked leaves allow efficient sequential scans for range queries." },
    ],
  },
  {
    id: "transactions-acid", title: "Transactions & ACID", category: "databases", description: "Database transactions, ACID properties, isolation levels, and concurrency control.", difficulty: 3, estimatedMinutes: 45, xpReward: 60, prerequisites: ["bplus-tree"], tags: ["databases", "ACID", "transactions"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "A transaction is a group of operations that must all succeed or all fail. Transferring money between accounts: debit one, credit the other — if either fails, both must be undone. ACID guarantees ensure database consistency even during crashes and concurrent access." },
      { id: "technical", type: "technical", title: "ACID Properties", content: "## Atomicity\nAll or nothing. If any part fails, entire transaction is rolled back.\nImplemented via: Write-Ahead Log (WAL)\n\n## Consistency\nTransaction moves database from one valid state to another.\nConstraints, triggers, cascades are enforced.\n\n## Isolation\nConcurrent transactions don't interfere with each other.\n\n### Isolation Levels (weakest → strongest)\n1. **Read Uncommitted**: Can see uncommitted data (dirty reads)\n2. **Read Committed**: Only see committed data\n3. **Repeatable Read**: Same query returns same results within transaction\n4. **Serializable**: Full isolation, as if transactions ran sequentially\n\n## Durability\nOnce committed, data survives crashes.\nImplemented via: WAL + fsync to disk" },
      { id: "deep-dive", type: "deep-dive", title: "Concurrency Control", content: "## Pessimistic Locking\nAcquire locks before accessing data. Block other transactions.\n- Shared lock (read): Multiple readers OK\n- Exclusive lock (write): One writer, no readers\n\n## Optimistic Concurrency Control\nDon't lock. Check for conflicts at commit time.\n- Add version column: `WHERE id = 1 AND version = 5`\n- If version changed → retry\n- Better for read-heavy workloads\n\n## MVCC (Multi-Version Concurrency Control)\nUsed by PostgreSQL, MySQL InnoDB.\n- Each write creates new version of row\n- Readers see snapshot at transaction start time\n- Writers don't block readers" },
    ],
    quiz: [
      { id: "q1", question: "Which isolation level prevents dirty reads?", options: ["Read Uncommitted", "Read Committed", "Serializable only", "None"], correctIndex: 1, explanation: "Read Committed prevents dirty reads by only showing committed data." },
    ],
  },
  {
    id: "query-optimization", title: "Query Optimization", category: "databases", description: "How databases optimize queries — explain plans, indexing strategies, and common patterns.", difficulty: 3, estimatedMinutes: 40, xpReward: 55, prerequisites: ["bplus-tree"], tags: ["databases", "SQL", "performance"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "Writing correct SQL is step 1. Writing fast SQL is step 2. The query optimizer transforms your SQL into an execution plan, choosing indexes, join algorithms, and access methods. Understanding this lets you write queries that run 100x faster." },
      { id: "technical", type: "technical", title: "Execution Plans", content: "## EXPLAIN ANALYZE\n\nShows how the database will execute your query:\n- **Seq Scan**: Full table scan (bad for large tables)\n- **Index Scan**: Use B+ tree index (good)\n- **Index Only Scan**: All data from index (best)\n- **Nested Loop**: For each row in A, scan B\n- **Hash Join**: Build hash table of smaller table\n- **Merge Join**: Both tables sorted, merge\n\n## Optimization Patterns\n\n1. **Avoid SELECT ***: Only fetch needed columns\n2. **Use indexes on WHERE/JOIN columns**\n3. **Composite index order**: Most selective column first\n4. **Avoid functions on indexed columns**: `WHERE YEAR(date)` → can't use index\n5. **LIMIT early**: Reduce rows before sorting\n6. **Denormalize hot paths**: Trade storage for read speed\n7. **Use EXISTS instead of IN** for subqueries" },
      { id: "code", type: "code-walkthrough", title: "Code: Optimization Examples", content: "Before and after:", codeSnippet: "-- SLOW: Full table scan\nSELECT * FROM orders WHERE YEAR(created_at) = 2024;\n\n-- FAST: Can use index on created_at\nSELECT * FROM orders \n  WHERE created_at >= '2024-01-01' \n  AND created_at < '2025-01-01';\n\n-- SLOW: Subquery with IN\nSELECT * FROM users \n  WHERE id IN (SELECT user_id FROM orders);\n\n-- FAST: EXISTS\nSELECT * FROM users u\n  WHERE EXISTS (\n    SELECT 1 FROM orders o WHERE o.user_id = u.id\n  );", language: "sql" },
    ],
    quiz: [
      { id: "q1", question: "Which scan type is best?", options: ["Seq Scan", "Index Scan", "Index Only Scan", "All equal"], correctIndex: 2, explanation: "Index Only Scan is fastest — all data comes from the index without touching the table." },
    ],
  },
  {
    id: "database-replication", title: "Database Replication", category: "databases", description: "Master-slave, master-master, synchronous vs async replication, and consistency tradeoffs.", difficulty: 4, estimatedMinutes: 40, xpReward: 60, prerequisites: ["transactions-acid"], tags: ["databases", "replication", "distributed"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "One database server is a single point of failure. Replication copies data to multiple servers for availability, read scaling, and disaster recovery. The key challenge: keeping replicas consistent with the primary." },
      { id: "technical", type: "technical", title: "Replication Strategies", content: "## Master-Slave (Primary-Replica)\n- All writes go to master\n- Master replicates to slaves\n- Slaves handle read queries\n- If master fails → promote a slave\n\n## Master-Master (Multi-Primary)\n- Any node accepts writes\n- Changes replicate to all nodes\n- Conflict resolution needed\n- Used for multi-region setups\n\n## Sync vs Async\n\n**Synchronous**: Write confirmed after ALL replicas acknowledge\n- Strong consistency\n- Higher latency\n- One slow replica blocks everything\n\n**Asynchronous**: Write confirmed after master writes\n- Lower latency\n- Risk of data loss if master crashes\n- Replication lag causes stale reads\n\n**Semi-synchronous**: Wait for at least one replica\n- Good balance of consistency and performance" },
    ],
    quiz: [
      { id: "q1", question: "What's the risk of async replication?", options: ["Higher latency", "Data loss if master crashes", "Uses more memory", "Requires more servers"], correctIndex: 1, explanation: "Async replication can lose data not yet replicated when the master crashes." },
    ],
  },
  {
    id: "database-sharding", title: "Database Sharding", category: "databases", description: "Horizontal partitioning strategies, shard keys, and the challenges of distributed databases.", difficulty: 4, estimatedMinutes: 45, xpReward: 65, prerequisites: ["database-replication"], tags: ["databases", "sharding", "scaling"],
    sections: [
      { id: "intuition", type: "intuition", title: "The Big Picture", content: "When your database outgrows a single server, you split the data across multiple servers — each holding a subset. This is sharding. It's powerful but adds complexity: cross-shard queries, rebalancing, and the critical choice of shard key." },
      { id: "technical", type: "technical", title: "Sharding Strategies", content: "## Hash-Based Sharding\n- Hash(shard_key) % num_shards\n- Even distribution\n- Problem: Adding shards requires rehashing (use consistent hashing)\n\n## Range-Based Sharding\n- Shard by ranges: users A-M → Shard 1, N-Z → Shard 2\n- Good for range queries\n- Problem: Hot spots if data isn't evenly distributed\n\n## Directory-Based Sharding\n- Lookup table maps key → shard\n- Most flexible\n- Problem: Lookup table is a bottleneck\n\n## Choosing a Shard Key\n\nGood shard key should:\n- Have high cardinality (many unique values)\n- Distribute data evenly\n- Align with query patterns\n- Be immutable (changing = data migration)\n\n## Challenges\n\n- **Cross-shard joins**: Expensive, sometimes impossible\n- **Distributed transactions**: 2PC has high overhead\n- **Rebalancing**: Moving data between shards\n- **Auto-increment IDs**: Need distributed ID generation" },
    ],
    quiz: [
      { id: "q1", question: "What makes a good shard key?", options: ["Low cardinality", "Frequently changing", "High cardinality with even distribution", "Random values only"], correctIndex: 2, explanation: "A good shard key has high cardinality for even distribution." },
    ],
  },
];
