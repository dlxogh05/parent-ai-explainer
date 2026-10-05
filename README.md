# AI에게 일을 맡기는 법

AI를 무료 채팅으로만 써 본 사람에게 **지금 AI로 무엇을 할 수 있고, 왜 유료와 컴퓨터를 다루는 AI(Claude Code · Codex)까지 써야 하는지** 보여 주는 HTML 발표.

## 바로 보기

```bash
python -m http.server 8765
# http://127.0.0.1:8765/
```

조작: `←` `→` / Space · `F` 전체화면 (전체화면에서 마우스를 멈추면 조작 막대가 숨는다)

## 사례 이미지 받기

Opus 5.5 사례 슬라이드(3~6번)의 이미지는 저작자 게시물에서 오기 때문에 저장소에 넣지 않았다. 한 번만 실행하면 `assets/showcase/`에 받아진다.

```powershell
# Windows
powershell -ExecutionPolicy Bypass -File scripts\fetch-showcase.ps1
```

```bash
# macOS · Linux
./scripts/fetch-showcase.sh
```

이미지가 없어도 각 칸은 설명 문구로 표시되어 발표는 된다.

## 5초 모션

`assets/motion/same-job-5s.mp4` — 영수증 23장을 무료·유료에 맡겼을 때. 14번 슬라이드와 같은 장면이고, 따로 공유할 때 쓴다.

## 구성

```
index.html          슬라이드 21장
css/deck.css
js/deck.js          넘기기 · 5초 모션 · 이미지 대체
assets/showcase/    사례 이미지 (스크립트로 받음)
assets/motion/      5초 모션 MP4
scripts/            사례 이미지 받는 스크립트
발표원고.md
PRODUCT.md · DESIGN.md
```

## 자료 기준

2026-10-05. 가격·한도·점수는 바뀔 수 있다. 출처는 마지막 슬라이드.
