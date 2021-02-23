# 교양 뭐 듣지?

챗봇 기반 강의 추천 시스템

## AI
1. 에브리타임, 종합강의정보에서 강의 정보(시간/별점/강의평 등) 크롤링
2. 전처리  
3. 알고리즘 모델링  
    - Filter: 1교시, 이러닝 등 필터링 가능한 변수.
    - Score: 정량 지표인 강의평을 키워드 분석하여, 별점 등과 사용자 응답에 따른 가중합 score 사용.
    - 구체적인 알고리즘 디자인은 [개발일지](https://www.notion.so/a54bbfa19664418893fea5c443883382) 참고.


## Backend
1. Flask WSGI Web server 구성
2. gunicorn worker 기반 다중 처리 
3. Docker Base Image - python:3.7-slim
4. Google Cloud sdk - Cloud build (도커 빌드), Cloud Run (배포)

## Frontend

(WIP)

## Usage  

    !git clone https://github.com/HyunLee103/Course_RecSys_Chatbot.git  
- 강의정보 csv 형태로 저장 후 'data/' 저장
- pretrained fasttext_model.bin [다운로드](https://fasttext.cc/docs/en/crawl-vectors.html) 후 'ckpt/' 저장
            
    
        !python main.py --course_pth ./data --pretrain_pth ./ckpt 

