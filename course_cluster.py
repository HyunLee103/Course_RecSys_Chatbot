import pandas as pd
import numpy as np
import os
from gensim import models
from util import mk_cluster_feature, tokenizing
from sklearn.cluster import KMeans 


# load data
table = pd.read_csv('data/심교.csv',header=None)
unique_course = list(set(table.iloc[:,1].tolist()))
len(unique_course)

# load FastText pretrained model
ko_model = models.fasttext.load_facebook_model('path/cc.ko.300.bin.gz')


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
res_df.to_csv('cluster_coures.csv')