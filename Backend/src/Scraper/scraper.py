from flask import Flask, render_template, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import re
import time
import ollama
import geonamescache
import spacy
from bs4 import BeautifulSoup
import html
import string
import emoji
from nltk.corpus import stopwords
import pandas as pd

app = Flask(__name__)

# Load Spacy Model
nlp = spacy.load("en_core_web_sm")
MODEL_NAME = "mistral:7b"
CATEGORIES = ["Roads", "Water", "Electricity", "Sanitation"]

def clean_text(text):
    text = text.strip()
    text = BeautifulSoup(text, "html.parser").get_text()
    text = html.unescape(text)
    text = re.sub(r'http\S+|www\.\S+', '', text)
    text = re.sub(f"[{string.punctuation}]", "", text)
    text = " ".join([word for word in text.split() if word.lower() not in stopwords.words('english')])
    text = emoji.replace_emoji(text, replace='')
    text = re.sub(r'^\d+\s|\s\d+\s|\s\d+$', ' ', text)
    text = text.lower()
    return text

def classify_and_get_urgency(text):
    prompt = f"""
    Classify the following complaint into exactly one of these categories: {", ".join(CATEGORIES)}.
    Also, assign an urgency score from 0 to 10, where 0 means not urgent and 10 means extremely urgent.
    Return the response in this format: \nCategory: <category>\nUrgency: <score>
    
    Complaint: {text}
    Response:
    """
    
    try:
        response = ollama.chat(model=MODEL_NAME, messages=[{"role": "user", "content": prompt}])
        raw_output = response["message"]["content"].strip()
        
        category_match = re.search(r'Category:\s*(\w+)', raw_output, re.IGNORECASE)
        urgency_match = re.search(r'Urgency:\s*(\d+)', raw_output)
        
        category = category_match.group(1) if category_match else "Unknown"
        urgency = int(urgency_match.group(1)) if urgency_match else -1
        
        return category, urgency
    
    except Exception as e:
        print("Error:", str(e))
        return "Unknown", -1

def detect_city_geonames(text):
    gc = geonamescache.GeonamesCache()
    cities = {city['name'].lower(): city['name'] for city in gc.get_cities().values()}
    words = text.lower().split()
    
    for word in words:
        if word in cities:
            return cities[word]
    
    return None

def detect_city_spacy(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "GPE":
            return ent.text
    return None

def fetch_tweets():
    options = webdriver.ChromeOptions()
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("start-maximized")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    complaints_data = []
    try:
        driver.get("https://twitter.com/login")
        wait = WebDriverWait(driver, 10)
        
        # Twitter login process
        username_input = wait.until(EC.presence_of_element_located((By.NAME, "text")))
        username_input.send_keys("@Ast1684598")
        username_input.send_keys(Keys.ENTER)
        time.sleep(2)

        password_input = wait.until(EC.presence_of_element_located((By.NAME, "password")))
        password_input.send_keys("AdAd@1234")
        password_input.send_keys(Keys.ENTER)
        time.sleep(5)

        keywords = ["road problem", "bad roads", "water shortage", "no electricity", "power cut", "sanitation issue"]
        
        for keyword in keywords:
            search_url = f"https://twitter.com/search?q={keyword}%20India&f=live"
            driver.get(search_url)
            wait.until(EC.presence_of_element_located((By.XPATH, "//article[@data-testid='tweet']")))

            tweets = driver.find_elements(By.XPATH, "//article[@data-testid='tweet']")
            for tweet in tweets[:100]:
                try:
                    description = tweet.find_element(By.XPATH, ".//div[@lang]").text
                    date_element = tweet.find_element(By.XPATH, ".//time")
                    date = date_element.get_attribute("datetime") if date_element else "Unknown"
                    
                    location_match = re.search(r'(\b[A-Z][a-z]+(?: [A-Z][a-z]+)*,? [A-Z]{2,}\b)', description)
                    location = location_match.group(0) if location_match else "Unknown"

                    complaints_data.append({"date": date, "location": location, "description": description})
                except Exception:
                    continue

    except Exception as e:
        print(f"Error occurred: {e}")

    finally:
        driver.quit()

    return complaints_data

@app.route('/fetch_tweets')
def get_tweets():
    tweets = fetch_tweets()
    results = []
    
    for tweet in tweets:
        text = tweet["description"]
        cleaned_text = clean_text(text)
        category, urgency = classify_and_get_urgency(cleaned_text)
        detected_location = detect_city_geonames(cleaned_text) or detect_city_spacy(cleaned_text)
        location = detected_location if detected_location else tweet["location"]
        cluster_id = hash(text) % 100  # Simple clustering based on hash value
        
        results.append({
            "text": text,
            "label": category,
            "location": location,
            "cluster_id": cluster_id,
            "urgency_score": urgency
        })
    
    df = pd.DataFrame(results)

# Save to CSV in the backend folder
csv_filename = "backend/data.csv"

if __name__ == '__main__':
    app.run(debug=True)