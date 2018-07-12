# Views

This folder contains all the templates which are rendered by your application. This is the place where usually the designers in your team will work.

You would like to have one sub-folder for templates corresponding to each of your controllers. This way, you will group the templates for the same tasks together.

A best practice for writing good templates is to avoid doing any processing in the templates. If your data needs to be processed before it is presented, do it in your controller. Also, avoid adding too much logic, especially if this logi can be moved to the controller.

```jade
doctype html
html
  head
    title Your comment web app
  body
    h1 Welcome and leave your comment
    each comment in comments
      article.Comment
        .Comment-date= comment.date
        .Comment-text= comment.text
```

As you see, it expects that the data is already processed in the controller rendering this template.