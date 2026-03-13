package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"{{PROJECT_NAME}}/backend/models"
)

// DB is the global database connection
var DB *gorm.DB

// Connect establishes the PostgreSQL connection using environment variables
func Connect() {
	dbHost := getEnv("DB_HOST", "db")
	dbUser := getEnv("DB_USER", "admin")
	dbPassword := getEnv("DB_PASSWORD", "changeme")
	dbName := getEnv("DB_NAME", "techarchflow")
	dbPort := getEnv("DB_PORT", "5432")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		dbHost, dbUser, dbPassword, dbName, dbPort,
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}

	log.Println("📦 Running auto-migrations...")
	err = DB.AutoMigrate(&models.Item{})
	if err != nil {
		log.Fatalf("❌ Failed to run migrations: %v", err)
	}
	log.Println("✅ Migrations completed")
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
