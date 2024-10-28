import bcrypt from 'bcryptjs';

async function generatePasswords() {
    const passwords = {
        admin: 'admin123',
        user: 'user123'
    };

    for (const [username, password] of Object.entries(passwords)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`${username}: ${password} -> ${hashedPassword}`);
    }
}

generatePasswords();
