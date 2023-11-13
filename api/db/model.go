package db

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TyUser struct {
	ID        uint   `gorm:"primaryKey"`
	Password  string `json:"password" binding:"required"`
	Role      uint
	Firstname string `json:"firstname" binding:"required"`
	Lastname  string `json:"lastname" binding:"required"`
	Email     string `json:"email" binding:"required"`
	School    int    `json:"school,string" binding:"required"`
	Phone     string `json:"phone" binding:"required" gorm:"uniqueIndex"`
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

type TyKnowledge struct {
	gorm.Model
	Guid               uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	Title              string    `json:"title"`
	Content            string    `json:"content"`
	Tags               string    `json:"tags"`
	Category           string    `json:"category"`
	CreateUser         string    `json:"createUser"`
	TagsType           string    `json:"tagsType"`
	TyKnowledgeContent string    `json:"knowledgeContent"`
}
