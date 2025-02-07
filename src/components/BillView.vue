<template>
    <div>
        <!--This generates the list of bills on first load if billList is true, billOpen is false and loaded is true-->
        <div v-if="billlist && billOpen == false && loaded"
            class="p-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <TransitionGroup name="list" appear>
                <div class="h-100 min-w-48 ml-[-16px]" v-for="(bill, index) in billlist" :key="index"
                    @click="openBill(bill.bill_number)">
                    <div class="flex">
                        <div class="flex flex-col justify-between ml-[-16px]">
                            <svg class="opacity-70 " viewBox="0 0 100 100" height="50" width="50">
                                <circle cx="100" cy="20" r="20" :fill="selectCircleFill(bill.status)" />
                            </svg>

                        </div>
                        <div
                            class="p-4 border-slate-400 rounded-r-xl rounded-b-md bg-white drop-shadow-md hover:drop-shadow-lg cursor-pointer">
                            <h3 class="font-medium pb-2">{{ bill.title }}</h3>
                            <hr>
                            <div class="text-xs pt-2">
                                <h3>{{ bill.bill_number }} Sponsored by:</h3>
                            </div>
                            <div class="text-sm">
                                <h4 v-if="bill.sponsor"> {{ bill.sponsor.role }}. {{ bill.sponsor.name }} ({{ bill.sponsor.party }})</h4>
                                <h4 v-else>No Sponsor Information</h4>
                            </div>
                            <div class="text-sm py-2 leading-6">
                                <p> {{ bill.general_provisions }}</p>
                            </div>
                            <div class="text-xs pt-2 flex flex-wrap justify-between ">
                                <div class="pb-1 w-[80%]">
                                    <h5>Last Action: {{ bill.last_action }} on {{ bill.last_action_time }}</h5>
                                </div>
                                <div class=" self-end text-center text-md"><i
                                        class="fa-solid fa-plus text-slate-700"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
        <!--This generates the list of bills on first load if billOpen, billLoaded and billDetail is true-->
        <div v-else-if="billOpen && billLoaded && billDetail" class="p-6">
            <div class="p-6 rounded-3xl grid grid-cols-1 md:grid-cols-4 grid-rows-auto shadow-xl bg-white">
                <!--Title and close button-->
                <div class="p-2 mb-2 flex justify-between col-span-1 md:col-span-4 row-span-1 w-full">
                    <div class="text-xl md:text-2xl font-bold">{{ billDetail.title }}</div>
                    <i @click="billClosed" class=" fa-solid fa-xmark cursor-pointer text-2xl"></i>
                </div>
                <!--Summary, Details, Budget, Votes, Last Action-->
                <div class="flex flex-col justify-between h-full p-2 col-span-1 md:col-span-3">
                    <div class="w-full">
                        <div class="w-full mb-2">
                            <div class="pb-2">{{ billDetail.general_provisions }}
                            </div>
                        </div>
                        <div class=" my-4 p-2 px-3 rounded-md bg-stone-100">
                            <Disclosure v-slot="{ open }">
                                <DisclosureButton class="w-full">
                                    <div class="flex justify-between align-center w-full">
                                        <div class="self-center text-lg">Details</div><i
                                            class="fa-solid fa-chevron-down self-center"
                                            :class="open && 'rotate-180 transform transition-transform'"></i>
                                    </div>
                                </DisclosureButton>
                                <DisclosurePanel>
                                    <div class=""
                                        v-for="(item, index) in textFormatter(billDetail.hilighted_provisions)"
                                        :key="index">
                                        <p class="mt-2">{{ item }}</p>
                                    </div>
                                </DisclosurePanel>
                            </Disclosure>
                        </div>
                        <!--if monies is greator than th-->
                        <div class="p-2 px-3 rounded-md bg-stone-100" v-if="moniesNotEmpty(billDetail.monies)">
                            <Disclosure v-slot="{ open }">
                                <DisclosureButton class="w-full">
                                    <div class="flex justify-between w-full">
                                        <div class="self-center text-lg">Budget</div><i
                                            class="fa-solid fa-chevron-down self-center "
                                            :class="open && 'rotate-180 transform transition-transform'"></i>
                                    </div>
                                </DisclosureButton>
                                <DisclosurePanel as="div" class="">
                                    <div class="" v-for="(item, index) in textFormatter(billDetail.monies)"
                                        :key="index">
                                        <p class="mt-2">{{ item }}</p>
                                    </div>
                                </DisclosurePanel>
                            </Disclosure>
                        </div>
                        <div v-else class="p-2 px-3 rounded-md bg-stone-100 w-fit">No Budget Allocated</div>
                    </div>
                    <div class="pb-2">
                        <div class="mt-8 mb-3 text-2xl">Votes</div>
                        <div class="grid grid-cols-1 md:grid-cols-2">
                            <div class="w-full mt-1">
                                <p class="text-lg">House</p>

                                <div class="flex flex-wrap" v-for="(rollcall, index) in billDetail.votes" :key="index">
                                    <div class="grid grid-cols-4 w-full mr-2 mb-2 mt-2 p-2 border-2 rounded-md cursor-pointer"
                                        v-if="rollcall.chamber == 'H'" @click="openRollCallPage(rollcall.state_link)">
                                        <div class="col-span-4">{{ rollcall.desc }} <i
                                                class="fa-solid fa-arrow-up-right-from-square"></i></div>
                                        <hr class="col-span-4 mb-2">
                                        <i class="fa-solid fa-thumbs-up"></i><i class="fa-solid fa-thumbs-down"></i>
                                        <div>NV</div>
                                        <div>Absent</div>
                                        <div>{{ rollcall.yea }}</div>
                                        <div>{{ rollcall.nay }}</div>
                                        <div>{{ rollcall.nv }}</div>{{ rollcall.absent }}
                                    </div>
                                </div>
                            </div>
                            <div class="w-full mt-1">
                                <p class="text-lg">Senate</p>

                                <div v-for="(rollcall, index) in billDetail.votes" :key="index">
                                    <div class="grid grid-cols-4 w-full mr-2 mb-2 mt-2 p-2 border-2 rounded-md cursor-pointer"
                                        v-if="rollcall.chamber == 'S'" @click="openRollCallPage(rollcall.state_link)">
                                        <div class="col-span-4">{{ rollcall.desc }} <i
                                                class="fa-solid fa-arrow-up-right-from-square"></i></div>
                                        <hr class="col-span-4 mb-2">
                                        <i class="fa-solid fa-thumbs-up"></i><i class="fa-solid fa-thumbs-down"></i>
                                        <div>NV</div>
                                        <div>Absent</div>
                                        <div>{{ rollcall.yea }}</div>
                                        <div>{{ rollcall.nay }}</div>
                                        <div>{{ rollcall.nv }}</div>{{ rollcall.absent }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="flex align-center">
                            <div class="flex justify-center w-max-fit p-2 px-3 mr-2 rounded-md self-center text-white"
                                :class="selectBGColor(billDetail.status)">{{ billStatus }}</div>
                            <div class="self-center">Last Action: {{ billDetail.last_action }},
                                {{ billDetail.last_action_owner }} on {{ convertBillDate(billDetail.last_action_time) }}
                            </div>
                        </div>
                    </div>
                </div>
                <!--Bill number, Committees, Seer and Full bill Text links-->
                <div class="pl-2 col-span-1 md:col-span-1 flex flex-col">
                    <div class="mb-2">
                        <div class=" mb-2">{{ convertBillNumberPeriod(billNumber) }}</div>
                        <div class="p-2 px-3 bg-stone-100 rounded-md">
                            <div class="mb-1">Sponsors</div>
                            <div class="text-sm" v-for="(sponsor, index) in billSponsors" :key="index">{{
            sponsor.sponsor
        }}:
                                {{ sponsor.role }} {{ sponsor.name }} {{ sponsor.party }}</div>
                        </div>
                        <div class="mt-2 pb-2">
                            <div class="p-2 px-3 bg-stone-100 rounded-md">
                                <div class="mb-1">Committees</div>
                                <div class="text-sm" v-for="(committee, index) in committees" :key="index">{{ committee
                                    }}
                                </div>
                            </div>
                            <div class=" mt-2 p-2 px-3 bg-stone-100 rounded-md" v-if="committeeRec.length != 0">
                                <div class="mb-1">Recommended by:</div>
                                <div class="text-sm" v-for="(committeerec, index) in committeeRec" :key="index">
                                    {{ committeerec.committee }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="pb-2">
                        <div>Your Representatives</div>
                        <div>Name vote</div>
                    </div> -->
                    <div class="flex flex-col h-full justify-end">
                        <!-- <div v-if="seerPageExists(billDetail.bill_number)" @click="openSeerPage(billDetail.bill_number)"
                            class="flex justify-center w-full p-1 py-2 mb-2 rounded-md bg-slate-200 drop-shadow-sm cursor-pointer
                            hover:bg-slate-300 hover:drop-shadow-md ">AI Seer
                            Summary</div> -->
                        <div @click="openBillPage(billDetail.state_link)" class="flex justify-center w-full p-1 py-2 rounded-md bg-slate-200 drop-shadow-sm cursor-pointer 
                            hover:bg-slate-300 hover:drop-shadow-md ">
                            <div class="mr-2">Full Bill Text</div>
                            <div><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--This displays a message when the list of bills is empty-->
        <div v-else-if="!billlist" class="flex justify-center align-center w-full h-full">
            <p class="text-2xl self-center text-slate-600 mt-[20%] h-full">No Bills to Display</p>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'

import { data } from '../shared/data'
import { isValid } from 'date-fns'


const props = defineProps({
    status: String,
    billlist: Array,
    billopen: Boolean
})


//  Bill Variables
let billOpen = ref(false)
let billDetail = ref()
let billNumber = ref()
let billStatus = ref()
let loaded = ref(false)
let billLoaded = ref(false)
let billSponsors = ref()
let committees = ref()
let committeeRec = ref()




// Function call checks if the promise is resolved to change the loaded value to true
loadBillData(props.billlist)
    .then(loaded.value = true)
    .catch(error => {
        console.log(error)
    })

// Function creates a promise that checks to see when the billList is an array or if needed I can pass in the billDetail to see if it is a valid object
function loadBillData(billList) {
    let promise = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            if (Array.isArray(billList)) {
                clearInterval(interval)
                resolve(billList)
            } else if (typeof billList === 'object' && billList !== null) {
                clearInterval(interval)
                resolve(billList)
            }
        }, 50)
    })
    return promise
}


