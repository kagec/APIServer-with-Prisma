# APIServer-with-Prisma

自身の GITHUB と REST API とデータベース連携の練習のためのリポジトリです


## 導入方法

※このサンプルは Windows subsystem for Linux 上の Ubuntu 環境で作っています

※コマンドはすべて bash 上で実行したものです

※お使いの環境に合わせて変更してください

1. リポジトリのクローンをする

		git clone https://github.com/kagec/APIServer-with-Prisma.git
		
1. 必要なパッケージをインストール

		npm install

1. データベースのインストール 

	1. Ubuntu パッケージを更新します。

			sudo apt update

	1. PostgreSQL (およびいくつかの便利なユーティリティが含まれている -contrib パッケージ) をインストールします。
		
			sudo apt install postgresql postgresql-contrib

	1. 管理者ユーザー postgres にパスワードを割り当てる

			sudo passwd postgres


1. データベースの設定

	※後に Prisma (.env ファイル) の設定で必要になります (ユーザー名 ユーザーパスワード データベース名)

	1. postgres にアカウントを変更

			sudo -i -u postgres

		ターミナルが postgres@user のような Postgresプロンプトにかわる

	1. ユーザー作成	

			createuser -d -U postgres -P username

		username に作りたいユーザー名を入力、その後ユーザーパスワードも入力する

		(※このサンプルのデフォルト設定 ユーザー名 user パスワード user)
	 データベース作成　

	1. データベース作成

			createdb databasename --encoding=UTF-8 --owner=username

		databasename にデータベースの名前を入力、username には上記で作成したユーザー名を入力

		(※このサンプルのデフォルト設定 データベース名 mydb ユーザー名 user)

	1. データベース作成完了
	
			exit 
	
		or 
	
			Ctrl+D
	
		を入力してPostgresプロンプトを終了

1. Prisma の設定

	1. .env ファイルの設定
	
		1. 上記 4. でデフォルト設定で設定した場合（変更なし）

			DATABASE_URL="postgresql://user:user@localhost:5432/mydb?schema=public"

		1. それ以外の場合

			DATABASE_URL="postgresql://USERNAME:USERPASSWORD@localhost:5432/	DATABASENAME?``schema=public"

			USERNAME USERPASSWORD DATABASENAME に上記 4. で設定した値を入力してください

	1. Prisma クライアントの設定 

			npx prisma migrate dev --name init


これでサーバーの実行準備は整ったと思います




## サーバーの実行

	1. サーバー起動

		npm start

	1. POSTMAN 等を使用して http://localhost:8080/api/todos/ へいろいろリクエストを投げてみる




## API のテストについて（test/api test）

※テストを実行すると実際のデータベースのデータも変更されてしまいます

※テストコード実行後テストが終了しない不具合があり原因がわからないので Ctrl+C等で強制終了してください

	npm test

で全部のテストを行います

	npm test post-api-todos.test.ts

でファイル名を指定して単体でテストを行います

	