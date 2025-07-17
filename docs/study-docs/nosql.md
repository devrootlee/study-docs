# NoSQL 핵심 개념 정리

---

### NoSQL(Not Only SQL)이란?

**NoSQL**은 **관계형 데이터베이스(RDBMS) 모델 외의 데이터 저장 및 검색 메커니즘을 제공하는 데이터베이스 시스템**을 총칭하는 용어입니다. SQL을 사용하지 않거나, 사용하더라도 관계형 모델을 따르지 않는 특징을 가집니다. 빅데이터, 실시간 웹 애플리케이션, 모바일 애플리케이션 등 대규모 분산 환경에서 RDBMS의 한계를 극복하기 위해 등장했습니다.

* **등장 배경**:
    * 대규모 데이터 처리 및 분산 시스템의 필요성 증가
    * 높은 트래픽과 빠르게 변화하는 데이터 모델에 대한 유연성 요구
    * 수직 확장(Scale-up)의 한계와 수평 확장(Scale-out)의 용이성
* **주요 특징**:
    * **스키마리스(Schema-less)** 또는 유연한 스키마: 데이터 구조가 고정되지 않아 빠르게 변경되는 요구사항에 유연하게 대응합니다.
    * **수평 확장(Scale-out) 용이**: 여러 서버에 데이터를 분산 저장하여 트래픽 증가에 쉽게 대응할 수 있습니다.
    * **분산 처리**: 대규모 데이터를 여러 노드에 분산하여 처리합니다.
    * **CAP 이론**: 일관성(Consistency), 가용성(Availability), 분할 허용성(Partition Tolerance) 중 두 가지를 선택해야 하는 제약이 있습니다. (RDBMS는 주로 일관성 중시)
    * **비관계형 데이터 모델**: 키-값, 문서, 칼럼, 그래프 등 다양한 방식으로 데이터를 저장합니다.

---

### CAP 이론 (CAP Theorem)

**CAP 이론**은 분산 컴퓨팅 시스템에서 **일관성(Consistency), 가용성(Availability), 분할 허용성(Partition Tolerance)** 세 가지 속성 중 **동시에 두 가지 속성만 만족**할 수 있다는 이론입니다.

* **일관성(Consistency)**: 모든 클라이언트가 동시에 동일한 데이터를 볼 수 있도록 합니다. (모든 노드의 데이터가 항상 최신 상태로 동기화됨)
* **가용성(Availability)**: 모든 요청에 대해 항상 응답을 받을 수 있어야 합니다. (일부 노드가 실패하더라도 시스템은 계속 동작해야 함)
* **분할 허용성(Partition Tolerance)**: 네트워크 분할(노드 간 통신 단절)이 발생하더라도 시스템이 계속 작동해야 합니다.

**NoSQL 데이터베이스 유형별 선택**:

* **CP (일관성 + 분할 허용성)**: MongoDB, HBase (네트워크 분할 시 일관성을 위해 가용성을 포기)
* **AP (가용성 + 분할 허용성)**: Cassandra, DynamoDB (네트워크 분할 시 가용성을 위해 일관성을 일시적으로 포기)
* **CA (일관성 + 가용성)**: RDBMS (분산 환경이 아니므로 Partition Tolerance를 고려하지 않음)

---

### NoSQL 데이터 모델 종류

NoSQL 데이터베이스는 데이터를 저장하는 방식에 따라 크게 네 가지 주요 유형으로 나뉩니다.

#### 1. 키-값(Key-Value) 데이터베이스

가장 단순한 NoSQL 데이터 모델입니다. 고유한 **키(Key)**와 그에 매핑되는 **값(Value)**의 형태로 데이터를 저장합니다. 값의 형식은 제한이 없습니다 (문자열, 숫자, 객체 등).

* **특징**: 단순한 구조, 매우 빠른 읽기/쓰기 성능, 대규모 수평 확장 용이.
* **주요 사용 사례**: 캐싱 시스템, 세션 관리, 실시간 랭킹 시스템.
* **대표적인 DB**: Redis, Amazon DynamoDB, Memcached.

* **예시**:
    ```
    Key: "user:101"
    Value: "{ "name": "Alice", "email": "alice@example.com", "age": 30 }" (JSON String)

    Key: "product:SKU001:stock"
    Value: "150" (Integer)
    ```

