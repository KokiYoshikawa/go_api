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
	db, err = sql.Open("mysql", "admin:admin123@tcp(localhost:3306)/go_api")
	dbmap   = &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"}}
)

type User struct {
	Id            int    `db:"id"`
	FirstName     string `db:"first_name"`
	LastName      string `db:"last_name"`
	FirstNameKana string `db:"first_name_kana"`
	LastNameKana  string `db:"last_name_kana"`
}

// ユーザ1人のプロフィールを返すメソッド
func GetUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		// nameパラメーターを受け取る
		id := c.Param("id")
		var user = []User{}

		dbmap.Select(&user, "SELECT * FROM users WHERE id ="+"'"+id+"'"+";")
		return c.JSON(http.StatusOK, user)
	}
}

// 全ユーザのプロフィールを返すメソッド
func GetUsers() echo.HandlerFunc {
	err := db.Ping()
	if err != nil {
		panic(err)
	}
	return func(c echo.Context) error {
		var users = []User{}
		dbmap.Select(&users, "SELECT * FROM users;")
		return c.JSON(http.StatusOK, users)
	}
}
