import { jwtVerify } from 'jose';
export async function checkAdminRole(secret: string): Promise<string> {
      const token = localStorage.getItem('admin_token');
        if (!token) {
            return 'user';
        }
        try {
            const {payload}  = await jwtVerify(token, new TextEncoder().encode(secret));
            if (payload.role === 'admin') {
                return 'admin';
            }
        } catch (error) {
            return 'user';
        }
        return 'user';
}