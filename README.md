# 교양 뭐 듣지?

챗봇 기반 강의 추천 시스템

## Backend
1. 에브리타임, 종합강의정보에서 강의 정보(시간/별점/강의평 등) 크롤링
2. 전처리 
3. 알고리즘 모델링  
    - Filter: 1교시, 이러닝 등 필터링 가능한 변수
    - Score: 정량 지표인 강의평을 키워드 분석하여, 별점 등과 사용자 응답에 따른 가중합 score 사용
    - 한 강의에 대한 모든 강의평을 하나의 문서로 보고 **TF-IDF 기준 중요도 상위 200개 단어로 TF-IDF matrix** 생성, 이때 **토큰을 한 번에 두 개까지 묶어서 모델링**(ngram = 2)
    - **긍/부정 토큰(키워드) 지정**

<긍정**>**
추천, 최고, 집중, 지식, 개꿀, 도움, 쉬움, 교수 열정, 교양 다운, 제대로, 편이, 피드백

<부정**>**
별로, 부담, 다만, 대충, 빡세, 어려움, 전혀, 걱정

- **긍/부정 토큰 기준으로 각 강의마다 TF-IDF score 값 평균**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee96aba4-24bb-4a52-bc36-6ca0f3bf62ab/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee96aba4-24bb-4a52-bc36-6ca0f3bf62ab/Untitled.png)

- **전체 중 긍정이 차지하는 비율로 강의평 score 계산**

$score = pos/(pos + neg)$

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b925cd11-7fce-4ac1-b548-2b696fa270a4/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b925cd11-7fce-4ac1-b548-2b696fa270a4/Untitled.png)
## Frontend

(WIP)

