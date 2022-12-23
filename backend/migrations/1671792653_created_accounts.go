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
			"id": "m2mup2n0m54y9eq",
			"created": "2022-12-23 10:50:53.318Z",
			"updated": "2022-12-23 10:50:53.318Z",
			"name": "accounts",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "glsefrnq",
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
					"id": "kkhscj62",
					"name": "value",
					"type": "number",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null
					}
				},
				{
					"system": false,
					"id": "b4vi1qw6",
					"name": "notes",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": 512,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "po7ch9ww",
					"name": "userId",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": true
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

		collection, err := dao.FindCollectionByNameOrId("m2mup2n0m54y9eq")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
