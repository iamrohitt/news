from datetime import datetime, timezone
import snscrape.modules.twitter as sntwitter
import pandas as pd
import re
import time
import requests
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient(
    'mongodb+srv://mario:Fr33t3st@mern.uocqkrr.mongodb.net/?retryWrites=true&w=majority')
db = client['disaster']

# Function to clean tweet text


def clean_tweet_text(text):
    # Remove line breaks
    text = text.replace('\n', ' ').replace('\r', '')
    # Remove lines starting with '— by' followed by a name
    text = re.sub(r'— by \w+.*', '', text, flags=re.MULTILINE)
    text = re.sub(r'— by @\w+.*', '', text, flags=re.MULTILINE)
    text = re.sub(r'— by  @\w+.*', '', text, flags=re.MULTILINE)
    # Remove specific words
    text = re.sub(r'\b(OPINION: |EDITORIAL: |UPDATE: |PHOTOS: )\b',
                  '', text, flags=re.IGNORECASE)
    # Remove links using regex
    text = re.sub(r'http\S+|www\S+|pic.twitter.com\S+', '', text)
    return text


def predict(tweet):
    text = tweet[0]
    url = tweet[1]
    date = tweet[2]
    print(text, url, date)
    cleaned_text = clean_tweet_text(text)

    response = requests.post(
        'http://127.0.0.1:5000/api/classify/', json={'news': cleaned_text})

    if response.status_code == 200:
        data = response.json()
        label = data['is_disaster_related']
        print(f"The predicted label is: {label}")
        if label == 1:
            collection = db['relateds']
            # Create a document to insert into MongoDB
            document = {
                'text': text,
                'url': url,
                'timestamp': date
            }

            # Insert the document into the MongoDB collection
            collection.insert_one(document)
            print("Disaster Tweet and URL inserted into MongoDB.")
        else:
            collection = db['non-related']
            # Create a document to insert into MongoDB
            document = {
                'text': text,
                'url': url,
                'timestamp': date
            }

            # Insert the document into the MongoDB collection
            collection.insert_one(document)
            print("Non-disaster Tweet and URL inserted into MongoDB.")
    else:
        print("Error occurred while making the request.")
        print(f"Status code: {response.status_code}")
        print(f"Error message: {response.text}")


while True:
    with open('datetime_file.txt', "r") as file:
        last_datetime_str = file.read().strip()

    print(last_datetime_str)
    tweets = []
    limit = 100

    # Construct the search query with the formatted datetime and the Twitter handle
    query = f'from:Serbes since:{last_datetime_str}'

    # Scrape tweets from the account
    for tweet in sntwitter.TwitterSearchScraper(query).get_items():
        print(tweet.date)
        datetime_object = datetime.fromisoformat(
            last_datetime_str).replace(tzinfo=timezone.utc)
        if tweet.date > datetime_object:
            if len(tweets) >= limit:
                break
            elif not tweet.content:
                continue
            else:
                # Append the current tweet to the list
                tweets.append([tweet.content, tweet.url, tweet.date])
        else:
            continue

    # Convert the list of tweets to a Pandas DataFrame and print it
    if not tweets:
        print("No tweets found.")
    else:
        df = pd.DataFrame(tweets, columns=['Tweet', 'URL', 'Date'])
        print(df)

    if not tweets:
        with open('datetime_file.txt', "w") as file:
            file.write(last_datetime_str)
    else:
        last_datetime = tweets[0][2]
        for tweet in tweets:
            predict(tweet)

        last_datetime_str = last_datetime.strftime("%Y-%m-%dT%H:%M:%S")
        current_datetime = datetime.now()
        current_datetime_str = current_datetime.strftime("%Y-%m-%dT%H:%M:%S")
        with open('datetime_file.txt', "w") as file:
            file.write(last_datetime_str)
        tweet.clear()
    time.sleep(30)
