export const dsaRoadmap = {
  "arrays": {
    title: "Arrays",
    difficulty: "easy",
    topics: [
      {
        name: "Two Pointers",
        problems: [
          { title: "Two Sum", difficulty: "easy", link: "https://leetcode.com/problems/two-sum/", blind75: true },
          { title: "3Sum", difficulty: "medium", link: "https://leetcode.com/problems/3sum/" },
          { title: "Container With Most Water", difficulty: "medium", link: "https://leetcode.com/problems/container-with-most-water/", blind75: true },
          { title: "Trapping Rain Water", difficulty: "hard", link: "https://leetcode.com/problems/trapping-rain-water/", blind75: true }
        ]
      },
      {
        name: "Sliding Window",
        problems: [
          { title: "Best Time to Buy and Sell Stock", difficulty: "easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", blind75: true },
          { title: "Longest Substring Without Repeating Characters", difficulty: "medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", blind75: true },
          { title: "Minimum Window Substring", difficulty: "hard", link: "https://leetcode.com/problems/minimum-window-substring/", blind75: true },
          { title: "Sliding Window Maximum", difficulty: "hard", link: "https://leetcode.com/problems/sliding-window-maximum/" }
        ]
      },
      {
        name: "Array Manipulation",
        problems: [
          { title: "Product of Array Except Self", difficulty: "medium", link: "https://leetcode.com/problems/product-of-array-except-self/", blind75: true },
          { title: "Maximum Subarray", difficulty: "medium", link: "https://leetcode.com/problems/maximum-subarray/", blind75: true },
          { title: "Find Minimum in Rotated Sorted Array", difficulty: "medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", blind75: true },
          { title: "Search in Rotated Sorted Array", difficulty: "medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", blind75: true }
        ]
      }
    ],
    theory: `
# Arrays

Arrays are fundamental data structures that store elements in contiguous memory locations.

## Key Concepts

### Memory Layout
- Elements stored sequentially in memory
- O(1) access time using index
- Cache-friendly due to locality of reference

### Time Complexities
- Access: O(1)
- Search: O(n)
- Insert: O(n)
- Delete: O(n)

## Common Patterns

### 1. Two Pointers
Used when you need to find pairs or compare elements from both ends.

**Example**: Finding pair with target sum
\`\`\`cpp
vector<int> twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {-1, -1};
}
\`\`\`

### 2. Sliding Window
Optimize problems involving contiguous subarrays.

**Example**: Maximum sum of k consecutive elements
\`\`\`cpp
int maxSum(vector<int>& arr, int k) {
    int maxSum = 0, windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;
    
    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}
\`\`\`

### 3. Prefix Sum
Precompute cumulative sums for range queries.

\`\`\`cpp
vector<int> prefixSum(vector<int>& arr) {
    vector<int> prefix(arr.size());
    prefix[0] = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    return prefix;
}

int rangeSum(vector<int>& prefix, int l, int r) {
    if (l == 0) return prefix[r];
    return prefix[r] - prefix[l-1];
}
\`\`\`

## Interview Tips
1. Always clarify if array is sorted
2. Ask about duplicates
3. Consider edge cases: empty array, single element
4. Think about space optimization
5. Binary search works on sorted arrays
`
  },
  "strings": {
    title: "Strings",
    difficulty: "easy",
    topics: [
      {
        name: "String Manipulation",
        problems: [
          { title: "Valid Anagram", difficulty: "easy", link: "https://leetcode.com/problems/valid-anagram/", blind75: true },
          { title: "Valid Palindrome", difficulty: "easy", link: "https://leetcode.com/problems/valid-palindrome/", blind75: true },
          { title: "Longest Palindromic Substring", difficulty: "medium", link: "https://leetcode.com/problems/longest-palindromic-substring/", blind75: true },
          { title: "Group Anagrams", difficulty: "medium", link: "https://leetcode.com/problems/group-anagrams/", blind75: true }
        ]
      },
      {
        name: "Pattern Matching",
        problems: [
          { title: "Implement strStr()", difficulty: "easy", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
          { title: "Longest Repeating Character Replacement", difficulty: "medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/", blind75: true },
          { title: "Minimum Window Substring", difficulty: "hard", link: "https://leetcode.com/problems/minimum-window-substring/", blind75: true }
        ]
      }
    ],
    theory: `
# Strings

Strings are sequences of characters, fundamental to many programming problems.

## Key Concepts

### Representation
- Array of characters in C++
- Immutable in some languages, mutable in C++
- Null-terminated in C-style strings

### Time Complexities
- Access: O(1)
- Search: O(n)
- Concatenation: O(n)
- Substring: O(n)

## Common Patterns

### 1. Two Pointers for Palindromes
\`\`\`cpp
bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}
\`\`\`

### 2. Sliding Window for Substrings
\`\`\`cpp
int lengthOfLongestSubstring(string s) {
    unordered_set<char> chars;
    int left = 0, maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (chars.count(s[right])) {
            chars.erase(s[left++]);
        }
        chars.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
\`\`\`

### 3. Hash Map for Anagrams
\`\`\`cpp
bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    unordered_map<char, int> count;
    for (char c : s) count[c]++;
    for (char c : t) {
        if (--count[c] < 0) return false;
    }
    return true;
}
\`\`\`

## Interview Tips
1. Clarify character set (ASCII, Unicode)
2. Ask about case sensitivity
3. Consider using StringBuilder for concatenation
4. Hash tables are your friend
5. KMP for pattern matching in O(n+m)
`
  },
  "linkedlists": {
    title: "Linked Lists",
    difficulty: "medium",
    topics: [
      {
        name: "Basic Operations",
        problems: [
          { title: "Reverse Linked List", difficulty: "easy", link: "https://leetcode.com/problems/reverse-linked-list/", blind75: true },
          { title: "Merge Two Sorted Lists", difficulty: "easy", link: "https://leetcode.com/problems/merge-two-sorted-lists/", blind75: true },
          { title: "Linked List Cycle", difficulty: "easy", link: "https://leetcode.com/problems/linked-list-cycle/", blind75: true },
          { title: "Remove Nth Node From End", difficulty: "medium", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", blind75: true }
        ]
      },
      {
        name: "Advanced",
        problems: [
          { title: "Reorder List", difficulty: "medium", link: "https://leetcode.com/problems/reorder-list/", blind75: true },
          { title: "Merge K Sorted Lists", difficulty: "hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/", blind75: true }
        ]
      }
    ],
    theory: `
# Linked Lists

Dynamic data structure where elements are linked using pointers.

## Types
1. **Singly Linked List**: Each node points to next
2. **Doubly Linked List**: Each node points to next and previous
3. **Circular Linked List**: Last node points to first

## Node Structure
\`\`\`cpp
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
\`\`\`

## Common Patterns

### 1. Two Pointers (Fast & Slow)
Detect cycles, find middle:
\`\`\`cpp
ListNode* findMiddle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
\`\`\`

### 2. Reversal
\`\`\`cpp
ListNode* reverse(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
\`\`\`

### 3. Dummy Node
Simplifies edge cases:
\`\`\`cpp
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (l1 && l2) {
        if (l1->val < l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}
\`\`\`

## Interview Tips
1. Always check for null pointers
2. Draw diagrams
3. Use dummy node for simpler code
4. Fast/slow pointer for many problems
5. Consider space vs time tradeoffs
`
  },
  "trees": {
    title: "Trees",
    difficulty: "medium",
    topics: [
      {
        name: "Binary Trees",
        problems: [
          { title: "Maximum Depth of Binary Tree", difficulty: "easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", blind75: true },
          { title: "Same Tree", difficulty: "easy", link: "https://leetcode.com/problems/same-tree/", blind75: true },
          { title: "Invert Binary Tree", difficulty: "easy", link: "https://leetcode.com/problems/invert-binary-tree/", blind75: true },
          { title: "Binary Tree Level Order Traversal", difficulty: "medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", blind75: true }
        ]
      },
      {
        name: "BST",
        problems: [
          { title: "Validate Binary Search Tree", difficulty: "medium", link: "https://leetcode.com/problems/validate-binary-search-tree/", blind75: true },
          { title: "Kth Smallest Element in BST", difficulty: "medium", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", blind75: true },
          { title: "Lowest Common Ancestor of BST", difficulty: "easy", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", blind75: true }
        ]
      },
      {
        name: "Advanced",
        problems: [
          { title: "Serialize and Deserialize Binary Tree", difficulty: "hard", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", blind75: true },
          { title: "Binary Tree Maximum Path Sum", difficulty: "hard", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", blind75: true }
        ]
      }
    ],
    theory: `
# Trees

Hierarchical data structure with root and child nodes.

## Binary Tree Structure
\`\`\`cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
\`\`\`

## Traversals

### 1. DFS (Depth-First Search)

**Inorder (Left-Root-Right)**:
\`\`\`cpp
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}
\`\`\`

**Preorder (Root-Left-Right)**:
\`\`\`cpp
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}
\`\`\`

**Postorder (Left-Right-Root)**:
\`\`\`cpp
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";
}
\`\`\`

### 2. BFS (Level-Order)
\`\`\`cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}
\`\`\`

## BST Properties
- Left subtree < root
- Right subtree > root
- Inorder gives sorted order
- Search/Insert/Delete: O(log n) average

## Common Patterns

### Height Calculation
\`\`\`cpp
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}
\`\`\`

### LCA (Lowest Common Ancestor)
\`\`\`cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}
\`\`\`

## Interview Tips
1. Recursion is natural for trees
2. Consider both DFS and BFS
3. Null checks are critical
4. BST properties simplify many problems
5. Think about base cases carefully
`
  },
  "graphs": {
    title: "Graphs",
    difficulty: "hard",
    topics: [
      {
        name: "Graph Traversal",
        problems: [
          { title: "Number of Islands", difficulty: "medium", link: "https://leetcode.com/problems/number-of-islands/", blind75: true },
          { title: "Clone Graph", difficulty: "medium", link: "https://leetcode.com/problems/clone-graph/", blind75: true },
          { title: "Pacific Atlantic Water Flow", difficulty: "medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", blind75: true }
        ]
      },
      {
        name: "Advanced",
        problems: [
          { title: "Course Schedule", difficulty: "medium", link: "https://leetcode.com/problems/course-schedule/", blind75: true },
          { title: "Graph Valid Tree", difficulty: "medium", link: "https://leetcode.com/problems/graph-valid-tree/" },
          { title: "Word Ladder", difficulty: "hard", link: "https://leetcode.com/problems/word-ladder/" }
        ]
      }
    ],
    theory: `
# Graphs

Collection of nodes (vertices) connected by edges.

## Representations

### Adjacency List
\`\`\`cpp
unordered_map<int, vector<int>> graph;
// or
vector<vector<int>> adjList(n);
\`\`\`

### Adjacency Matrix
\`\`\`cpp
vector<vector<int>> matrix(n, vector<int>(n, 0));
\`\`\`

## Traversal Algorithms

### DFS (Depth-First Search)
\`\`\`cpp
void dfs(int node, vector<vector<int>>& graph, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}
\`\`\`

### BFS (Breadth-First Search)
\`\`\`cpp
void bfs(int start, vector<vector<int>>& graph) {
    vector<bool> visited(graph.size(), false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
\`\`\`

## Important Algorithms

### Dijkstra's Algorithm (Shortest Path)
\`\`\`cpp
vector<int> dijkstra(vector<vector<pair<int,int>>>& graph, int start) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
\`\`\`

### Topological Sort (DAG)
\`\`\`cpp
vector<int> topologicalSort(vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> indegree(n, 0), result;
    
    for (int i = 0; i < n; i++) {
        for (int neighbor : graph[i]) {
            indegree[neighbor]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        for (int neighbor : graph[node]) {
            if (--indegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    
    return result.size() == n ? result : vector<int>{};
}
\`\`\`

### Cycle Detection
\`\`\`cpp
bool hasCycleDFS(int node, vector<vector<int>>& graph, 
                 vector<int>& color) {
    color[node] = 1; // gray (visiting)
    
    for (int neighbor : graph[node]) {
        if (color[neighbor] == 1) return true; // back edge
        if (color[neighbor] == 0 && hasCycleDFS(neighbor, graph, color)) {
            return true;
        }
    }
    
    color[node] = 2; // black (visited)
    return false;
}
\`\`\`

## Union-Find (Disjoint Set)
\`\`\`cpp
class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};
\`\`\`

## Interview Tips
1. Choose right representation (list vs matrix)
2. Mark visited nodes to avoid cycles
3. BFS for shortest path in unweighted graph
4. DFS for connectivity and cycles
5. Union-Find for dynamic connectivity
`
  },
  "dynamicprogramming": {
    title: "Dynamic Programming",
    difficulty: "hard",
    topics: [
      {
        name: "1D DP",
        problems: [
          { title: "Climbing Stairs", difficulty: "easy", link: "https://leetcode.com/problems/climbing-stairs/", blind75: true },
          { title: "House Robber", difficulty: "medium", link: "https://leetcode.com/problems/house-robber/", blind75: true },
          { title: "Longest Increasing Subsequence", difficulty: "medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/", blind75: true },
          { title: "Decode Ways", difficulty: "medium", link: "https://leetcode.com/problems/decode-ways/", blind75: true }
        ]
      },
      {
        name: "2D DP",
        problems: [
          { title: "Unique Paths", difficulty: "medium", link: "https://leetcode.com/problems/unique-paths/", blind75: true },
          { title: "Longest Common Subsequence", difficulty: "medium", link: "https://leetcode.com/problems/longest-common-subsequence/", blind75: true },
          { title: "Edit Distance", difficulty: "hard", link: "https://leetcode.com/problems/edit-distance/" },
          { title: "Coin Change", difficulty: "medium", link: "https://leetcode.com/problems/coin-change/", blind75: true }
        ]
      }
    ],
    theory: `
# Dynamic Programming

Solve complex problems by breaking into simpler subproblems.

## Core Principles
1. **Optimal Substructure**: Solution built from optimal solutions of subproblems
2. **Overlapping Subproblems**: Same subproblems solved multiple times

## Approaches

### 1. Top-Down (Memoization)
\`\`\`cpp
unordered_map<int, int> memo;

int fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}
\`\`\`

### 2. Bottom-Up (Tabulation)
\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
\`\`\`

## Common Patterns

### Climbing Stairs
\`\`\`cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
\`\`\`

### Knapsack (0/1)
\`\`\`cpp
int knapsack(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = max(dp[i-1][w], 
                              values[i-1] + dp[i-1][w - weights[i-1]]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}
\`\`\`

### Longest Common Subsequence
\`\`\`cpp
int longestCommonSubsequence(string text1, string text2) {
    int m = text1.length(), n = text2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i-1] == text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
\`\`\`

### Coin Change
\`\`\`cpp
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i >= coin) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}
\`\`\`

## Problem-Solving Steps
1. Define state/subproblem
2. Find recurrence relation
3. Identify base cases
4. Determine computation order
5. Optimize space if possible

## Interview Tips
1. Start with brute force recursion
2. Identify overlapping subproblems
3. Add memoization
4. Convert to bottom-up if needed
5. Optimize space (often O(n) → O(1))
`
  }
}
