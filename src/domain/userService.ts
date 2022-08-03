
import db from '../models';
import User from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface LoginResponse {
    success: boolean;
    token: string;
}

export class UserService {
    static async findUserByEmail(email: string, raw?: boolean): Promise<typeof db.User> {
        return db.User.findOne({
            where: {
                email
            },
            raw: raw ?? true
        })
    }

    static async loginUser(enteredPassword: string, user: typeof User, jwtExpirySeconds: number): Promise<LoginResponse> {
        if (!(await this.isPasswordCorrect(enteredPassword, user.password))) {
            return {
                success: false,
                token: "",
            }
        }
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: jwtExpirySeconds })
        await db.Session.findOrCreate({
            where: {
                userId: user.id,
            },
            defaults: {
                userId: user.id,
                isLoggedIn: true,
            }
        })
        return {
            success: true,
            token: token,
        }
    }

    static async isPasswordCorrect(enteredPassword: string, userPassword): Promise<boolean> {
        return bcrypt.compare(enteredPassword, userPassword);
    }

    static async updatePassword(userId: number, email: string, enteredPassword: string, currentPassword: string, newPassword: string): Promise<boolean> {
        const user = await this.findUserByEmail(email, false);
        const isPasswordCorrect = await this.isPasswordCorrect(enteredPassword, currentPassword);
        if (isPasswordCorrect && newPassword) {
            const hashPassword = await bcrypt.hash(newPassword, 12);
            user.password = hashPassword;
            await user.save();
            await db.Session.destroy({
                where: {
                    userId,
                }
            })
            return true;
        }

        return false;
    }
}