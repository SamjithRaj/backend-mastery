export const cppMasteryContent = {
  "pointers": {
    title: "Pointers & Memory Management",
    difficulty: "medium",
    content: `
# Pointers & Memory Management

## What is a Pointer?
A pointer is a variable that stores the memory address of another variable.

\`\`\`cpp
int x = 10;
int* ptr = &x;  // ptr stores address of x
cout << *ptr;   // dereference: prints 10
\`\`\`

## Pointer Basics

### Declaration and Initialization
\`\`\`cpp
int* ptr1;           // uninitialized (dangerous!)
int* ptr2 = nullptr; // null pointer (safe)
int x = 5;
int* ptr3 = &x;      // points to x
\`\`\`

### Dereferencing
\`\`\`cpp
int x = 10;
int* ptr = &x;
*ptr = 20;  // x is now 20
\`\`\`

## Pointer Arithmetic
\`\`\`cpp
int arr[] = {10, 20, 30};
int* ptr = arr;

cout << *ptr;       // 10
cout << *(ptr + 1); // 20
cout << *(ptr + 2); // 30

ptr++;              // moves to next int
cout << *ptr;       // 20
\`\`\`

## Common Mistakes

### 1. Dangling Pointer
\`\`\`cpp
int* ptr;
{
    int x = 10;
    ptr = &x;
} // x goes out of scope
// ptr now dangles - undefined behavior!
\`\`\`

### 2. Memory Leak
\`\`\`cpp
void leak() {
    int* ptr = new int(10);
    // forgot to delete!
} // memory leaked
\`\`\`

### 3. Double Delete
\`\`\`cpp
int* ptr = new int(10);
delete ptr;
delete ptr;  // CRASH! undefined behavior
\`\`\`

## Best Practices
\`\`\`cpp
int* ptr = new int(10);
// use ptr
delete ptr;
ptr = nullptr;  // prevent dangling pointer
\`\`\`

## Interview Questions
1. Difference between pointer and reference?
2. What is nullptr vs NULL vs 0?
3. How does pointer arithmetic work?
4. What are smart pointers?
`,
    quiz: [
      {
        question: "What does the & operator do?",
        options: [
          "Dereferences a pointer",
          "Returns the address of a variable",
          "Performs bitwise AND",
          "Creates a reference"
        ],
        correct: 1
      },
      {
        question: "What is the result of: int* ptr = nullptr; cout << *ptr;",
        options: [
          "Prints 0",
          "Prints nullptr",
          "Undefined behavior/crash",
          "Compile error"
        ],
        correct: 2
      }
    ]
  },
  "references": {
    title: "References",
    difficulty: "easy",
    content: `
# References in C++

## What is a Reference?
A reference is an alias for an existing variable.

\`\`\`cpp
int x = 10;
int& ref = x;  // ref is an alias for x
ref = 20;      // x is now 20
\`\`\`

## References vs Pointers

| Feature | Reference | Pointer |
|---------|-----------|---------|
| Null value | Cannot be null | Can be nullptr |
| Reassignment | Cannot be reassigned | Can point to different objects |
| Syntax | Automatic dereferencing | Needs * to dereference |
| Initialization | Must be initialized | Can be uninitialized |

## Function Parameters

### Pass by Value
\`\`\`cpp
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
} // doesn't actually swap - copies are modified
\`\`\`

### Pass by Reference
\`\`\`cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
} // actually swaps the original variables
\`\`\`

### Pass by Pointer
\`\`\`cpp
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
} // call with swap(&x, &y)
\`\`\`

## Const References

### Avoid Unnecessary Copies
\`\`\`cpp
void print(const string& str) {
    cout << str;  // no copy made
}
\`\`\`

### Cannot Modify
\`\`\`cpp
void modify(const int& x) {
    x = 10;  // ERROR: cannot modify const reference
}
\`\`\`

## Rvalue References (C++11)
\`\`\`cpp
void process(int&& x) {
    // x is an rvalue reference
    // can "steal" resources from temporary
}

process(10);        // OK: 10 is rvalue
int y = 5;
process(y);         // ERROR: y is lvalue
process(move(y));   // OK: std::move makes it rvalue
\`\`\`

## Common Use Cases

### 1. Efficient Function Parameters
\`\`\`cpp
void processVector(const vector<int>& vec) {
    // no copy, cannot modify
}
\`\`\`

### 2. Range-Based For Loops
\`\`\`cpp
for (const auto& item : vec) {
    // efficient: no copy
}
\`\`\`

### 3. Return References (Be Careful!)
\`\`\`cpp
// WRONG
int& dangerous() {
    int x = 10;
    return x;  // returns reference to local variable!
}

// RIGHT
int& safe(vector<int>& vec, int index) {
    return vec[index];  // vector outlives function
}
\`\`\`

## Interview Tips
1. Use const references for large objects
2. References cannot be null
3. References must be initialized
4. Prefer references over pointers when possible
`,
    quiz: [
      {
        question: "Can a reference be reassigned to refer to a different object?",
        options: [
          "Yes, using the & operator",
          "Yes, using assignment",
          "No, references cannot be reassigned",
          "Only if declared const"
        ],
        correct: 2
      }
    ]
  },
  "memory": {
    title: "Stack vs Heap Memory",
    difficulty: "medium",
    content: `
# Stack vs Heap Memory

## Memory Segments

### Stack
- **Automatic allocation**: Variables created automatically
- **Fast access**: Simple pointer manipulation
- **Limited size**: Typically 1-8 MB
- **LIFO structure**: Last-in, first-out
- **Automatic cleanup**: When scope ends

\`\`\`cpp
void function() {
    int x = 10;        // on stack
    int arr[100];      // on stack
    string str = "hi"; // string object on stack, data may be on heap
} // all automatically destroyed
\`\`\`

### Heap (Free Store)
- **Manual allocation**: Using new/malloc
- **Slower access**: Requires pointer indirection
- **Large size**: Limited by available RAM
- **No automatic cleanup**: Must delete manually
- **Fragmentation possible**: Memory can become fragmented

\`\`\`cpp
void function() {
    int* ptr = new int(10);        // on heap
    int* arr = new int[1000000];   // on heap
    
    delete ptr;                    // must manually free
    delete[] arr;
}
\`\`\`

## Memory Layout
\`\`\`
High Address
+------------------+
|      Stack       | ↓ grows down
+------------------+
|        ↕         |
+------------------+
|      Heap        | ↑ grows up
+------------------+
|   BSS (uninit)   |
+------------------+
|   Data (init)    |
+------------------+
|      Text        |
+------------------+
Low Address
\`\`\`

## When to Use Each?

### Use Stack When:
- Small objects
- Short lifetime
- Known size at compile time
\`\`\`cpp
int compute() {
    int result = 0;
    for (int i = 0; i < 100; i++) {
        result += i;
    }
    return result;
}
\`\`\`

### Use Heap When:
- Large objects
- Lifetime beyond function scope
- Size unknown at compile time
- Polymorphism (virtual functions)
\`\`\`cpp
class Base { virtual void foo() {} };
class Derived : public Base { void foo() override {} };

Base* create() {
    return new Derived();  // must use heap for polymorphism
}
\`\`\`

## Dynamic Arrays
\`\`\`cpp
int size;
cin >> size;

// Stack: compile-time size only (VLA not standard C++)
int arr[100];  // OK
int arr[size]; // NOT standard C++

// Heap: runtime size
int* arr = new int[size];  // OK
delete[] arr;

// Better: use vector
vector<int> arr(size);  // handles memory automatically
\`\`\`

## Common Issues

### Stack Overflow
\`\`\`cpp
void recursive() {
    int arr[10000];  // large stack allocation
    recursive();     // infinite recursion
} // STACK OVERFLOW
\`\`\`

### Heap Fragmentation
\`\`\`cpp
// Repeated allocation/deallocation creates holes
for (int i = 0; i < 1000000; i++) {
    int* ptr = new int[random_size()];
    if (i % 2 == 0) delete[] ptr;
}
\`\`\`

### Memory Leak
\`\`\`cpp
void leak() {
    int* ptr = new int(10);
    if (error) return;  // leaked if error!
    delete ptr;
}

// Better:
void safe() {
    unique_ptr<int> ptr = make_unique<int>(10);
    if (error) return;  // automatically deleted
}
\`\`\`

## Performance Comparison
\`\`\`cpp
// Stack: ~nanoseconds
void stackAlloc() {
    int arr[1000];
}

// Heap: ~microseconds (1000x slower)
void heapAlloc() {
    int* arr = new int[1000];
    delete[] arr;
}
\`\`\`

## Interview Questions
1. What happens if stack overflows?
2. Why is heap allocation slower?
3. When would you use placement new?
4. What is memory fragmentation?
`,
    quiz: [
      {
        question: "Which is faster for allocation?",
        options: ["Stack", "Heap", "Same speed", "Depends on size"],
        correct: 0
      },
      {
        question: "What causes a stack overflow?",
        options: [
          "Too much heap allocation",
          "Memory leak",
          "Deep recursion or large local variables",
          "Null pointer dereference"
        ],
        correct: 2
      }
    ]
  },
  "smartpointers": {
    title: "Smart Pointers",
    difficulty: "medium",
    content: `
# Smart Pointers (C++11)

## Why Smart Pointers?
Automatic memory management - no manual delete needed!

## Types of Smart Pointers

### 1. unique_ptr
**Exclusive ownership** - only one unique_ptr can own an object.

\`\`\`cpp
#include <memory>

unique_ptr<int> ptr1 = make_unique<int>(10);
// unique_ptr<int> ptr2 = ptr1;  // ERROR: cannot copy

unique_ptr<int> ptr2 = move(ptr1);  // OK: transfer ownership
// ptr1 is now nullptr
\`\`\`

**Use Cases**:
\`\`\`cpp
class Widget {
public:
    unique_ptr<Resource> resource;
    Widget() : resource(make_unique<Resource>()) {}
    // no need for destructor - automatic cleanup!
};
\`\`\`

### 2. shared_ptr
**Shared ownership** - multiple shared_ptrs can own same object.
Object destroyed when last shared_ptr is destroyed.

\`\`\`cpp
shared_ptr<int> ptr1 = make_shared<int>(10);
shared_ptr<int> ptr2 = ptr1;  // OK: both own object
cout << ptr1.use_count();     // 2

ptr1.reset();                 // ptr1 releases ownership
cout << ptr2.use_count();     // 1
// object still alive because ptr2 owns it
\`\`\`

**Reference Counting**:
\`\`\`cpp
{
    shared_ptr<int> ptr1 = make_shared<int>(10);
    {
        shared_ptr<int> ptr2 = ptr1;  // count = 2
    }  // ptr2 destroyed, count = 1
}  // ptr1 destroyed, count = 0, object deleted
\`\`\`

### 3. weak_ptr
**Non-owning reference** to shared_ptr managed object.
Breaks circular references.

\`\`\`cpp
shared_ptr<int> sptr = make_shared<int>(10);
weak_ptr<int> wptr = sptr;  // doesn't increase count

if (auto ptr = wptr.lock()) {  // check if still alive
    cout << *ptr;
} else {
    cout << "object destroyed";
}
\`\`\`

## Circular Reference Problem

### Problem:
\`\`\`cpp
struct Node {
    shared_ptr<Node> next;
    ~Node() { cout << "destroyed\\n"; }
};

shared_ptr<Node> n1 = make_shared<Node>();
shared_ptr<Node> n2 = make_shared<Node>();
n1->next = n2;
n2->next = n1;  // circular reference!
// never destroyed - memory leak!
\`\`\`

### Solution with weak_ptr:
\`\`\`cpp
struct Node {
    shared_ptr<Node> next;
    weak_ptr<Node> prev;  // use weak_ptr for back pointer
    ~Node() { cout << "destroyed\\n"; }
};

shared_ptr<Node> n1 = make_shared<Node>();
shared_ptr<Node> n2 = make_shared<Node>();
n1->next = n2;
n2->prev = n1;  // no circular reference
// properly destroyed
\`\`\`

## Custom Deleters
\`\`\`cpp
// FILE* deleter
unique_ptr<FILE, decltype(&fclose)> file(
    fopen("file.txt", "r"),
    &fclose
);

// Array deleter
shared_ptr<int> arr(new int[10], [](int* p) {
    delete[] p;
});

// Better: use unique_ptr for arrays
unique_ptr<int[]> arr(new int[10]);
\`\`\`

## Performance

### Overhead:
- **unique_ptr**: Zero overhead (same as raw pointer)
- **shared_ptr**: Control block + atomic reference counting
- **weak_ptr**: Control block access

### Benchmark:
\`\`\`cpp
// Raw pointer: 100ns
int* raw = new int(10);
delete raw;

// unique_ptr: 100ns (same!)
auto unique = make_unique<int>(10);

// shared_ptr: 150ns (atomic ops)
auto shared = make_shared<int>(10);
\`\`\`

## Best Practices

### 1. Prefer make_unique/make_shared
\`\`\`cpp
// Good
auto ptr = make_unique<Widget>(args);

// Bad (exception unsafe)
unique_ptr<Widget> ptr(new Widget(args));
\`\`\`

### 2. Use unique_ptr by Default
\`\`\`cpp
// Start with unique ownership
unique_ptr<Resource> resource = acquireResource();

// Convert to shared if needed
shared_ptr<Resource> shared = move(resource);
\`\`\`

### 3. Avoid Shared Ownership Unless Necessary
\`\`\`cpp
// Clear ownership
class Manager {
    unique_ptr<Worker> worker;  // Manager owns Worker
};

// Unclear ownership (usually wrong)
class System {
    shared_ptr<Resource> res;
};
class Other {
    shared_ptr<Resource> res;  // who really owns it?
};
\`\`\`

## Common Mistakes

### 1. Creating shared_ptr from Raw Pointer Twice
\`\`\`cpp
Widget* raw = new Widget();
shared_ptr<Widget> ptr1(raw);
shared_ptr<Widget> ptr2(raw);  // WRONG! double delete
\`\`\`

### 2. Using this in Constructor
\`\`\`cpp
class Bad {
    shared_ptr<Bad> self;
public:
    Bad() : self(this) {}  // WRONG! doesn't participate in counting
};

// Use enable_shared_from_this instead
class Good : public enable_shared_from_this<Good> {
public:
    shared_ptr<Good> getSelf() {
        return shared_from_this();
    }
};
\`\`\`

## Interview Tips
1. unique_ptr is zero-overhead
2. shared_ptr has reference counting cost
3. weak_ptr breaks circular references
4. Always use make_unique/make_shared
5. Prefer unique_ptr unless sharing needed
`,
    quiz: [
      {
        question: "Can you copy a unique_ptr?",
        options: [
          "Yes, using assignment",
          "Yes, using copy constructor",
          "No, but you can move it",
          "Yes, using shared_ptr constructor"
        ],
        correct: 2
      },
      {
        question: "What does weak_ptr solve?",
        options: [
          "Memory leaks",
          "Circular references",
          "Performance issues",
          "Thread safety"
        ],
        correct: 1
      }
    ]
  },
  "stl": {
    title: "Standard Template Library (STL)",
    difficulty: "medium",
    content: `
# Standard Template Library

## Containers

### Sequence Containers

#### vector - Dynamic Array
\`\`\`cpp
vector<int> v = {1, 2, 3};
v.push_back(4);              // O(1) amortized
v.pop_back();                // O(1)
v[0] = 10;                   // O(1) access
v.insert(v.begin(), 0);      // O(n)

// Common operations
v.size();
v.empty();
v.clear();
v.reserve(100);  // pre-allocate space
\`\`\`

#### deque - Double-Ended Queue
\`\`\`cpp
deque<int> d = {1, 2, 3};
d.push_front(0);   // O(1)
d.push_back(4);    // O(1)
d.pop_front();     // O(1)
d.pop_back();      // O(1)
\`\`\`

#### list - Doubly Linked List
\`\`\`cpp
list<int> l = {1, 2, 3};
l.push_front(0);        // O(1)
l.push_back(4);         // O(1)
auto it = l.begin();
l.insert(it, 5);        // O(1) if have iterator
l.remove(2);            // O(n) - removes all 2s
\`\`\`

### Associative Containers

#### set - Ordered Unique Elements
\`\`\`cpp
set<int> s = {3, 1, 4, 1, 5};  // {1, 3, 4, 5}
s.insert(2);           // O(log n)
s.erase(3);            // O(log n)
s.find(4) != s.end();  // O(log n)
s.count(5);            // O(log n) - returns 0 or 1

// Iterate in sorted order
for (int x : s) {
    cout << x << " ";  // 1 2 4 5
}
\`\`\`

#### map - Key-Value Pairs
\`\`\`cpp
map<string, int> m;
m["alice"] = 100;      // O(log n)
m["bob"] = 200;
m.erase("alice");      // O(log n)

// Check existence
if (m.find("bob") != m.end()) {
    cout << m["bob"];
}

// Iterate in sorted key order
for (auto& [key, val] : m) {
    cout << key << ": " << val << "\\n";
}
\`\`\`

### Unordered Containers (Hash Tables)

#### unordered_set
\`\`\`cpp
unordered_set<int> us = {1, 2, 3};
us.insert(4);          // O(1) average
us.erase(2);           // O(1) average
us.find(3) != us.end(); // O(1) average
\`\`\`

#### unordered_map
\`\`\`cpp
unordered_map<string, int> um;
um["key"] = 42;        // O(1) average
um.erase("key");       // O(1) average
um.find("key");        // O(1) average

// Use structured binding (C++17)
for (auto& [key, val] : um) {
    cout << key << ": " << val << "\\n";
}
\`\`\`

### Container Adapters

#### stack
\`\`\`cpp
stack<int> st;
st.push(1);      // O(1)
st.push(2);
st.top();        // O(1) - returns 2
st.pop();        // O(1)
st.empty();
\`\`\`

#### queue
\`\`\`cpp
queue<int> q;
q.push(1);       // O(1)
q.push(2);
q.front();       // O(1) - returns 1
q.pop();         // O(1)
\`\`\`

#### priority_queue (Max Heap)
\`\`\`cpp
priority_queue<int> pq;
pq.push(3);      // O(log n)
pq.push(1);
pq.push(4);
pq.top();        // O(1) - returns 4
pq.pop();        // O(log n)

// Min heap
priority_queue<int, vector<int>, greater<int>> minHeap;
\`\`\`

## Algorithms

### Sorting
\`\`\`cpp
vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());              // ascending
sort(v.begin(), v.end(), greater<>()); // descending

// Custom comparator
sort(v.begin(), v.end(), [](int a, int b) {
    return abs(a) < abs(b);
});
\`\`\`

### Searching
\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};
auto it = find(v.begin(), v.end(), 3);  // O(n)
if (it != v.end()) cout << *it;

// Binary search (requires sorted)
bool found = binary_search(v.begin(), v.end(), 3);  // O(log n)

// Lower/upper bound
auto lower = lower_bound(v.begin(), v.end(), 3);  // >= 3
auto upper = upper_bound(v.begin(), v.end(), 3);  // > 3
\`\`\`

### Min/Max
\`\`\`cpp
vector<int> v = {3, 1, 4, 1, 5};
auto minIt = min_element(v.begin(), v.end());
auto maxIt = max_element(v.begin(), v.end());
cout << *minIt << " " << *maxIt;  // 1 5

// For values
int a = 5, b = 3;
cout << min(a, b);  // 3
cout << max(a, b);  // 5
\`\`\`

### Other Useful Algorithms
\`\`\`cpp
// Reverse
reverse(v.begin(), v.end());

// Rotate
rotate(v.begin(), v.begin() + 2, v.end());

// Remove duplicates (requires sorted)
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());

// Accumulate (sum)
int sum = accumulate(v.begin(), v.end(), 0);

// Transform
transform(v.begin(), v.end(), v.begin(), [](int x) {
    return x * 2;
});
\`\`\`

## Iterators
\`\`\`cpp
vector<int> v = {1, 2, 3};

// Forward iteration
for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " ";
}

// Reverse iteration
for (auto it = v.rbegin(); it != v.rend(); ++it) {
    cout << *it << " ";
}

// Range-based for (preferred)
for (int x : v) {
    cout << x << " ";
}
\`\`\`

## Time Complexities

| Container | Access | Insert | Delete | Find |
|-----------|--------|--------|--------|------|
| vector | O(1) | O(n) | O(n) | O(n) |
| deque | O(1) | O(1) ends | O(1) ends | O(n) |
| list | O(n) | O(1) | O(1) | O(n) |
| set/map | - | O(log n) | O(log n) | O(log n) |
| unordered_set/map | - | O(1)* | O(1)* | O(1)* |

*Average case; O(n) worst case

## Interview Tips
1. vector for random access
2. set/map for sorted order
3. unordered_set/map for fast lookup
4. priority_queue for heap operations
5. Know time complexities!
`
  },
  "oop": {
    title: "Object-Oriented Programming",
    difficulty: "medium",
    content: `
# Object-Oriented Programming in C++

## Four Pillars

### 1. Encapsulation
Hide internal state, expose through methods.

\`\`\`cpp
class BankAccount {
private:
    double balance;  // hidden
    
public:
    BankAccount(double initial) : balance(initial) {}
    
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    bool withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }
    
    double getBalance() const { return balance; }
};
\`\`\`

### 2. Inheritance
Create new classes from existing ones.

\`\`\`cpp
class Animal {
protected:
    string name;
    
public:
    Animal(string n) : name(n) {}
    virtual void makeSound() = 0;  // pure virtual
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void makeSound() override {
        cout << name << " barks!\\n";
    }
};

class Cat : public Animal {
public:
    Cat(string n) : Animal(n) {}
    void makeSound() override {
        cout << name << " meows!\\n";
    }
};
\`\`\`

### 3. Polymorphism
Same interface, different implementations.

\`\`\`cpp
void animalSound(Animal* animal) {
    animal->makeSound();  // calls correct version
}

Dog dog("Rex");
Cat cat("Whiskers");
animalSound(&dog);  // Rex barks!
animalSound(&cat);  // Whiskers meows!
\`\`\`

### 4. Abstraction
Expose essential features, hide implementation.

\`\`\`cpp
class Database {
public:
    virtual void connect() = 0;
    virtual void query(string sql) = 0;
    virtual ~Database() = default;
};

class MySQL : public Database {
    void connect() override { /* MySQL connection */ }
    void query(string sql) override { /* MySQL query */ }
};

class PostgreSQL : public Database {
    void connect() override { /* PostgreSQL connection */ }
    void query(string sql) override { /* PostgreSQL query */ }
};
\`\`\`

## Constructors & Destructors

### Default Constructor
\`\`\`cpp
class Widget {
public:
    Widget() {
        cout << "Widget created\\n";
    }
};
\`\`\`

### Parameterized Constructor
\`\`\`cpp
class Person {
    string name;
    int age;
    
public:
    Person(string n, int a) : name(n), age(a) {}
};
\`\`\`

### Copy Constructor
\`\`\`cpp
class Array {
    int* data;
    int size;
    
public:
    // Deep copy
    Array(const Array& other) : size(other.size) {
        data = new int[size];
        copy(other.data, other.data + size, data);
    }
    
    ~Array() {
        delete[] data;
    }
};
\`\`\`

### Move Constructor (C++11)
\`\`\`cpp
class Array {
    int* data;
    int size;
    
public:
    // Move constructor
    Array(Array&& other) noexcept 
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
    
    // Move assignment
    Array& operator=(Array&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};
\`\`\`

## Virtual Functions

### Virtual vs Non-Virtual
\`\`\`cpp
class Base {
public:
    void nonVirtual() { cout << "Base::nonVirtual\\n"; }
    virtual void virtualFunc() { cout << "Base::virtual\\n"; }
};

class Derived : public Base {
public:
    void nonVirtual() { cout << "Derived::nonVirtual\\n"; }
    void virtualFunc() override { cout << "Derived::virtual\\n"; }
};

Derived d;
Base* ptr = &d;
ptr->nonVirtual();   // Base::nonVirtual (compile-time)
ptr->virtualFunc();  // Derived::virtual (runtime)
\`\`\`

### Virtual Destructor (Important!)
\`\`\`cpp
class Base {
public:
    virtual ~Base() {
        cout << "Base destroyed\\n";
    }
};

class Derived : public Base {
public:
    ~Derived() {
        cout << "Derived destroyed\\n";
    }
};

Base* ptr = new Derived();
delete ptr;  // calls both destructors if virtual
\`\`\`

## Operator Overloading
\`\`\`cpp
class Complex {
    double real, imag;
    
public:
    Complex(double r, double i) : real(r), imag(i) {}
    
    // Binary operator
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    // Unary operator
    Complex operator-() const {
        return Complex(-real, -imag);
    }
    
    // Comparison
    bool operator==(const Complex& other) const {
        return real == other.real && imag == other.imag;
    }
    
    // Stream operator (friend function)
    friend ostream& operator<<(ostream& os, const Complex& c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }
};

Complex c1(1, 2), c2(3, 4);
Complex c3 = c1 + c2;
cout << c3;  // 4 + 6i
\`\`\`

## Design Patterns

### Singleton
\`\`\`cpp
class Singleton {
private:
    static Singleton* instance;
    Singleton() {}  // private constructor
    
public:
    static Singleton* getInstance() {
        if (!instance) {
            instance = new Singleton();
        }
        return instance;
    }
    
    // Delete copy/move
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
};

Singleton* Singleton::instance = nullptr;
\`\`\`

### Factory Pattern
\`\`\`cpp
class Shape {
public:
    virtual void draw() = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
public:
    void draw() override { cout << "Circle\\n"; }
};

class Square : public Shape {
public:
    void draw() override { cout << "Square\\n"; }
};

class ShapeFactory {
public:
    static unique_ptr<Shape> createShape(string type) {
        if (type == "circle") return make_unique<Circle>();
        if (type == "square") return make_unique<Square>();
        return nullptr;
    }
};
\`\`\`

## Interview Tips
1. Always make destructors virtual in base classes
2. Rule of 5: destructor, copy ctor, copy assign, move ctor, move assign
3. Prefer composition over inheritance
4. Use virtual for runtime polymorphism
5. SOLID principles
`
  }
}
