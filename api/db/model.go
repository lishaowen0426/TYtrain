package db

type TyUser struct {
	ID       uint
	Username string
	Password string
	Role     uint
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
