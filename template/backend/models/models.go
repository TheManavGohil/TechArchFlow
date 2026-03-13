package models

import "gorm.io/gorm"

// Item is an example model to demonstrate CRUD operations.
// Both Go (GORM) and Django share this same database table.
type Item struct {
	gorm.Model
	Name        string `json:"name" gorm:"not null;size:255"`
	Description string `json:"description" gorm:"type:text"`
	Status      string `json:"status" gorm:"default:'pending';size:50"`
	Priority    int    `json:"priority" gorm:"default:0"`
}
