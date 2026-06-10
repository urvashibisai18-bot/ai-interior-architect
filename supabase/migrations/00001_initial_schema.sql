CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,
  dimensions JSONB,
  budget INTEGER,
  style TEXT,
  colors JSONB,
  furniture JSONB,
  lighting TEXT,
  ai_suggestions JSONB,
  total_cost INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_designs_user_id ON designs(user_id);
CREATE INDEX idx_designs_created_at ON designs(created_at DESC);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id UUID REFERENCES designs(id) ON DELETE CASCADE,
  user_message TEXT,
  ai_response TEXT,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_design_id ON chat_messages(design_id);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own designs" ON designs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own designs" ON designs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert chat messages" ON chat_messages FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM designs WHERE id = design_id AND user_id = auth.uid()));
CREATE POLICY "Users can read own chat messages" ON chat_messages FOR SELECT USING (EXISTS (SELECT 1 FROM designs WHERE id = design_id AND user_id = auth.uid()));
