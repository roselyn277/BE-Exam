const LRUCache = require('./lruCache')
const assert = require('assert');

async function runTests() {
  console.log("Running Unit tests for LRUCache...");

  // 1. Basic LRU Eviction
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  assert.strictEqual(cache.get(1), 1);
  cache.put(3, 3); // Evicts key 2
  assert.strictEqual(cache.get(2), -1); 
  assert.strictEqual(cache.get(3), 3);
  console.log("Basic eviction passed");

  // 2. Expiration Logic
  const ttlCache = new LRUCache(2);
  ttlCache.put('a', 'apple', 100); // 100ms TTL
  assert.strictEqual(ttlCache.get('a'), 'apple');
  
  await new Promise(resolve => setTimeout(resolve, 150));
  assert.strictEqual(ttlCache.get('a'), -1); // Should be expired
  console.log("Expiration logic passed");

  // 3. Update Existing Key with new TTL
  cache.put(3, "three-updated", 50);
  assert.strictEqual(cache.get(3), "three-updated");
  await new Promise(resolve => setTimeout(resolve, 60));
  assert.strictEqual(cache.get(3), -1);
  console.log("TTL Update passed");

  // 4. Edge Case: Capacity 0
  const zeroCache = new LRUCache(0);
  zeroCache.put(1, 1);
  assert.strictEqual(zeroCache.get(1), -1);
  console.log("Zero capacity handling passed");

  // 5. Edge Case: Negative TTL 
  const negTTLCache = new LRUCache(1);
  negTTLCache.put(1, 'val', -500);
  assert.strictEqual(negTTLCache.get(1), -1);
  console.log("Negative TTL handling passed");

  // 6. Validation errors
  console.log('\n[TEST] Constructor validation');

  console.log('Expect TypeError: no argument');
  assert.throws(() => new LRUCache(), TypeError);

  console.log('Expect TypeError: null');
  assert.throws(() => new LRUCache(null), TypeError);

  console.log('Expect TypeError: string');
  assert.throws(() => new LRUCache('2'), TypeError);

  console.log('Expect RangeError: float');
  assert.throws(() => new LRUCache(1.5), RangeError);

  console.log('Expect RangeError: negative');
  assert.throws(() => new LRUCache(-1), RangeError);

  console.log('Constructor validation passed');

  console.log("\nAll tests completed successfully!");
}

runTests().catch(err => {
  console.error("Tests failed:", err);
  process.exit(1);
});