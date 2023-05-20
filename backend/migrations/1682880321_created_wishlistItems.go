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
			"id": "76b6xjcnv1m4rt8",
			"created": "2023-04-30 18:45:21.498Z",
			"updated": "2023-04-30 18:45:21.498Z",
			"name": "wishlistItems",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "dhxurin0",
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
					"id": "yt5fexvw",
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
				},
				{
					"system": false,
					"id": "jdlrzud0",
					"name": "wishlistId",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"collectionId": "bh2h7pth8ya3yba",
						"cascadeDelete": true,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": []
					}
				},
				{
					"system": false,
					"id": "66vqmuzi",
					"name": "value",
					"type": "number",
					"required": false,
					"unique": false,
					"options": {
						"min": 0,
						"max": null
					}
				},
				{
					"system": false,
					"id": "iiymepsa",
					"name": "notes",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": 512,
						"pattern": ""
					}
				}
			],
			"listRule": "@request.auth.id = wishlistId.userId",
			"viewRule": "@request.auth.id = wishlistId.userId",
			"createRule": "@request.auth.id = @request.data.wishlistId.userId",
			"updateRule": "@request.auth.id = @request.data.wishlistId.userId && @request.data.wishlistId = \"\" || @request.auth.id = @request.data.wishlistId.userId",
			"deleteRule": "@request.auth.id = wishlistId.userId",
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("76b6xjcnv1m4rt8")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
