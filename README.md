# Assessing Node - Express Fu

* Answers to your written questions will be recorded in _Answers.md_

## Questions

1.  What is Node?
2.  What is Express?
3.  What is Middleware?
4.  What is an endpoint?

## Assignments

Use Node.js and Express to design and build an API that performs CRUD operations on **projects and actions**.

### Download Project Files and Install Dependencies

* **Fork** and **Clone** this repository.
* **CD into the folder** where you cloned the repository.
* Do your magic!

### Implement Requirements

* Take the steps necessary to create a `package.json` to keep a record of our dependencies.
* use _yarn_ or _npm_ to add **knex** and **sqlite3** as dependencies to the project. **This is required for database access**.
* Configure an _npm script_ named _"start"_ that will execute your code using _nodemon_ so that the server restarts on changes. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
* Design and build a set of endpoints that satisfy the API requirements.
* **Use _Postman_ to test the API as you work through the exercises.**

### Database Persistence Helpers

The `/data/helpers` folder includes helper files that you can use to manage the persistence of projects and action data. These files are `projectModel.js` and `ActionModel.js`. Both files publish the following api, that you can use to store, modify and retrieve each resource:

* `get()`: calling get returns a promise that resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
* `insert()`: calling insert passing it a resource object will add it to the database and return an object with the id of the inserted resource. The object looks like this: `{ id: 123 }`.
* `update()`: accepts two arguments, the first is the `id` of the resource to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
* `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that when passed a post id as it's only argument, returns a list of all the _actions_ for the _project_.

**All these helper methods return a promise.**

#### Database Schemas

The _schemas_ (properties and data type of each property) used to store and retrieve the resources inside the included database (`lambda.sqlite3`) is described below.

##### projects

* id: number, no need to provide it when creating projects, the database will generate it.
* name: string, up to 128 characters long, required.
* description: string, required.
* completed: boolean to indicate if the project has been completed, not required

##### Actions

* id: number, no need to provide it when creating posts, the database will automatically generate it.
* project_id: number, required, must be the id of an existing project.
* desctiption: string, no size limit, required.
* notes: string, no size limit, required. Used to record additional notes ore requirements to complete the action.

We have provided test data for all the resources.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Design and Build Endpoints

Design and build the necessary endpoints to:

* perform CRUD operations on _projects_ and _actions_.
* retrieve the list of actions for a project.

## Stretch Goal

* Use `create-react-app` to create an application inside in a separate folder (not inside the project), name it anything you want.
* From the React application show a list of all projects using the API you built.
* Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
* Add styling! Perhaps with `styled-components`.
