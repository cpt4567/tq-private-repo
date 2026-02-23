# tq-category-group

카테고리 선택 그룹 컴포넌트. 다중 선택 또는 단일 선택 모드를 지원합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-category-group.js"></script>

<tq-category-group
  id="category-solid"
  size="small"
  group='[{"label":"전체","value":"all"},{"label":"캠핑","value":"camping"}]'
></tq-category-group>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `group` | JSON string | `[]` | `[{label, value}, ...]` 배열 |
| `outline` | boolean | - | outline 스타일 (속성 존재 시) |
| `arrow` | boolean | - | 라벨 오른쪽에 드롭다운 화살표 표시 (속성 존재 시) |
| `size` | string | `"medium"` | `small`, `medium`, `large`, `xlarge` |
| `disabled` | boolean | - | 비활성화 |
| `selected-keys` | JSON string | - | 선택된 value 배열 `["all"]` |
| `selection-mode` | string | `"multiple"` | `single`, `multiple` |

### arrow 속성

- `arrow` 속성이 있을 때만 화살표 아이콘이 표시됩니다.
- 선택(활성화) 시 화살표가 180° 회전 애니메이션으로 부드럽게 전환됩니다.

## 이벤트

| 이벤트명 | detail | 설명 |
|----------|--------|------|
| `selectionchange` | `{ selectedKeys: Set }` | 선택 변경 시 |

## 예시

```html
<!-- Solid 스타일 -->
<tq-category-group
  size="small"
  group='[{"label":"전체","value":"all"},{"label":"캠핑","value":"camping"},{"label":"글램핑","value":"glamping"}]'
></tq-category-group>

<!-- Outline 스타일 -->
<tq-category-group
  outline
  size="small"
  group='[{"label":"전체","value":"all"},{"label":"캠핑","value":"camping"}]'
></tq-category-group>

<!-- 화살표 포함 (드롭다운/선택 시 회전 애니메이션) -->
<tq-category-group
  outline
  arrow
  size="medium"
  group='[{"label":"관심지역선택","value":"all"}]'
></tq-category-group>
```

## 의존성

- `tokens.js` (필수)
