from numpy.core.numeric import NaN
import pandas as pd
import numpy as np
import os
from gensim import models
from pandas._libs.missing import NA
from util import mk_cluster_feature, tokenizing, course_clustering
from sklearn.cluster import KMeans 
import copy
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud


from sklearn.feature_extraction.text import TfidfVectorizer
from collections import defaultdict


def preprecess():
    # load data
    table = course_clustering('data/심교.csv','fasttext_embed','')
    # table = pd.read_csv('data/cluster_coures.csv')
    eval = pd.read_csv('data/강의평.csv',header=None)

    eval.rename(columns={0:'name',1:'prof',2:'hw',3:'team',4:'grade'},inplace=True)
    table.rename(columns={'0':'code','2':'credit','3':'prof','4':'time','5':'online','6':'rate'},inplace=True)

    # preprocess
    tem = []
    for i in table.time:
        if i[1:3] == '01':
            tem.append(1)
        else:
            tem.append(0)

    table['1교시'] = tem

    tem = []
    for i in table.online:
        if 'e' in i:
            tem.append(1)
        else:
            tem.append(0)
    table['Elearn'] = tem

    total = pd.merge(table,eval,on=['name','prof'],how='left')
    total.drop(columns='Unnamed: 0',inplace=True)

    tem = []
    for i in total.team:
        print(i)
        if i == '없음':
            tem.append(0)
        else:
            tem.append(1)

    total['teampl'] = tem

    tem = []
    for i in total.grade:
        if i == '학점느님':
            tem.append(1)
        else:
            tem.append(0)

    total['grade_bi'] = tem


    # 강의평 모델링
    eval_text = total.iloc[:,15:-2]
    eval_text
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
    new_token[0]

    res = []
    for sen in new_token:
        tem_str = ''
        tem_str = ' '.join(sen)
        res.append(tem_str)



corpus = res
vectorizer = TfidfVectorizer(max_features=200,ngram_range=(1,2))
sp_matrix = vectorizer.fit_transform(res)

word2id = defaultdict(lambda : 0)
for idx, feature in enumerate(vectorizer.get_feature_names()):
    word2id[feature] = idx

for i, sent in enumerate(corpus):
    print('====== document[%d] ======' % i)
    print( [ (token, sp_matrix[i, word2id[token]]) for token in sent.split() ] )

sp_matrix[0]

vectorizer.get_feature_names()

data_array = sp_matrix.toarray()
data = pd.DataFrame(data_array, columns=vectorizer.get_feature_names())
data.shape
data

data['pos'] = data[['추천', '최고', '집중', '지식', '개꿀', '도움', '쉬움', '교수 열정', '교양 다운', '제대로', '편이', '피드백','다운 교양','열정']].sum(axis=1).tolist()
data['neg'] = data[['별로', '부담', '다만', '대충', '빡세', '어려움', '전혀']].sum(axis=1).tolist()

sns.boxplot((data['pos'])/(data['neg']+data['pos']))
data['text_score'] = (data['pos'])/(data['neg']+data['pos'])

eval_final = data[['pos','neg','text_score']]
eval_final['index'] = ex_index
eval_final.set_index('index',inplace=True)
eval_final

total_final = pd.merge(total.iloc[:,[1,2,3,4,5,6,7,8,9,10,11,12,13,213,214]],eval_final,left_index=True,right_index=True,how='left')
total_final.isnull().sum()


total_final = total_final[['code','name','credit','prof','rate','cluster','1교시','Elearn','teampl','grade_bi','text_score']]

total_final.to_csv('total_final_2.csv')

tem = []
for i in total_final['rate']:
    if i != 0.00:
        tem.append(i)
    else:
        tem.append(3.9)

total_final['rate'] = tem

total_final.fillna(total_final['text_score'].mean(),inplace=True)

total_final = pd.read_csv('total_final.csv')
total_final.drop(columns='teampl',inplace=True)
total_final.to_csv('total_final_2.csv')
total_final[['code','name','date','start','end']]

total_final[total_final['teampl']==0]
total_final
total_final['teampl'].apply(dict)

time.iloc[:,1:6]
eval_text.iloc[:,0:5]
total_final.loc[(total_final.teampl==0),'no_team'] = 1
total_final.loc[(total_final.teampl==1),'no_team'] = 0

total_final.rename(columns={'1교시':'morning'},inplace=True)

total_final[(total_final.no_team == 1)&(total_final.Elearn == 1)&(total_final.morning == 0)]

total_final[total_final['cluster'].isin([1,2,3])]

time = pd.read_csv('total_final_raw.csv')

day_dict = {'월':'MON',"화":"TUE","수":"WED","목":"THU","금":"FRI","토":"SAT","일":"SUN"}

