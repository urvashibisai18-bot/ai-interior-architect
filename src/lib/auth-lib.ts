import crypto from 'crypto';

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

const users = new Map<string, StoredUser>();
const sessions = new Map<string, Session>();

function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, s, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: s };
}

function createToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function handleSignUp(email: string, password: string) {
  const existing = Array.from(users.values()).find(u => u.email === email);
  if (existing) throw new Error('User already exists');

  const id = crypto.randomUUID();
  const { hash, salt } = hashPassword(password);
  const createdAt = new Date().toISOString();

  users.set(id, { id, email, passwordHash: hash, salt, createdAt });

  const token = createToken();
  sessions.set(token, { token, userId: id, createdAt: Date.now() });

  return { user: { id, email, createdAt }, token };
}

export function handleSignIn(email: string, password: string) {
  const user = Array.from(users.values()).find(u => u.email === email);
  if (!user) throw new Error('Invalid email or password');

  const { hash } = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) throw new Error('Invalid email or password');

  const token = createToken();
  sessions.set(token, { token, userId: user.id, createdAt: Date.now() });

  return { user: { id: user.id, email: user.email, createdAt: user.createdAt }, token };
}

export function handleGetSession(token: string) {
  const session = sessions.get(token);
  if (!session) return null;
  const user = users.get(session.userId);
  if (!user) return null;
  return { user: { id: user.id, email: user.email, createdAt: user.createdAt } };
}

export function handleSignOut(token: string) {
  sessions.delete(token);
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
