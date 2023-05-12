from flask import Flask, request
import twitter
app = Flask(__name__)

@app.route('/tweets', methods=['POST'])
def get_tweets():
    data = request.get_json(force=True)
    return twitter.getTweetsByFilters(data)