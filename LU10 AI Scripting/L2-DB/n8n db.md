# Using n8n with DB

## Set up n8n

Use lecture 1's commands to set up n8n and run it locally.
No need to have multiple copies of n8n running.

Run this where you have n8n installed:

```bash
npx n8n start
```

Or Use Docker follow this tutorial: https://docs.n8n.io/hosting/installation/docker/#starting-n8n 

## Set up MySQL in Docker

You can install MySQL locally, but it's easier to use Docker.

First, download the MySQL image.
Now run the following command to install the image into docker. **Make sure** you change the `root` to
something you won't forget (mine is just `root`). You may have to change the port.

```bash
docker rm -f n8n-mysql

docker run --name n8n-mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=classicmodels \
  -e MYSQL_USER=n8n \
  -e MYSQL_PASSWORD=n8npass \
  -d mysql:8.0
```

> FYI the default user is `postgres`. 

### 


## Seed the DB

```bash
# Copy your SQL file into the MySQL container
docker cp mysqlsampledatabase.sql n8n-mysql:/tmp/mysqlsampledatabase.sql

# Open a shell inside the container
docker exec -it n8n-mysql bash

# Then inside the container:
mysql -u root -ppassword
SOURCE /tmp/mysqlsampledatabase.sql;
exit
exit
```

## Make DB User

```bash
# Go back into the MySQL container
docker exec -it n8n-mysql bash
mysql -u root -ppassword

# Make new user
CREATE USER IF NOT EXISTS 'n8n'@'%' IDENTIFIED WITH mysql_native_password BY 'n8npass';
GRANT ALL PRIVILEGES ON classicmodels.* TO 'n8n'@'%';
FLUSH PRIVILEGES;
```

### Look at the DB full of data

```bash
docker exec -i n8n-mysql \
  mysql -u root -ppassword -e "SHOW TABLES;" classicmodels
```

You should see a bunch of tables.
For example:

```
Tables_in_classicmodels
customers
employees
offices
orderdetails
orders
payments
productlines
products
```

## Using n8n on MySQL DB

### Demo 1: 

Link to template: [https://n8n.io/workflows/1872-convert-sql-table-into-excel-spreadsheet/](https://n8n.io/workflows/1872-convert-sql-table-into-excel-spreadsheet/)

This example only looks at one table.

Make sure to change the following: 
- TableName
- MySQL Connection

After you run the workflow, the file is downloadable in the Logs.

Open the `.xlx` in Excel.


### Demo 2:

[//]: # (IDK)

### Demo 3:

Link to template: [https://n8n.io/workflows/2508-generate-sql-queries-from-schema-only-ai-powered/](https://n8n.io/workflows/2508-generate-sql-queries-from-schema-only-ai-powered/)

I couldn't get this to work.
It just sits and hangs on the AI for a very long time.
But nice to look at what it's doing.










