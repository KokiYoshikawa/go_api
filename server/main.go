package main

import (
	"fmt"
	"net/http"

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

	echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		/* http://localhost:3000からの接続を許可する */
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPut,
			http.MethodPost,
			http.MethodDelete,
		},
	}))

	// ルーティング
	echo.GET("/go_api/:user_id", handler.GetUser())
	echo.GET("/go_api/all", handler.GetUsers())

	// サーバー起動、ポート番号の指定
	fmt.Println("Starting server at port 8000")
	echo.Start(":8000")
}
