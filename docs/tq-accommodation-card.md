# tq-accommodation-card

숙소 카드 컴포넌트. 이미지(상단) + 태그/제목/가격(하단) 세로 레이아웃입니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-accommodation-card.js"></script>

<tq-accommodation-card
  image="https://example.com/room.jpg"
  caption="오버레이 캡션"
  tags="쿠폰, 이벤트, 퇴실연장"
  title="숙소명"
  price="10,000"
  discount="10"
  original-price="100,000원~"
></tq-accommodation-card>
```

## 속성 (Attributes)

| 속성 | 타입 | 설명 |
|------|------|------|
| `image` | string | 이미지 URL (또는 `src`) |
| `caption` | string | 이미지 위 오버레이 캡션 (또는 `overlay-caption`) |
| `tags` | string | 쉼표 구분 태그 (`"쿠폰, 이벤트"`) |
| `title` | string | 숙소명 |
| `price` | string | 가격 |
| `discount` | string | 할인율 (%) |
| `original-price` | string | 정가 |

## 예시

```html
<tq-accommodation-card
  image="https://t3.ftcdn.net/jpg/03/72/76/00/360_F_372760048_FWz5wOmOVNSFH5d2trg3GkLeuOQFyrq3.jpg"
  caption="오버레이 캡션"
  tags="쿠폰, 이벤트, 퇴실연장"
  title="숙소명"
  price="10,000"
  discount="10"
  original-price="100,000원~"
></tq-accommodation-card>
```

## 의존성

- `tokens.js` (필수)
