# tq-bottom-sheet

바텀시트 컴포넌트. 화면 하단에서 올라오는 모달 패널입니다.

## 사용법

```html
<script src="./tokens.js"></script>
<script src="./tq-bottom-sheet.js"></script>

<tq-bottom-sheet>
  <button slot="trigger">바텀시트 열기</button>
  <div slot="content">내용</div>
</tq-bottom-sheet>
```

## 속성 (Attributes)

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `open` | boolean | - | 열림 상태 (속성 존재 시 열림) |
| `resize` | string | `"hug"` | `hug`(내용 높이), `fill`(95%), `fixed`(고정) |
| `fixed-height` | string | - | `resize="fixed"`일 때 높이 (`50%`, `300px` 등) |
| `show-close` | boolean | - | 닫기 버튼 표시 (속성 존재 시) |
| `heading` | string | - | 상단 네비게이션 타이틀 |
| `dismissable` | string | `"true"` | `"false"` 시 백드롭 클릭으로 닫기 비활성화 |

## 슬롯 (Slots)

| 슬롯명 | 설명 |
|--------|------|
| `trigger` | 바텀시트를 여는 트리거 요소 (버튼 등) |
| `content` | 바텀시트 본문 내용 |

## 이벤트

| 이벤트명 | 설명 |
|----------|------|
| `sheetopen` | 바텀시트 열릴 때 |
| `sheetclose` | 바텀시트 닫힐 때 |

## 예시

```html
<!-- 기본 (hug) -->
<tq-bottom-sheet>
  <button slot="trigger">열기</button>
  <div slot="content">내용</div>
</tq-bottom-sheet>

<!-- fill + 닫기 버튼 -->
<tq-bottom-sheet resize="fill" show-close>
  <button slot="trigger">열기</button>
  <div slot="content">95% 높이</div>
</tq-bottom-sheet>

<!-- 고정 높이 50% -->
<tq-bottom-sheet resize="fixed" fixed-height="50%" show-close>
  <button slot="trigger">열기</button>
  <div slot="content">고정 50%</div>
</tq-bottom-sheet>

<!-- 프로그래밍 방식 제어 -->
<tq-bottom-sheet id="sheet">
  <div slot="content">내용</div>
</tq-bottom-sheet>
<script>
  document.getElementById('sheet').open = true;  // 열기
  document.getElementById('sheet').open = false; // 닫기
</script>
```

## 의존성

- `tokens.js` (선택, 없으면 기본 색상 사용)
