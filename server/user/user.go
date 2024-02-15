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
	UserId   int    `json:"userId" db:"user_id"`
	NickName string `json:"nickName" db:"nick_name"`
	PassWord string `json:"passWord" db:"pass_word"`
}

type UserInfo struct {
	UserId   int    `json:"userId" db:"user_id"`
	NickName string `json:"nickName" db:"nick_name"`
}

type LoginInfo struct {
	NickName string `json:"nickName" db:"nick_name"`
	PassWord string `json:"passWord" db:"pass_word"`
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

func Login() echo.HandlerFunc {
	return func(c echo.Context) error {
		login_info := new(LoginInfo)
		user_info := new(UserInfo)
		if err := c.Bind(&login_info); err != nil {
			return err
		}

		err = dbmap.SelectOne(
			user_info,
			"select user_id, nick_name from user WHERE nick_name = ? and pass_word = ?;",
			login_info.NickName, login_info.PassWord,
		)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		} else if &user_info == nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "ログインに失敗しました。")
		}

		return c.JSON(http.StatusOK, user_info)
	}
}
