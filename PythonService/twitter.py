from snscrape.modules import twitter as snstwitter
import pandas as pd
import json
    
def getTweetsByFilters(data):
    print(data)
    query = ""
    if data.get('user'):
        query += '(from:' + data.get('user') + ') '
    if data.get('keywords'):
        query += data.get('keywords') + ' '
    if data.get('likesMin'):
        query += 'min_faves:' + data.get('likesMin') + ' '
    else:
        query += "min_faves: 100"
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
            temp = json.loads(tweet.json())
            print(temp)
            jsonTweet = {
                "date": temp["date"],
                "user": temp["user"]["username"],
                "content": temp["renderedContent"],
                "url": temp["url"]
            }
            tweets.append(jsonTweet)
    
    return json.dumps(tweets)