// Function to load data from bill file into billDetail
async function loadData() {
    let billData = await data.getBillData(billNumber.value) // returns a promise but the await keyword 
    billDetail.value = billData
    billLoaded.value = true
    toggleBillDetail()
    billSponsors.value = convertSponsors(billDetail.value.sponsors)
    committees.value = convertCommittees(billDetail.value.action_history)
    committeeRec.value = billDetail.value.comrecommend
    billStatus.value = convertBillStatus(billDetail.value.status)
}

// Calls the function that gets and converts the bill number to match the file, loads the data, waits until the data is loaded for the UI, 
function openBill(billnumber) {
    window.scrollTo({ top: 250, left: 0, behavior: 'smooth' });
    billNumber.value = convertBillNumberNone(billnumber)
    loadData()
    emit('billOpened')
    // loadBillData(billDetail)
    // .then( ))
    // .catch(error => {
    //         console.log(error)
    // })
}

// Toggles the bill open value on click
function toggleBillDetail() {
    billOpen.value = !billOpen.value
}

// Emits to transmit the state of the child component to the parent 
const emit = defineEmits(['billOpened', 'billClosed', 'resetBillOpen'
])

// Watches the parent's billOpen variable to close the bill detail when the parent's billOpen variable is set to true
watch(() => props.billopen, (newVal) => {
    if (newVal === true) {
        billOpen.value = false // closes the bill detail when the parent's billOpen variable is set to true
        emit('resetBillOpen') // parent's billOpen variable needs to be reset to false after it was set to open that triggered the watch
    }
})

