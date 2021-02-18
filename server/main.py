from flask import Flask, jsonify, request
import os
import json
import algorithm

app = Flask(__name__)


# health check
@app.route('/health', methods=['GET'])
def health_check():
	return jsonify({"status": "healthy"})


@app.route('/', methods=['POST'])
def index():
	data = json.loads(request.get_data(), encoding='utf-8')
	credit = data['credit']
	quality = data['quality']
	no_team = data['no_team']
	e_learn = data['e_learn']
	no_morning = data['no_morning']
	section = data['section']
	date_list = data['date_lst']
	start_list = data['start_lst']
	end_list = data['end_lst']
	combinations = algorithm.recommend(credit, quality, no_team, e_learn, no_morning, section, date_list, start_list, end_list)
	result = {"result": combinations}
	return jsonify(result)


if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
