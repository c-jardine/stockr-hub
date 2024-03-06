<!-- omit from toc -->
# StockrHub
StockrHub is an inventory and production management app designed for crafters, artisans, and other creative entrepreneurs. Take control of your creative process by managing your raw materials, final products, and production runs. Once setup, StockrHub will track everything for you, giving you more time to focus on your passion rather than dealing with the complexities of inventory management.

<!-- omit from toc -->
## Table of Contents
- [Features](#features)
  - [Raw Material Management](#raw-material-management)
  - [Product Management](#product-management)
  - [Production Planning (Coming Soon)](#production-planning-coming-soon)
  - [Auditing](#auditing)
  - [Stock History](#stock-history)
- [Installation](#installation)



## Features

### Raw Material Management
Keep a detailed record of your raw materials, including quantities, purchase URLs, cost per unit, vendors, and categories. Set a minimum quantity to receive alerts when a material is running low and needs reordered.

### Product Management
Build a catalog of all your products and the raw materials used in their creation. StockrHub will automatically calculate the quantity and price of materials used in each product. When you set retail and wholesale prices for your products, StockrHub will also calculate the profit margin for each.

### Production Planning (Coming Soon)
As previously mentioned, creating a product allows you to enter the materials used in each product. In the likely event that you're creating more than one product at a time, this information can be entered by batch size. Production runs allow you to adjust your batch size for each run, and StockrHub will calculate the amount of material needed for the batch&mdash;no more painful math! Once your production run is complete, StockrHub will automatically adjust the quantities of your products remaining raw materials.

### Auditing
It's wise to do a manual count of your stock once in a while. StockrHub allows you to create audits to help you update your quantities in bulk. Although the app is designed to be mobile-friendly, you can export audit sheets so you can print out a physical copy if that fits better with your workflow. Then, just come back and enter the values into the app.
> Note: In order to prevent incorrect inventory levels, raw material and product quantity updates will be disabled while an audit is in progress.

### Stock History
The details panel of your raw materials and products show a history of stock changes, whether from manual changes or automatic updates from production runs. A graph is also available in case you want to see the fluctuations over time at a glance.

## Installation
StockrHub uses PostgreSQL by default. This guide assumes you already have it installed, as well as node, npm, git, etc. You'll also need a database created for the project. We called ours ```stockr-hub```.

<!-- omit from toc -->
### Clone the repository
In your terminal, navigate to the directory where you want your project and run:
```
git clone https://github.com/c-jardine/stockr-hub.git
```

<!-- omit from toc -->
### Install the dependencies
To install dependencies, simply run the following command inside the project directory:
```
npm i
```

<!-- omit from toc -->
### Update environment variables
Make a copy of the ```.env.example``` file and change it to ```.env.local```.

Inside, you'll find an environment variable called ```DATABASE_URL```. Enter your connection string here. For example:
```
DATABASE_URL="postgres://postgres@localhost:5432/stockr-hub"
```

<!-- omit from toc -->
### Push the database schema and seed the database
Once your ```DATABASE_URL``` is set, you can push the database schema:
```
npm run db:push
```

Next, seed the database with the required data located in ```/prisma/seed.ts```:
```
npm run db:seed
```

<!-- omit from toc -->
### Run the app
At this point, StockrHub is ready to use! Get started by running:
```
npm run build
```
then:
```
npm run start
```