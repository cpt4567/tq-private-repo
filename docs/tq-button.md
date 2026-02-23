# tq-button

버튼 컴포넌트. solid, outlined, text 스타일과 primary, secondary, assistive 타입을 지원합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-button.js"></script>

<tq-button variant="solid" type="primary" size="medium">버튼</tq-button>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | string | `"solid"` | `solid`, `outlined`, `text` |
| `type` | string | `"primary"` | `primary`, `secondary`, `assistive` |
| `size` | string | `"large"` | `small`, `medium`, `large` |
| `disabled` | boolean | - | 비활성화 (속성 존재 시) |
| `text-color` | string | - | 텍스트 색상 오버라이드 (예: `#000`, `#FF4802`) |
| `full-width` | boolean | - | 버튼 전체 너비 사용 (속성 존재 시) |

## 슬롯 (Slots)

| 슬롯명 | 설명 |
|--------|------|
| (default) | 버튼 텍스트 또는 자식 요소 |

## 예시

```html
<!-- Solid Primary -->
<tq-button variant="solid" type="primary" size="small">Small</tq-button>
<tq-button variant="solid" type="primary" size="medium">Medium</tq-button>
<tq-button variant="solid" type="primary" size="large">Large</tq-button>

<!-- Solid Assistive -->
<tq-button variant="solid" type="assistive" size="medium">Assistive</tq-button>

<!-- Outlined -->
<tq-button variant="outlined" type="primary" size="medium">Primary</tq-button>
<tq-button variant="outlined" type="secondary" size="medium">Secondary</tq-button>

<!-- Disabled -->
<tq-button variant="solid" type="primary" size="large" disabled>Disabled</tq-button>

<!-- 텍스트 색상 커스텀 -->
<tq-button variant="outlined" type="assistive" size="medium" text-color="#000">검정 텍스트</tq-button>

<!-- 전체 너비 -->
<tq-button variant="outlined" type="assistive" size="medium" text-color="#000" full-width>숙소 추천 전체보기</tq-button>
```

## 의존성

- `tokens.js` (필수)
