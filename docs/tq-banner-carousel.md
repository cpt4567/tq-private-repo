# tq-banner-carousel

이미지 배너 캐러셀 컴포넌트. Swiper를 CDN으로 동적 로드하여 사용합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-banner-carousel.js"></script>

<tq-banner-carousel
  height="150px"
  images='["https://example.com/1.jpg","https://example.com/2.jpg"]'
></tq-banner-carousel>
```

## 속성 (Attributes)

| 속성 | 타입 | 설명 |
|------|------|------|
| `images` | string | JSON 배열 `["url1","url2"]` 또는 쉼표 구분 `"url1,url2,url3"` |
| `height` | string | 높이 (`100`, `150px`, `20vh` 등) |
| `autoplay` | boolean | 자동 재생 (속성 존재 시) |
| `loop` | boolean | 무한 루프 (속성 존재 시) |

## 이벤트

| 이벤트명 | detail | 설명 |
|----------|--------|------|
| `slidechange` | `{ index, total }` | 슬라이드 변경 시 |

## 예시

```html
<tq-banner-carousel height="100" images='["url1","url2"]'></tq-banner-carousel>
<tq-banner-carousel height="150px" images="url1,url2,url3"></tq-banner-carousel>
<tq-banner-carousel height="20vh" images='["url1","url2"]' autoplay loop></tq-banner-carousel>
```

## 의존성

- `tokens.js` (필수)
- Swiper (jsDelivr CDN에서 스크립트 내 동적 로드)
