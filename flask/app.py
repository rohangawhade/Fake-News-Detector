from googlesearch import search
from bs4 import BeautifulSoup
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
from flask import Flask, render_template, request, redirect, url_for
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sentence_transformers import SentenceTransformer
from selenium import webdriver

import os
import pymysql.cursors
import requests
import re
import pickle
import numpy as np
import nltk
import scipy.spatial
import networkx as nx
import tensorflow as tf

config = tf.compat.v1.ConfigProto()
config.gpu_options.per_process_gpu_memory_fraction = 0.15
session = tf.compat.v1.Session(config=config)

embedmodel = SentenceTransformer('bert-base-nli-mean-tokens')
nltk.download('stopwords')
mydb = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='news'
)

mycursor = mydb.cursor()
app = Flask(__name__)
model = load_model(
    'D:\\Github Repositories\\Fake-News-Detector\\flask\\model.h5')
data = pickle.load(
    open('D:\\Github Repositories\\Fake-News-Detector\\flask\\text.pkl',
         'rb'))

file_img = None
UPLOAD_FOLDER = 'D:\\Github Repositories\\Fake-News-Detector\\upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def send(text):
    sql = "INSERT INTO articles(article) VALUES(%s)"
    mycursor.execute(sql, text)
    mydb.commit()


def DataPreProcess(text):
    send(text)
    ps = PorterStemmer()
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = text.lower()
    text = text.split()
    text = [ps.stem(word) for word in text if word not in set(stopwords.words('english'))]
    text = ' '.join(text)
    data.append(text)
    cv = CountVectorizer(max_features=8000)
    X = cv.fit_transform(data).toarray()
    temp = np.array([X[-1]])
    return temp


def embed(sentence):
    tokens = embedmodel.encode(sentence)
    return tokens


def sentence_similarity(sent1, sent2, stopwords=None):
    emb1 = embed([' '.join(sent1)])
    emb2 = embed([' '.join(sent2)])
    distance = scipy.spatial.distance.cdist(emb1, emb2, "cosine")[0]
    return 1 - distance


def build_similarity_matrix(sentences, stop_words):
    similarity_matrix = np.zeros((len(sentences), len(sentences)))
    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if sentences[idx1] == sentences[idx2]:
                continue
            similarity_matrix[idx1][idx2] = sentence_similarity(
                                                            sentences[idx1],
                                                            sentences[idx2],
                                                            stop_words)
    return similarity_matrix


def summarizer(paragraph, top_n=1):
    stop_words = stopwords.words('english')
    summarize_text = []
    q = []
    q.append(paragraph)
    article = q[0].split(". ")
    sentences = []
    for sentence in article:
        sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
    sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)
    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
    scores = nx.pagerank(sentence_similarity_graph)
    ranked_sentence = sorted(((scores[i], s) for i, s in enumerate(sentences)), reverse=True)
    if(len(ranked_sentence) >= 1):
        length = len(ranked_sentence)
        if (length//2+1) > 3:
            length = 3
        else:
            length = length//2+1
        for i in range(length):
            summarize_text.append(" ".join(ranked_sentence[i][1]))
    return ". ".join(summarize_text)


def related_news(query):
    websites = {"Link": [], "Title": [], "Heading1": [], "Paragraph": []}
    for link in search(query, tld="co.in", num=10, stop=6, pause=3):
        try:
            print(link)
            # Skip the youtube, pdf or wikipedia links
            avoid = ["pdf", "youtube", "wikipedia"]
            if any(a in link for a in avoid):
                print("AVOIDED LINK = "+link)
                continue
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}
            source = requests.get(link, headers=headers)
            soup = BeautifulSoup(source.text, 'lxml')
            # Storing link of website
            websites["Link"].append(link)
            # Storing Title
            websites["Title"].append(soup.title.text) if soup.title else websites['Title'].append('No Title provided by source')
            # Storing header
            if soup.find('h1'):
                websites["Heading1"].append(soup.find('h1').text)
            elif soup.find('h2'):
                websites["Heading1"].append(soup.find('h2').text)
            # Storing paragraphs
            paras = ""
            for p in soup.find_all('p'):
                paras += p.text
            websites["Paragraph"].append(''.join(paras.split('.')[:15]))
        except Exception:
            print("Exception caught")
    return websites


def single_news(query):
    k = 1
    para1 = None
    for link in search(query, tld="co.in", num=10, stop=1, pause=1):
        if ("video" in link or "youtube" in link):
            k += 1
            continue
        try:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}
            source = requests.get(link, headers=headers).text
        except Exception:
            k += 1
            continue
        soup = BeautifulSoup(source, 'lxml')
        webParagraphs = []
        webParagraphsLength = []
        for paras in soup.find_all("p"):
            webParagraphs.append(paras.text)
            webParagraphsLength.append(len(paras.text))

        s = " "
        para1 = s.join(webParagraphs[0:])
    return para1


