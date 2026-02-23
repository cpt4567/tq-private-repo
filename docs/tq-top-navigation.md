# tq-top-navigation

상단 네비게이션(GNB) 컴포넌트. 로고, 중앙 슬롯, 액션 버튼(로그인/티켓/알림/메뉴)을 포함합니다.

## 스펙

| 항목 | 값 |
|------|-----|
| 패딩 | `12px 16px 12px 20px` (상·우·하·좌) |
| 전체 높이 | 패딩 포함 약 52px |
| 로고 크기 | 112px (max-width) |

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-top-navigation.js"></script>

<tq-top-navigation is-login="true"></tq-top-navigation>
<tq-top-navigation is-login="false"></tq-top-navigation>
```

## 속성 (Attributes)

| 속성 | 타입 | 설명 |
|------|------|------|
| `is-login` | string | `"true"` \| `"false"` - 로그인 시 티켓+알림+메뉴, 비로그인 시 로그인버튼+메뉴 |

## 슬롯 (Slots)

| 슬롯명 | 설명 |
|--------|------|
| `center` | 로고와 액션 사이 중앙 영역 (검색창 등) |

## 이벤트

| 이벤트명 | 설명 |
|----------|------|
| `loginclick` | 로그인 버튼 클릭 |
| `ticketclick` | 티켓 버튼 클릭 |
| `bellclick` | 알림 버튼 클릭 |
| `menuclick` | 메뉴 버튼 클릭 |

## 예시

```html
<!-- 로그인 상태 -->
<tq-top-navigation id="top-nav-demo" is-login="true"></tq-top-navigation>

<!-- 비로그인 상태 -->
<tq-top-navigation id="top-nav-logout" is-login="false"></tq-top-navigation>
```

## 의존성

- `tokens.js` (선택, 없으면 기본 색상 사용)
