# 시장에 가면 
> 2025 문화 디지털혁신 및 데이터 활용 공모전 출품작  
> *AI 추천, 도장깨기, 챗봇, 영상 콘텐츠, 시장 커뮤니티로 즐기는 전통시장 탐방 플랫폼*
<br/>

## 🔍 프로젝트 개요
<img width="584" height="830" alt="image" src="https://github.com/user-attachments/assets/58f237bd-5b88-4e1a-a4c7-74176b74f1c9" />

[서비스 소개 영상] https://www.youtube.com/watch?v=9myBathNdwk

**‘시장에 가면’** 은 AI 설문 기반 시장 추천, 도장깨기 인증, 챗봇 정보 질의, 지역 영상 콘텐츠 등  
다양한 기능을 통해 전통시장을 쉽고 재미있게 탐방할 수 있는 참여형 플랫폼입니다.  

사용자 성향 기반 맞춤 추천부터 커뮤니티 후기 공유까지, 디지털 친화 세대부터 외국인 관광객, 디지털 취약계층 모두가 편리하게 이용할 수 있도록 설계되었습니다.  
<br/>

## 🛠 주요 기능

| 기능 | 설명 |
|------|------|
| 🎯 AI 시장 추천 | 지역, 동행 여부, 시간, 분위기 등 질문 기반 추천 + RAG 기반 보완 |
| 🗺️ 지도 기반 탐색 | 네이버 지도 API 연동, 주변 시장 실시간 탐색 & 영상/챗봇 연동 |
| 🎬 AI 영상 콘텐츠 | Veo3 기반 시장 소개 영상 생성, 유튜브 채널과 연동 |
| 🧭 도장깨기 & 도감 | GPS 방문 인증 → 시장 도장 수집 & 사용자 랭킹 시스템 |
| 💬 RAG 챗봇 | “○○시장 주차 가능?” → AI가 실시간 답변 |
| 📝 시장 이야기 | 후기, 상점 정보, 꿀팁 등 커뮤니티 글 공유 및 피드백 |

<br/>

## 📈 기대 효과

- **접근성 강화**: 맞춤형 추천 + 직관적 UI로 전통시장 접근성 향상  
- **균형 탐방 유도**: 소규모 시장도 감성 추천 포함 → 시장 간 편중 완화  
- **디지털 포용성**: 영상, 챗봇, 지도 중심 UI로 디지털 취약계층 배려  
- **정책 연계성**: 지자체 예산·축제 데이터와 연계 가능한 구조 설계  
<br/>

## 🧩 활용 데이터

| 출처 | 활용 목적 |
|------|------------|
| [전국전통시장표준데이터](https://www.data.go.kr/data/15012894/standard.do) | 시장 위치, 주소, 품목 → 지도 및 추천 기능 |
| [전통시장현황(소진공)](https://www.data.go.kr/data/15052837/fileData.do) | 편의시설 정보 → 추천 조건 및 챗봇 답변 활용 |
| [전통시장 역세권](https://www.bigdata-culture.kr/bigdata/user/data_market/detail.do?id=147f15b5-08ee-4fcb-b252-faffd78318c5) | 상권 분석, 추천 필터링 |
| [지역시장과 이야기](https://www.bigdata-culture.kr/bigdata/user/data_market/detail.do?id=c204b420-f201-11ec-a6e8-cdf27550dc0d) | 스토리 기반 추천 & RAG 챗봇 응답 품질 강화 |

<br/>

## 🤖 기술 스택 및 AI 구조

- **Frontend**: React + TypeScript + Tailwind
- **AI 추천**: 조건 기반 점수화 + GPT-4o + VectorDB (ChromaDB)  
- **챗봇**: RAG 기반 질의응답 시스템  
- **영상 생성**: Google Veo3 기반 30초 요약 영상  
- **지도 UI**: Naver Maps API  
- **유튜브 채널 연동**: [`market-gogo`](https://www.youtube.com/@market-gogo)

<br/>

## 🧪 사용자 피드백

| 항목 | 결과 |
|------|------|
| AI 추천 기능 유용성 | ✅ 86% 긍정 응답 |
| 도장깨기 흥미도 | ✅ 75% 긍정 응답 |
| 챗봇 정보 기능 | ✅ 86% 유용 |
| 서비스 이용 의향 | ✅ 98% 사용하겠음 |
| 전통시장 방문 증가 예상 | ✅ 66% 증가 예상 |

<br/>

## 📸 서비스 화면

- AI 추천 흐름

- 홈 

- 챗봇 & 커뮤니티  

- 도감 및 도장 인증  

- 유튜브 AI 영상  

<br/>

## 🔗 서비스 링크

- **웹사이트**: [https://market-gogo.com](https://market-gogo.com)  
  (테스트 계정: `admin` / `admin1234!`)  
- **YouTube 채널**: [@market-gogo](https://www.youtube.com/@market-gogo)

