# purchase-of-checks-backend

# Receipt Management Application

This application serves as a receipt management tool for displaying products, calculating their costs, and generating receipts. It includes both a front-end interface and a small backend server for data storage.

# Features:

## Display Products:

The application allows users to view a list of products available.

## Create Receipts:

Users can create new receipts by selecting products. Each product added to the receipt specifies its quantity.

## Update Receipt Contents:

Users can modify the products and their quantities within a receipt.

## Close Receipts:

After selecting products and quantities, users can close the receipt, generating a finalized record with a total cost and closing date.

## Delete Products from Receipt:

Users can remove specific products from a receipt.

# GET / (Get All Products):

Description: Retrieve a list of all available products.
Request: GET /
Response: List of products

# POST /add (Add Receipt):

Description: Create a new receipt with a specified total cost.
Request: POST `/add`
Request Body: `{ "total": number }`
Response: Newly created receipt object

# PUT /correct (Modify Product in Receipt):

Description: Update the products and quantities within a receipt.
Request: PUT `/correct`
Request Body:

`{`
`"ReceiptId": string,`
`"products": [`
`{`
`"ProductId": string,`
`"quantity": number,`
` "price": number`
` },`
// More products...
`]`
`}`

Response: List of updated products in the receipt

# POST /close/:ReceiptId (Close Receipt):

Description: Close a specific receipt by updating its total cost and closing date.
Request: POST `/close/:ReceiptId`
Request Params: `ReceiptId` (string)
Request Body: `{ "total": number }`
Response: Updated receipt object

# DELETE /delete (Remove Product from Receipt):

Description: Delete a specific product from a receipt.
Request: DELETE `/delete`
Request Body:

`{`
`"ReceiptId": string,`
`"ProductId": string`
`}`
Response: None (204 No Content)
