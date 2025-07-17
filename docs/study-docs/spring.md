# Spring Framework 핵심 개념 정리

---

### Spring Framework란?

**Spring Framework**는 자바 엔터프라이즈 애플리케이션 개발을 위한 **오픈 소스 애플리케이션 프레임워크**입니다. 자바 개발을 더 효율적이고 생산적으로 할 수 있도록 다양한 기능과 모듈을 제공하며, 특히 **DI(의존성 주입)**와 **AOP(관점 지향 프로그래밍)**를 통해 객체 지향 원칙을 잘 적용할 수 있도록 돕습니다.

* **주요 목표**:
    * **POJO(Plain Old Java Object)** 기반 개발을 통해 특정 기술에 종속되지 않고 유연하게 개발.
    * **엔터프라이즈 개발의 복잡성 감소**: EJB(Enterprise JavaBeans)의 복잡성을 해결하고 단순화된 개발 모델 제공.
    * **테스트 용이성**: DI를 통해 객체 간 결합도를 낮춰 단위 테스트를 쉽게 할 수 있도록 지원.
    * **생산성 향상**: 다양한 모듈과 자동 구성 기능을 통해 개발 시간을 단축.
* **핵심 철학**: **IoC(Inversion of Control)**

---

### IoC (Inversion of Control - 제어의 역전)

**IoC**는 객체의 생성, 생명 주기 관리, 의존성 관계 설정 등을 개발자가 아닌 **프레임워크(Spring 컨테이너)**가 대신 처리하는 디자인 원칙입니다. 개발자는 객체 간의 의존성을 직접 생성하거나 관리하지 않고, 필요한 객체를 선언만 하면 컨테이너가 주입해 줍니다.

* **IoC 컨테이너 (Spring Container)**: Spring 프레임워크의 핵심으로, 객체(Bean)의 생명 주기를 관리하고, 객체 간의 의존성을 주입(DI)합니다. 대표적인 컨테이너 구현체는 `BeanFactory`와 `ApplicationContext`가 있습니다.
    * **`BeanFactory`**: 가장 기본적인 컨테이너로, Bean을 지연 로딩(Lazy Loading)합니다.
    * **`ApplicationContext`**: `BeanFactory`를 확장한 것으로, Bean을 즉시 로딩(Eager Loading)하며, 더 많은 엔터프라이즈 특화 기능(메시지 소스 처리, 이벤트 발행 등)을 제공합니다. 스프링 개발에서 주로 사용됩니다.
* **장점**:
    * **결합도(Coupling) 감소**: 객체 간의 의존성을 직접 관리하지 않아 코드의 결합도가 낮아집니다.
    * **유연성 및 확장성**: 구성 변경이 용이하고, 새로운 기능을 추가하기 쉽습니다.
    * **테스트 용이성**: Mock 객체 주입 등을 통해 단위 테스트가 쉬워집니다.

---

### DI (Dependency Injection - 의존성 주입)

**DI**는 **IoC의 구체적인 구현 방법 중 하나**로, 객체가 필요로 하는 의존 객체를 직접 생성하거나 찾는 대신, 외부(Spring 컨테이너)에서 주입해 주는 디자인 패턴입니다.

* **의존성 주입 방법**:
    * **생성자 주입 (Constructor Injection)**: 생성자를 통해 의존성을 주입받는 가장 권장되는 방식입니다. 객체의 불변성(Immutability)을 보장하고 순환 참조를 방지할 수 있습니다. (`@Autowired`를 생성자에 사용)
    * **Setter 주입 (Setter Injection)**: Setter 메서드를 통해 의존성을 주입받습니다. 객체의 필드를 변경 가능하게 하여 유연성이 높지만, 런타임에 의존성이 변경될 가능성이 있습니다. (`@Autowired`를 Setter에 사용)
    * **필드 주입 (Field Injection)**: 필드에 직접 의존성을 주입받는 방식입니다. 코드가 간결하지만, 테스트가 어렵고 결합도가 높아지는 단점이 있어 비권장됩니다. (`@Autowired`를 필드에 사용)
* **`@Autowired`**: Spring에서 의존성 주입을 자동으로 처리해주는 어노테이션입니다. `byType` 방식으로 동작합니다.
* **`@Resource`, `@Inject`**: 다른 의존성 주입 어노테이션으로, 각각 JSR-250, JSR-330 표준을 따릅니다.

---

### AOP (Aspect-Oriented Programming - 관점 지향 프로그래밍)

**AOP**는 애플리케이션의 **핵심 비즈니스 로직과 분리될 수 있는 부가 기능(횡단 관심사, Cross-cutting Concerns)**을 모듈화하여 관리하는 프로그래밍 패러다임입니다. 로깅, 트랜잭션, 보안 등이 대표적인 횡단 관심사입니다.

