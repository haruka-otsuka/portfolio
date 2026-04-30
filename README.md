# portfolio
![ポートフォリオサイトのモックアップ画像](https://haruka-otsuka.com/assets/img/works/work-01/overview.webp)  
私のポートフォリオサイトです。  
これまでの制作実績やスキル、プロフィールをまとめています。  

**URL：[https://haruka-otsuka.com/](https://haruka-otsuka.com/)**


## 使用技術
- HTML
- CSS3（SCSS）
- JavaScript
- JSON
- GitHub
- Vercel


## 開発について
HTML、CSS、JavaScriptのみのシンプルな構成ですが、運用のことを考え、拡張性や保守性を意識して構築しました。  
形にすることを優先して構築を行ってきましたが、取り入れたい動きや機能のアイデアがまだまだあります。  
将来的にはReactやvue.jsへの移行もしてみたいと考えているので、継続的に学びつつ技術的な挑戦を楽しんでいきたいです。


### 開発概要
- ソースコードをGitHubで管理し、Vercelと連携して自動デプロイ
- 実績データはJSONで管理し、テンプレート化したHTMLへJavaScriptで描画
- JavaScriptによる共通パーツ（ヘッダーやフッター等）の読み込み
- マウスストーカーの実装
- profileページにパララックス表現を実装
- 各要素のアニメーションやインタラクション設定
- レスポンシブ対応（PCファースト設計）
- OGP / favicon設定


## ディレクトリ構成
```
/
├─assets
│  ├─css
│  │  ├─style.css
│  │  ├─style.css.map
│  │  └─style.scss
│  ├─data
│  │  ├─work-01.json
│  │  ├─work-02.json
│  │  ├─work-03.json
│  │  ├─work-04.json
│  │  ├─work-05.json
│  │  ├─work-06.json
│  │  ├─work-07.json
│  │  └─works.json
│  ├─img
│  │  ├─profile/
│  │  └─works/
│  │     ├─work-01/
│  │     ├─work-02/
│  │     ├─work-03/
│  │     ├─work-04/
│  │     ├─work-05/
│  │     ├─work-06/
│  │     └─work-07/
│  └─js
│     ├─main.js
│     ├─include.js
│     ├─script.js
│     └─works.js
├─components
│  ├─footer.html
│  ├─header.html
│  └─page-header.html
├─index.html
├─profile.html
├─work.html
└─works.html
```


## Author
**Haruka Otsuka**  
mail：pisces20gemini23@gmail.com  
GitHub：https://github.com/haruka-otsuka  
