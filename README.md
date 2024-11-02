# Notes App

A hierarchical note-taking application built with React and Node.js, using Supabase for authentication and data storage.

## Project Structure

```
.
├── client/          # React frontend
└── server/          # Node.js backend
```

## Prerequisites

- Node.js 
- npm or yarn
- Supabase account
- Git

## Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

4. Set up Supabase tables:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create notes table
CREATE TABLE notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content JSONB,
  parent_id UUID REFERENCES notes(id),
  is_deleted BOOLEAN DEFAULT false,
  is_starred BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create indexes
CREATE INDEX notes_user_id_idx ON notes(user_id);
CREATE INDEX notes_parent_id_idx ON notes(parent_id);
```

5. Start the development server:
```bash
npm start
```

## Client Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:
```bash
git commit -m 'Add some amazing feature'
```

4. Push to the branch:
```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

### Coding Standards

- Use ESLint and Prettier for code formatting
- Follow the existing project structure
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation when necessary

### Testing

- Write unit tests for new features
- Ensure all existing tests pass
- Test across different browsers

## API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify session
- `GET /api/auth/profile` - Get user profile

### Notes Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `GET /api/notes/starred` - Get starred notes

## Environment Variables

### Server
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

### Client
```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Common Issues

1. **CORS Errors**: Ensure the server's CORS configuration matches your client's domain.
2. **Authentication Errors**: Verify Supabase credentials and token handling.
3. **Database Connection**: Check Supabase connection and permissions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [psr8084@gmail.com] or open an issue in the repository.
