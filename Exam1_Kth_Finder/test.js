const assert = require('assert');
const findKthLargest = require('./findKthLargest');

// Helper to remove duplicates
const distinct = (arr) => [...new Set(arr)];

async function runTests() {
  console.log("Running unit tests for findKthLargest...");

  // 1. No Duplicates.
  console.log("\n[TEST 1] No duplicates");
  console.log("Input: [3, 2, 1, 5, 6, 4], k=2");
  console.log("Expected: 5");
  assert.strictEqual(findKthLargest(distinct([3, 2, 1, 5, 6, 4]), 2), 5);
  console.log("Passed");

  // 2. With Duplicates
  console.log("\n[TEST 2] With duplicates");
  console.log("Input: [3, 2, 3, 1, 2, 4, 5, 5, 6], k=5");
  console.log("Expected: 2");
  assert.strictEqual(findKthLargest(distinct([3, 2, 3, 1, 2, 4, 5, 5, 6]), 5), 2);
  console.log("Passed");

  // 3. nums = [], k=0
  console.log("\n[TEST 3] Empty array, k=0");
  console.log("Expected: null");
  assert.strictEqual(findKthLargest(distinct([]), 0), null);
  console.log("Passed");

  // 4. nums = [], k=1
  console.log("\n[TEST 4] Empty array, k=1");
  console.log("Expected: null");
  assert.strictEqual(findKthLargest(distinct([]), 1), null);
  console.log("Passed");

  // 5. nums=[1], k=1
  console.log("\n[TEST 5] Single element");
  console.log("Input: [1], k=1");
  console.log("Expected: 1");
  assert.strictEqual(findKthLargest(distinct([1]), 1), 1);
  console.log("Passed");

  // 6. k = 1 (largest)
  console.log("\n[TEST 6] k=1 (largest)");
  console.log("Input: [7, 4, 6, 3, 9, 9], k=1");
  console.log("Expected: 9");
  assert.strictEqual(findKthLargest(distinct([7, 4, 6, 3, 9, 9]), 1), 9);
  console.log("Passed");

  // 7. k = nums.length (smallest)
  console.log("\n[TEST 7] k = length (smallest)");
  console.log("Input: [6, 5, 1, 2, 9, 3], k=6");
  console.log("Expected: 1");
  assert.strictEqual(findKthLargest(distinct([6, 5, 1, 2, 9, 3]), 6), 1);
  console.log("Passed");

  console.log("\nAll tests completed successfully!");
}

runTests().catch(err => {
  console.error("Tests failed:", err);
  process.exit(1);
});
