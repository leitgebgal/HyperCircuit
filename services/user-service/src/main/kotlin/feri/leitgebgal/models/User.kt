package feri.leitgebgal.models

import io.quarkus.mongodb.panache.common.MongoEntity
import org.bson.types.ObjectId

@MongoEntity
@NoArg
data class User (
    var id: ObjectId? = null,
    var username: String = "",
    var email: String = "",
    var password: String = ""
)