import pandas as pd
import numpy as np

dataframe = None


def recommend(credit, quality, no_team, elearn, no_morning, section, date_lst, start_lst, end_lst):
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
	global dataframe
	if dataframe is None:
		dataframe = pd.read_csv('total_final_2.csv')

	df = dataframe

	if no_team:
		df = df[df.no_team == 1]

	if elearn:
		df = df[df.Elearn == 1]

	if no_morning:
		df = df[df.morning == 0]

	if section:
		df = df[df.cluster.isin(section)]

	if quality == 1:
		df['score'] = 0.3 * df.norm_rate + 0.2 * df.text_score + 0.5 * df.grade

	if quality == 2:
		df['score'] = 0.3 * df.norm_rate + 0.5 * df.text_score + 0.2 * df.grade

	else:
		df['score'] = 0.34 * df.norm_rate + 0.33 * df.text_score + 0.33 * df.grade

	if len(df) == 0:
		print("조건에 해당하는 과목이 없습니다.")

	df.reset_index(drop=True, inplace=True)

	unmatch_time = []

	for date, start, end in zip(date_lst, start_lst, end_lst):
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
	df.drop(unmatch_time, inplace=True)

	df.sort_values(by='score', ascending=False, inplace=True)

	classes = df[['code', 'name', 'date', 'start', 'end', 'score', 'credit']]
	class_arr = np.array(classes)
	dp(credit, 0, class_arr)
	sorted_list = sorted(dp_list, key=lambda x: x['average_score'], reverse=True)
	sorted_list = sorted(sorted_list, key=lambda x: x['residual_credit'])
	sorted_list = sorted_list[:min(len(sorted_list) - 1, 3)]
	return sorted_list


dp_list = []
memo = []


def dp(credit, index, class_arr):
	global memo, dp_list
	cls_credit = 0
	cls = None
	try:
		cls = class_arr[index]
		cls_credit = cls[6]
	except IndexError:
		pass
	if cls is None or credit < cls_credit:
		m = memo.copy()
		if len(m) > 0:
			e_score = sum([x['score'] for x in m]) / len(m)
			comb = {'id': len(dp_list), 'combination': m, 'average_score': e_score, 'residual_credit': credit}
			dp_list.append(comb)
		return None
	if val_class(cls, memo) and credit >= cls[6]:
		memo += [class2data(cls)]
		dp(credit - cls[6], index + 1, class_arr)
		memo.pop()
		dp(credit, index + 1, class_arr)


def combination(credit, classes):
	all_credit = credit
	comb_list = []
	class_arr = np.array(classes)
	for cls in class_arr:
		cls_credit = cls[6]
		cls_data = class2data(cls)
		if len(class_arr) == 0:
			if all_credit >= cls_credit:
				comb_list.append(cls_data)
				all_credit -= cls_credit
			continue
		if val_class(cls, comb_list):
			comb_list.append(cls_data)
			all_credit -= cls_credit

		if all_credit <= 0:
			return comb_list

	return comb_list


def class2data(cls):
	code = cls[0]
	title = cls[1]
	date = cls[2]
	start = cls[3]
	end = cls[4]
	datetime = {"date": date, "start": start, "end": end}
	score = cls[5]
	cls_credit = cls[6]
	cls_data = {"id": code, "title": title, "datetime": datetime, "score": score, "class_credit": cls_credit}
	return cls_data


def val_class(cls, comb_list):
	if len(comb_list) == 0:
		return True
	title = cls[1]
	date = cls[2]
	start = cls[3]
	end = cls[4]

	for post_cls in comb_list:
		if title == post_cls['title']:
			return False
		post_date = post_cls['datetime']['date']
		post_start = post_cls['datetime']['start']
		post_end = post_cls['datetime']['end']
		if date == post_date:
			if start <= post_start < end:
				return False
			if start < post_end <= end:
				return False
	return True


# l = recommend(6, 0, 1, 0, 1, [1, 3], ["MON","WED","TUE","THU"], [1,4,1,4], [3,10,3,10])
# for i in l:
# 	print(i)