#### 2. 문서(Document) 데이터베이스

**문서(Document)** 형태로 데이터를 저장합니다. 각 문서는 독립적이며, JSON, BSON, XML 같은 반정형(Semi-structured) 데이터를 저장하는 데 적합합니다. RDBMS의 행과 유사하지만, 스키마가 유연합니다.

* **특징**: 유연한 스키마, 복잡한 계층 구조의 데이터 저장 용이, 쿼리 기능 지원.
* **주요 사용 사례**: 콘텐츠 관리 시스템, 카탈로그, 블로그 플랫폼, 모바일 애플리케이션 데이터.
* **대표적인 DB**: MongoDB, Couchbase, DocumentDB.

* **예시 (MongoDB JSON 문서)**:
    ```json
    {
        "_id": "60c72b2f9c4c1a001c8b4567",
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "zip": "12345"
        },
        "orders": [
            { "orderId": "ORD001", "amount": 100 },
            { "orderId": "ORD002", "amount": 250 }
        ]
    }
    ```

#### 3. 칼럼 기반(Column-Family) 데이터베이스

데이터를 **열(Column)** 단위로 저장합니다. 관련된 칼럼들을 **칼럼 패밀리(Column Family)**로 묶어 관리하며, 각 행마다 다른 칼럼들을 가질 수 있습니다 (희소 행렬에 유리). 넓은 테이블(Wide-column)에 적합합니다.

* **특징**: 엄청난 양의 데이터 저장 및 분산 처리, 높은 쓰기 성능, 특정 칼럼에 대한 빠른 조회.
* **주요 사용 사례**: 빅데이터 분석, 시계열 데이터, IoT 데이터, 추천 시스템.
* **대표적인 DB**: Apache Cassandra, HBase, Google Bigtable.

* **예시 (Cassandra 개념)**:
    ```
    // 'Users' Column Family
    Row Key: user_id_1
        user_info:
            first_name: John
            last_name: Doe
            email: john.doe@example.com
        purchase_info:
            last_purchase_date: 2023-01-15
            total_spent: 500.00

    Row Key: user_id_2
        user_info:
            first_name: Jane
            last_name: Smith
            email: jane.smith@example.com
            phone: 555-1234  // user_id_1 에는 없는 칼럼
    ```

#### 4. 그래프(Graph) 데이터베이스

데이터를 **노드(Node)**, **엣지(Edge)**, **속성(Property)**으로 표현합니다. 노드는 개체(사람, 장소 등), 엣지는 노드 간의 관계(친구, 거주 등), 속성은 노드나 엣지의 특징을 나타냅니다. 복잡한 관계형 데이터를 모델링하고 쿼리하는 데 강점이 있습니다.

* **특징**: 복잡한 관계 데이터 처리, 관계 기반 쿼리 성능 우수.
* **주요 사용 사례**: 소셜 네트워크, 추천 시스템, 사기 탐지, 지식 그래프.
* **대표적인 DB**: Neo4j, Amazon Neptune, OrientDB.

* **예시**:
    ```
    // 노드 (Nodes):
    (Person {name: 'Alice', age: 30})
    (Person {name: 'Bob', age: 28})
    (Movie {title: 'Inception', release_year: 2010})

    // 엣지 (Edges - 관계):
    (Alice)-[:FRIENDS_WITH]->(Bob)
    (Alice)-[:WATCHED {rating: 5}]->(Inception)
    (Bob)-[:WATCHED {rating: 4}]->(Inception)
    ```

---

### NoSQL 선택 고려 사항

* **데이터 모델의 복잡성**: 스키마가 자주 변경되거나 유연한 데이터 구조가 필요할 때.
* **확장성 요구사항**: 대규모 데이터나 높은 트래픽을 수평 확장으로 처리해야 할 때.
* **성능 요구사항**: 특정 데이터 작업(읽기/쓰기, 특정 유형의 쿼리)에 대한 초고속 성능이 필요할 때.
* **일관성 요구사항**: 데이터 일관성보다 가용성이나 성능이 더 중요할 때. (CAP 이론 고려)
* **개발 생산성**: 빠르게 프로토타입을 만들거나 반복적인 개발이 필요할 때.

---