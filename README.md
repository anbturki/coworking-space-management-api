# Adonis API application

| Route      | Verb(s)  | Roles                             | Description                  | Model                  | Response Example          |        |
| ---------- | -------- | --------------------------------- | ---------------------------- | ---------------------- | ------------------------- | ------ |
| /api/staff | HEAD,GET | { staff: ["create", "fetchAll"] } | Add a new user of staff type | User { name: "required | string"; phone: "required | unique | phone:EGP"; } |  |  |
|            |          |                                   |                              |                        |                           |        |
|            |          |                                   |                              |                        |                           |        |

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
