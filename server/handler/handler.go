package handler

import (
	"database/sql"
	"net/http"

	"github.com/coopernurse/gorp"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo"
)

var (
	// mysqlに接続
	db, err = sql.Open("mysql", "root:root@tcp(go_api_mysql:3306)/go_api")
	dbmap   = &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{}}
)

type User struct {
	UserId        int    `db:"user_id"`
	FirstName     string `db:"first_name"`
	LastName      string `db:"last_name"`
	FirstNameKana string `db:"first_name_kana"`
	LastNameKana  string `db:"last_name_kana"`
	MailAddress   string `db:"mail_address"`
}

// ユーザ1人のプロフィールを返すメソッド
func GetUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		// nameパラメーターを受け取る
		id := c.Param("user_id")
		var user = []User{}

		dbmap.Select(&user, "SELECT * FROM user WHERE user_id ="+"'"+id+"'"+";")
		return c.JSON(http.StatusOK, user)
	}
}

// 全ユーザのプロフィールを返すメソッド
func GetUsers() echo.HandlerFunc {
	return func(c echo.Context) error {
		var users = []User{}
		dbmap.Select(&users, "SELECT * FROM user;")
		return c.JSON(http.StatusOK, users)
	}
}
