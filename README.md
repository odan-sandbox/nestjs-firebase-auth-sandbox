# nestjs-firebase-auth-sandbox
NestJS で Firebase Auth を使うお試し

## 試し方
- サーバを立ち上げる
- http://localhost:3000 にアクセス
- 適当にアカウントを作る
- ログインする
- IdToken をコピペする
- curl -H "Authorization: Bearer $TOKEN" localhost:3000/api/private
