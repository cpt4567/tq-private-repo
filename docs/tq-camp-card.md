# tq-camp-card

캠핑장 카드 컴포넌트. 이미지, 그라데이션 오버레이, 캠핑장명, 가격, 할인율, 태그를 표시합니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-camp-card.js"></script>

<tq-camp-card
  image="https://example.com/camp.jpg"
  name="땡큐캠핑장"
  price="10,000"
  discount="10"
  original-price="100,000원~"
  tag="등록된 검색태그"
></tq-camp-card>
```

## 속성 (Attributes)

| 속성 | 타입 | 설명 |
|------|------|------|
| `image` | string | 이미지 URL (또는 `src`) |
| `name` | string | 캠핑장명 |
| `price` | string | 가격 |
| `discount` | string | 할인율 (%) |
| `original-price` | string | 정가 |
| `tag` | string | 검색 태그 |

## 예시

```html
<tq-camp-card
  image="https://vrthumb.clipartkorea.co.kr/2021/10/01/tc00440000271.jpg"
  name="땡큐캠핑장"
  price="10,000"
  discount="10"
  original-price="100,000원~"
  tag="등록된 검색태그"
></tq-camp-card>
```

## 의존성

- `tokens.js` (필수)
