from mongoengine import Document, StringField, IntField, ListField, EmbeddedDocument, EmbeddedDocumentField

class Nutrients(EmbeddedDocument):
    calories = StringField()
    carbohydrateContent = StringField()
    cholesterolContent = StringField()
    fiberContent = StringField()
    proteinContent = StringField()
    saturatedFatContent = StringField()
    sodiumContent = StringField()
    sugarContent = StringField()
    fatContent = StringField()
    unsaturatedFatContent = StringField()

class Recipe(Document):
    Contient = StringField()
    Country_State = StringField()
    cuisine = StringField()
    title = StringField()
    URL = StringField()
    rating = IntField()
    total_time = IntField()
    prep_time = IntField()
    cook_time = IntField()
    description = StringField()
    ingredients = ListField(StringField())
    instructions = ListField(StringField())
    nutrients = EmbeddedDocumentField(Nutrients)
    serves = StringField()
