import { createClient } from 'redis';
import config from 'config'

const client = createClient({
  socket: config.get('redis'),
  password: 'your-password', // optional
  database: 0,               // optional
});

client.on('error', (err) => console.error('Redis error:', err));
client.on('connect', () => console.log('Connected to Redis'));

export async function connectRedis() {
    await client.connect();
    console.log('connected to redis')
}


export default client
