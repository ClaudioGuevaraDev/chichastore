package libs

import (
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func MongoDBClient() (client *mongo.Client, err error) {
	uri := os.Getenv("MONGODB_URI")

	client, err = mongo.Connect(options.Client().ApplyURI(uri))

	return
}
