import mongoose, { Schema } from 'mongoose'

const prioritySchema = new Schema({
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

prioritySchema.methods = {
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

const model = mongoose.model('Priority', prioritySchema)

export const schema = model.schema
export default model
