# tq-card-swiper

Swiper 기반 카드/썸네일 가로 스크롤 래퍼. 자식 요소를 `slidesPerView: auto`로 감싸서 개수가 적어도 다닥다닥 붙게 출력합니다. `grid-rows` 사용 시 [Swiper Grid API](https://swiperjs.com/swiper-api#grid)로 다중 행 그리드 레이아웃을 지원합니다.

## 사용법

```html
<script src="./tq-card-swiper.js"></script>

<!-- 기본 (1행) -->
<tq-card-swiper space-between="12">
  <tq-camp-card ...></tq-camp-card>
  <tq-accommodation-card ...></tq-accommodation-card>
  <tq-thumbnail ...></tq-thumbnail>
</tq-card-swiper>

<!-- 그리드 (2행, tq-thumbnail 152px fit) -->
<tq-card-swiper grid-rows="2" slide-width="152" space-between="12">
  <tq-thumbnail ...></tq-thumbnail>
  ...
</tq-card-swiper>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `space-between` | number | `12` | 슬라이드 간 간격 (px) |
| `grid-rows` | number | - | 행 개수 (2 이상 시 그리드 모드) |
| `slide-width` | number | - | 슬라이드 고정 너비. `152` 또는 `152px` 형식 지원. 지정 시 해당 px로 고정되고 slidesPerView 자동 계산 |
| `slide-height` | number | - | 슬라이드 고정 높이(px). 그리드 모드에서 행 높이 계산용. `slide-width`와 함께 사용 시 tq-thumbnail(114px) 등 정렬 유지 |
| `slides-per-view` | number | `2.5` (그리드 시) | 한 번에 보이는 열 개수 (slide-width 미지정 시) |

## 지원 자식 요소

- `tq-camp-card` (240px)
- `tq-accommodation-card` (152px)
- `tq-thumbnail` (152px)

## 의존성

- Swiper 11 (CDN 동적 로드)
