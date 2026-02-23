# tq-tab

탭 컴포넌트. JSON으로 탭 항목을 전달하고 선택 인덱스를 관리합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-tab.js"></script>

<tq-tab
  id="tab-demo"
  size="medium"
  resize="fill"
  padding
  items='[{"text":"전체","selected":true},{"text":"캠핑"},{"text":"글램핑"}]'
></tq-tab>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `items` | JSON string | `[]` | `[{text, selected?}, ...]` 배열 |
| `selected-index` | number | - | 선택된 인덱스 (0부터) |
| `size` | string | - | `small`, `medium`, `large` |
| `resize` | string | - | `fill` 등 |
| `padding` | boolean | - | 패딩 적용 (속성 존재 시) |

## 이벤트

| 이벤트명 | detail | 설명 |
|----------|--------|------|
| `selectionchange` | `{ selectedIndex: number }` | 탭 선택 변경 시 |

## 예시

```html
<tq-tab
  id="tab-demo"
  size="medium"
  resize="fill"
  padding
  items='[{"text":"전체","selected":true},{"text":"캠핑"},{"text":"글램핑"},{"text":"카라반"}]'
></tq-tab>
```

## 의존성

- `tokens.js` (필수)
