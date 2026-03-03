# TQ Shadow Components

땡큐캠핑 디자인시스템 기반 **Web Components**(Custom Elements + Shadow DOM) 라이브러리입니다.  
프레임워크 없이 `<script>`, `<link>` 태그만으로 사용할 수 있습니다.

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Shadow DOM](https://img.shields.io/badge/Shadow_DOM-8DD6F9?style=for-the-badge&logo=web-components&logoColor=black)
![Web Components](https://img.shields.io/badge/Web_Components-2AA2F5?style=for-the-badge&logo=web-components&logoColor=white)

## Description

이 프로젝트는 React, Vue 등 프레임워크에 의존하지 않고, **바닐라 JavaScript**와 **Shadow DOM**으로 구현된 UI 컴포넌트 모음입니다. 디자인 토큰(`tokens.js`)을 기반으로 스타일을 적용하며, Swiper·Tippy.js 등 외부 라이브러리는 CDN으로 동적 로드합니다.

- **프레임워크 독립**: 어떤 환경에서든 `<script>` 태그로 로드 후 사용
- **Shadow DOM**: 스타일 격리로 기존 CSS와 충돌 방지
- **디자인 토큰**: 색상, 간격, 타이포그래피 등 일관된 디자인 시스템 적용
- **CDN 기반**: npm 없이 script/link 태그로 의존성 로드

## Components

| 컴포넌트           | 태그명                  | 설명                                                   | 문서                                |
| ------------------ | ----------------------- | ------------------------------------------------------ | ----------------------------------- |
| Button             | `tq-button`             | 버튼 (solid, outlined / primary, secondary, assistive) | [📄](docs/tq-button.md)             |
| Badge              | `tq-badge`              | 배지                                                   | [📄](docs/tq-badge.md)              |
| Category Group     | `tq-category-group`     | 카테고리 선택 그룹                                     | [📄](docs/tq-category-group.md)     |
| Camp Card          | `tq-camp-card`          | 캠핑장 카드                                            | [📄](docs/tq-camp-card.md)          |
| Accommodation Card | `tq-accommodation-card` | 숙소 카드                                              | [📄](docs/tq-accommodation-card.md) |
| Tab                | `tq-tab`                | 탭                                                     | [📄](docs/tq-tab.md)                |
| Banner Carousel    | `tq-banner-carousel`    | 이미지 배너 캐러셀 (Swiper)                            | [📄](docs/tq-banner-carousel.md)    |
| Tooltip            | `tq-tooltip`            | 툴팁 (Tippy.js)                                        | [📄](docs/tq-tooltip.md)            |
| Bottom Navigation  | `tq-bottom-navigation`  | 하단 네비게이션                                        | [📄](docs/tq-bottom-navigation.md)  |
| Top Navigation     | `tq-top-navigation`     | 상단 네비게이션                                        | [📄](docs/tq-top-navigation.md)     |
| Thumbnail          | `tq-thumbnail`          | 썸네일 (152×114, padding 8px)                         | [📄](docs/tq-thumbnail.md)         |
| Card Swiper        | `tq-card-swiper`       | 카드/썸네일 가로 스크롤 (Swiper)                       | [📄](docs/tq-card-swiper.md)      |
| Card Grid          | `tq-card-grid`         | 그리드 스와이퍼 (2행 + 가로 스와이프)                  | [📄](docs/tq-card-grid.md)        |

## Installation

```bash
# 리포지터리 클론
git clone <repository-url>
cd tq-shadow-components
```

## Usage

### 1. 토큰 로드 (필수)

모든 컴포넌트는 `tokens.js`를 먼저 로드해야 합니다.

```html
<script src="./tokens.js"></script>
```

### 2. 컴포넌트 스크립트 로드

사용할 컴포넌트의 스크립트를 순서대로 로드합니다.

```html
<script src="./tokens.js"></script>
<script src="./tq-button.js"></script>
<script src="./tq-badge.js"></script>
<script src="./tq-tooltip.js"></script>
<!-- ... -->
```

### 3. HTML에서 사용

```html
<tq-button variant="solid" type="primary" size="medium">버튼</tq-button>

<tq-tooltip content="툴팁 메시지" placement="top">
  <span>Hover me</span>
</tq-tooltip>

<tq-banner-carousel
  height="150px"
  images='["https://example.com/1.jpg","https://example.com/2.jpg"]'
></tq-banner-carousel>
```

## File Structure

```
.
├── README.md
├── docs/                  # 컴포넌트별 상세 문서
│   ├── tq-button.md
│   ├── tq-badge.md
│   ├── outer-wall.md      # outer-wall 레이아웃 패턴
│   ├── tq-category-group.md
│   ├── tq-camp-card.md
│   ├── tq-accommodation-card.md
│   ├── tq-tab.md
│   ├── tq-banner-carousel.md
│   ├── tq-tooltip.md
│   ├── tq-bottom-navigation.md
│   ├── tq-top-navigation.md
│   └── tq-thumbnail.md
├── tokens.js              # 디자인 토큰 (필수)
├── shadow-dom.html        # 컴포넌트 데모 페이지
├── outer-wall.html        # 외벽 레이아웃 데모
├── weekend-camping.html   # 이번 주말 가족 캠핑 화면 (검색 결과)
├── tq-button.js
├── tq-badge.js
├── tq-category-group.js
├── tq-camp-card.js
├── tq-accommodation-card.js
├── tq-tab.js
├── tq-banner-carousel.js  # Swiper CDN 동적 로드
├── tq-tooltip.js          # Tippy.js + Popper CDN 동적 로드
├── tq-bottom-navigation.js
├── tq-top-navigation.js
└── tq-thumbnail.js
```

## Dependencies

| 컴포넌트           | 의존성              | 로드 방식                            |
| ------------------ | ------------------- | ------------------------------------ |
| tq-banner-carousel | Swiper              | jsDelivr CDN (스크립트 내 동적 로드) |
| tq-tooltip         | Popper.js, Tippy.js | unpkg CDN (스크립트 내 동적 로드)    |
| 기타               | 없음                | -                                    |

## Demo

### GitHub Pages (배포)

**https://cpt4567.github.io/tq-private-repo/** 에서 라이브 데모를 확인할 수 있습니다.

배포 방법:
1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` / **Folder**: `/ (root)`
4. Save 후 몇 분 내 배포 완료

### 로컬 실행

`shadow-dom.html`을 브라우저에서 열면 모든 컴포넌트 데모를 확인할 수 있습니다.

```bash
# 로컬 서버로 실행 (CORS 이슈 방지)
npx serve .
# 또는
python -m http.server 8080
```

