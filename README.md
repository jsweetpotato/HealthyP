# 🦉파이널 프로젝트 4조 [씨부엉새]

<br/>

# 🦉목차

1. [HealthyP 기획 소개](#healthyp)
2. [팀 소개](#팀-소개)
3. [HealthyP 프로젝트 소개](#프로젝트-소개)
4. [기술 스택](#기술-스택)

<br/>

## 🦉HealthyP

Health + Recipe

건강한 그리고 맛있는 한끼 식사.

<br/>

### [목표 & 타겟층]
- 목표 : 맛과 영양이 균형 잡힌 레시피를 제공
- 타겟층 : 맛있으면서도 영양가 있는 음식을 즐기고자 하는 사람들, 건강한 식단은 맛이 없다는 편견을 깨고자 하는 사람들

### [주요 기능]
- 레시피 생성 : 나만의 맛있고 건강한 레시피를 생성
- 검색 : 레시피 이름 또는 재료로 다양한 레시피를 필터링
- 북마크 : 따라해보고 싶은 레시피를 북마크에 저장
- 인기 레시피 : 가장 많은 북마크를 받은 인기 레시피를 확인

### [유저 플로우]
![recipe-serve-ver2 drawio (1)](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/746ad720-499c-436b-b4fa-60ff7df662f1)

### [로그인 차별화 시스템]
![스크린샷 2024-04-08 201936](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/db684a2b-4bef-4978-8227-2d58689a1ae6)

### [컴포넌트 구분]
![스크린샷 2024-04-08 202638](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/ad07818d-e4c8-4dee-9a6a-92859bc75911)


<br/>

## 🦉팀 소개

| 강진성 | 김지수 | 박예진 | 이은원 |
| :-: | :-: | :-: | :-: |
|최대한 리액터랑 친해지기|의미있는 코드 작성|최대한 이해하고 넘어가기|타입스크립트 능숙해지기|
|[Github](https://github.com/asdfqaz74)|[Github](https://github.com/jsweetpotato)|[Github](https://github.com/lumpyspaceyz)|[Github](https://github.com/dldnlee)|
|[Velog](https://velog.io/@k_ddaddi/posts)||[Velog](https://velog.io/@lumpyspaceyz/posts)||

<br/>

### [팀 운영방침]
- 질문하기 : 모르는 부분은 망설이지 말고 질문
- 참여하기 : 팀원 모두가 한 번씩 의견 내기
- 발언하기 : 두괄식으로 명료하고 간결하게

### [프로젝트 일정]
|일|월|화|수|목|금|토|
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|18|19 <br/> [1주차] 기획회의 시작|20 <br/> [1주차] 프로젝트 기획|21 <br/> [1주차] 스캐폴딩 기획|22 <br/> [1주차] 데이터베이스 설계|23 <br/> [1주차] 기획희의|24 <br/> [1주차] 기획희의|
|25 <br/> [1주차] 기획회의 끝| 26 <br/> [2주차] 컴포넌트 구현|27 <br/> [2주차] 마크업 및 기능 구현|28 <br/> [2주차]|29 <br/> [2주차]|1 <br/> [2주차]|2 <br/> [2주차]|
3 <br/> [2주차]|4 <br/> [2주차]|5 <br/> [2주차]|6 <br/> [2주차]|7 <br/> [3주차] 기능 구현|8 <br/> [3주차] 코드 확인|9 <br/> [3주차] 배포 테스트|
10 <br/> [3주차]|11 <br/> [3주차]|12 <br/> [3주차]|13 <br/> [4주차] 버그 수정|14 <br/> [4주차] 디자인 최종 확인|15 <br/> [4주차] 발표

### [트러블슈팅]
- AWS로 서버를 만든 포켓베이스가 이미지를 올렸더니 작동을 하지 않는 현상
- - base64로 암호화 된 이미지를 string으로 그대로 올렸음.
  - 5mb 이상의 이미지들의 암호화된 string 형식은 length가 만 개가 거뜬히 넘음.
  - 포켓베이스 통신 자체에 과부하를 주게 됨.

- TypeScript 적응 문제
- - TypeScript를 써본 적이 없기에 처음 적응하는데 시간이 걸림.
  - 특히나, 포켓베이스의 타입은 제네릭을 쓰기 때문에 헷갈렸음.
  - 하지만 시간이 지나자 TypeScript 가 쓰는 형식이 정해져있다는 것을 알게되었음.
 
- Jotai 라이브러리
- - 수업시간에는 Justand 위주의 수업이었기에 맨땅에 헤딩하는 수준이었음.
  - 특강을 들은 이후 복습을 계속함.
  - 계속 반복해서 써본 결과, atomFamily 까지는 아니어도 atom 을 이용한 전역상태관리가 굉장히 쉽다는 것을 깨달음.

### [개인 목표 달성 현황]
- 강진성
- - 리액트랑 어느 정도 친해지는 것이 목표였는데 충분히 달성한 것 같다. 프로젝트를 진행하면서 얻어가는게 많다.
  - 조장을 맡은 적이 없기에 진행 능력에서 보자면 떨어지는 것이 제 스스로 느꼈다. 그래도, 이번 경험을 통해 어느정도 파악할 수 있었다.
  - 조원들 덕분에 굉장히 재밌는 프로젝트를 진행하게 되었다.
 
- 박예진
- - 고생해준 팀원들에게 감사하다.
  - 할 수 있는 부분들은 최대한 노력했다는 이유로 개인 목표는 달성했다고 생각한다.
 
- 김지수
- - 어느정도 만족하는 수준이다.
  - 부트캠프가 끝난 이후 리팩토링 하면서 더 공부할 예정이다.

- 이은원
- - 타입스크립트 사용법을 익히는게 개인 목표였는데, 그 목표는 달성했다고 생각한다.

  
<br/>

## 🦉프로젝트 소개
프로젝트 소개로 크게 메인, 인기레시피, 검색, 레시피 상세, 레시피 등록, 마이페이지, 회원가입/로그인 등이 있습니다.

### [메인페이지]
- 대분류 카테고리 버튼
- 인기 레시피 (조회수 순으로 sorting)

![main](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/f739f55f-95fa-44bd-9a5b-5436bba708cf)

### [인기레시피]
- 조회수가 가장 많은 레시피 10개
- 사용자가 저장한 북마크 목록
- 인피니티 스크롤 적용

![bookmark](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/dd9fb196-6e23-4e02-bd02-3cf84c56ea68)

### [검색]
- 제목, 키워드에서 검색
- 많이 검색된 키워드
- 최근 검색

![search](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/5864ab96-b5a9-4823-a7b3-7347b5e63bed)

### [레시피 등록]

![create](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/c763577d-d50b-4cbd-a19b-cdbb520e0d81)


### [레시피 상세]
- 생성할 때 입력한 정보
- 요리 단계 카드
- 리뷰
- OpenAI 로 만든 영양정보 데이터

![detail3](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/cc273f8d-1966-4b40-b66e-c1c9410dc5ff)

### [마이페이지]
- 최근 본 레시피
- 내가 만든 레시피
- 나의 리뷰
- 알림
- 프로필 수정
- 로그아웃

![mypage](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/710b810f-697a-4e2e-af96-c4760f4be329)

### [회원가입/로그인]
- 로그인이 안 된 유저는 일부 기능 사용 제한
- 로그인 및 회원가입으로 유도
- - 레시피 영양 정보 열람 불가능
  - 레시피 등록, 북마크, 마이페이지 열람 불가능

![login](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/c11c13b0-d74f-4fd9-a123-d829f1a259f4)
![signup](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/a3a94833-4dae-4ec7-a3ec-1b46bde6cb09)
![login2](https://github.com/FRONTENDSCHOOL8/HealthyP/assets/74591618/a10785f6-cba9-489e-bb1f-720fae108be2)


<br/>

## 🦉기술 스택
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Pocketbase](https://img.shields.io/badge/Pocketbase-0052CC?style=for-the-badge&logo=pocketbase&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tanstack](https://img.shields.io/badge/Tanstack-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Jotai](https://img.shields.io/badge/Jotai-764ABC?style=for-the-badge&logo=jotai&logoColor=white)

![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper.js-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