* **주요 개념**:
    * **횡단 관심사 (Cross-cutting Concern)**: 여러 모듈에 걸쳐 공통적으로 나타나는 기능.
    * **Aspect (애스펙트)**: 횡단 관심사를 모듈화한 단위. Advice와 Pointcut의 조합.
    * **Advice (어드바이스)**: 애스펙트가 제공하는 실제 기능(코드). 언제(When) 무엇을(What) 할지 정의.
        * `@Before`: 조인 포인트 실행 전
        * `@After`: 조인 포인트 실행 후 (정상/예외 여부 무관)
        * `@AfterReturning`: 조인 포인트 정상 실행 후
        * `@AfterThrowing`: 조인 포인트 예외 발생 시
        * `@Around`: 조인 포인트 실행 전/후 모두 제어 (가장 강력)
    * **Join Point (조인 포인트)**: Advice를 적용할 수 있는 지점 (메서드 실행, 객체 생성 등). Spring AOP는 메서드 실행 조인 포인트만 지원.
    * **Pointcut (포인트컷)**: Join Point 중 Advice가 실제로 적용될 지점을 정의하는 표현식. (예: `execution(* com.example..*.*(..))`)
    * **Target (타겟)**: Advice를 적용받는 객체(클래스).
    * **Proxy (프록시)**: Target 객체를 감싸서 Advice를 적용하는 객체. Spring AOP는 기본적으로 JDK 동적 프록시 또는 CGLIB 프록시를 사용.

---

### PSA (Portable Service Abstraction - 이식 가능한 서비스 추상화)

**PSA**는 Spring이 제공하는 일관된 서비스 인터페이스 추상화 계층입니다. 개발자는 특정 기술(JPA, JMS 등)에 직접 의존하지 않고, Spring이 제공하는 추상화 인터페이스를 통해 일관된 방식으로 서비스를 사용할 수 있습니다. 이를 통해 구현 기술이 변경되어도 애플리케이션 코드의 수정 없이 유연하게 대응할 수 있습니다.

* **예시**:
    * **트랜잭션 추상화**: `@Transactional` 어노테이션을 통해 어떤 트랜잭션 매니저(JPA, JDBC 등)를 사용하든 동일한 방식으로 트랜잭션을 관리할 수 있습니다.
    * **캐시 추상화**: `@Cacheable`, `@CacheEvict` 등을 통해 CacheManager 구현체(Ehcache, Redis Cache 등)와 상관없이 캐싱 기능을 사용할 수 있습니다.
    * **JDBC 추상화**: `JdbcTemplate`을 통해 JDBC API의 복잡성을 줄이고 예외를 추상화합니다.

---

### Spring MVC (Model-View-Controller)

**Spring MVC**는 웹 애플리케이션 개발을 위한 Spring Framework의 모듈입니다. 웹 요청을 처리하는 데 사용되는 MVC(Model-View-Controller) 디자인 패턴을 구현합니다.

* **주요 구성 요소 및 동작 흐름**:
    1.  **DispatcherServlet**: 모든 웹 요청을 가장 먼저 받는 프런트 컨트롤러입니다. 요청을 분석하고 적절한 핸들러에게 위임합니다.
    2.  **HandlerMapping**: 요청 URL을 기반으로 적절한 핸들러(Controller 메서드)를 찾아 DispatcherServlet에 반환합니다.
    3.  **Controller**: 실제 비즈니스 로직을 수행하고, 처리 결과를 Model에 담아 View Name을 반환합니다. (`@Controller`, `@RestController`)
    4.  **ModelAndView**: Controller가 반환하는 데이터(Model)와 뷰 이름(View Name)을 담는 객체입니다.
    5.  **ViewResolver**: Controller가 반환한 View Name을 기반으로 실제 View 객체를 찾아 반환합니다.
    6.  **View**: Model의 데이터를 사용하여 최종 화면을 렌더링합니다. (JSP, Thymeleaf, Freemarker 등)

