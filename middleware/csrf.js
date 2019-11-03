import { v4 as uid } from 'uuid'

export default function({ res }) {
  res.cookie('csrfToken', uid())
}
