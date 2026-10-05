# AI에게 일을 맡기는 법

AI를 무료 채팅으로만 써 본 사람에게 **지금 AI로 무엇을 할 수 있고, 왜 유료와 컴퓨터를 다루는 AI(Claude Code · Codex)까지 써야 하는지** 보여 주는 HTML 발표.

## 바로 보기

`index.html` 하나만 브라우저로 열면 된다. CSS·JS가 파일 안에 들어 있어 다른 폴더가 필요 없다.

조작: `←` `→` / Space · `F` 전체화면 (전체화면에서 마우스를 멈추면 조작 막대가 숨는다)

## 사례 이미지

Opus 5.5 사례 슬라이드(3~6번)의 이미지는 인터넷에 연결돼 있으면 원본에서 바로 불러온다.
인터넷 없이 발표할 때는 미리 한 번 받아 두면 `assets/showcase/`의 사본을 쓴다.

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
index.html          슬라이드 21장 (CSS · JS 포함, 이 파일 하나로 동작)
assets/showcase/    사례 이미지 (스크립트로 받음)
assets/motion/      5초 모션 MP4
scripts/            사례 이미지 받는 스크립트
발표원고.md
PRODUCT.md · DESIGN.md
```

## 자료 기준

2026-10-05. 가격·한도·점수는 바뀔 수 있다. 출처는 마지막 슬라이드.
