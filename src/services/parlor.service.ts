import * as bcrypt from 'bcrypt'
import * as Jwt from 'jsonwebtoken'
import { Parlor, } from '../instances/sequelize'

export class ParlorService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = '0.rfyj3n9nzh'

    static get userAttributes() {
        return ['id', 'mobile']
    }
    private static _parlor
    static get parlor() {
        return ParlorService._parlor
    }

    register({ mobile, password, id }: any) {
        if(!password) return null;
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return Parlor.create({ id, mobile, password: hash })
                    .then(u => this.getParlorById(u!.id))
            })
    }

    login({ mobile }: any) {
        return Parlor.findOne({ where: { mobile } }).then(u => {
            if(u==null) throw "Invalid User"
            const { id, mobile } = u!
            return { token: Jwt.sign({ id, mobile }, this._jwtSecret, { expiresIn: '7d' }) }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, this._jwtSecret, (err, decoded: any) => {
                if (err) {
                    resolve(false)
                    return
                }

                ParlorService._parlor = Parlor.findByPk(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getParlorById(id: string) {
        return Parlor.findByPk(id, {
            attributes: ParlorService.userAttributes
        })
    }
}