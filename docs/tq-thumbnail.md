# tq-thumbnail

썸네일 컴포넌트. 152×114 고정 사이즈, padding 8px.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-thumbnail.js"></script>

<tq-thumbnail
  title="캠프닉 숙소 추천"
  description="가볍게 당일 캠핑&바베큐 어때요?"
></tq-thumbnail>
```

## 속성 (Attributes)

| 속성 | 타입 | 설명 |
|------|------|------|
| `title` | string | 상단 라벨 (Caption 2/Bold, 흰색) |
| `description` | string | 하단 문구 (Label 1/Normal-Bold, 흰색) |
| `image` | string | 배경 이미지 URL (선택) |

## 스펙

| 항목 | 값 |
|------|-----|
| 사이즈 | 152 × 114px |
| padding | 8px |
| 배경 | `#2e2f33` (atomic-cool-gray-22) |
| border-radius | 8px |

## 예시

```html
<!-- 기본 (배경 없음) -->
<tq-thumbnail
  title="캠프닉 숙소 추천"
  description="가볍게 당일 캠핑&바베큐 어때요?"
></tq-thumbnail>

<!-- 배경 이미지 포함 -->
<tq-thumbnail
  title="캠프닉 숙소 추천"
  description="가볍게 당일 캠핑&바베큐 어때요?"
  image="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
></tq-thumbnail>
```

## 의존성

- `tokens.js` (필수)
