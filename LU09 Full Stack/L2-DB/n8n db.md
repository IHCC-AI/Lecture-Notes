# Using n8n with DB

## Set up n8n

Use lecture 1's commands to set up n8n and run it locally.
No need to have multiple copies of n8n running.

Run this where you have n8n installed:

```bash
npx n8n start
```

## Set up MySQL in Docker

You can install MySQL locally, but it's easier to use Docker.

First, download the MySQL image.
Now run the following command to install the image into docker. **Make sure** you change the `root` to
something you won't forget (mine is just `root`). You may have to change the port.

```bash
docker pull mysql:latest
docker run -d --name n8n-mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql
```

> FYI the default user is `root`. 

### MySQL Workbench

You might want a GUI to interact with MySQL. I use [MySQL Workbench](https://www.mysql.com/products/workbench/).
You can also use the command line.
Or JetBrain IDEs all have an integrated DB tool.


## Seed the DB

```bash
# Copy your SQL file into the MySQL container
docker cp mysqlsampledatabase.sql n8n-mysql:/tmp/mysqlsampledatabase.sql

# Open a shell inside the container
docker exec -it n8n-mysql bash

# Then inside the container:
mysql -u root -proot
SOURCE /tmp/mysqlsampledatabase.sql;
exit
exit
```

### Look at the DB full of data

```bash
docker exec -i n8n-mysql \
  mysql -u root -proot -e "SHOW TABLES;" classicmodels
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










