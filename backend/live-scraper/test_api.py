from pymongo import MongoClient
import re
import requests
from datetime import datetime, timezone

# Connect to MongoDB
# Specify the authentication details
client = MongoClient(
    'mongodb+srv://mario:Fr33t3st@cluster.bdqihjb.mongodb.net/?retryWrites=true&w=majority')
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
    date = datetime.fromisoformat(
            tweet[2]).replace(tzinfo=timezone.utc)
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
                'text': cleaned_text,
                'url': url,
                'timestamp': date,
                'class':data['class'],
                'time_added':datetime.now(),
                'upvotes': 0
            }

            # Insert the document into the MongoDB collection
            collection.insert_one(document)
            print("Disaster Tweet and URL inserted into MongoDB.")
        else:
            collection = db['non-relateds']
            # Create a document to insert into MongoDB
            document = {
                'text': cleaned_text,
                'url': url,
                'timestamp': date,
                'time_added':datetime.now(),
                'upvotes': 0
            }

            # Insert the document into the MongoDB collection
            collection.insert_one(document)
            print("Non-disaster Tweet and URL inserted into MongoDB.")
    else:
        print("Error occurred while making the request.")
        print(f"Status code: {response.status_code}")
        print(f"Error message: {response.text}")
predict(('Nepal Rastra Bank report recommends providing more resources to real sectors', 'https://twitter.com/SerbesSary/status/1673230499886813184', '2023-06-26T07:23:32.000Z'))