package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"{{PROJECT_NAME}}/backend/database"
	"{{PROJECT_NAME}}/backend/handlers"
	"{{PROJECT_NAME}}/backend/middlewares"
)

func main() {
	// ── Connect to Database ──
	database.Connect()
	log.Println("✅ Database connected successfully")

	// ── Create Router ──
	mux := http.NewServeMux()

	// ── Register Routes ──
	// Health check
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"status":"ok","service":"{{PROJECT_NAME}}-api"}`)
	})

	// Items CRUD
	mux.HandleFunc("GET /api/items", handlers.ListItems)
	mux.HandleFunc("GET /api/items/{id}", handlers.GetItem)
	mux.HandleFunc("POST /api/items", handlers.CreateItem)
	mux.HandleFunc("PUT /api/items/{id}", handlers.UpdateItem)
	mux.HandleFunc("DELETE /api/items/{id}", handlers.DeleteItem)

	// ── Apply Middleware Chain ──
	handler := middlewares.ChainMiddlewares(
		mux,
		middlewares.CORSMiddleware,
		middlewares.LoggingMiddleware,
	)

	// ── Start Server ──
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Printf("🚀 {{PROJECT_NAME}} API server starting on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
