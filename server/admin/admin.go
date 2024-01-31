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
	AdminUserId   int    `json:"adminUserId" db:"admin_user_id"`
	FirstName     string `json:"firstName" db:"first_name"`
	LastName      string `json:"lastName" db:"last_name"`
	FirstNameKana string `json:"firstNameKana" db:"first_name_kana"`
	LastNameKana  string `json:"lastNameKana" db:"last_name_kana"`
	MailAddress   string `json:"mailAddress" db:"mail_address"`
	RollId        string `json:"rollId" db:"roll_id"`
	PassWord      string `json:"passWord" db:"pass_word"`
}

type AdminUserWithRollName struct {
	AdminUserId   int    `json:"adminUserId" db:"admin_user_id"`
	FirstName     string `json:"firstName" db:"first_name"`
	LastName      string `json:"lastName" db:"last_name"`
	FirstNameKana string `json:"firstNameKana" db:"first_name_kana"`
	LastNameKana  string `json:"lastNameKana" db:"last_name_kana"`
	MailAddress   string `json:"mailAddress" db:"mail_address"`
	RollName      string `json:"rollName" db:"roll_name"`
	PassWord      string `json:"passWord" db:"pass_word"`
}

// ユーザ1人のプロフィールを返すメソッド
func GetAdminUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		// idパラメーターを受け取る
		id := c.Param("id")
		var admin_user = AdminUserWithRollName{}

		dbmap.SelectOne(
			&admin_user,
			"select admin_user_id, first_name, last_name, first_name_kana, last_name_kana, roll_name, mail_address, pass_word from adminuser join adminroll on adminuser.roll_id = adminroll.id WHERE admin_user_id = ?;",
			id,
		)

		fmt.Println(admin_user)

		if err != nil {
			fmt.Println(err.Error())
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
			"select admin_user_id, first_name, last_name, first_name_kana, last_name_kana, roll_name, mail_address, pass_word from adminuser join adminroll on adminuser.roll_id = adminroll.id;",
		)
		if err != nil {
			fmt.Println(err.Error())
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
