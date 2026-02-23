# tq-bottom-navigation

하단 네비게이션 컴포넌트. 아이콘 + 라벨 형태의 탭 바를 제공합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-bottom-navigation.js"></script>

<tq-bottom-navigation
  list='[{"label":"홈","icon":"home"},{"label":"내주변","icon":"nearme"},{"label":"혜택","icon":"gift"},{"label":"찜","icon":"heart"},{"label":"마이","icon":"avatar"}]'
  active="홈"
  active-class-name="fill-semantic-primary-normal text-semantic-primary-normal"
></tq-bottom-navigation>
```

## 속성 (Attributes)

| 속성 | 타입 | 설명 |
|------|------|------|
| `list` | JSON string | `[{label, icon}, ...]` 배열. icon: `home`, `nearme`, `gift`, `heart`, `avatar`, `shopping` |
| `active` | string | 현재 활성 탭의 label |
| `active-class-name` | string | 활성 탭에 적용할 토큰 기반 클래스 (예: `fill-semantic-primary-normal text-semantic-primary-normal`) |

## 이벤트

| 이벤트명 | detail | 설명 |
|----------|--------|------|
| `activechange` | `{ active: string }` | 탭 클릭 시 활성 탭 변경 |

## 예시

```html
<tq-bottom-navigation
  id="bottom-nav-demo"
  list='[{"label":"홈","icon":"home"},{"label":"내주변","icon":"nearme"},{"label":"혜택","icon":"gift"},{"label":"찜","icon":"heart"},{"label":"마이","icon":"avatar"}]'
  active="홈"
  active-class-name="fill-semantic-primary-normal text-semantic-primary-normal"
></tq-bottom-navigation>
```

## 의존성

- `tokens.js` (선택, 없으면 기본 색상 사용)
