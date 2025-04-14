CREATE TABLE known_infos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
    candidate_name TEXT,
    role TEXT,
    company TEXT,
    desired_tone TEXT,
    key_selling_points TEXT[]
);