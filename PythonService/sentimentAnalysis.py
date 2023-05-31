from textblob import TextBlob


def get_sentiment_score(description):
    # Create a TextBlob object for the description
    blob = TextBlob(description)

    # Get the polarity score between -1 and 1
    polarity = blob.sentiment.polarity

    sentiment_score = int((polarity + 1) * 50)

    return sentiment_score
