# sd v0.0.0



- [Normal](#normal)
	- [Create normal](#create-normal)
	- [Delete normal](#delete-normal)
	- [Retrieve normal](#retrieve-normal)
	- [Retrieve normals](#retrieve-normals)
	- [Update normal](#update-normal)
	
- [Priority](#priority)
	- [Create priority](#create-priority)
	- [Delete priority](#delete-priority)
	- [Retrieve priorities](#retrieve-priorities)
	- [Retrieve priority](#retrieve-priority)
	- [Update priority](#update-priority)
	


# Normal

## Create normal



	POST /normals


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| state			| 			|  <p>Normal's state.</p>							|

## Delete normal



	DELETE /normals/:id


## Retrieve normal



	GET /normals/:id


## Retrieve normals



	GET /normals


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update normal



	PUT /normals/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| state			| 			|  <p>Normal's state.</p>							|

# Priority

## Create priority



	POST /priorities


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| state			| 			|  <p>Priority's state.</p>							|

## Delete priority



	DELETE /priorities/:id


## Retrieve priorities



	GET /priorities


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve priority



	GET /priorities/:id


## Update priority



	PUT /priorities/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| state			| 			|  <p>Priority's state.</p>							|


