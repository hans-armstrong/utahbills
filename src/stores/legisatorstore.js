import { defineStore } from 'pinia'

export const useLegStore = defineStore('legstore', {
    state: () => ({
        legstore: []
    }),
    actions: {
        addPerson(person) {
            this.legstore.push(person)
        },
        removePerson(person) {
            if (this.legstore.includes(person)) {
                let newArray = legstore.filter((p) => p !== person)
        } }
    }
})