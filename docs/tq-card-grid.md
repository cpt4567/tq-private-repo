# tq-card-grid

그리드 스와이퍼 (2행 + 가로 스와이프). Swiper Grid 모드. tq-thumbnail(152×114) 등 고정 크기 카드용.

## 사용법

```html
<script src="./tq-card-swiper.js"></script>
<script src="./tq-card-grid.js"></script>

<tq-card-grid rows="2" space-between="12">
  <tq-thumbnail ...></tq-thumbnail>
  ...
</tq-card-grid>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `rows` | number | `2` | 행 개수 |
| `space-between` | number | `12` | 셀 간 간격 (px) |
| `row-size` | number | `114` | 행 높이 (px) |
| `col-size` | number | `152` | 열 너비 (px) |

## 지원 자식 요소

- `tq-thumbnail` (152×114px)

## 의존성

- Swiper 11 (tq-card-swiper.js와 공유)
