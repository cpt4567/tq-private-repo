# tq-badge

배지 컴포넌트. solid, outline 스타일과 다양한 색상을 지원합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-badge.js"></script>

<tq-badge variant="outline" color="primary" size="small">Primary</tq-badge>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | string | `"outline"` | `solid`, `outline` |
| `color` | string | `"primary"` | `primary`, `label`, `positive`, `negative`, `cautionary`, `informative`, 또는 semantic 색상 키 |
| `size` | string | `"medium"` | `xsmall`, `small`, `medium` |

## 슬롯 (Slots)

| 슬롯명 | 설명 |
|--------|------|
| (기본) | 배지 텍스트 |
| `left-icon` | 왼쪽 아이콘 |
| `right-icon` | 오른쪽 아이콘 |

## 예시

```html
<tq-badge variant="outline" color="primary" size="small">Primary</tq-badge>
<tq-badge variant="outline" color="semantic-status-cautionary" size="small">cautionary</tq-badge>
<tq-badge variant="solid" color="positive" size="medium">Positive</tq-badge>
```

## 의존성

- `tokens.js` (필수)
