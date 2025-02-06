<template>
    <div class="flex flex-wrap">
        <Combobox as="div" class="relative rounded-md  w-fit h-fit mb-4" v-model="selectedPerson">
            <ComboboxInput class="bg-white rounded-md p-2 text-blue-950 drop-shadow-sm" @change="query = $event.target.value" @keyup.enter="addLegislator(selectedPerson)"/>
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="fa-solid fa-arrows-up-down"></i>
            </ComboboxButton> 
            <ComboboxOptions class="absolute w-full md:w-[350%] lg:w-[400%] bg-white border-[1px] rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 flex drop-shadow-sm z-20">
                <ComboboxOption class="cursor-pointer hover:text-blue-950 hover:font-bold" v-for="person in filteredPeople" :key="person" :value="person" @click="addLegislator(person)">
                    {{ person }}
                </ComboboxOption>
             </ComboboxOptions> 
        </Combobox>
        <div>
            <button @click="onlyAddLegislator(selectedPerson)" class="p-2 px-4 mx-3 rounded-full border-w-[1px] bg-amber-100 hover:bg-amber-200 drop-shadow-sm">Add</button>
        </div>
        
        <div v-for="(person, index) in selectedPeople" :key="index" class="ml-2">
            <div class="p-2 px-4  border-2 rounded-3xl cursor-pointer bg-white hover:bg-amber-200 drop-shadow-sm" @click="addLegislator(person)">{{ person }}</div>
        </div>
    </div>
</template>

<script setup>
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    ComboboxButton,
} from '@headlessui/vue'
import { ref, computed } from 'vue'
import { useLegStore } from '../stores/legisatorstore'

// Complete list of 104 representatives
const people = [
    'Andrew Stoddard',
    'Angela Romero',
    'Ann Millner',
    'Anthony Loubet',
    'Ariel Defay',
    'Ashlee Matthews',
    'Brady Brammer',
    'Brett Garner',
    'Brian King',
    'Bridger Bolinder',
    'Calvin Musselman',
    'Candice Pierucci',
    'Carl Albrecht',
    'Carol Moss',
    'Casey Snider',
    'Cheryl Acton',
    'Chris Wilson',
    'Christine Watkins',
    'Colin Jack',
    'Cory Maloy',
    'Curtis Bramble',
    'Dan Johnson',
    'Daniel McCay',
    'Daniel Thatcher',
    'David Buxton',
    'David Hinkins',
    'Derrin Owens',
    'Don Ipson',
    'Doug Owens',
    'Doug Welton',
    'Evan Vickers',
    'Gay Lynn Bennion',
    'Heidi Balderree',
    'James Cobb',
    'James Dunnigan',
    'Jason Kyle',
    'Jefferson Burton',
    'Jefferson Moss',
    'Jeffrey Stenquist',
    'Jen Plumb',
    'Jennifer Dailey-Provost',
    'Jerry Stevenson',
    'Joel Briscoe',
    'John Johnson',
    'Jon Hawkins',
    'Jordan Teuscher',
    'Joseph Elison',
    'Judy Rohner',
    'Karen Kwan',
    'Karen Peterson',
    'Karianne Lisonbee',
    'Kathleen Riebe',
    'Katy Hall',
    'Kay Christofferson',
    'Keith Grover',
    'Ken Ivory',
    'Kera Birkeland',
    'Keven Stratton',
    'Kirk Cullimore',
    'Lincoln Fillmore',
    'Luz Escamilla',
    'Mark Strong',
    'Mark Wheatley',
    'Marsha Judkins',
    'Matt MacPherson',
    'Matthew Gwynn',
    'Melissa Ballard',
    'Michael Kennedy',
    'Michael Petersen',
    'Mike Kohler',
    'Mike McKell',
    'Mike Schultz',
    'Nate Blouin',
    'Neil Walter',
    'Nelson Abbott',
    'Norman Thurston',
    'Paul Cutler',
    'Phil Lyman',
    'Raymond Ward',
    'Rex Shipp',
    'Robert Spendlove',
    'Ronald Winterton',
    'Rosemary Lesser',
    'Ryan Wilcox',
    'Sahara Hayes',
    'Sandra Hollins',
    'Scott Chew',
    'Scott Sandall',
    'Stephanie Gricius',
    'Stephanie Pitcher',
    'Stephen Whyte',
    'Steve Eliason',
    'Steven Lund',
    'Stewart Barlow',
    'Stuart Adams',
    'Susan Pulsipher',
    'Thomas Peterson',
    'Tim Jimenez',
    'Todd Weiler',
    'Trevor Lee',
    'Tyler Clancy',
    'Val Peterson',
    'Walt Brooks',
    'Wayne Harper',
]
const selectedPerson = ref(people[0])
const query = ref('')
const selectedPeople = ref(getPeople())

const legStore =  useLegStore()


// Gets the people array from local storage if it exists, if not creates an empty array
function getPeople() {
    let storageItems = localStorage.getItem('people')
    console.log(storageItems)
    if(!storageItems) {
        localStorage.setItem('people',  JSON.stringify([]))
        return []
    } else {
        let array = JSON.parse(storageItems)
        console.log(array)
        return array
    }
}


// Filters the text to see if matches people, if not loops through each in lowercase to match
const filteredPeople = computed(() =>
    query.value === ''
        ? people
        : people.filter((person) => {
            return person.toLowerCase().includes(query.value.toLowerCase())
        })
)

// function to add legislators if they aren't on the people array and take them off if they are
function addLegislator(person) {
    if (selectedPeople.value.includes(person)) {
        let newArray = selectedPeople.value.filter((p) => p !== person)
        selectedPeople.value = newArray
        localStorage.setItem("people", JSON.stringify([...newArray]))
    } else  {
        selectedPeople.value.push(person)
        // legStore.addPerson(person)
        localStorage.setItem("people", JSON.stringify([...selectedPeople.value]))
    }
}

// For the add button so that it only adds people
function onlyAddLegislator(person) {
    if (!selectedPeople.value.includes(person)) {
        selectedPeople.value.push(person)
        // legStore.$state = selectedPeople.value
        localStorage.setItem("people", JSON.stringify([...selectedPeople.value]))
    }
}

// console.log(people)
</script>