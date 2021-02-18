from flask import Flask
import os
import algorithm

app = Flask(__name__)


# health check
@app.route('/health', methods=['GET'])
def health_check():
	return {"status": "healthy"}


@app.route('/', methods=['POST'])
def index():
	df = None
	quality = None
	no_team = None
	elearn = None
	no_morning = None
	section = None
	result = algorithm.recommend(df, None, quality, no_team, elearn, no_morning, section)
	return result


if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
