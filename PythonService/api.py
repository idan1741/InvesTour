from flask import Flask, request
import twitter
import sentimentAnalysis

app = Flask(__name__)


@app.route('/tweets', methods=['POST'])
def get_tweets():
    data = request.get_json(force=True)
    return twitter.getTweetsByFilters(data)


@app.route('/sentimentScore', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()  # Assuming the article is sent as JSON

    if 'description' in data:
        description = data['description']

        # Call the get_sentiment_score function
        sentiment_score = sentimentAnalysis.get_sentiment_score(description)

        return {'sentiment_score': sentiment_score}
    else:
        return {'error': 'Invalid data format'}

