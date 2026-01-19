# BE-Exam

To run the tests for both exams, just run the below under each folder


 node test.js 


**Sample Output**

**Task 1**

Exam1_Kth_Finder % node test.js
Running unit tests for findKthLargest...

[TEST 1] No duplicates
Input: [3, 2, 1, 5, 6, 4], k=2
Expected: 5
Passed

[TEST 2] With duplicates
Input: [3, 2, 3, 1, 2, 4, 5, 5, 6], k=5
Expected: 2
Passed

[TEST 3] Empty array, k=0
Expected: null
Passed

[TEST 4] Empty array, k=1
Expected: null
Passed

[TEST 5] Single element
Input: [1], k=1
Expected: 1
Passed

[TEST 6] k=1 (largest)
Input: [7, 4, 6, 3, 9, 9], k=1
Expected: 9
Passed

[TEST 7] k = length (smallest)
Input: [6, 5, 1, 2, 9, 3], k=6
Expected: 1
Passed

All tests completed successfully!



**Task 2**


Exam2_LRU % node test.js
Running Unit tests for LRUCache...
Basic eviction passed
Expiration logic passed
TTL Update passed
Zero capacity handling passed
Negative TTL handling passed

[TEST] Constructor validation
Expect TypeError: no argument
Expect TypeError: null
Expect TypeError: string
Expect RangeError: float
Expect RangeError: negative
Constructor validation passed
All tests completed successfully!
it@its-macbook-pro Exam2_LRU % node test.js
Running Unit tests for LRUCache...
Basic eviction passed
Expiration logic passed
TTL Update passed
Zero capacity handling passed
Negative TTL handling passed

[TEST] Constructor validation
Expect TypeError: no argument
Expect TypeError: null
Expect TypeError: string
Expect RangeError: float
Expect RangeError: negative
Constructor validation passed

All tests completed successfully
