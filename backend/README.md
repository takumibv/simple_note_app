# Simple Note App - Backend

Rails API backend for the Simple Note App.

## Requirements

- Ruby 3.4.8
- SQLite3

## Setup

```bash
# Install dependencies
bundle install

# Setup database
bin/rails db:prepare

# Or use the setup script (also starts server)
bin/setup

# Start server without setup script
bin/rails server
```

The server runs on `http://localhost:3000` by default.

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |

### Groups
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/groups` | List all groups |
| GET | `/groups/:id` | Get a group |
| POST | `/groups` | Create a group |
| PATCH | `/groups/:id` | Update a group |
| DELETE | `/groups/:id` | Delete a group |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | List all notes |
| GET | `/notes/:id` | Get a note |
| POST | `/notes` | Create a note |
| PATCH | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/up` | Health check endpoint |

## Database

- **Development/Test**: SQLite (stored in `storage/` directory)
- **Production**: PostgreSQL ([Neon](https://neon.tech/))

### Models
- **User**: email, password_digest
- **Group**: name, belongs_to user
- **Note**: title, content, belongs_to user, belongs_to group

## Testing

```bash
bin/rails test
```

## Code Quality

```bash
# Linting (RuboCop with Rails Omakase)
bin/rubocop

# Security analysis
bin/brakeman

# Dependency audit
bin/bundler-audit
```

## Deployment

### Render (Recommended)

Uses [Render](https://render.com/) with [Neon](https://neon.tech/) PostgreSQL.

1. Connect your GitHub repository to Render
2. Create a new Web Service, select the `backend` directory
3. Set environment variables in Render dashboard:
   - `DATABASE_URL`: Neon connection string (get from Neon dashboard)
   - `RAILS_MASTER_KEY`: Value from `config/master.key`
4. Deploy

Configuration: `render.yaml`

### Kamal (Alternative)

Uses [Kamal](https://kamal-deploy.org/) for Docker-based deployment to your own server.

```bash
bin/kamal deploy
```

Configuration: `config/deploy.yml`
