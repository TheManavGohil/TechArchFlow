package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"{{PROJECT_NAME}}/backend/database"
	"{{PROJECT_NAME}}/backend/models"
)

// ── Response Helpers ──

func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, map[string]string{"error": message})
}

// ── Handlers ──

// ListItems returns all items
func ListItems(w http.ResponseWriter, r *http.Request) {
	var items []models.Item

	result := database.DB.Order("created_at DESC").Find(&items)
	if result.Error != nil {
		respondError(w, http.StatusInternalServerError, "Failed to fetch items")
		return
	}

	respondJSON(w, http.StatusOK, items)
}

// GetItem returns a single item by ID
func GetItem(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "Invalid item ID")
		return
	}

	var item models.Item
	result := database.DB.First(&item, id)
	if result.Error != nil {
		respondError(w, http.StatusNotFound, "Item not found")
		return
	}

	respondJSON(w, http.StatusOK, item)
}

// CreateItem creates a new item
func CreateItem(w http.ResponseWriter, r *http.Request) {
	var item models.Item

	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		respondError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if item.Name == "" {
		respondError(w, http.StatusBadRequest, "Name is required")
		return
	}

	result := database.DB.Create(&item)
	if result.Error != nil {
		respondError(w, http.StatusInternalServerError, "Failed to create item")
		return
	}

	respondJSON(w, http.StatusCreated, item)
}

// UpdateItem updates an existing item
func UpdateItem(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "Invalid item ID")
		return
	}

	var existing models.Item
	if result := database.DB.First(&existing, id); result.Error != nil {
		respondError(w, http.StatusNotFound, "Item not found")
		return
	}

	var updates models.Item
	if err := json.NewDecoder(r.Body).Decode(&updates); err != nil {
		respondError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	database.DB.Model(&existing).Updates(models.Item{
		Name:        updates.Name,
		Description: updates.Description,
		Status:      updates.Status,
		Priority:    updates.Priority,
	})

	respondJSON(w, http.StatusOK, existing)
}

// DeleteItem deletes an item by ID
func DeleteItem(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		respondError(w, http.StatusBadRequest, "Invalid item ID")
		return
	}

	result := database.DB.Delete(&models.Item{}, id)
	if result.Error != nil {
		respondError(w, http.StatusInternalServerError, "Failed to delete item")
		return
	}

	if result.RowsAffected == 0 {
		respondError(w, http.StatusNotFound, "Item not found")
		return
	}

	respondJSON(w, http.StatusOK, map[string]string{"message": "Item deleted successfully"})
}
