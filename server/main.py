from flask import Flask, make_response
import os

app = Flask(__name__)


app.route('/')
def health_check():
	return make_response(200)


if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
