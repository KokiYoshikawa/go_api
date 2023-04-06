package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"go_api/server/src/handler" // handlerパッケージのインポート
)

func main() {
	// インスタンスの作成
	echo := echo.New()

	// ログなど
	echo.Use(middleware.Logger())
	echo.Use(middleware.Recover())

	// ルーティング
	echo.GET("/go_api/:user_id", handler.GetUser())
	echo.GET("/go_api/all", handler.GetUsers())

	// サーバー起動、ポート番号の指定
	echo.Start(":1323")
}
