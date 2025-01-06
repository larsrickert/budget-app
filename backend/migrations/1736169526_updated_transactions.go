package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("qj1mfdg2t94z9ja")
		if err != nil {
			return err
		}

		// update
		edit_notes := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xbckrifz",
			"name": "notes",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 2056,
				"pattern": ""
			}
		}`), edit_notes); err != nil {
			return err
		}
		collection.Schema.AddField(edit_notes)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("qj1mfdg2t94z9ja")
		if err != nil {
			return err
		}

		// update
		edit_notes := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xbckrifz",
			"name": "notes",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 512,
				"pattern": ""
			}
		}`), edit_notes); err != nil {
			return err
		}
		collection.Schema.AddField(edit_notes)

		return dao.SaveCollection(collection)
	})
}
