'use strict';

const functions = require('firebase-functions');
const express = require('express');
const app = express();
const request = require('request');
const admin = require("firebase-admin");

/*************************** */
const FIREBASE_AUTH_JSON_PATH = './forest-4f8aa-firebase-adminsdk-s4fld-163f4b4c97.json';
const FIREBASE_DATABASE_URL = 'https://forest-4f8aa.firebaseio.com';

const rssLists = [
    {title: 'アルファ', url: 'http://alfalfalfa.com/index.rdf'}
];
const articleDataIDs = [
    'title', 'link', 'dc:date'
];
const COLLECTION_NAME = 'alpha';

let db;                 // Firestoreインスタンス
let collectionRef;      // コレクションインスタンス
let articlesJSON = [];  // 記事一覧(JSON形式) 

/*************************** */
// アプリの"views"参照先を設定
app.set('views', __dirname + '/views');
// テンプレートエンジンの設定  
app.set('view engine', 'ejs');

/* routing */
//### '/'パスは、認識されない
app.get('/index', (req, res) => {
    // res.send(`${Date.now()}`);
    // res.send(articlesJSON);
    res.send(JSON.stringify(articlesJSON));
});
exports.index = functions.https.onRequest(app);

/*************************** */

// 初期化
init();
// Firestoreへの書き込み 1日20000オペレーション
writeArticlesToDatabase();
// Firestoreからの更新通知を受信
onSnapshotOfDatabase();

// localhost:5000に接続後、定期的に関数が呼ばれる
setInterval(function() {
    // RSSを使用して、記事を取得する
    // writeArticlesToDatabase();
  
}, 100000);

// process.on('unhandledRejection', console.dir);

/*************************** */
// 初期化
function init() {
    // Firestoreの初期化
    initFirestore();
    
    // 編集の初期化
    collectionRef = db.collection(COLLECTION_NAME);
}


// Firestoreの初期化
function initFirestore() {
    const serviceAccount = require(FIREBASE_AUTH_JSON_PATH);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: FIREBASE_DATABASE_URL
    });
    
    db = admin.firestore();
    
    // おまじない
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
}


// 書き込み
function writeArticlesToDatabase() {
    request.get(rssLists[0], (err, res, body) => {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }

        if (!err && res.statusCode == 200) {
            // XML形式をJSON形式に変換
            const json = xml2json(body);
            // 記事情報の抽出
            const articles = getArticles(json);
            if(articles != undefined ){
                // 書き込み
                writeDatabase(articles);
            }
        }
    });
}

// JSON形式に変換
function xml2json(body) {
    return JSON.parse(require('xml2json').toJson(body));
}

// 取得
function getArticles(json) {
    const RSS_ROOT_ID = 'rdf:RDF';
    const RSS_ARTICLE_ID = 'item';
   
    // const len = json[RSS_ROOT_ID][RSS_ARTICLE_ID].length;
    const len = 3;
    const rssItems = json[RSS_ROOT_ID][RSS_ARTICLE_ID];

    let articles = [];

    for (let i = 0; i < len; ++i) {
        let article = {};

        // 記事情報の取得
        for (let key of articleDataIDs) {
            article[key] = rssItems[i][key];
        }

        // リストに追加
        articles.push(article);
    }

    return articles;
}

// 書き込み 
function writeDatabase(articles) {
    /*  
        Transactionに変更
        削除条件に該当する記事を削除
        #日付、最大件数、など
        読み取った記事は、全て書き込む
    */

    var batch = db.batch();

    for (let article of articles) {
        // プロパティ名を変更
        let data = {};
        for (let key of articleDataIDs) {
            if ( key == 'link' ) {
                data['url'] = article[key];
            } else if ( key == 'dc:date' ) {
                data['date'] = article[key];
            } else {
                data[key] = article[key];
            }
        }            

        // Doc名をURLの記事番号に使用
        const temp = data.url.match(/\d+.html/)[0];
        const docName = temp.substring(0, temp.lastIndexOf('.html'));
    
        // DBへの書き込み
        batch.set(collectionRef.doc(docName), data);
        // collectionRef.doc(docName).set(data).then(()=>{
    }

    batch.commit();
}

// データ更新通知
function onSnapshotOfDatabase() {
    var query = db.collection(COLLECTION_NAME);
    
    let unsubscribe = query.onSnapshot(querySnapshot => {
        // 更新結果を変数に保存

        querySnapshot.forEach(element => {
            // console.log(element.data());            
            articlesJSON.push(element.data());
        });

        console.dir(articlesJSON);
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}
