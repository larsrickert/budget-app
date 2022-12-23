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
			"id": "qj1mfdg2t94z9ja",
			"created": "2022-12-23 10:50:53.319Z",
			"updated": "2022-12-23 10:50:53.319Z",
			"name": "transactions",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "1d8eag5i",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": 64,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "doqvwv6o",
					"name": "value",
					"type": "number",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null
					}
				},
				{
					"system": false,
					"id": "1avdarlp",
					"name": "type",
					"type": "select",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"values": [
							"income",
							"outcome"
						]
					}
				},
				{
					"system": false,
					"id": "duy7b2qq",
					"name": "bookingDate",
					"type": "date",
					"required": false,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
					}
				},
				{
					"system": false,
					"id": "r4urmwkl",
					"name": "frequency",
					"type": "select",
					"required": false,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"values": [
							"1",
							"3",
							"6",
							"12",
							"24"
						]
					}
				},
				{
					"system": false,
					"id": "xbckrifz",
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
					"id": "6w5hfuua",
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

		collection, err := dao.FindCollectionByNameOrId("qj1mfdg2t94z9ja")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
