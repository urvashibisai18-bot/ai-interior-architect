import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

interface Session {
  token: string;
  userId: string;
  createdAt: number;
}

const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadJSON<T>(filePath: string): T[] {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch { /* ignore corrupt files */ }
  return [];
}

function saveJSON(filePath: string, data: any) {
  try {
    ensureDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch { /* ignore write errors */ }
}

function loadUsers(): StoredUser[] {
  return loadJSON<StoredUser>(USERS_FILE);
}

function saveUsers(users: StoredUser[]) {
  saveJSON(USERS_FILE, users);
}

function loadSessions(): Session[] {
  return loadJSON<Session>(SESSIONS_FILE);
}

function saveSessions(sessions: Session[]) {
  saveJSON(SESSIONS_FILE, sessions);
}

function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, s, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: s };
}

function createToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function handleSignUp(email: string, password: string) {
  const users = loadUsers();
  const existing = users.find(u => u.email === email);
  if (existing) throw new Error('User already exists');

  const id = crypto.randomUUID();
  const { hash, salt } = hashPassword(password);
  const createdAt = new Date().toISOString();

  users.push({ id, email, passwordHash: hash, salt, createdAt });
  saveUsers(users);

  const token = createToken();
  const sessions = loadSessions();
  sessions.push({ token, userId: id, createdAt: Date.now() });
  saveSessions(sessions);

  return { user: { id, email, createdAt }, token };
}

export function handleSignIn(email: string, password: string) {
  const users = loadUsers();
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('Invalid email or password');

  const { hash } = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) throw new Error('Invalid email or password');

  const token = createToken();
  const sessions = loadSessions();
  sessions.push({ token, userId: user.id, createdAt: Date.now() });
  saveSessions(sessions);

  return { user: { id: user.id, email: user.email, createdAt: user.createdAt }, token };
}

export function handleGetSession(token: string) {
  const sessions = loadSessions();
  const session = sessions.find(s => s.token === token);
  if (!session) return null;
  const users = loadUsers();
  const user = users.find(u => u.id === session.userId);
  if (!user) return null;
  return { user: { id: user.id, email: user.email, createdAt: user.createdAt } };
}

export function handleSignOut(token: string) {
  const sessions = loadSessions().filter(s => s.token !== token);
  saveSessions(sessions);
}

const designsByUser = new Map<string, any[]>();

export function addDesign(userId: string, design: any) {
  if (!designsByUser.has(userId)) designsByUser.set(userId, []);
  const designs = designsByUser.get(userId)!;
  const newDesign = {
    ...design,
    id: crypto.randomUUID(),
    user_id: userId,
    created_at: new Date().toISOString(),
  };
  designs.unshift(newDesign);
  return newDesign;
}

export function getUserDesigns(userId: string) {
  return designsByUser.get(userId) || [];
}

export function deleteUserDesign(userId: string, designId: string) {
  const designs = designsByUser.get(userId);
  if (!designs) return;
  const idx = designs.findIndex((d: any) => d.id === designId);
  if (idx !== -1) designs.splice(idx, 1);
}
