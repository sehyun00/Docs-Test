# 테스트 전략

## 요약 ⚡

- Phase 1: 단위/통합 테스트 (JUnit, Jest) + 수동 QA
- 테스트 커버리지 목표: 백엔드 70%, 프론트엔드 60%
- CI/CD: GitHub Actions로 테스트 자동화
- 비기능 테스트: 부하테스트, 보안테스트
- [P2] E2E 테스트 (Detox/Appium)

---

## Phase 1 (현재)

### 테스트 피라미드

```
         E2E Tests (P2)
              │
    ┌─────────┴─────────┐
    │  Integration Tests  │
    ├───────────────────┤
    │    Unit Tests      │
    └───────────────────┘
```

### 백엔드 테스트

#### 단위 테스트 (Unit Test)

**프레임워크**: JUnit 5 + Mockito

**테스트 범위**

| 레이어 | 테스트 대상 | 예시 |
|---------|------------|------|
| Service | 비즈니스 로직 | `RebalancingService.calculateRebalancing()` |
| Repository | 데이터 접근 | `PortfolioRepository.findByUserId()` |
| Util | 유틸리티 함수 | `JwtUtil.generateToken()` |

**테스트 케이스 예시**

```java
@SpringBootTest
class RebalancingServiceTest {
    
    @Mock
    private PortfolioRepository portfolioRepository;
    
    @Mock
    private StockRepository stockRepository;
    
    @InjectMocks
    private RebalancingService rebalancingService;
    
    @Test
    @DisplayName("리밸런싱 계산 - 정상 케이스")
    void calculateRebalancing_Success() {
        // Given
        Portfolio portfolio = createTestPortfolio();
        List<Stock> stocks = createTestStocks();
        
        when(portfolioRepository.findById(any())).thenReturn(Optional.of(portfolio));
        when(stockRepository.findByPortfolioId(any())).thenReturn(stocks);
        
        // When
        RebalancingResult result = rebalancingService.calculateRebalancing(portfolioId);
        
        // Then
        assertNotNull(result);
        assertEquals(3, result.getActions().size());
    }
    
    @Test
    @DisplayName("리밸런싱 계산 - 포트폴리오 없음")
    void calculateRebalancing_PortfolioNotFound() {
        // Given
        when(portfolioRepository.findById(any())).thenReturn(Optional.empty());
        
        // When & Then
        assertThrows(PortfolioNotFoundException.class, 
            () -> rebalancingService.calculateRebalancing(portfolioId));
    }
}
```

#### 통합 테스트 (Integration Test)

**프레임워크**: Spring Boot Test + TestContainers (MySQL)

**테스트 범위**

| 레이어 | 테스트 대상 | 예시 |
|---------|------------|------|
| Controller | API 엔드포인트 | `POST /api/portfolios` |
| Service + Repository | 데이터베이스 연동 | `PortfolioService.createPortfolio()` |
| 외부 API | 한투 API 목 서버 | `KoreaInvestmentClient.getCurrentPrice()` |

**테스트 케이스 예시**

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Testcontainers
class PortfolioIntegrationTest {
    
    @Container
    static MySQLContainer mysql = new MySQLContainer("mysql:8.0");
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    @DisplayName("포트폴리오 생성 API - 정상")
    void createPortfolio_Success() {
        // Given
        String token = getAuthToken();
        PortfolioCreateRequest request = new PortfolioCreateRequest(
            "내 포트폴리오", 
            1000000L
        );
        
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<PortfolioCreateRequest> entity = new HttpEntity<>(request, headers);
        
        // When
        ResponseEntity<PortfolioResponse> response = restTemplate.postForEntity(
            "/api/portfolios", 
            entity, 
            PortfolioResponse.class
        );
        
        // Then
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody().getId());
    }
}
```

#### 테스트 커버리지 목표

| 레이어 | 목표 | 측정 도구 |
|---------|------|----------|
| Service | 80% | JaCoCo |
| Repository | 70% | JaCoCo |
| Controller | 60% | JaCoCo |
| **전체** | **70%** | JaCoCo |

### 프론트엔드 테스트

#### 단위 테스트 (Unit Test)

**프레임워크**: Jest + React Native Testing Library

**테스트 범위**

| 레이어 | 테스트 대상 | 예시 |
|---------|------------|------|
| Component | UI 컴포넌트 | `PortfolioCard`, `StockListItem` |
| Hook | 커스텀 훅 | `useAuth`, `usePortfolios` |
| Util | 유틸리티 함수 | `formatCurrency()`, `calculateRatio()` |

**테스트 케이스 예시**

```javascript
import { render, fireEvent } from '@testing-library/react-native';
import PortfolioCard from '../components/PortfolioCard';

