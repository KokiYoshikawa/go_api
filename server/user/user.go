package user

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/coopernurse/gorp"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

var (
	// mysqlに接続
	db, err = sql.Open("mysql", "root:root@tcp(go_api_mysql:3306)/go_api")
	dbmap   = &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{}}
)

type User struct {
	UserId        int    `json:"userId" db:"user_id"`
	FirstName     string `json:"firstName" db:"first_name"`
	LastName      string `json:"lastName" db:"last_name"`
	FirstNameKana string `json:"firstNameKana" db:"first_name_kana"`
	LastNameKana  string `json:"lastNameKana" db:"last_name_kana"`
	MailAddress   string `json:"mailAddress" db:"mail_address"`
	PassWord      string `json:"passWord" db:"pass_word"`
}

// ユーザ1人のプロフィールを返すメソッド
func GetUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		// idパラメーターを受け取る
		id := c.Param("id")
		var user = User{}

		err = dbmap.SelectOne(&user, "SELECT * FROM user WHERE user_id = ?;", id)

		if err != nil {
			fmt.Println(err.Error())
			if err.Error() == "sql: no rows in result set" {
				return c.JSON(http.StatusNotFound, "ユーザが存在しません。")
			}
			return c.JSON(http.StatusInternalServerError, "DBアクセスに失敗しました。")
		}
		return c.JSON(http.StatusOK, user)
	}
}

// 全ユーザのプロフィールを返すメソッド
func GetUsers() echo.HandlerFunc {
	return func(c echo.Context) error {
		var users = []User{}

		_, err = dbmap.Select(&users, "SELECT * FROM user;")
		if err != nil {
			fmt.Println(err.Error())
			if err.Error() == "sql: no rows in result set" {
				return c.JSON(http.StatusNotFound, "ユーザが存在しません。")
			}
			return c.JSON(http.StatusInternalServerError, "DBアクセスに失敗しました。")
		}
		return c.JSON(http.StatusOK, users)
	}
}

func CreateUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(User)
		if err := c.Bind(&user); err != nil {
			return err
		}

		dbmap.AddTableWithName(User{}, "user").SetKeys(true, "user_id")
		err = dbmap.Insert(user)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		}

		return c.JSON(http.StatusCreated, user)
	}
}

func DeleteUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(User)
		if err := c.Bind(&user); err != nil {
			return err
		}

		dbmap.AddTableWithName(User{}, "user").SetKeys(true, "user_id")
		delete_line, err := dbmap.Delete(user)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		} else if delete_line == 0 {
			return c.JSON(http.StatusNotFound, "削除対象のユーザが存在しません。")
		}

		return c.JSON(http.StatusOK, delete_line)
	}
}
