# tq-card-swiper

Swiper 기반 카드/썸네일 가로 스크롤 래퍼. 자식 요소를 `slidesPerView: auto`로 감싸서 개수가 적어도 다닥다닥 붙게 출력합니다.

## 사용법

```html
<script src="./tq-card-swiper.js"></script>

<tq-card-swiper space-between="12">
  <tq-camp-card ...></tq-camp-card>
  <tq-accommodation-card ...></tq-accommodation-card>
  <tq-thumbnail ...></tq-thumbnail>
</tq-card-swiper>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `space-between` | number | `12` | 슬라이드 간 간격 (px) |

## 지원 자식 요소

- `tq-camp-card` (240px)
- `tq-accommodation-card` (152px)
- `tq-thumbnail` (152px)

## 의존성

- Swiper 11 (CDN 동적 로드)
