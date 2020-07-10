import firebase from '@/helpers/firebase'
const firebaseStore = firebase.firestore
// Parse the snapshot
const parseSnapShot = (snapShot = null) => {
  const objData = [] // Initial state of data
  if (!snapShot) return objData

  // If there is any data, store this
  if (!snapShot.empty) {
    snapShot.forEach(doc => {
      if (doc.exists) {
        const data = doc.data()
        data.id = doc.id

        objData.push(data)
      }
    })
  }

  return objData
}

export default {
  namespaced: true,
  state: {
    collection: 'car_list',
    activeRowId: null,
    dataArr: []
  },
  getters: {
    getData: state => state.dataArr, // Get the stored data arr
    getRowId: state => state.activeRowId // Get active document id
  },
  mutations: {
    // Store the received data
    setData (state, stat = []) {
      state.dataArr = stat
    },

    // Store the document id
    setRowId (state, stat = null) {
      state.activeRowId = stat
    }
  },
  actions: {
    // Fetch data
    fetchData ({ commit, state }, refresh) {
      return new Promise((resolve, reject) => {
        // Check if data is already present sent it back
        if (state.dataArr.constructor === Array && state.dataArr.length > 0 && refresh === false) return resolve(state.dataArr)

        return firebaseStore.collection(state.collection).get()
          .then(snapshot => {
            const objData = parseSnapShot(snapshot) // Fetch data from snapshot

            // Store and return data
            commit('setData', objData)
            resolve(objData)
          })
          .catch(err => reject(err))
      })
    },

    // Save / Manage data
    saveData ({ dispatch, state }, { id, ...data }) {
      return new Promise((resolve, reject) => {
        if (typeof data !== 'object' || Object.keys(data).length === 0) return reject(new Error('Invalid values provided to process !'))

        let collection = firebaseStore.collection(state.collection)
        collection = (id && id !== null && typeof id !== 'undefined') ? collection.doc(id) : collection.doc()

        collection.set(data)
          .then(() => {
            dispatch('fetchData', true)
            resolve(true)
          })
          .catch(err => reject(err))
      })
    },

    // Delete data
    deleteData ({ dispatch, state }, id = null) {
      return new Promise((resolve, reject) => {
        if (typeof id === 'undefined' || id === null) return reject(new Error('Invalid values provided to process !'))

        let collection = firebaseStore.collection(state.collection)
        collection = collection.doc(id)

        collection.delete()
          .then(() => {
            dispatch('fetchData', true)
            resolve(true)
          })
          .catch(err => reject(err))
      })
    }
  }
}
