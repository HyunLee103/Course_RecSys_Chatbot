from Course_RecSys_Chatbot.util import text_modeling
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


def preprecess(args):
    """
    raw data를 입력받아 최종 main 함수 들어가기전까지 데이터프레임 return

    course_pth: 강의정보 csv 있는 폴더
    pretrain_pth: fasttext pretrained model_kor

    return: input df for main
    """

    course_pth = args.course_pth
    pretrain_pth = args.pretrain_pth


    # load data
    table = course_clustering(os.path.join(course_pth,'심교.csv'),pretrain_pth)
    eval = pd.read_csv(os.path.join(course_pth,'강의평.csv'),header=None)

    eval.rename(columns={0:'name',1:'prof',2:'hw',3:'team',4:'grade'},inplace=True)
    table.rename(columns={'0':'code','2':'credit','3':'prof','4':'time','5':'online','6':'rate'},inplace=True)

    # filter variables preprocess
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


    # 강의평 텍스트 모델링 -> text_score
    total_final = text_modeling(total)


    # change teampl mapping
    total_final.loc[(total_final.teampl==0),'no_team'] = 1
    total_final.loc[(total_final.teampl==1),'no_team'] = 0


    # fill text_score NA with mean
    total_final = total_final[['code','name','credit','prof','time','rate','cluster','1교시','Elearn','no_team','grade_bi','text_score']]
    total_final.fillna(total_final['text_score'].mean(),inplace=True)


    # normalize score
    total_final.loc[(total_final.grade_bi==0),'grade'] = 0.55
    total_final.loc[(total_final.grade_bi==1),'grade'] = 0.85
    total_final['norm_rate'] = (total_final.rate -total_final.rate.min())/(total_final.rate.max()- total_final.rate.min()) - 0.1
    

    # time parsing: time to day/start/end
    day_dict = {'월':'MON',"화":"TUE","수":"WED","목":"THU","금":"FRI","토":"SAT","일":"SUN"}
    total_final.drop([171,172,173,174,169,168,167,166,185,184,241,242],inplace=True)

    day = []
    start = []
    end = []

    tem = total_final[total_final.Elearn==0]
    tem.reset_index(drop=True,inplace=True)

    for i in range(192):
        try:
            k = tem.loc[i].time
            day.append(day_dict[k[0]])
            start.append(list(map(int,k[1:6].split('-')))[0])
            end.append(list(map(int,k[1:6].split('-')))[1])
            
        except:
            print(i)
            pass

    total_final.loc[(total_final.Elearn==0),'day'] = day
    total_final.loc[(total_final.Elearn==0),'start'] = start
    total_final.loc[(total_final.Elearn==0),'end'] = end

    total_final.fillna(0,inplace=True)
    total_final.drop(columns=['time'],inplace=True)

    total_final.reset_index(drop=True,inplace=True)
    
    return total_final




