/**
 * LRU (Least Recently Used) Cache with optional Expiration Time
 *
 *  * Time Complexity:
 * - get: O(1)
 *   -  Map allows instant lookup by key
 *   -  Moving the record to the head is done using pointer changes (no loops)
 * 
 * - put: O(1)
 *   - Map usage to check if key exists 
 *   - Adding and Removing nodes/ records are done via pointer changes 
 *
 * Space Complexity:
 * - O(capacity)
 *   - The cache only stores at most 'capacity' records since tail is removed once exceeded
 * 
 */

// Use Record to represent each item stored in cache (doubly linked list)
class Record {
  constructor(key, value, expiresAt = null) {
    this.key = key;
    this.value = value;
    this.expiresAt = expiresAt; 
    // serves as pointers when moving from Head to Tail
    this.prev = null;
    this.next = null;
  }
}

// 
class LRUCache {
  /**
   * @param {number} capacity 
   */
  constructor(capacity) {
    this._validate(capacity);
    this.capacity = capacity;

    // to store key-value pairs/ key
    this.cache = new Map(); 
    this.size = 0;

    // Initialize head and tail, and their pointers next and prev
    this.head = new Record(null, null);
    this.tail = new Record(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Get the value by key
  get(key) {
    if (this.capacity === 0 || !this.cache.has(key)) return -1;

    const record = this.cache.get(key);

    // Check expiration and delete if expired
    if (record.expiresAt && Date.now() > record.expiresAt) {
      this._remove(record);
      this.cache.delete(key);
      this.size--;

      return -1;
    }

    // Move to head (most recently used)
    this._moveToHead(record);

    return record.value;
  }

  put(key, value, ttl = null) {
    if (this.capacity === 0) return;
    if (ttl !== null && ttl < 0) return;

    const expiresAt = (ttl && ttl > 0) ? Date.now() + ttl : null;

    // If record already exists, just update the value and expiresAt and move to Head
    if (this.cache.has(key)) {
      const record = this.cache.get(key);
      record.value = value;
      record.expiresAt = expiresAt;
      this._moveToHead(record);
    } else {
      const newRecord = new Record(key, value, expiresAt);
      this.cache.set(key, newRecord);
      this._addNodeRecord(newRecord);
      this.size++;

    if (this.size > this.capacity) {
        const lru = this.tail.prev;
        this._remove(lru);
        this.cache.delete(lru.key);
        this.size--;
      }
    }
  }

  // Helper Methods for Doubly Linked List
  _validate(capacity) {
    // If Capacity is provided
    if (capacity === undefined || capacity === null) {
      throw new TypeError('LRUCache constructor requires a capacity argument');
    }
    // If capacity is a valid number
    if (typeof capacity !== 'number' || Number.isNaN(capacity)) {
      throw new TypeError('Capacity must be a valid number');
    }

    // If capacity is an integer
    if (!Number.isInteger(capacity)) {
      throw new RangeError('Capacity must be an integer');
    }

    // If capacity is a non-negative integer 
    if (capacity < 0) {
      throw new RangeError('Capacity must be a non-negative integer');
    }
  }
  
  _addNodeRecord(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _remove(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  _moveToHead(node) {
    this._remove(node);
    this._addNodeRecord(node);
  }
}

module.exports = LRUCache;