* **핵심 어노테이션**:
    * `@Controller`: 해당 클래스가 웹 요청을 처리하는 컨트롤러임을 명시.
    * `@RestController`: `@Controller` + `@ResponseBody` (API 개발 시 JSON/XML 응답을 쉽게 보낼 수 있도록 함).
    * `@RequestMapping`: 요청 URL과 HTTP 메서드를 매핑.
    * `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: `@RequestMapping`의 축약형.
    * `@RequestParam`: HTTP 요청 파라미터를 메서드 파라미터에 바인딩.
    * `@RequestBody`: HTTP 요청 본문(JSON, XML 등)을 객체로 바인딩.
    * `@ResponseBody`: 메서드 반환 값을 HTTP 응답 본문으로 직접 전송 (주로 JSON/XML).
    * `@PathVariable`: URL 경로 변수를 메서드 파라미터에 바인딩.

---

### Spring Data JPA (Java Persistence API)

**Spring Data JPA**는 JPA(Java Persistence API)를 더 쉽게 사용할 수 있도록 추상화 계층을 제공하는 Spring의 모듈입니다. Repositories 개념을 도입하여 데이터 접근 계층(DAO) 구현을 크게 단순화합니다.

* **JPA (Java Persistence API)**: 자바 객체와 관계형 데이터베이스 간의 매핑을 정의하는 표준 명세입니다. ORM(Object-Relational Mapping) 기술의 한 종류입니다.
* **ORM (Object-Relational Mapping)**: 객체 지향 프로그래밍 언어의 객체와 관계형 데이터베이스의 데이터를 자동으로 매핑하는 기술입니다.
    * **장점**:
        * SQL 중심 개발에서 객체 중심 개발로 전환.
        * 생산성 향상 (반복적인 SQL 코드 감소).
        * 유지보수성 향상.
        * 패러다임 불일치(객체와 관계형 DB) 해소.
    * **단점**:
        * 복잡한 쿼리 시 성능 문제 발생 가능.
        * 학습 곡선.
        * 완벽한 ORM은 어려움.
* **`Repository` 인터페이스**: Spring Data JPA가 제공하는 인터페이스로, 기본적인 CRUD(Create, Read, Update, Delete) 메서드를 자동으로 제공합니다. 개발자는 인터페이스만 정의하고, Spring이 런타임에 구현체를 생성합니다.
    * `JpaRepository<T, ID>`: 기본적인 CRUD 및 페이징, 정렬 기능을 제공하는 가장 많이 사용되는 인터페이스.
    * **쿼리 메서드 (Query Methods)**: 메서드 이름 규칙을 통해 복잡한 쿼리를 자동으로 생성합니다. (예: `findByUsernameAndEmail(String username, String email)`)
    * `@Query` 어노테이션: JPQL(Java Persistence Query Language)이나 Native SQL을 직접 작성하여 복잡한 쿼리를 정의할 수 있습니다.

---

### Spring Security

**Spring Security**는 Spring 기반 애플리케이션의 **인증(Authentication)**과 **인가(Authorization)** 기능을 제공하는 강력한 보안 프레임워크입니다.

* **인증 (Authentication)**: 사용자가 누구인지 확인하는 과정. (로그인)
* **인가 (Authorization)**: 인증된 사용자가 특정 리소스에 접근할 수 있는 권한이 있는지 확인하는 과정. (권한 부여)
* **주요 개념**:
    * **`FilterChainProxy`**: Spring Security의 핵심으로, 모든 요청을 가로채서 보안 필터 체인을 통해 처리합니다.
    * **`SecurityContextHolder`**: 현재 스레드의 보안 컨텍스트(인증 정보 등)를 저장하는 곳.
    * **`UserDetailsService`**: 사용자 정보를 DB 등에서 로드하는 인터페이스.
    * **`PasswordEncoder`**: 비밀번호 암호화 및 검증 인터페이스.
* **활용**: 로그인/로그아웃, 세션 관리, CSRF/XSS 방어, OAuth2, JWT 등

---

### Spring Boot

**Spring Boot**는 Spring Framework 기반의 **독립 실행형(standalone) 프로덕션 등급 Spring 애플리케이션을 쉽게 만들 수 있도록 돕는 프로젝트**입니다. Spring 개발의 초기 설정과 복잡성을 크게 줄여줍니다.

* **주요 특징**:
    * **자동 구성(Auto-configuration)**: 클래스패스에 있는 라이브러리, 빈(Bean) 등을 기반으로 애플리케이션 설정을 자동으로 추론하고 구성합니다.
    * **내장형 서버**: Tomcat, Jetty, Undertow 등의 웹 서버를 내장하고 있어 별도의 서버 설치가 필요 없습니다.
    * **스타터 의존성(Starter Dependencies)**: 공통적인 기능 묶음(웹, 데이터 JPA 등)을 미리 정의된 의존성으로 제공하여 설정 파일 수를 줄입니다. (예: `spring-boot-starter-web`)
    * **외부 설정**: YAML, `.properties` 파일 등을 통해 쉽게 설정을 변경할 수 있습니다.
    * **액추에이터(Actuator)**: 애플리케이션 모니터링 및 관리 기능을 제공합니다.

---

이 정도면 Spring Framework의 핵심적인 개념들을 충분히 아우를 수 있다고 생각합니다. 면접이나 학습에 큰 도움이 되길 바랍니다! 추가적으로 궁금한 점이 있으신가요?