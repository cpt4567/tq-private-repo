# tq-camp-list-card

캠핑장 리스트 카드 컴포넌트. 좌측 텍스트(순번/이름/주소/가격) + 우측 92×92 이미지. tq-camp-card 색상·사이즈 참고.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-camp-list-card.js"></script>

<tq-camp-list-card
  order="1"
  name="땡큐캠핑장"
  address="경기도 가평군"
  count="10,000"
  discount="10"
  price="100,000원~"
  image="https://example.com/camp.jpg"
></tq-camp-list-card>
```

## 속성 (Attributes)

| 속성 | 타입 | 설명 |
|------|------|------|
| `order` | string | 순번 (좌측 굵게 표시) |
| `name` | string | 캠핑장명 |
| `address` | string | 주소 |
| `count` | string | 리뷰 수 등 (연한 회색) |
| `discount` | string | 할인율 (%) |
| `price` | string | 가격 |
| `image` | string | 이미지 URL (또는 `src`). 미지정 시 플레이스홀더 표시 |

## 스펙

| 항목 | 값 |
|------|-----|
| 이미지 | 92 × 92px, 1px 보더, r[8] 라운드 |
| 플레이스홀더 배경 | #F8F0EF |
| 패딩 | 좌 16px, 우 8px |
| 라운드/애니메이션 | 없음 |
| 1라인 (이름) | Label 1/Normal - Bold |
| 2,3라인 (주소, count) | Caption 1/Medium |
| 4라인 (할인·가격) | Body 2/Normal - Bold |
| 순번 | 24px Bold |

## 의존성

- `tokens.js` (필수)
