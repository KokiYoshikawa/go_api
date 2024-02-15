package admin

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

type AdminUser struct {
	AdminUserId int    `json:"adminUserId" db:"admin_user_id"`
	NickName    string `json:"nickName" db:"nick_name"`
	RollId      string `json:"rollId" db:"roll_id"`
	PassWord    string `json:"passWord" db:"pass_word"`
}

type AdminUserWithRollName struct {
	AdminUserId int    `json:"adminUserId" db:"admin_user_id"`
	NickName    string `json:"nickName" db:"nick_name"`
	RollName    string `json:"rollName" db:"roll_name"`
	PassWord    string `json:"passWord" db:"pass_word"`
}

type AuthInfo struct {
	AdminUserId int    `json:"adminUserId" db:"admin_user_id"`
	NickName    string `json:"nickName" db:"nick_name"`
	RollId      int    `json:"rollId" db:"roll_id"`
}

type LoginInfo struct {
	NickName string `json:"nickName" db:"nick_name"`
	PassWord string `json:"passWord" db:"pass_word"`
}

// ユーザ1人のプロフィールを返すメソッド
func GetAdminUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		// idパラメーターを受け取る
		id := c.Param("id")
		var admin_user = AdminUserWithRollName{}

		dbmap.SelectOne(
			&admin_user,
			"select admin_user_id, nick_name, roll_name, pass_word from adminuser join adminroll on adminuser.roll_id = adminroll.id WHERE admin_user_id = ?;",
			id,
		)

		if err != nil {
			fmt.Println(err.Error())
			if err.Error() == "sql: no rows in result set" {
				return c.JSON(http.StatusNotFound, "ユーザが存在しません。")
			}
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		}
		return c.JSON(http.StatusOK, admin_user)
	}
}

// 全ユーザのプロフィールを返すメソッド
func GetAdminUsers() echo.HandlerFunc {
	return func(c echo.Context) error {
		var admin_users = []AdminUserWithRollName{}

		_, err = dbmap.Select(
			&admin_users,
			"select admin_user_id, nick_name, roll_name, pass_word from adminuser join adminroll on adminuser.roll_id = adminroll.id;",
		)
		if err != nil {
			fmt.Println(err.Error())
			if err.Error() == "sql: no rows in result set" {
				return c.JSON(http.StatusNotFound, "ユーザが存在しません。")
			}
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		}
		return c.JSON(http.StatusOK, admin_users)
	}
}

func CreateAdminUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		admin_user := new(AdminUser)
		if err := c.Bind(&admin_user); err != nil {
			return err
		}
		fmt.Println(admin_user)

		dbmap.AddTableWithName(AdminUser{}, "adminuser").SetKeys(true, "admin_user_id")
		err = dbmap.Insert(admin_user)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		}

		return c.JSON(http.StatusCreated, admin_user)
	}
}

func Login() echo.HandlerFunc {
	return func(c echo.Context) error {
		login_info := new(LoginInfo)
		auth_info := new(AuthInfo)
		if err := c.Bind(&login_info); err != nil {
			return err
		}

		err = dbmap.SelectOne(
			auth_info,
			"select admin_user_id, nick_name, roll_id from adminuser WHERE nick_name = ? and pass_word = ?;",
			login_info.NickName, login_info.PassWord,
		)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		} else if &auth_info == nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "ログインに失敗しました。")
		}

		return c.JSON(http.StatusOK, auth_info)
	}
}

func DeleteAdminUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		admin_user := new(AdminUser)
		if err := c.Bind(&admin_user); err != nil {
			return err
		}

		dbmap.AddTableWithName(AdminUser{}, "adminuser").SetKeys(true, "admin_user_id")
		delete_line, err := dbmap.Delete(admin_user)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusNotFound, "DBアクセスに失敗しました。")
		} else if delete_line == 0 {
			return c.JSON(http.StatusNotFound, "削除対象が存在しません。")
		}

		return c.JSON(http.StatusOK, delete_line)
	}
}
