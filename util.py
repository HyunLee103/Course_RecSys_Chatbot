from collections import Counter
from konlpy.tag import Okt
import pandas as pd
import numpy as np
from gensim import models
from sklearn.cluster import KMeans 
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import defaultdict
import copy

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


def course_clustering(course_pth, embed_pretrained_pth):
    """
    course_pth: 기존의 강의 정보 csv
    embed_pretrained_pth: fasttext pretrained model_kor

    return: cluster labeled csv
    """

    # load data
    table = pd.read_csv(os.path.join(course_pth,'심교.csv'),header=None)
    unique_course = list(set(table.iloc[:,1].tolist()))
    len(unique_course)

    # load FastText pretrained model
    ko_model = models.fasttext.load_facebook_model(embed_pretrained_pth)


    # tokenizing
    token = tokenizing(unique_course)
    token[4] = ['기술','소통']
    token[130] = ['문화']
    token

    # Vectorizing
    add_feature = mk_cluster_feature(token)

    course_vec = []
    for sen in token:
        w_vec = 0
        for w in sen:
            w_vec += ko_model.wv.word_vec(w)
        
        course_vec.append(w_vec/len(sen))

    vec = np.concatenate((np.array(course_vec), np.array(add_feature).reshape(-1,1)),axis=1)


    # Clustering
    kmeans = KMeans(n_clusters=6,random_state=2020) 
    kmeans.fit(vec)
    cluster = kmeans.predict(vec)


    # Merge, export
    cluster_df = pd.DataFrame(unique_course)
    cluster_df['cluster'] = cluster
    cluster_df.loc[(cluster_df.cluster==0),'cluster'] = 2

    cluster_df.rename(columns={0:'name'},inplace=True)
    table.rename(columns={1:'name'},inplace=True)

    res_df = pd.merge(table,cluster_df)

    return res_df



def text_modeling(total):
    """
    강의평 토크나이징 후 TF-IDF 상위 200 단어 기준으로
    긍/부정 단어 TF-IDF score 비율로 text_score 결정

    total: input df
    return: text_score가 추가된 df
    """
    eval_text = total.iloc[:,15:-2]
    ex_index = eval_text.iloc[:,0].dropna().index
    ex_text = eval_text.iloc[ex_index,:]
    ex_text.fillna(0,inplace=True)

    res = []
    for i in range(95):
        tem = ''
        for sen in ex_text.iloc[i,:]:
            if sen != 0:
                tem += sen+' '
        res.append(tem)

    token = tokenizing(res)

    new_token = []
    for sen in token:
        new_sen = copy.deepcopy(sen)
        for w in sen:
            if len(w)==1 and w != '꿀':
                new_sen.remove(w)
        new_token.append(new_sen)

    res = []
    for sen in new_token:
        tem_str = ''
        tem_str = ' '.join(sen)
        res.append(tem_str)

    vectorizer = TfidfVectorizer(max_features=200,ngram_range=(1,2))
    sp_matrix = vectorizer.fit_transform(res)

    word2id = defaultdict(lambda : 0)
    for idx, feature in enumerate(vectorizer.get_feature_names()):
        word2id[feature] = idx

    for i, sent in enumerate(res):
        print('====== document[%d] ======' % i)
        print( [ (token, sp_matrix[i, word2id[token]]) for token in sent.split() ] )


    data_array = sp_matrix.toarray()
    data = pd.DataFrame(data_array, columns=vectorizer.get_feature_names())

    # 긍/부정 키워드
    data['pos'] = data[['추천', '최고', '집중', '지식', '개꿀', '도움', '쉬움', '교수 열정', '교양 다운', '제대로', '편이', '피드백','다운 교양','열정']].sum(axis=1).tolist()
    data['neg'] = data[['별로', '부담', '다만', '대충', '빡세', '어려움', '전혀']].sum(axis=1).tolist()

    data['text_score'] = (data['pos'])/(data['neg']+data['pos'])

    eval_final = data[['pos','neg','text_score']]
    eval_final['index'] = ex_index
    eval_final.set_index('index',inplace=True)

    total_final = pd.merge(total.iloc[:,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,212,213]],eval_final,left_index=True,right_index=True,how='left')


    # 강의별점 결측값 평균으로 채움
    tem = []
    for i in total_final['rate']:
        if i != 0.00:
            tem.append(i)
        else:
            tem.append(3.9)

    total_final['rate'] = tem
    total_final.fillna(total_final['text_score'].mean(),inplace=True)

    return total_final