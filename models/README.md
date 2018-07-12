# Models

Models are the files where you interact with your database. They contain all the methods and functions which will handle your data. This includes not only the methods for creating, reading, updating and deleting items, but also any additional business logic. For example, if you had a car model, you could have a mountTyres method.

You should create at least one file for each type of data in your database. In our example, we have users and comments, therefore we have a user model and a comment model. Sometimes, when a model file becomes too large, it might be better to break it into several files, based on some internal logic.

You should also try to make your models independent from the outside world. They don’t need to know about other models and they should never include them. They don’t need to know about controllers or who uses them. They should never receive request or response objects. They should never return http errros, but they should return model specific errors.

All this will make your models much more maintainable. They will be tested easily because they will have very few and clear dependencies. Models can be moved around if needed and they can be used by anyone. Changing something in one model, doesn’t affect any other.