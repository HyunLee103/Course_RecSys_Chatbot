import pandas as pd
import numpy as np
from preprocess import preprocess
import argparse


def main(df,credit, quality, no_team, elearn, no_morning, section,date_lst,start_lst,end_lst):
    """
    df: total_final_2.csv
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


parser = argparse.ArgumentParser(description="Course_RecSys",
                                 formatter_class=argparse.ArgumentDefaultsHelpFormatter)
        
parser.add_argument("--course_pth", default="./data/", type=str, dest="course_pth")
parser.add_argument("--pretrain_pth", default="./ckpt/fasttext_model.bin", type=str, dest="pretrain_pth")

args = parser.parse_args()


if __name__ == '__main__':
    
    total_final = preprocess(args)
    out = main(total_final,20,0,True,False,True,[1,3],["MON","WED","TUE","THU"],[1,4,1,4],[3,10,3,10])




"""
return 형식

res_dict = {
	"id": 0,
	"timetables": [
		{
			"code": 1234,
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
