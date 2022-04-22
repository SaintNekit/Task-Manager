import { all } from 'redux-saga/effects'
import sagas from 'sagas'

export default function* () {
  yield all([sagas()])
}
