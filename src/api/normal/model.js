import mongoose, { Schema } from 'mongoose'

const normalSchema = new Schema({
  state: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

normalSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      state: this.state,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Normal', normalSchema)

export const schema = model.schema
export default model
