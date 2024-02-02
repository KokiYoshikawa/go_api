package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"go_api/server/src/admin"
	"go_api/server/src/user"
)

func main() {
	// インスタンスの作成
	e := echo.New()

	// ログなど
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORS())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		/* http://localhost:3000からの接続を許可する */
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPut,
			http.MethodPost,
			http.MethodPatch,
			http.MethodOptions,
			http.MethodDelete,
		},
		AllowHeaders: []string{
			echo.HeaderAccessControlAllowHeaders,
			echo.HeaderContentType,
			echo.HeaderContentLength,
			echo.HeaderAcceptEncoding,
			echo.HeaderXCSRFToken,
			echo.HeaderAuthorization,
		},
	}))

	// ルーティング
	api := e.Group("/go_api")
	users := api.Group("/user")
	{
		users.GET("/:id", user.GetUser())
		users.GET("/list", user.GetUsers())
		users.POST("/create", user.CreateUser())
		users.DELETE("/delete/:id", user.DeleteUser())
	}

	admins := api.Group("/admin")
	{
		admins.GET("/:id", admin.GetAdminUser())
		admins.GET("/list", admin.GetAdminUsers())
		admins.POST("/create", admin.CreateAdminUser())
		admins.POST("/login", admin.Login())
		admins.DELETE("/delete/:id", admin.DeleteAdminUser())
	}

	// サーバー起動、ポート番号の指定
	fmt.Println("Starting server at port 8000")
	e.Start(":8000")
}
