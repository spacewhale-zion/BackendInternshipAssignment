{
	"info": {
		"_postman_id": "YOUR_COLLECTION_ID",
		"name": "Backend Intern Assignment API",
		"description": "API for User Authentication (with Email Verification) and Task Management.",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "YOUR_EXPORTER_ID"
	},
	"item": [
		{
			"name": "Auth",
			"description": "User registration, login, verification, and profile.",
			"item": [
				{
					"name": "Register User",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"Test User\",\n    \"email\": \"test@example.com\",\n    \"password\": \"password123\",\n    \"adminKey\": \"\" \n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/auth/register",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"auth",
								"register"
							]
						},
						"description": "Registers a new user. Sends a verification email.\n\n- **Success (201):** Returns `{ \"msg\": \"Registration successful! Please check your email...\" }`\n- **User Exists (Unverified) (200):** Returns `{ \"msg\": \"Verification email sent. Please check...\" }`\n- **User Exists (Verified) (400):** Returns `{ \"errors\": [{ \"msg\": \"User already exists\" }] }`\n- **Validation Error (400):** Returns `{ \"errors\": [...] }`\n- **Invalid Admin Key (400):** Returns `{ \"errors\": [{ \"msg\": \"Invalid Admin Key\" }] }`\n\n**To register an admin:** Provide the correct `ADMIN_SECRET_KEY` from your `.env` in the `adminKey` field."
					},
					"response": []
				},
				{
					"name": "Verify Email",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/auth/verify/:token",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"auth",
								"verify",
								":token"
							],
							"variable": [
								{
									"key": "token",
									"value": "YOUR_VERIFICATION_TOKEN_FROM_EMAIL",
									"description": "The token received in the verification email."
								}
							]
						},
						"description": "Verifies the user's email address using the token sent via email.\n\n- **Success (200):** Returns `{ \"msg\": \"Email verified successfully! You can now log in.\" }`\n- **Invalid/Expired Token (400):** Returns `{ \"msg\": \"Invalid or expired verification token.\" }`"
					},
					"response": []
				},
				{
					"name": "Login User",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"test@example.com\",\n    \"password\": \"password123\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/auth/login",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"auth",
								"login"
							]
						},
						"description": "Authenticates a user and returns a JWT token.\n\n- **Success (200):** Returns `{ \"token\": \"YOUR_JWT_TOKEN\" }`\n- **Invalid Credentials (400):** Returns `{ \"errors\": [{ \"msg\": \"Invalid credentials\" }] }`\n- **Email Not Verified (401):** Returns `{ \"errors\": [{ \"msg\": \"Please verify your email address...\" }] }`"
					},
					"response": []
				},
				{
					"name": "Get Current User",
					"request": {
						"auth": {
							"type": "noauth"
						},
						"method": "GET",
						"header": [
							{
								"key": "x-auth-token",
								"value": "{{authToken}}",
								"type": "text",
								"description": "JWT token obtained after login"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/auth/me",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"auth",
								"me"
							]
						},
						"description": "Retrieves the profile information of the currently logged-in user.\n\nRequires a valid JWT token in the `x-auth-token` header.\n\n- **Success (200):** Returns the user object (excluding password).\n- **Unauthorized (401):** If token is missing or invalid."
					},
					"response": []
				}
			]
		},
		{
			"name": "Tasks",
			"description": "CRUD operations for tasks.",
			"item": [
				{
					"name": "Create Task",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							},
							{
								"key": "x-auth-token",
								"value": "{{authToken}}",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"My New Task\",\n    \"description\": \"Details about the task (optional)\",\n    \"status\": \"pending\" \n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/tasks",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"tasks"
							]
						},
						"description": "Creates a new task for the logged-in user.\n\nRequires `x-auth-token` header.\n\n- **Success (201):** Returns the created task object.\n- **Validation Error (400):** If title is missing.\n- **Unauthorized (401):** If token is missing/invalid."
					},
					"response": []
				},
				{
					"name": "Get User Tasks",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-auth-token",
								"value": "{{authToken}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/tasks",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"tasks"
							]
						},
						"description": "Retrieves all tasks belonging to the currently logged-in user.\n\nRequires `x-auth-token` header.\n\n- **Success (200):** Returns an array of task objects.\n- **Unauthorized (401):** If token is missing/invalid."
					},
					"response": []
				},
				{
					"name": "Get Task By ID",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-auth-token",
								"value": "{{authToken}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/tasks/:id",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"tasks",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "YOUR_TASK_ID",
									"description": "The ID of the task to retrieve."
								}
							]
						},
						"description": "Retrieves a single task by its ID.\n\nRequires `x-auth-token` header. User must own the task (or be an admin).\n\n- **Success (200):** Returns the task object.\n- **Not Found (404):** If task ID does not exist.\n- **Unauthorized (401):** If token is missing/invalid or user does not own the task."
					},
					"response": []
				},
				{
					"name": "Update Task",
					"request": {
						"method": "PUT",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							},
							{
								"key": "x-auth-token",
								"value": "{{authToken}}",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"Updated Task Title\",\n    \"description\": \"Updated description\",\n    \"status\": \"completed\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/tasks/:id",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"tasks",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "YOUR_TASK_ID",
									"description": "The ID of the task to update."
								}
							]
						},
						"description": "Updates an existing task.\n\nRequires `x-auth-token` header. User must own the task.\n\n- **Success (200):** Returns the updated task object.\n- **Not Found (404):** If task ID does not exist.\n- **Validation Error (400):** If title is empty.\n- **Unauthorized (401):** If token is missing/invalid or user does not own the task."
					},
					"response": []
				},
				{
					"name": "Delete Task",
					"request": {
						"method": "DELETE",
						"header": [
							{
								"key": "x-auth-token",
								"value": "{{authToken}}",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/tasks/:id",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"tasks",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "YOUR_TASK_ID",
									"description": "The ID of the task to delete."
								}
							]
						},
						"description": "Deletes a task by its ID.\n\nRequires `x-auth-token` header. User must own the task (or be an admin).\n\n- **Success (200):** Returns `{ \"msg\": \"Task removed\" }`\n- **Not Found (404):** If task ID does not exist.\n- **Unauthorized (401):** If token is missing/invalid or user does not own the task."
					},
					"response": []
				},
				{
					"name": "Get All Tasks (Admin)",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-auth-token",
								"value": "{{authToken}}",
								"type": "text",
								"description": "JWT token of an ADMIN user"
							}
						],
						"url": {
							"raw": "{{baseUrl}}/tasks/all",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"tasks",
								"all"
							]
						},
						"description": "**ADMIN ONLY**\n\nRetrieves all tasks from all users. Requires `x-auth-token` header for an admin user.\n\n- **Success (200):** Returns an array of all task objects, populated with user name and email.\n- **Unauthorized (401):** If token is missing/invalid.\n- **Forbidden (403):** If the user is not an admin."
					},
					"response": []
				}
			]
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "baseUrl",
			"value": "http://localhost:5000/api/v1",
			"type": "string",
			"description": "Base URL for the API (versioned)"
		},
		{
			"key": "authToken",
			"value": "",
			"type": "string",
			"description": "JWT token obtained after successful login. Will be automatically added to requests needing authentication if you set it in the collection variables or environment."
		}
	]
}