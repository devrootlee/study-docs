# 정렬 (Sorting) 핵심 개념 정리

---

### 정렬(Sorting)이란?

**정렬(Sorting)**은 **데이터를 특정 기준에 따라 순서대로 나열하는 알고리즘**입니다. 일반적으로 오름차순(Ascending) 또는 내림차순(Descending)으로 정렬합니다. 효율적인 정렬 알고리즘은 검색, 탐색, 통계 분석 등 다양한 분야에서 필수적으로 사용됩니다.

* **등장 배경**:
    * 데이터 검색 및 처리 효율 향상
    * 이진 탐색과 같은 알고리즘의 전제 조건
    * 중복 제거, 통계 처리 등 다양한 문제 해결 기반

* **주요 기준**:
    * **시간 복잡도**: 최선, 평균, 최악 시간
    * **공간 복잡도**: 추가 메모리 사용 여부
    * **안정성(Stable)**: 같은 값의 원소가 기존 순서를 유지하는지 여부
    * **제자리 정렬(In-place)**: 추가 메모리 없이 입력 배열을 직접 정렬하는지 여부

---

### 대표적인 정렬 알고리즘

---

#### 1. 버블 정렬 (Bubble Sort)

인접한 두 요소를 비교하여 교환하며 정렬하는 방식. 가장 단순하지만 비효율적.

* **시간 복잡도**: O(n²)
* **공간 복잡도**: O(1)
* **안정성**: 안정 정렬
* **특징**: 데이터 크기가 작을 때만 유효

```java
for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            swap(arr[j], arr[j + 1]);
        }
    }
}
```

---

#### 2. 선택 정렬 (Selection Sort)

가장 작은(혹은 큰) 값을 선택해서 맨 앞과 교환하는 방식.

* **시간 복잡도**: O(n²)
* **공간 복잡도**: O(1)
* **안정성**: 불안정 정렬
* **특징**: 비교 횟수는 적지만 교환은 많음

---

#### 3. 삽입 정렬 (Insertion Sort)

앞에서부터 데이터를 하나씩 정렬된 부분에 삽입.

* **시간 복잡도**: O(n²) / (거의 정렬된 경우 O(n))
* **공간 복잡도**: O(1)
* **안정성**: 안정 정렬
* **특징**: 적은 데이터에 매우 효율적

---

#### 4. 병합 정렬 (Merge Sort)

데이터를 절반으로 나누고, 각각 정렬한 뒤 병합.

* **시간 복잡도**: O(n log n)
* **공간 복잡도**: O(n)
* **안정성**: 안정 정렬
* **특징**: 분할 정복(Divide and Conquer) 방식, 대용량 데이터 정렬에 강함

---

#### 5. 퀵 정렬 (Quick Sort)

기준값(Pivot)을 정해 좌우로 분할하고 재귀적으로 정렬.

* **시간 복잡도**: 평균 O(n log n), 최악 O(n²)
* **공간 복잡도**: O(log n)
* **안정성**: 불안정 정렬
* **특징**: 평균적으로 매우 빠르며, 정렬 라이브러리에 자주 쓰임

---

#### 6. 힙 정렬 (Heap Sort)

최대 힙(또는 최소 힙)을 구성해 정렬.

* **시간 복잡도**: O(n log n)
* **공간 복잡도**: O(1)
* **안정성**: 불안정 정렬
* **특징**: 우선순위 큐 구현과 유사

---

#### 7. 계수 정렬 (Counting Sort)

숫자의 **개수**를 세어 정렬. 정수 범위가 작고 중복이 많을 때 효율적.

* **시간 복잡도**: O(n + k) (k = 값의 범위)
* **공간 복잡도**: O(k)
* **안정성**: 안정 정렬
* **특징**: 정수, 정해진 범위의 값에 한정

---

#### 8. 기수 정렬 (Radix Sort)

자릿수 단위로 비교하며 정렬 (LSD 방식: Least Significant Digit)

* **시간 복잡도**: O(nk) (k = 자릿수 길이)
* **공간 복잡도**: O(n + k)
* **안정성**: 안정 정렬
* **특징**: 문자열이나 정수 등 자릿수 기반 정렬에 유용

---

### 정렬 알고리즘 선택 기준

| 조건 | 추천 알고리즘 |
|------|----------------|
| 데이터 크기가 작다 | 삽입 정렬, 버블 정렬 |
| 정렬이 거의 되어 있다 | 삽입 정렬 |
| 빠른 속도가 중요하다 | 퀵 정렬 (단, 최악 대비 주의) |
| 안정 정렬이 필요하다 | 병합 정렬, 계수 정렬 |
| 메모리 사용 최소화 | 힙 정렬, 퀵 정렬 |
| 데이터가 정수이면서 범위가 작다 | 계수 정렬 |
| 문자열/자릿수 기반 데이터 | 기수 정렬 |

---

### 정렬의 실제 사용 예시

* **자바 기본 정렬**  
```java
Arrays.sort(arr); // Dual-Pivot QuickSort (int), TimSort (Object)
```

* **스트림 정렬**  
```java
list.stream()
    .sorted(Comparator.comparing(Foo::getName))
    .collect(Collectors.toList());
```
