package db

type TyUser struct {
	ID        uint
	Password  string `json:"password" binding:"required"`
	Role      uint
	Firstname string `json:"firstname" binding:"required"`
	Lastname  string `json:"lastname" binding:"required"`
	Email     string `json:"email" binding:"required"`
	School    int    `json:"school,string" binding:"required"`
	Phone     string `json:"phone" binding:"required" gorm:"uniqueIndex`
}

func (TyUser) TableName() string {
	return "ty_user"
}

type TyMasterTag struct {
	ID    uint
	Label string
	Value string
	Type  string
}

func (TyMasterTag) TableName() string {
	return "ty_master_tags"
}

type TyMasterFont struct{}
