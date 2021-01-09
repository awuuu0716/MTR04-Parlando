## MTR04-Parlando
![](https://i.imgur.com/jqlYdUm.png)

### 目錄
- [起源](#起源)
- [簡介](#簡介)
- [Demo](#Demo)
- [使用技術](#使用技術)
- [操作介面](#操作介面)
- [專案安裝流程](#專案安裝流程)
- [聲明](#聲明)

### 起源
此專案為 [程式導師實驗計畫第四期](https://github.com/Lidemy/mentor-program-4th) 的 Final project 藉由實作過程練習課程所學。

團隊成員包含
前端：[awuuu0716](https://github.com/awuuu0716)、[vick12052002](https://github.com/vick12052002)

後端：[huiming](https://github.com/hero19931012) 
[後端專案連結](https://github.com/hero19931012/mtr04-express-parlando.git)

### 簡介
Parlando 為一間假想的音響品牌官網，使用 React.js 建立前端頁面，配搭 Node.js 後端 api 的前後端分離網站，使用者身份為訪客、會員、管理員，功能如下：

* 會員註冊 / 登入 

* 購物車 ( 綠界金流 )

* 編輯個人資訊

* 瀏覽商品

* 管理商品 (新增、上下架、商品文案)

* 管理訂單 

### Demo

[前台](https://www.parlando.tw/)

[後台](https://www.parlando.tw/#/backStage/adminLogin)

#### 測試帳號

前台也可以自行註冊個帳號試試～
```
  前台
    帳號：Leo
    密碼：Leo
  
  後台
    帳號：lidemymtr
    密碼：mtr04fp

```

結帳部分請使用測試用信用卡帳戶：

卡號：4311-9522-2222-2222

安全碼：222

有效年月:請設定大於測試時間。假如您的測試時間在2013年11月26號，該筆交易的信用卡有效年月請設定2013年11月以後，因為系統會判斷有效年月是否已過期，已過期則會回應刷卡失敗。

手機號碼請填真實手機號碼，以便接收綠界簡訊認證碼。

### 使用技術

* Create React App - 快速建立專案項目環境
  
* React Router - 路由管理

* Redux Toolkit - 元件狀態管理

* styled-components - 使用 CSS-IN-JS 處理版面配置、動態更改 CSS

* react-bootstrap － 首頁輪播

* quill - 新增、編輯商品文案編輯器，提供簡易網頁排版功能及上傳圖片

* Grid － 瀏覽商品頁採用 grid 排版

* Git － 版本控制、基本上以各個 Feature 或是修正某問題為分支單位，完成功能後在 GitHub 上發起 PR，小組成員互相 code review 後 merge 至 master 分支以便部署

* Responsive web design (RWD) - 網頁排版自適應大部分瀏覽器

* gh-pages - 快速部署前端應用程式 

* LocalStorage - 儲存身份認證的 JWT、購物車資訊

* fetch - 與後端 API 資料交換

### 前端介面

#### 前台 - 首頁
![首頁](https://imgur.com/bunFgaN.png)
![首頁](https://i.imgur.com/0aGoFHU.png)

#### 前台 - 商品列表 / 資訊 
![商品列表](https://i.imgur.com/BIHJnK2.gif)
![dew](https://i.imgur.com/Pym5DOH.gif)

#### 前台 - 登入 / 註冊
![登入](https://imgur.com/fnu2s8S.png)
![註冊](https://i.imgur.com/AeP5vlK.png)

#### 前台 - 會員資訊 / 編輯會員資料
![會員資料](https://i.imgur.com/fx0lD82.png)
![編輯會員資料](https://i.imgur.com/nkTWDDn.png)

#### 前台 - 查詢訂單 
![查詢訂單](https://i.imgur.com/3mC5c51.png)

#### 前台 - 關於我們
![關於我們](https://i.imgur.com/MqveSzz.png)

#### 前台 - 購物車 
![訂單成立](https://i.imgur.com/dleJJ12.png)

#### 後台 - 入口 ( 登入 )
![後台登入](https://i.imgur.com/bLzAdGr.png)
![後台登入](https://i.imgur.com/eL3tCci.png)

#### 後台 - 商品管理 
![所有商品](https://i.imgur.com/TiNEVOf.png)
![所有商品型號](https://i.imgur.com/kaoB0JX.png)
![新增商品型號](https://i.imgur.com/9eGz5kb.png)
#### 後台 - 新增商品
![新增商品](https://i.imgur.com/Tgs5mnm.png)
![新增商品圖片](https://i.imgur.com/fiXAd2O.png)
![新增商品圖片](https://i.imgur.com/E2gfuXJ.png)


#### 後台 - 訂單管理
![查詢訂單](https://i.imgur.com/705VPLD.png)
![訂單資訊](https://i.imgur.com/mljG0ST.png)

### Installing - 專案安裝流程

1. clone this repository
``` 
git clone https://github.com/awuuu0716/MTR04-Parlando.git
```

2. 安裝套件
```
npm install
```

3. 在本地端開啟此專案
```
yarn start
```

### 資料引用來源
[unsplash](https://unsplash.com/)

## 聲明
本網站僅作為個人練習，註冊時請勿使用真實資料。另本網站包含之圖片與內容僅作練習使用，不作任何商業用途。