total_final.rename(columns={'day_1':'date','start_1':'start','end_1':'end'},inplace=True)


total_final.drop([171,172,173,174,169,168,167,166,185,184,241,242],inplace=True)

day = []
start = []
end = []

no_elearn = time[time['Elearn']==0]

for i in [241,242,168,169]:
    try:
        k = time.loc[i].time
        day.append(day_dict[k[16]])
        start.append(list(map(int,k[17:22].split('-')))[0])
        end.append(list(map(int,k[17:22].split('-')))[1])
        
    except:
        pass
total_final
total_final.loc[(total_final.Elearn==0),'day_1'] = day
total_final.loc[(total_final.Elearn==0),'start_1'] = start
total_final.loc[(total_final.Elearn==0),'end_1'] = end
total_final.drop(columns=['day_2','start_2','end_2'],inplace=True)

total_final.fillna(0,inplace=True)
total_final

time['time'][0]
list(map(int,time['time'][0][1:6].split('-')))


total_final[total_final.cluster == 3].name.tolist()
total_final[total_final.cluster == 1].name.tolist()


def main(df,credit, quality, no_team, elearn, no_morning, section,date_lst,start_lst,end_lst):
    """
    credit: int
    no_team, elearn, no_morning: bool(True, False)
    section: list [1,2,3..]
    quality: [학점따기 좋은, 배울게 많은, pass] -> 1, 2, 0
    date_lst: list ["MON", "WED",..] 전공과목 시간표 요일
    start_lst: list [1, 4, 7,...] 전공과목 시간표 시작시간
    end_lst: list [3, 6, 9,...] 전공과목 시간표 끝시간

    """
    if no_team:
        df = df[df.no_team == 1]
    
    if elearn:
        df = df[df.Elearn == 1]
    
    if no_morning:
        df = df[df.morning == 0]

    if section:
        df = df[df.cluster.isin(section)]

    if quality==1:
        df['score'] = 0.3 * df.norm_rate + 0.2 * df.text_score + 0.5 *df.grade
    if quality==2:
        df['score'] = 0.3 * df.norm_rate + 0.5 * df.text_score + 0.2 *df.grade
    else:
        df['score'] = 0.34 * df.norm_rate + 0.33 * df.text_score + 0.33 *df.grade

    if len(df) == 0:
        print("조건에 해당하는 과목이 없습니다.")

    df.reset_index(drop=True, inplace=True)

    unmatch_time = []
    for date,start,end in zip(date_lst,start_lst,end_lst):
        try:
            tem_df = df[df.date == date]
            star = tem_df['start'].tolist()
            en = tem_df['end'].tolist()
            idx = tem_df.index
            for i, s, e in zip(idx, star, en):
                if start <= s <= end or start <= e <= end:
                    unmatch_time.append(i)
        except:
            pass
    print(f"전공과 맞지 않는 교양 강의 수 {len(unmatch_time)}")
    df.drop(unmatch_time,inplace=True)


    df.sort_values(by='score',ascending=False,inplace=True)

    df = df[['code','name','date','start','end','score','credit']]


    return df

out = main(total_final,20,0,True,False,True,[1,3],["MON","WED","TUE","THU"],[1,4,1,4],[3,10,3,10])


"""
return 형식

res_dict = {
	"id": 0,
	"timetables": [
		{
			"code": 0,
			"name": "자료구조",
			"datetime": [
				{
					"date": "MON", "start": 0, "end": 0
				},
				{
					"date": "WED", "start": 0, "end": 0
				}
			]
		}
	],
    "score" : 0
}
"""


# total_final = total_final[['code','name','credit','cluster','morning','Elearn','text_score','no_team','grade','norm_rate']]


# tem = main(total_final,18,[1,2],False,True,False,[2,3,5])
# total_final[['norm_rate','grade','text_score']].describe()

# len(tem)
    
# total_final.rate.mean()
# ((0.55*194 + 0.85*49) / 243)



# total_final.loc[(total_final.grade_bi==0),'grade'] = 0.55
# total_final.loc[(total_final.grade_bi==1),'grade'] = 0.85


# total_final['norm_rate'] = (total_final.rate -total_final.rate.min())/(total_final.rate.max()- total_final.rate.min()) - 0.1
# total_final

# total_final.describe()
    


    
    



# # Word Cloud
# wordcloud = WordCloud(font_path='font/NanumGothic.ttf', background_color='white').generate(res[0])
# plt.figure(figsize=(25,20),dpi=500) #이미지 사이즈 지정
# plt.imshow(wordcloud, interpolation='lanczos') #이미지의 부드럽기 정도
# plt.axis('off') #x y 축 숫자 제거
# plt.show() 



# total_final.drop([171,172,173,174,169,168,167,166,185,184,241,242],inplace=True)
