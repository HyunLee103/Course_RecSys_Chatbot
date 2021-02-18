from collections import Counter
from konlpy.tag import Okt

def mk_cluster_feature(token):
    """
    강의명 토큰을 5가지 클러스터로 나눠 1차원 추가 feature 생성
    param: token
    return: 1차원 list
    """
    def modefinder(numbers):
        c = Counter(numbers) 
        mode = c.most_common(1) 
        return mode[0][0]

    clss = []
    for c in token:
        c_cls = []
        for w in c:
            if w in ['법', '법률', '생활법률','경제','투자','증권', '정치학','선거','경제학','정치','행정','소비','트랜드','정부','재무','회계','교육','대중','국제무역','공유경제','플랫폼','아시아','리걸']:
                c_cls.append(1)
            elif w in ['문화', '철학', '영화', '미디어', '음악', '사회', '패션', '미술', '예술','다문화','디자인','세계','시민','사랑','신화','게임','매스','영상','환경','독립영화']:
                c_cls.append(2)
            elif w in ['영양', '건강', '식생활', '다이어트', '요가', '명상','생활','리빙','운동','레저','스포츠','여행','수영','승마','볼링','리빙']:
                c_cls.append(3)
            elif w in ['작가', '일본어', '한국사', '역사', '문명', '고대', '윤리', '문학', '언어', '한문', '영어','회화','고전','중국어','프랑스어','한국','인간','논리','사고','인물','미국사','서양','인문학','북한','동양','한국어','전쟁사','독일','러시아']:
                c_cls.append(4)
            elif w in [ '통계', '기업', '경영', '프로젝트', '발명', '특허', '기술', '설계', '역량', '직업','디지털','산업혁명','산업','창업','과학','실무','의과학','서비스','스타트업','기술사','실무','전략','공학','컴퓨터','빅데이터','공기업']:
                c_cls.append(5)
            else:
                pass
        if c_cls == []:
            c_cls.append(0)
        k = modefinder(c_cls)

        clss.append(k)
    return clss
    
def tokenizing(data):
    stopwords = ['의','가','이','은','들','을','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다','에서','되','그','수','나','것','하','있','보','주','아니','등','같','때','년','가','한','지','오','말','일','다','이다']

    okt=Okt()  
    def tknz(sentence):
        s = okt.pos(sentence,norm=True,stem=True)
        x = []
        for w in s:
            if w[1]=='Noun':
                x.append(w[0])
            else: 
                continue
        return x

    tokens = []
    for s in data:
        x = tknz(str(s))
        tem = [word for word in x if not word in stopwords] 
        tokens.append(tem)

    return tokens