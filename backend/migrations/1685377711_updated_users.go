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

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// add
		new_budgetDevelopmentSettings := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "jzitbogm",
			"name": "budgetDevelopmentSettings",
			"type": "json",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_budgetDevelopmentSettings)
		collection.Schema.AddField(new_budgetDevelopmentSettings)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("jzitbogm")

		return dao.SaveCollection(collection)
	})
}
