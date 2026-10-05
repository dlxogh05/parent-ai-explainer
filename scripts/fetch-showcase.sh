#!/usr/bin/env bash
# Opus 5.5 사례 이미지를 assets/showcase/ 에 내려받는다.
# 출처: github.com/yihui-dev/awesome-opus5-5-videos (각 원문 링크는 주석 참고)
set -euo pipefail
cd "$(dirname "$0")/../assets/showcase"

# https://x.com/aayush4soni/status/2104181266459644283
curl -fsSL -o aayush4soni-644283.webp "https://media.skillry.dev/opus-5-5/aayush4soni-644283/original.0f89f331fa.webp"
# https://x.com/AJtheMongol/status/2104214187522318512
curl -fsSL -o ajthemongol-318512.webp "https://media.skillry.dev/opus-5-5/ajthemongol-318512/original.41ef64da2e.webp"
# https://x.com/alexalbert__/status/2102466523164274839
curl -fsSL -o alexalbert-274839.webp "https://media.skillry.dev/opus-5-5/alexalbert-274839/original.2d6735673d.webp"
# https://x.com/BrainWavePub/status/2104180455813812667
curl -fsSL -o brainwavepub-812667.webp "https://media.skillry.dev/opus-5-5/brainwavepub-812667/original.9fafc75e51.webp"
# https://x.com/daniel_haida/status/2104139720829636937
curl -fsSL -o daniel-haida-636937.webp "https://media.skillry.dev/opus-5-5/daniel-haida-636937/original.965223fcbc.webp"
# https://x.com/Michaelzsguo/status/2102592355165782312
curl -fsSL -o michaelzsguo-782312.webp "https://media.skillry.dev/opus-5-5/michaelzsguo-782312/original.75c5c3fe7e.webp"
# https://x.com/myonisto/status/2103082459503923578
curl -fsSL -o myonisto-923578.webp "https://media.skillry.dev/opus-5-5/myonisto-923578/original.40f2d71663.webp"
# https://x.com/stokebuilder/status/2103896101120356793
curl -fsSL -o stokebuilder-356793.webp "https://media.skillry.dev/opus-5-5/stokebuilder-356793/original.0166546530.webp"
# https://x.com/techartist_/status/2103933640392786274
curl -fsSL -o techartist-786274.webp "https://media.skillry.dev/opus-5-5/techartist-786274/original.701c9b781e.webp"
# https://x.com/Viggle_PINOC/status/2102861939072434495
curl -fsSL -o viggle-pinoc-434495.webp "https://media.skillry.dev/opus-5-5/viggle-pinoc-434495/original.31021e045e.webp"
echo "done: $(ls *.webp | wc -l) images"
