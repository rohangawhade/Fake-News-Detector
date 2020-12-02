# Fake-News-Detector

Fake news Detector is an end-to-end project which aims to detect fake news provided by the user. The project has the following features:
1) Deep Learning model: prepared from scratch that makes use of NLP to process the article as input from the user and returns the output as fake or real.
2) Web scraping: Takes the article from the user and searches it over the web. Using the BERT model, it compares the user articles from those found over the web and compares the content. If the content found matches, it results as real otherwise as fake.
3) Police Dashboard: Police can create a verified account and post real news or rate whether the news is real or not. A list of real and fake news verified by police is displayed.
4) Twitter Tracking: The news stored by police can be tracked searched over Twitter to find the source of the news.
5) Text-image relevance: Image can be added along with the article to find whether the image is relevant to the article. Image related news will be suggested along with the result.
#### Tech stack: Python, HTML, CSS, JS, MySQL

# Installation

**1. Clone the Repo by going to your local Git Client and pushing in the command:**</br>

    git clone https://github.com/rohangawhade/Fake-News-Detector.git

**2. Open terminal and change the directory to /flask** <br>

    cd flask/

**3. Install the packages** <br>

    pip install -r requirements.txt

**4. To run the program** <br>

    python app.py

# Screenshots

## Homepage
![Homepage](https://github.com/rohangawhade/Fake-News-Detector/blob/master/screenshots/homepage.jpg)

## Fake News Detector using Deep Learning Model
![Fake News Detector using Deep Learning Model](https://github.com/rohangawhade/Fake-News-Detector/blob/master/screenshots/fake_news_detector_using_model.jpg)

## Image Text Relevance
![Image Text Relevance](https://github.com/rohangawhade/Fake-News-Detector/blob/master/screenshots/image_text_relevance.jpg)

## Source Tracking
![Source Tracking](https://github.com/rohangawhade/Fake-News-Detector/blob/master/screenshots/source_tracking.jpg)

## Twitter Source Tracking
![Twitter Source Tracking](https://github.com/rohangawhade/Fake-News-Detector/blob/master/screenshots/twitter_source_tracking.jpg)