// Function to close the bill 
function billClosed() {
    billOpen.value = false
    emit('billClosed')
}


// Converts bill number to have period
function convertBillNumberNone(billnumber) {
    let newBillNumber = billnumber.replace(/\./g, '')
    return newBillNumber
}

// Converts the bill number to have a period at the first group
function convertBillNumberPeriod(billnumber) {
    //regex helped by ChatGPT to make HB0001 into H.B.0001
    let newBillNumber = billnumber.replace(/([A-Z])/g, '$1.')
    return newBillNumber
}

// Converts the date and converts invalid dates that don't have a 0 in front of the 9 in the UTC format
function convertBillDate(billDate) {
    if (billDate === '' || null || undefined) {
        return "No Date Available"
    } else {
        let oldBillDate = new Date(billDate)
        // regex helped with by chatGPT
        let newBillDate = `${oldBillDate.getMonth() + 1}/${oldBillDate.getDate()}/${oldBillDate.getFullYear()}`

        if (!isValid(oldBillDate)) {
            let tDate = billDate.split('T')
            let tDate2 = `0${tDate[1]}`
            let joinDate = `${tDate[0]}T${tDate2}`
            // console.log(joinDate)
            let newDate = new Date(joinDate)
            // console.log(newDate)
            let newBillDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
            return newBillDate
        } else {
            return newBillDate
        }
    }
}

