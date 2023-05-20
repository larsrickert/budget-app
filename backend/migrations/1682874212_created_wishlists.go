package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "bh2h7pth8ya3yba",
			"created": "2023-04-30 17:03:32.502Z",
			"updated": "2023-04-30 17:03:32.502Z",
			"name": "wishlists",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "achouuac",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": 64,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "tujvvf90",
					"name": "userId",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": true,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": []
					}
				}
			],
			"listRule": "userId = @request.auth.id",
			"viewRule": "userId = @request.auth.id",
			"createRule": "@request.auth.id = @request.data.userId",
			"updateRule": "userId = @request.auth.id && @request.data.userId = \"\" || @request.data.userId = userId",
			"deleteRule": "userId = @request.auth.id",
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("bh2h7pth8ya3yba")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
