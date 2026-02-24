# tq-tooltip

툴팁 컴포넌트. Tippy.js + Popper.js를 CDN으로 동적 로드하여 사용합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-tooltip.js"></script>

<tq-tooltip content="메시지에 마침표를 찍어요." placement="top" variant="dark">
  <div>Hover me</div>
</tq-tooltip>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `content` | string | - | 툴팁에 표시할 텍스트 |
| `placement` | string | `"top"` | `top`, `topLeft`, `topRight`, `bottom`, `bottomLeft`, `bottomRight`, `left`, `right` 등 |
| `arrow` | boolean | `true` | 화살표 표시 (`"false"` 시 숨김) |
| `variant` | string | `"dark"` | `dark`, `light` |
| `trigger` | string | `"mouseenter"` | `mouseenter`, `click` |
| `disabled` | boolean | - | 비활성화 (속성 존재 시) |

## 슬롯 (Slots)

| 슬롯명 | 설명 |
|--------|------|
| (기본) | 툴팁 트리거 요소 (호버/클릭 대상) |

## 예시

```html
<!-- Hover (기본) -->
<tq-tooltip content="메시지에 마침표를 찍어요." placement="top" variant="dark">
  <div>Hover me</div>
</tq-tooltip>

<!-- Click -->
<tq-tooltip content="클릭하면 나타나요" placement="top" trigger="click">
  <div>Click me</div>
</tq-tooltip>

<!-- Light 테마 -->
<tq-tooltip content="라이트 테마" placement="bottom" variant="light">
  <div>Light</div>
</tq-tooltip>

<!-- 화살표 없음 -->
<tq-tooltip content="화살표 없음" placement="top" arrow="false">
  <div>No arrow</div>
</tq-tooltip>
```

## 스펙

| 항목 | 값 |
|------|-----|
| padding | 10px |
| background (dark) | #1B1C1E |

## 의존성

- `tokens.js` (선택, 없어도 동작)
- Popper.js, Tippy.js (unpkg CDN에서 스크립트 내 동적 로드)