// textFormatter for the Detail and Budgets section that have old XML tags in them. Can add more functions to this
function textFormatter(text) {
    let textNoHTML = removeHTMLTags(text)
    let textSplit = textToUlFormatter(textNoHTML)

    return textSplit
}



// Function to remove old XML tags
function removeHTMLTags(text) {
    let newText = text.replace(/<hr>/g, ' ').replace(/<ltbullet>/g, ' ').replace(/<ltbullet1>/g, ' ')
    return newText
}

function textToUlFormatter(text) {
    let newText = text.split([';'])
    let newArray = []
    newText.forEach((element) => {
        let trimmed = element.trim()

        if (trimmed.endsWith('.')) {
            let uppercase = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);


            newArray.push(uppercase)


        } else {
            let concanted = trimmed.concat(';')
            let uppercase = concanted.charAt(0).toUpperCase() + concanted.slice(1);

            newArray.push(uppercase)
        }
    })

    return newArray
}

//Function to check if monies is empty and conditional render the section

function moniesNotEmpty(monies) {
    if (monies.length === 0 || monies === null || monies === undefined || monies === "None") {
        return false
    } else {
        return true
    }
}


// Function that matches the Legiscan Api and the role types
function convertSponsors(sponsors) {
    let genericSponsor
    let coSponsor
    let jointSponsor
    let billSponsor

    let sponsorArray = []
    if (!sponsors) {
        sponsorArray.push({ sponsor: "Bill Sponsor", name: "No Sponsor" })
    }

    for (let i = 0; i < sponsors.length; i++) {

        if (sponsors[i].role_id == 0) {
            genericSponsor = sponsors[i].name
            sponsorArray.push({ sponsor: "Sponsor", name: genericSponsor, role: `${sponsors[i].role}.`, party: `(${sponsors[i].party})` })
        } else if (sponsors[i].role_id == 1) {
            billSponsor = sponsors[i].name
            sponsorArray.push({ sponsor: "Bill Sponsor", name: billSponsor, role: `${sponsors[i].role}.`, party: `(${sponsors[i].party})` })
        } else if (sponsors[i].role_id == 2) {
            coSponsor = sponsors[i].name
            sponsorArray.push({ sponsor: "Floor Sponsor", name: coSponsor, role: `${sponsors[i].role}.`, party: `(${sponsors[i].party})` })
        } else if (sponsors[i].role_id == 3) {
            jointSponsor = sponsors[i].name
            sponsorArray.push({ sponsor: "Joint Sponsor", name: jointSponsor, role: `${sponsors[i].role}.`, party: `(${sponsors[i].party})` })
        }
    }

    return sponsorArray
}

// From geeksforgeeks example
function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}