def difference(paragraph1, paragraph2):
    q1 = embed([paragraph1])
    q2 = embed([paragraph2])
    diff = scipy.spatial.distance.cdist(q1, q2, "cosine")[0]
    return 1 - diff


def passageForLink(lin):
    source = requests.get(lin).text
    soup = BeautifulSoup(source, 'lxml')
    paragraphs = []
    for paras in soup.find_all("p"):
        paragraphs.append(paras.text)
    return " ".join(paragraphs[0:(len(paragraphs)//2)])


def imageUrl(filepath):
    searchUrl = "http://www.google.hr/searchbyimage/upload"
    multipart = {'encoded_image': (filepath, open(filepath, 'rb')), 'image_content': ''}
    response = requests.post(searchUrl, files=multipart, allow_redirects=False)
    fetchUrl = response.headers['Location']
    driver = webdriver.Chrome('D:\\Github Repositories\\Fake-News-Detector\\chromedriver_win32\\chromedriver.exe')
    driver.get(fetchUrl)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    lin = []
    i = 0
    for divs in soup.find_all("div", attrs={'class': 'g'}):
        for link in divs.find_all("a"):
            try:
                if link['href'] != "#":
                    i += 1
                    lin.append(link['href'])

            except Exception:
                print("Invalid link")
        if i == 5:
            break
    return lin


def update_count(article, s1):
    mycursor = mydb.cursor()
    mycursor.execute("select * from userarticles where article Like '%" + article[0:len(article)//3]+"%'")
    data = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    if(len(data) == 0):
        if(float(s1) <= 75.00):
            mycursor = mydb.cursor()
            mycursor.execute("insert into userarticles (article, count, realorfake, verified) values('"+article+"',1,0,0)")
            mydb.commit()
            mycursor.execute("insert into articles (article,type) values('" + article + "',0)")
            mydb.commit()
            mycursor.close()
        else:
            mycursor = mydb.cursor()
            mycursor.execute("insert into userarticles (article, count, realorfake, verified) values('"+article+"',1,1,0)")
            mydb.commit()
            mycursor.execute("insert into articles (article,type) values('"+article+"',0)")
            mydb.commit()
            mycursor.close()
    else:
        mycursor = mydb.cursor()
        mycursor.execute("update userarticles set `count`="+str(data[0][2]+1)+" where id="+str(data[0][0]))
        mydb.commit()
        mycursor.execute("insert into articles (article,type) values('"+article+"',0)")
        mydb.commit()
        mycursor.close()


@app.route('/whatsappp', methods=['GET', 'POST'])
def whatsappp():
    if request.method == 'POST':
        if 'file1' not in request.files:
            return 'there is no file1 in form!'
        file1 = request.files['file1']
        user_passage = request.form["text"]
        user_passage = user_passage.replace("'", "")
        user_passage = user_passage.replace('"', "")
        path = os.path.join(app.config['UPLOAD_FOLDER'], file1.filename)
        file1.save(path)
        lin = imageUrl(path)
        indexes = []
        for i in lin:
            if("search?" in i or "imgres?" in i):
                indexes.append(i)
        for j in indexes:
            lin.remove(j)
        diff = []
        for i in range(len(lin)):
            img_url = passageForLink(lin[i])
            diff.append(difference(img_url, user_passage))
        dif = max(diff)
        print('DIFFERENCE in WHatsapp = ', dif)
        ne = related_news(user_passage)
        if dif > 0.7:
            text = 'It seems real'
        else:
            text = 'It seems fake'
        update_count(user_passage, dif*100)
    return render_template('whatsapp.html', prediction_text=text, news=ne)


@app.route('/')
def home():
    return render_template('dashboard.html')


@app.route('/icons.html')
def icons():
    return render_template('icons.html')


@app.route('/dashboard.html')
def dashboard():
    return render_template('dashboard.html')


@app.route('/index.html')
def index():
    return render_template('index.html')


@app.route('/article_user', methods=['GET', 'POST'])
def article_user():
    if request.method == 'POST':
        article = request.form["text"]
        article = article.replace("'", " ")
        article = article.replace("\"", " ")
        summary = summarizer(article)
        print("summary done")
        websites = related_news(summary)
        diff = difference(article, single_news(summary))[0]*100
        print("difference done")
        diff = round(diff, 2)
        s1 = diff
        s = str(diff)+' % match found.'
        update_count(article, s1)
        print("update done")
        return render_template('user.html', news=websites, diff=s)


@app.route('/verifiedsearch', methods=['GET', 'POST'])
def verifiedsearch():
    if request.method == 'POST':
        news = {'Heading': [], 'Para': [], 'RF': []}
        searchText = request.form['stext']
        mycursor = mydb.cursor()
        mycursor.execute("select * from articles where type=1 AND article Like '%"+searchText+"%'")
        data = mycursor.fetchall()
        mydb.commit()
        mycursor.close()
        for i in data:
            news['Heading'].append(headingFilter(i[1]))
            news['Para'].append(i[1])
            if(i[2] == 1):
                news['RF'].append("Real")
            else:
                news['RF'].append("Fake")
        return render_template('news.html', lis=news)
    return redirect(url_for('news'))


def headingFilter(para):
    sep = " "
    s = para[0:50].split(" ")
    return sep.join(s[0:len(s)-1])


def fetchVerifiedNews():
    news = {'Heading': [], 'Para': [], 'RF': []}
    mycursor = mydb.cursor()
    mycursor.execute("select * from articles where type=1 OR type=2")
    data = mycursor.fetchall()
    for i in data:
        news['Heading'].append(headingFilter(i[1]))
        news['Para'].append(i[1])
        if(i[2] == 1):
            news['RF'].append("Real")
        else:
            news['RF'].append("Fake")
    mycursor.close()
    return news


@app.route('/news.html')
def news():
    news = fetchVerifiedNews()
    return render_template('news.html', lis=news)


@app.route('/notifications.html')
def notifications():
    return render_template('notifications.html')


@app.route('/tables.html')
def tables():
    return render_template('tables.html')


@app.route('/typography.html')
def typography():
    return render_template('typography.html')


@app.route('/upgrade.html')
def upgrade():
    return render_template('upgrade.html')


@app.route('/user.html')
def user():
    return render_template('user.html')


@app.route('/index2.html')
def ind2():
    return render_template('index2.html')


@app.route('/whatsapp.html')
def whatsapp():
    return render_template('whatsapp.html')


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        text = [x for x in request.form.values()]
        text = DataPreProcess(text[0])
        output = model.predict_classes(text)
        # 1- Unreliable
        # 0- Reliable
        if output[0][0] == 1:
            prediction_text = 'This seems to be fake'
        else:
            prediction_text = 'This seems to be real'
        print(prediction_text)
        article = request.form["text"]
        websites = related_news(article)
    return render_template('index.html', prediction_text=prediction_text, news=websites)


@app.route('/index2', methods=['GET', 'POST'])
def index2():
    if request.method == "POST":
        data = request.form
        a_id = data['id']
        article = data['article']
        a_type = data['type']
        mycursor = mydb.cursor()
        mycursor.execute("INSERT INTO articles(id, article, type) VALUES (%s, %s, %s)", (int(a_id), article, int(a_type)))
        mydb.commit()
        mycursor.close()
    return render_template('index2.html')


@app.route('/show')
def show():
    mycursor = mydb.cursor()
    mycursor.execute("select * from articles where type=0")
    data = mycursor.fetchall()
    mycursor.close()
    return render_template("show.html", value=data)


@app.route('/update/<id>', methods=['GET', 'POST'])
def update(id):
    mycursor = mydb.cursor()
    mycursor.execute("select * from articles where id=%s", (int(id),))
    data = mycursor.fetchall()
    mycursor.close()

    if request.method == "POST":
        data = request.form
        a_id = data['id']
        a_type = data['type']
        mycursor = mydb.cursor()
        mycursor.execute("update articles set type=%s where id=%s", (int(a_type), int(a_id)))
        mydb.commit()
        mycursor.close()
        return render_template("index2.html")
    return render_template("update.html", value=data)


@app.route('/signin.html')
def signin():
    return render_template('signin.html')


@app.route('/signin_prc', methods=['GET', 'POST'])
def signin_prc():
    password = request.form['password']
    username = request.form['username']
    db = pymysql.connect("localhost", "root", "", "news")
    cursor = db.cursor()
    sql = "select * from `signin` where `username`='"+username+"'"
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        db.commit()
    except Exception:
        print('error with query')
        db.rollback()

    db.close()
    if(len(result) == 0):
        return redirect(url_for('signin'))
    else:
        if(result[0][2] == password):
            return redirect(url_for('show'))
        else:
            return redirect(url_for('signin'))


@app.route('/twitter')
def twitter():
    cur = mydb.cursor()
    cur.execute("SELECT * FROM userarticles")
    rv = cur.fetchall()
    links = []
    for i in range(len(rv)):
        if rv[i][2] >= 3 and rv[i][3] == 0:
            r = rv[i][1].replace(" ", "%20")
            r = r.replace("#", "%23")
            link = "https://twitter.com/search?q="+r+"&src=typd"
            links.append([rv[i][1], link, rv[i][2], "Fake"])
        elif rv[i][2] >= 3 and rv[i][3] == 1:
            r = rv[i][1].replace(" ", "%20")
            r = r.replace("#", "%23")
            link = "https://twitter.com/search?q="+r+"&src=typd"
            links.append([rv[i][1], link, rv[i][2], "Real"])
    return render_template('twitter.html', list=links)


@app.route('/twittersearch', methods=['POST'])
def twittersearch():
    link = "http://127.0.0.1:5000/"
    if request.method == 'POST':
        search = request.form.get('stext')
        r = search.replace(" ", "%20")
        r = r.replace("#", "%23")
        link = "https://twitter.com/search?q="+r+"&src=typd"
    return redirect(link, code=302)


if __name__ == '__main__':
    app.run(debug=True)
