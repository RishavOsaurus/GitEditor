import User from '../models/user.model.js'

export class UserRepository {
  async findById(id: string) {
    return User.findOne({ id }).lean()
  }

  async findOne(filter: Record<string, any>) {
    return User.findOne(filter).lean()
  }

  async create(payload: Record<string, any>) {
    const doc = new User(payload)
    return doc.save()
  }

  async update(filter: Record<string, any>, update: Record<string, any>) {
    return User.findOneAndUpdate(filter, update, { new: true }).lean()
  }

  async delete(filter: Record<string, any>) {
    await User.deleteOne(filter)
  }
}