function convertCommittees(actionHistory) {
    if (!actionHistory) {
        return []
    }
    let committeeArray = []

    actionHistory.forEach((action) => {
        for (let key in action) {
            if (action[key].includes('Committee') && !action[key].includes('Report')) {
                committeeArray.push(action[key])
            }
        }
    })

    //
    committeeArray = removeDuplicates(committeeArray)
    // for (let i = 0; i < actionHistory.length; i++) {
    //     for ( let committee in actionHistory) {
    //         console.log(committee.location)
    //         if (committee.includes("Committee")) {
    //             committeeArray.push({ committee: committee.location})
    //         }
    //     }
    // }
    return committeeArray
}

// function convertCommitteeRec(comRec) {
//     if (!comRec) {
//         return []
//     }
//     let comrecommend = []

//     comRec.forEach((action) => {
//         for (let key in action) {
//             console.log(action[key].committee)
//             if (action[key].committee) {
//                 comrecommend.push(action[key].committee)
//             }
//         }
//     })


//     return comrecommend
// }

function convertBillStatus(num) {
    let newNum = num
    if (typeof num !== 'number') {
        newNum = Number(num)
    }
    switch (newNum) {
        case 0:
            return "Prefiled";
        case 1:
            return "Introduced";
        case 2:
            return "Engrossed"
        case 3:
            return "Enrolled"
        case 4:
            return "Signed"
        // it's Passed in the Legiscan API
        case 5:
            return "Vetoed"
        case 6:
            return "Failed"
        case 7:
            return "Override"
        case 8:
            return "Chaptered"
        case 9:
            return "Refer"
        case 10:
            return "Report Pass"
        case 11:
            return "Report DNP"
        case 12:
            return "Draft"
        case 13: 
            return "Reconsidered"
    }
}

//function to select the circle color based on status
function selectCircleFill(num) {
    let newNum = num
    if (typeof num !== 'number') {
        newNum = Number(num)
    }
    switch (newNum) {
        case 0:
            return '#D6CD3A';
        case 1:
            return "#A644A1";
        case 2:
            return "#0fabc1"
        case 3:
            return "#78589C"
        case 4:
            return "#46A314"
        // it's Passed in the Legiscan API
        case 5:
            return "#E58F07"
        case 6:
            return "#B33A0B"
        case 7:
            return "#06556B"
        case 8:
            return "#06556B"
        case 9:
            return "#06556B"
        case 10:
            return "#06556B"
        case 11:
            return "#06556B"
        case 12:
            return "#06556B"
        case 13:
            return "#000000"
    }
}

//Select the BG color for the status in billDetail view

function selectBGColor(num) {
    let newNum = num
    if (typeof num !== 'number') {
        newNum = Number(num)
    }
    switch (newNum) {
        case 0:
            return 'bg-[#D6CD3A]';
        case 1:
            return "bg-[#A644A1]";
        case 2:
            return "bg-[#0fabc1]"
        case 3:
            return "bg-[#78589C]"
        case 4:
            return "bg-[#46A314]"
        // it's Passed in the Legiscan API
        case 5:
            return "bg-[#E58F07]"
        case 6:
            return "bg-[#B33A0B]"
        case 7:
            return "bg-[#06556B]"
        case 8:
            return "bg-[#06556B]"
        case 9:
            return "bg-[#06556B]"
        case 10:
            return "bg-[#06556B]"
        case 11:
            return "bg-[#06556B]"
        case 12:
            return "bg-[#06556B]"
        case 13:
            return "bg-[#000000]"
    }
}


function openBillPage(url) {
    window.open(url, '_blank')
}

function openSeerPage(number) {
    let num = convertBillNumberNone(number)
    window.open(`https://www.sltrib.com/utah-bill-tracker/${num}/`, '_blank')
}

function seerPageExists(number) {
    // console.log(number)
    let num = convertBillNumberNone(number)
    // There's only around 200 bills listed on the site, but i think every one has a url and is findable, will text by returning true. 
    // if (num.includes("HB", "SB", "SCR", "HCR")) {
    //     return true
    // } else {
    //     return false
    // }
    return true
}

function openRollCallPage(url) {
    window.open(url, '_blank')
}


</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


</style>