describe('PortfolioCard', () => {
  const mockPortfolio = {
    id: '1',
    name: '내 포트폴리오',
    totalAmount: 1000000,
    currentValue: 1050000,
  };
  
  it('포트폴리오 정보를 올바르게 표시한다', () => {
    const { getByText } = render(<PortfolioCard portfolio={mockPortfolio} />);
    
    expect(getByText('내 포트폴리오')).toBeTruthy();
    expect(getByText('1,050,000원')).toBeTruthy();
  });
  
  it('클릭 시 onPress 콜백이 호출된다', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <PortfolioCard portfolio={mockPortfolio} onPress={onPressMock} />
    );
    
    fireEvent.press(getByTestId('portfolio-card'));
    expect(onPressMock).toHaveBeenCalledWith('1');
  });
});
```

#### 통합 테스트 (Integration Test)

**프레임워크**: Jest + MSW (Mock Service Worker)

**테스트 범위**

| 레이어 | 테스트 대상 | 예시 |
|---------|------------|------|
| Screen | 화면 전체 플로우 | `PortfolioListScreen` |
| API Service | API 호출 | `portfolioService.getAll()` |
| Context | 상태 관리 | `AuthContext`, `PortfolioContext` |

**테스트 케이스 예시**

```javascript
import { render, waitFor } from '@testing-library/react-native';
import { server } from '../mocks/server';
import PortfolioListScreen from '../screens/PortfolioListScreen';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PortfolioListScreen', () => {
  it('포트폴리오 목록을 불러와서 표시한다', async () => {
    const { getByText } = render(<PortfolioListScreen />);
    
    await waitFor(() => {
      expect(getByText('포트폴리오 1')).toBeTruthy();
      expect(getByText('포트폴리오 2')).toBeTruthy();
    });
  });
});
```

#### 테스트 커버리지 목표

| 레이어 | 목표 | 측정 도구 |
|---------|------|----------|
| Component | 70% | Jest Coverage |
| Screen | 60% | Jest Coverage |
| Util | 80% | Jest Coverage |
| **전체** | **60%** | Jest Coverage |

### CI/CD 테스트 자동화

#### GitHub Actions Workflow

**백엔드**

```yaml
name: Backend Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: test
          MYSQL_DATABASE: test_db
        ports:
          - 3306:3306
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'adopt'
      
      - name: Run tests
        run: ./gradlew test
      
      - name: Generate coverage report
        run: ./gradlew jacocoTestReport
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./build/reports/jacoco/test/jacocoTestReport.xml
```

**프론트엔드**

```yaml
name: Frontend Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
```

### 수동 QA 테스트

#### 테스트 체크리스트

**기능 테스트**

- [ ] 로그인/로그아웃 테스트
  - [ ] Google 로그인 성공
  - [ ] 토큰 만료 시 자동 갱신
  - [ ] 로그아웃 후 접근 불가

- [ ] 포트폴리오 CRUD
  - [ ] 포트폴리오 생성 (1~5개)
  - [ ] 포트폴리오 수정
  - [ ] 포트폴리오 삭제
  - [ ] 6번째 포트폴리오 생성 차단

- [ ] 종목 관리
  - [ ] 종목 검색 및 추가
  - [ ] 목표 비율 설정
  - [ ] 종목 수정/삭제

- [ ] 리밸런싱
  - [ ] 현재 비율 계산
  - [ ] 리밸런싱 제안 표시
  - [ ] 매수/매도 수량 계산

- [ ] 알림
  - [ ] 알림 설정 저장
  - [ ] 알림 발송 확인

**비기능 테스트**

- [ ] 성능 테스트
  - [ ] API 응답시간 < 2초
  - [ ] 앱 로딩시간 < 3초

- [ ] 보안 테스트
  - [ ] JWT 토큰 검증
  - [ ] 권한 없는 접근 차단

- [ ] 호환성 테스트
  - [ ] iOS (14 이상)
  - [ ] Android (10 이상)

---

## Phase 2+ (확장 고려사항)

### E2E 테스트

- [P2] **프레임워크**: Detox (React Native) 또는 Appium
- [P2] **테스트 시나리오**
  - 로그인 → 포트폴리오 생성 → 종목 추가 → 리밸런싱 확인
  - 알림 설정 → 알림 수신 확인

### 성능 테스트

- [P2] **부하 테스트**: JMeter 또는 k6
  - 동시 사용자 100명 시뮬레이션
  - 목표: 에러율 < 1%, P95 < 1초

- [P2] **스트레스 테스트**: 예상 CCU의 2배

### 보안 테스트

- [P2] **침투 테스트**: OWASP ZAP
- [P2] **취약점 스캔**: Snyk, Dependabot

---

## 테스트 일정

| Phase | 시점 | 테스트 종류 |
|-------|------|------------|
| Phase 1 | 주간 | 단위/통합 테스트 (CI) |
| Phase 1 | 마일스톤별 | 수동 QA |
| Phase 1 | 출시 전 | 전체 회귀 테스트 |
| Phase 2 | 분기별 | E2E 테스트 |
| Phase 2 | 주요 기능 추가 시 | 성능 테스트 |

---

## 버그 관리

### 버그 심각도

| 레벨 | 정의 | 대응 시간 |
|------|------|----------|
| Critical | 서비스 중단, 데이터 손실 | 24시간 이내 |
| High | 핵심 기능 동작 불가 | 3일 이내 |
| Medium | 일부 기능 문제 | 1주 이내 |
| Low | UI 개선, 소소한 불편 | 다음 마일스톤 |

### 버그 추적

- **도구**: GitHub Issues + Labels
- **레이블**: `bug:critical`, `bug:high`, `bug:medium`, `bug:low`
- **템플릿**: `.github/ISSUE_TEMPLATE/bug_report.md`

---

## 테스트 환경

| 환경 | 용도 | URL/접근 |
|------|------|--------|
| Local | 개발자 로컬 | `localhost:8080` |
| Dev | 개발/테스트 | `dev-api.stock-keeper.com` |
| Staging | 출시 전 검증 | `staging-api.stock-keeper.com` |
| Production | 실제 서비스 | `api.stock-keeper.com` |

---

## 팀 논의 필요 사항

- [ ] 테스트 커버리지 목표 합의 (70% vs 80%)
- [ ] E2E 테스트 도입 시점 (Phase 1 vs Phase 2)
- [ ] 성능 테스트 도구 선택 (JMeter vs k6)
- [ ] QA 테스트 주기 (마일스톤별 vs 주간)
- [ ] 버그 대응 시간 기준 확정

---

## 체크리스트

### Phase 1 출시 전 필수

- [ ] 백엔드 단위 테스트 70% 달성
- [ ] 프론트엔드 단위 테스트 60% 달성
- [ ] CI/CD 테스트 자동화 구축
- [ ] 수동 QA 체크리스트 완료
- [ ] 크리티컬 버그 0건

### Phase 2 목표

- [ ] E2E 테스트 환경 구축
- [ ] 부하 테스트 수행
- [ ] 보안 테스트 도구 도입

---

## 관련 문서

- **기술 스택**: `core/tech-stack.md`
- **보안**: `reference/security.md`
- **인프라**: `reference/infra.md`
- **배포**: `reference/deployment.md`

---

> **작성일**: 2025-12-31  
> **Phase**: Phase 1 (MVP)  
> **담당**: Backend + Frontend + QA
