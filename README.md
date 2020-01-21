# nestjs-firebase-auth-sandbox
NestJS で Firebase Auth を使うお試し

## 試し方
- yarn dev
- http://localhost:3000 にアクセス
- 適当にアカウントを作る
- ログインする
- IdToken をコピペする
- `curl -H "Authorization: Bearer $TOKEN" localhost:3000/api/private`

## worklog
https://scrapbox.io/odan-worklog/2019-11-02_NestJS_で_Firebase_Auth_を使う
