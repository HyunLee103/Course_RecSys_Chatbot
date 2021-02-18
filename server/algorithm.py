def recommend(df, credit, quality, no_team, elearn, no_morning, section):
	"""
	credit: int
	no_team, elearn, no_morning: bool(True, False)
	section: list [1,2,3..]
	quality: [학점따기 좋은, 배울게 많은] -> [1,2] [2,1] [1,0] [0,1] [0,0]
	"""
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

	df.sort_values(by='score', ascending=False, inplace=True)

	return df