from textblob import TextBlob


def get_sentiment_score(description):
    # Create a TextBlob object for the description
    blob = TextBlob(description)

    # Get the polarity score between -1 and 1
    polarity = blob.sentiment.polarity

    # Map the polarity score to the desired range [1, 5]
    if polarity < -0.6:
        return 1  # Very negative
    elif polarity < 0:
        return 2  # Negative
    elif polarity == 0:
        return 3  # Neutral
    elif polarity <= 0.6:
        return 4  # Positive
    else:
        return 5  # Very positive
