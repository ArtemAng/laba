# Results for Sorting Algorithm Performance Analysis


| Array Length        | QuickSort Time | BubbleSort Time | Merge Sort Time |
|---------------------|----------------|-----------------|-----------------|
|10   Sorted          | 0.078 ms       | 0.117 ms        | 0.093 ms        |
|10   Sorted backward | 0.015 ms       | 0.007 ms        | 0.018 ms        |
|10   Random          | 0.009 ms       | 0.005 ms        | 0.014 ms        |
|                     |                |                 |                 |
|100  Sorted          | 0.961 ms       | 0.451 ms        | 0.675 ms        |
|100  Sorted backward | 0.460 ms       | 0.230 ms        | 0.111 ms        |
|100  Random          | 0.103 ms       | 0.294 ms        | 0.154 ms        |
|                     |                |                 |                 |
|500  Sorted          | 6.514 ms       | 0.325 ms        | 0.729 ms        |
|500  Sorted backward | 2.956 ms       | 0.292 ms        | 0.255 ms        |
|500  Random          | 0.160 ms       | 0.333 ms        | 0.449 ms        |
|                     |                |                 |                 |
|1000 Sorted          | 15.284 ms      | 1.140 ms        | 0.556 ms        |
|1000 Sorted backward | 12.095 ms      | 0.948 ms        | 0.658 ms        |
|1000 Random          | 0.456 ms       | 1.211 ms        | 0.683 ms        |         
|                     |                |                 |                 |


# The most efficient algorithms:
For array length 10:
- Sorted: QuickSort
- Sorted backward: BubbleSort
- Random: BubbleSort

For array length 100:
- Sorted: QuickSort
- Sorted backward: BubbleSort
- Random: QuickSort

For array length 500:
- Sorted: QuickSort
- Sorted backward: QuickSort
- Random: Merge Sort

For array length 1000:
- Sorted: QuickSort
- Sorted backward: QuickSort
- Random: Merge Sort