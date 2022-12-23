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
		jsonData := `[
			{
				"id": "_pb_users_auth_",
				"created": "2022-10-31 09:44:18.406Z",
				"updated": "2022-12-18 13:30:45.439Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "users_avatar",
						"name": "avatar",
						"type": "file",
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"maxSize": 5242880,
							"mimeTypes": [
								"image/jpg",
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/webp"
							],
							"thumbs": [
								"24x24f"
							]
						}
					},
					{
						"system": false,
						"id": "xs4gphtx",
						"name": "theme",
						"type": "select",
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"light",
								"dark"
							]
						}
					},
					{
						"system": false,
						"id": "16xzokps",
						"name": "locale",
						"type": "select",
						"required": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"en",
								"de"
							]
						}
					}
				],
				"listRule": "id = @request.auth.id",
				"viewRule": "id = @request.auth.id",
				"createRule": "",
				"updateRule": "id = @request.auth.id",
				"deleteRule": "id = @request.auth.id",
				"options": {
					"allowEmailAuth": true,
					"allowOAuth2Auth": true,
					"allowUsernameAuth": true,
					"exceptEmailDomains": null,
					"manageRule": null,
					"minPasswordLength": 8,
					"onlyEmailDomains": null,
					"requireEmail": true
				}
			},
			{
				"id": "m2mup2n0m54y9eq",
				"created": "2022-10-31 10:12:44.521Z",
				"updated": "2022-11-08 20:59:04.640Z",
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
			},
			{
				"id": "qj1mfdg2t94z9ja",
				"created": "2022-10-31 10:12:44.521Z",
				"updated": "2022-11-08 20:59:34.914Z",
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
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		return nil
	})
}
