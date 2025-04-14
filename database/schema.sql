-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    name TEXT,
    email TEXT
);

-- Sessions table
CREATE TABLE sessions (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- requires sessions to have a valid user id, and if a user is deleted also deletes all of their sessions
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    preliminary_information TEXT,
    conversation_history TEXT[],
    outreach_sequence TEXT[]
);

CREATE TABLE known_infos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE
    candidate_name TEXT,
    role TEXT,
    company TEXT,
    desired_tone TEXT,
    key_selling_points TEXT[]
);