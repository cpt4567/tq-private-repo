# outer-wall 레이아웃

외벽 레이아웃 데모 페이지(`outer-wall.html`)에서 사용하는 패턴과 스타일 가이드입니다.

## rec-section (추천 섹션)

### rec-section__header--interactive

클릭·호버 인터랙션이 있는 섹션 헤더 패턴입니다.

| 항목 | 값 |
|------|-----|
| 패딩 | `12px 20px` (x축 20px 포함) |
| border-radius | `12px` |
| 호버 배경 | `#f4f4f5` |
| active 배경 | `#ebebec` |
| transition | `background-color 0.2s ease` |

#### 사용 예시

```html
<div
  class="rec-section__header rec-section__header--col rec-section__header--interactive"
  role="button"
  tabindex="0"
  data-href="/target-url"
  aria-label="섹션 전체보기"
>
  <h2 class="rec-section__title--md">섹션 제목</h2>
  <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
    <p class="rec-section__subtitle">부제목</p>
    <svg class="rec-section__header-arrow" width="12" height="24" ...>...</svg>
  </div>
</div>
```

#### 클릭 동작

- `data-href`에 유효한 URL이 있으면 클릭 시 해당 URL로 이동
- `data-href="#"` 또는 없으면 클릭 시 아무 동작 없음 (커스텀 핸들러 연결 가능)
- Enter/Space 키로 키보드 접근성 지원
