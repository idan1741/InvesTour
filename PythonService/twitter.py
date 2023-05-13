from snscrape.modules import twitter as snstwitter
import pandas as pd
    
def getTweetsByFilters(data):
    query = ""
    if data.get('user'):
        query += '(from:' + data.get('user') + ') '
    if data.get('keywords'):
        query += data.get('keywords') + ' '
    if data.get('likesMin'):
        query += 'min_faves:' + data.get('likesMin') + ' '
    if data.get('endDate'):
        query += 'until:' + data.get('endDate') + ' '
    if data.get('startDate'):
        query += 'since:' + data.get('startDate') + ''
    
    tweets = []
    limit = 50

    for tweet in snstwitter.TwitterSearchScraper(query).get_items():
        if len(tweets) == limit:
            break
        else:
            tweets.append([tweet.date, tweet.user.username, tweet.rawContent])
    
    return tweets