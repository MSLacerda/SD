import mongoose, { Schema } from 'mongoose'

const ticketSchema = new Schema({
  type: {
    type: String
  },
  state: {
    type: String
  },
  ticket: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

ticketSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      type: this.type,
      state: this.state,
      ticket: this.ticket,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Ticket', ticketSchema)

export const schema = model.schema
export default model
