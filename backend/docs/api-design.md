# Notes API Design

## Overview
RESTful API endpoints for the Notes feature.

## Data Model

### Notes Table
| Column     | Type       | Constraints           | Description              |
|------------|------------|-----------------------|--------------------------|
| id         | integer    | PRIMARY KEY           | Auto-increment ID        |
| title      | string     | NOT NULL, max: 255    | Note title               |
| content    | text       | NULL                  | Note content (optional)  |
| group_id   | integer    | FOREIGN KEY, NULL     | Associated group (optional) |
| created_at | datetime   | NOT NULL              | Creation timestamp       |
| updated_at | datetime   | NOT NULL              | Last update timestamp    |

### Relationships
- `Note` belongs_to `Group` (optional)
- `Group` has_many `Notes`

## API Endpoints

### 1. List Notes
**Endpoint:** `GET /notes`

**Query Parameters:**
- `group_id` (optional): Filter notes by group ID

**Response:** 200 OK - Array of note objects, sorted by `updated_at` DESC

```json
[
  {
    "id": 1,
    "title": "Meeting Notes",
    "content": "Discussed project timeline...",
    "group_id": 1,
    "created_at": "2026-02-16T10:00:00.000Z",
    "updated_at": "2026-02-16T15:30:00.000Z"
  }
]
```

### 2. Get Note
**Endpoint:** `GET /notes/:id`

**Response:** 200 OK - Single note object

### 3. Create Note
**Endpoint:** `POST /notes`

**Request Body:**
```json
{
  "note": {
    "title": "New Note",
    "content": "Optional content",
    "group_id": 1
  }
}
```

**Required:** `title` (max 255 characters)
**Optional:** `content`, `group_id`

**Response:** 201 Created

**Errors:** 422 Unprocessable Entity (validation errors)

### 4. Update Note
**Endpoint:** `PATCH /notes/:id`

**Request Body:**
```json
{
  "note": {
    "title": "Updated Title",
    "content": "Updated content"
  }
}
```

**Response:** 200 OK

### 5. Delete Note
**Endpoint:** `DELETE /notes/:id`

**Response:** 204 No Content

## Validation Rules

- **title:** Required, max 255 characters
- **content:** Optional, no limit
- **group_id:** Optional, must reference existing group

## CORS Configuration

Allowed origins:
- `localhost:5173` (Vite)
- `localhost:3001` (Next.js)

## Example Usage

```bash
# Create note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"note": {"title": "My Note", "content": "Content here"}}'

# List notes filtered by group
curl http://localhost:3000/notes?group_id=1

# Update note
curl -X PATCH http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"note": {"title": "Updated"}}'

# Delete note
curl -X DELETE http://localhost:3000/notes/1
```
