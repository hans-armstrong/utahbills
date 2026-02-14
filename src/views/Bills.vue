<template>
    <div class="bills py-12 px-4 max-w-screen-2xl">
        <h1 class="py-4">2026 General Session Bills</h1>
        <div class="flex flex-col">
            <span>Last updated: 2/14/26 3:00 P.M. CST</span>
            <span>Small bug where the resolution bills (HR/SR) don't show the correct status, will fix soon!</span>
        </div>

        <div></div>
        <!--Transition for Subjects Dialog box taken from example on Headless UI-->
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-10">
                <TransitionChild as="div" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                    leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <!-- background color-->
                    <div class="fixed inset-0 bg-black/25" />
                </TransitionChild>

                <!--Div to set the diaglog box across entire screen-->
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="div" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="w-full max-w-3xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-white">
                                <DialogTitle as="h2" class="text-lg mb-2 font-medium leading-6 text-gray-900">
                                    Subjects
                                </DialogTitle>
                                <div class="mt-2">
                                    <div class="flex flex-wrap mt-2">
                                        <div v-for="(subject, index) in selectedSubjects" :key="index"
                                            class="text-sm p-1.5 w-fit px-3 pt-2 mb-2 mr-1 border-2 rounded-3xl hover:bg-slate-400"
                                            @click="addSubjectsToSelected(subject)"> {{ subject
                                            }} </div>
                                        <div class="text-slate-400 mb-1.5" v-if="selectedSubjects.length == 0">Please
                                            Select Subjects</div>
                                    </div>
                                    <hr>
                                    <h4 class="mt-4">Most Popular</h4>
                                    <div class="flex flex-wrap mt-2">
                                        <div v-for="(subject, index) in subjectList[0].ten_popular" :key="index"
                                            class="p-1.5 px-3 pt-2 mb-1 mr-1 border-2 rounded-3xl hover:bg-slate-400"
                                            @click="addSubjectsToSelected(subject)">
                                            {{ subject }}
                                        </div>
                                    </div>
                                    <Disclosure>
                                        <DisclosureButton class="w-full mt-4">
                                            <div class="flex justify-between align-center w-full border-b-2">
                                                <div class="self-center my-2">All Subjects</div><i
                                                    class="fa-solid fa-chevron-down self-center"></i>
                                            </div>
                                        </DisclosureButton>
                                        <DisclosurePanel class="w-full mt-2">
                                            <div class="text-sm hover:border-b-2 cursor-pointer"
                                                v-for="(subject, index) in allSubjects" :key="index"
                                                @click="addSubjectsToSelected(subject, false)">
                                                {{ subject }}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </div>

                                <div class="mt-4 w-full flex">
                                    <button type="button"
                                        class="rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        @click="closeModal">
                                        Submit
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
        <!--End of Transition-->
        <div class="grid grid-cols-3 md:grid-cols-5 gap-4 ">
            <div class="order-1 col-span-3 md:col-span-1 flex items-end w-full h-full">
                <h2 class="w-full self-end text-lg">Status</h2>
            </div>
            <!--Pagination buttons-->
            <div class="order-2 col-span-3 md:col-span-1">
            </div>
            <div
                class="order-3 col-span-3 md:col-span-3 flex flex-wrap sm:flex-no-wrap justify-center sm:justify-end items-center align-center">
                <!-- <button class="recentButton" @click="showRecentChanges()">Recent Changes</button> -->
                <div class="mr-4">
                    <span class="text-sm">Showing <strong>{{ billsOnPage }}</strong> of <strong>{{ totalBills
                            }}</strong> bills <i class="fa-brands fa-pagelines text-lg px-1"></i> <strong>{{ totalPages
                            }}</strong> pages</span>
                </div>
                <div>
                    <button class="pageButton" @click="updatePageNumber(1)"><i class="fa-solid fa-chevron-left"></i><i
                            class="fa-solid fa-chevron-left"></i></button>
                    <button class="pageButton" @click="updatePageNumber('subtract')"><i
                            class="fa-solid fa-chevron-left"></i></button>
                    <input
                        class="p-1.5 min-w-12 max-w-12 rounded-md border-2 mx-1 ring:2 focus:ring-slate-500 text-center"
                        :class="pageBackgroundColor" type="number" v-model="sanitizedPageNumber"
                        :placeholder="currentPageNumber" min="1" :max="totalPages"
                        @change="updatePageNumber(sanitizedPageNumber)" @keyup.enter="updatePageNumber(sanitizedPageNumber)"
                        pattern="[0-9]*">
                    <button class="pageButton" @click="updatePageNumber('add')"><i
                            class="fa-solid fa-chevron-right"></i></button>
                    <button class="pageButton" @click="updatePageNumber(totalPages)"><i
                            class="fa-solid fa-chevron-right"></i><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
            <!--Status buttons-->
            <div class="order-4 mr-2.5 sm:order-4 col-span-3 md:col-span-1 flex flex-col h-fit">
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200 shadow-zinc-200
                hover:from-zinc-200 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#3856B0]"
                    @click="updateStatus('all')">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">All</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200 shadow-zinc-200
                hover:from-zinc-200 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#D6CD3A]"
                    @click="updateStatus(0)">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Prefiled</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200 shadow-zinc-200
                hover:from-zinc-300 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#A644A1]"
                    @click="updateStatus(1)">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Introduced (1st)</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200 shadow-zinc-200
                hover:from-zinc-300 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#0fabc1]"
                    @click="updateStatus(2)">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Engrossed (2nd)</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200  shadow-zinc-200
                hover:from-zinc-300 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#78589C]"
                    @click="updateStatus(3)">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Enrolled (Passed)</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200  shadow-zinc-200 
                hover:from-zinc-300 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#46A314]"
                    @click="updateStatus(4)">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Signed</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200  shadow-zinc-200
                hover:from-zinc-300 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#E58F07]"
                    @click="updateStatus(5)">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Vetoed</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200  shadow-zinc-200
                hover:from-zinc-300 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#B33A0B]"
                    @click="updateStatus(6)">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Failed</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <button
                    class="statusButton button-1 bg-gradient-to-tl from-neutral-100 to-zinc-200  shadow-zinc-200
                hover:from-zinc-300 hover:to-neutral-100 hover:shadow-md hover:shadow-zinc-300 flex flex-wrap justify-between items-center border-l-8 border-[#06556B]"
                    @click="updateStatus('other')">
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                    <div class="m-1">Other</div>
                    <div class="rounded-full h-4 w-4 m-1 mb-1.5"></div>
                </button>
                <div class="flex items-center">
                    <div class="flex items-center w-fit h-full border-2 rounded-xl hover:bg-slate-400 mt-4 "><button
                            @click="openModal" class="p-3 w-full h-full justify-self-center text-sm">Subjects <i
                                class="ml-1.5 fa-solid fa-pen-nib"></i></button>
                    </div>
                    <div class="flex items-center w-fit h-full mt-4 ml-4 text-sm cursor-pointer hover:border-b-2"
                        @click="clearSubjects">Clear All</div>
                </div>
                <div v-for="(subject, index) in selectedSubjects" :key="index"
                    class="text-sm p-1.5 w-fit px-3 pt-2 mt-2 mr-1 border-2 rounded-3xl hover:bg-slate-400"
                    @click="addSubjectsToSelected(subject, true)"> {{ subject
                    }} <i class="ml-1 fa-solid fa-xmark"></i></div>
            </div>
            <!--BillView component-->
            <div class="order-5 col-span-4 min-h-[70vh] bg-gradient-to-b from-slate-300 to-zinc-100">
                <BillView class=" shadow-inner" @bill-opened="setOpen = true" @bill-closed="setOpen = false"
                    @reset-bill-open="billOpen = false" :status="currentStatus.toString()" :billlist="billList"
                    :billopen="billOpen" />
            </div>
            <!-- End of BillView component-->
            <!--Bottom page Pagination Buttons-->
            <div class="order-6 col-span-3 md:col-span-1 flex flex-col h-fit">
            </div>
            <div
                class="order-7 col-span-3 md:col-span-4 flex flex-wrap sm:flex-no-wrap justify-center sm:justify-end items-center align-center">
                <div class="mr-2">
                    <span>Showing <strong>{{ billsOnPage }}</strong> of <strong>{{ totalBills }}</strong> bills <i
                            class="fa-brands fa-pagelines text-lg px-1"></i> <strong>{{ totalPages }}</strong>
                        pages</span>
                </div>
                <div>
                    <button class="pageButton" @click="updatePageNumber(1)"><i class="fa-solid fa-chevron-left"></i><i
                            class="fa-solid fa-chevron-left"></i></button>
                    <button class="pageButton" @click="updatePageNumber('subtract')"><i
                            class="fa-solid fa-chevron-left"></i></button>
                    <input
                        class="p-1.5 min-w-12 max-w-12 rounded-md border-2 mx-1 ring:2 focus:ring-slate-500 text-center"
                        :class="pageBackgroundColor" type="number" v-model="currentPageNumber"
                        :placeholder="currentPageNumber" min="1" :max="totalPages"
                        @change="updatePageNumber(currentPageNumber)" @keyup.enter="updatePageNumber(currentPageNumber)"
                        pattern="[0-9]*">
                    <button class="pageButton" @click="updatePageNumber('add')"><i
                            class="fa-solid fa-chevron-right"></i></button>
                    <button class="pageButton" @click="updatePageNumber(totalPages)"><i
                            class="fa-solid fa-chevron-right"></i><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
            <!--About Statuses-->

            <div
                class="order-9 col-span-3 md:col-span-5 my-24 flex flex-col content-center h-full w-full h-screen bg-no-repeat bg-contain bg-center md:bg-womanandman">
                <div class="h-full w-full md:w-[60%] bg-white/75 flex flex-col justify-center m-auto p-12">
                    <h5 class="text-2xl py-6">How it Works</h5>
                    <p class="pt-2">Bills that are <strong>Prefiled</strong> have not been introduced by their Bill
                        Sponsor to their house floor yet.</p>
                    <p class="pt-2">Bills that are <strong>Introduced</strong> are being reviewed by committies and
                        voted on by that house.</p>
                    <p class="pt-2">Bills that are <strong>Engrossed</strong> have been sent to the opposite house and
                        introduced by the Floor Sponsor, where they will be reviewed by committies and voted on.</p>
                    <p class="pt-2">Bills that are <strong>Enrolled</strong> have passed both houses and will become
                        law, whether or not the Governor signs them.</p>
                    <p class="pt-2">Bills are <strong>Signed</strong> by the Governor.</p>
                    <p class="pt-2">Bills that are in <strong>Failed</strong>, have at some point been rejected and will
                        not become law.</p>
                    <p class="pt-2">Bills that are in <strong>Other</strong> are bills that don't follow this pattern,
                        like when either house wants to amend a bill but the originating house doesn't agree to it, thus
                        they form a <a href="https://le.utah.gov/documents/aboutthelegislature/glossary.htm"
                            target="_blank" class="link">Conference Committee</a> to decide.</p>
                </div>
            </div>

        </div>


    </div>
</template>

<script setup>
import { ref, defineProps, toRaw, computed } from 'vue'
import BillView from '../components/BillView.vue'
import { data } from '../shared/data'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
import { all } from 'axios';
import { parse, compareAsc } from 'date-fns'
import DOMPurify from 'dompurify';



// Readonly and working copy of billList
const billList = ref(null)
const originalBillList = ref(null)

// Status buttons
const currentStatus = ref("all")
const billOpen = ref(false)
const setOpen = ref(false)

//Most Recent Changes
const showingRecentChanges = ref(false)

// Pagination
// currentPageNumber is changed via the user
const currentPageNumber = ref(1)

const sanitizedPageNumber = computed({
      get() {
        return currentPageNumber.value;
      },
      set(value) {
        const sanitizedValue = DOMPurify.sanitize(value);
        const pageNumber = parseInt(sanitizedValue, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages.value) {
          currentPageNumber.value = pageNumber;
        } else {
          currentPageNumber.value = 1; // Default to page 1 if invalid
        }
      }
    });


// pageShowing is calculated based on paginated array as a backup
const showingPageNumber = ref(1)
const totalBills = ref(1)
const totalPages = ref(1) // MAKE THIS COMPUTED
const billsOnPage = ref()

// Subjects Dialog
const subjectList = ref()
const allSubjects = ref()
const isOpen = ref(false)
const selectedSubjects = ref([])

const props = defineProps({
    status: String,
    billlist: Array,
    billopen: Boolean
})


//async function to load the data from the public folder
async function loadData() {
    originalBillList.value = await data.getBillList() // returns a promise but the await keyword resolves it
    // console.log(billList.value)
    // billList.value = JSON.parse(JSON.stringify(originalBillList.value)) //deepcopy of orginialBillList
    totalBills.value = originalBillList.value.length // pagination total number
    subjectList.value = getSubjectArray(originalBillList.value)
    displayBills(originalBillList.value)
}

loadData()

// Resets the page number to 1 
function resetPageToFirst() {
    currentPageNumber.value = 1
}

// buttons that update the currentStatus and call the filterBills function, along with resetting the current page to 1
function updateStatus(status) {
    checkBillOpenStatus()
    currentStatus.value = status
    inputError.value = false
    resetPageToFirst()
    displayBills(originalBillList.value)
    // call the display function again
}

// if the setOpen value is true, set the billOpen value to true, which drills down to BillView and to the watch function which closes the BillView
function checkBillOpenStatus() {
    if (setOpen.value) {
        billOpen.value = true
    }
}

// function to reset the UI when the there are no bills in that status, reset pagination variables
function emptyList(list) {
    if (list.length === 0) {
        billList.value = null
        // console.log(billList.value, "reset")
        totalBills.value = 0
        billsOnPage.value = 0
        totalPages.value = 1
    }
    else {
        return list
    }
}

// Filters original array into a new array and clears the billList if there are no bills in the array
function filterBills(list) {
    let filteredBills
    if (list === null) {
        // console.log('Nothing to return')
        return []
    } else if (currentStatus.value == "all") {
        billList.value = JSON.parse(JSON.stringify(list)) // deep copy of billList
        filteredBills = billList.value
        filteredBills = emptyList(filteredBills)
        return filteredBills
    } else if (currentStatus.value == "other") {
        filteredBills = list.filter((bill) => [7, 8, 9, 10, 11, 12, 13].includes(bill.status)) // will refactor this
        filteredBills = emptyList(filteredBills)
        return filteredBills
    } else {
        filteredBills = list.filter((bill) => bill.status == currentStatus.value)
        //filtered list looks different, like the array is not a proxy
        filteredBills = emptyList(filteredBills)
        return filteredBills
    }
}

// Restructures the original array into an array of page objects with two properties, page # and bills array
function paginateBills(list) {
    if (!list) {
        return
    }
    totalBills.value = list.length
    let paginatedArray = []

    let indexGap = 12
    let pageProperty = 1

    for (let i = 0; i < list.length; i += 12) {
        let sliced = list.slice(i, indexGap) // indexGap can't go above totalBills.value
        let pageArray = { page: pageProperty, bills: sliced }
        paginatedArray.push(pageArray)
        // console.log(i, indexGap, pageProperty)
        indexGap += 12
        pageProperty += 1
    }
    // console.log(paginatedArray)

    totalPages.value = paginatedArray.length
    return paginatedArray
    // repurpose the list into an array of named arrays that have bill objects
    // so for every 20 items, we're going to make a new array, give it a name of page: 1, and then push it to a bigger array
    // maybe I should create the buttons first. 
    // paginate the billList into arrays, it only displays the first object and then the buttons change the page number by incrementing it. 
    // there can also be an input for the buttons so you can chose the number. 
}

// Pagination buttons 
function updatePageNumber(numberString) {
    // number arrives as string from input
    // if number is add and current page is less than the total number of pages, add 1
    if (numberString == "add" && currentPageNumber.value < totalPages.value) {
        inputError.value = false

        if (currentPageNumber.value)
            currentPageNumber.value += 1
        displayBills(originalBillList.value)
        return
        // if number is subtract and current page is greater than 1, subtract 1
    } else if (numberString == "subtract" && currentPageNumber.value > 1) {

        if (currentPageNumber.value > totalPages.value + 1) {
            inputError.value = true
        } else {
            inputError.value = false
        }

        currentPageNumber.value -= 1
        displayBills(originalBillList.value)
        return
        // for all other numbers, that are not float values
    } else if (Number.isInteger(parseFloat(numberString))) {
        let number = Number(numberString)

        if (number > totalPages.value) {
            inputError.value = true
        }
        else if (number >= 1 && number <= totalPages.value) {
            inputError.value = false
            currentPageNumber.value = number
            displayBills(originalBillList.value)
        }


        return
        // if page input is deleted then clicked off of, inputing an empty string
    } else if (numberString === "") {
        currentPageNumber.value = showingPageNumber.value
    }
    // if number is float, change input background to red
    else if (Number(numberString) === numberString && numberString % 1 !== 0) {
        inputError.value = true
    }
    console.log(inputError.value)
    // checkBillOpenStatus() adding this function would fix billview not closing when page buttons are clicked but it is too slow due to the watching of billOpen changing values
}







// CSS computed styles for pagination error inputs
let inputError = ref(false)

const pageBackgroundColor = computed(() => ({
    'bg-red-300': inputError.value,
    'bg-white': !inputError.value
}))





// sets the billList value to the corresponding page's bills array, 
function setPageToDisplay(list, pageNumber) {
    if (!list) {
        return
    }
    // sets a backup page number to reset currentPageNumber
    showingPageNumber.value = pageNumber
    for (let i = 0; i < list.length; i++) {
        if (list[i].page == pageNumber) {
            // let rawList = list[i].bills
            const pageBills = list[i].bills
            // console.log(pageBills.length)
            billsOnPage.value = pageBills.length
            billList.value = list[i].bills
        }
    }
}

// M   M   A   IIIII N   N
// MM MM  A A    I   NN  N
// M M M AAAAA   I   N N N
// M   M A   A   I   N  NN
// M   M A   A IIIII N   N
//Main function to display the bills, calls the filterBills and paginateBills functions
function displayBills(list) {
    const filteredBills = filterBills(list || originalBillList.value)
    const filteredBySubject = filterBySubjects(filteredBills, selectedSubjects.value)
    const paginatedBills = paginateBills(filteredBySubject)
    setPageToDisplay(paginatedBills, currentPageNumber.value)
}




// From geeksforgeeks example, removes all duplicate elements by making sure it is not already included in the unique array
function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}

//////////////////////// ---------------- SUBJECTS ---------------//////////////////////////
// function to create an array of strings with all possible subjects in billlist
function getSubjectArray(billList) {
    if (!billList) {
        return []
    }
    let subjectArray = []

    // for each bill
    billList.forEach((bill) => {
        // for each property in a bill
        for (let prop in bill) {
            // console.log(bill[prop], "bill prop")
            // if property is subjects
            if (prop == "subjects") {
                // for each subject object
                bill[prop].forEach((action) => {
                    // for each key in object
                    for (let key in action) {
                        // if key equals subject_name
                        if (key == "subject_name") {
                            // push the subject name to the array
                            subjectArray.push(action[key])
                        }
                    }
                })
            }
        }


    })

    // subjectArray = removeDuplicates(subjectArray)
    // returns 533 unique subjects
    // console.log(subjectArray)
    subjectArray = popularSubjectArray(subjectArray)
    return subjectArray
}

// Function to separate the subjects into objects of how often they appear in the bills
function popularSubjectArray(subjectArray) {
    if (!subjectArray) {
        return []
    }

    let tenMostPopular = []
    let twentyFiveEach = []
    let twentyEach = []
    let fifteenEach = []
    let tenEach = []
    let fiveEach = []
    let oneEach = []

    let selectedSubject
    // for each subject in the array
    subjectArray.forEach((subject) => {
        // set variable to value
        selectedSubject = subject
        // initiate array to hold all duplicate values
        let selectedArray = []
        // search main subject array to match with selected value and push to array
        subjectArray.forEach((value) => {
            if (value == selectedSubject) {
                selectedArray.push(value)
            }
        })
        // Determine length of array and push to corresponding array variable
        if (selectedArray.length == 1) {
            oneEach.push(selectedSubject)
        } else if (selectedArray.length > 1 && selectedArray.length <= 5) {
            fiveEach.push(selectedSubject)
        } else if (selectedArray.length > 5 && selectedArray.length <= 10) {
            tenEach.push(selectedSubject)
        } else if (selectedArray.length > 10 && selectedArray.length <= 15) {
            fifteenEach.push(selectedSubject)
        } else if (selectedArray.length > 15 && selectedArray.length <= 20) {
            twentyEach.push(selectedSubject)
        } else if (selectedArray.length > 20 && selectedArray.length <= 25) {
            twentyFiveEach.push(selectedSubject)
        } else if (selectedArray.length > 25 && selectedArray.length <= 62) {
            twentyFiveEach.push(selectedSubject)
        } else if (selectedArray.length > 62) {
            tenMostPopular.push(selectedSubject)
        }
    })

    tenMostPopular = removeDuplicates(tenMostPopular)
    twentyFiveEach = removeDuplicates(twentyFiveEach)
    twentyEach = removeDuplicates(twentyEach)
    fifteenEach = removeDuplicates(fifteenEach)
    tenEach = removeDuplicates(tenEach)
    fiveEach = removeDuplicates(fiveEach)
    oneEach = removeDuplicates(oneEach)

    // console.log(twentyEach, fifteenEach, tenEach, fiveEach, oneEach)
    allSubjects.value = [...tenMostPopular, ...twentyFiveEach, ...twentyEach, ...fifteenEach, ...tenEach, ...fiveEach, ...oneEach]
    allSubjects.value.sort()
    // console.log(allSubjects.value)

    let rankedSubjectArray = [{ ten_popular: tenMostPopular }, { twenty_five: twentyFiveEach }, { twenty: twentyEach }, { fifteen: fifteenEach }, { ten: tenEach }, { five: fiveEach }, { one: oneEach }]
    // console.log(rankedSubjectArray)
    return rankedSubjectArray

}


function openModal() {
    isOpen.value = true
}
function closeModal() {
    isOpen.value = false
    checkBillOpenStatus()
    displayBills(originalBillList.value)

}

function addSubjectsToSelected(subject, bool) {
    // if no subject, return
    if (!subject) {
        return
    }
    // if bool is true, display bills, added to certain calls of this function so the UI doesn't update while in the modal, but while displaying the bills 
    if (bool) {
        // if subject is not in the array, push it
        if (!selectedSubjects.value.includes(subject)) {
            selectedSubjects.value.push(subject)
            // if subject is in the array, remove it
        } else {
            selectedSubjects.value = selectedSubjects.value.filter((item) => item !== subject)

            displayBills(originalBillList.value)
        }
    } else {
        if (!selectedSubjects.value.includes(subject)) {
            selectedSubjects.value.push(subject)
            // if subject is in the array, remove it
        } else {
            selectedSubjects.value = selectedSubjects.value.filter((item) => item !== subject)
        }
    }
}

function filterBySubjects(list, subjects) {
    if (!list) {
        return []
    }
    if (!subjects || subjects.length == 0) {
        return list
    }

    let filteredBills = []

    list.forEach((bill) => {
        if (bill.subjects) {
            bill.subjects.forEach((subject) => {
                if (subjects.includes(subject.subject_name)) {
                    filteredBills.push(bill)
                }
            })
        }
    })

    // console.log(filteredBills, "filtered")
    let removedDups = removeDuplicates(filteredBills)
    return removedDups
    // return filteredBills
    // need to make sure that there are no duplicate bills. could just remove duplicates by id
}

function clearSubjects() {
    selectedSubjects.value = []
    displayBills(originalBillList.value)
}




//Show recent bills 

function showRecentChanges() {
      let filteredList = [];
      if (!showingRecentChanges.value) {
        // Sort the bill list by the most recent first using date-fns
        filteredList = [...originalBillList.value].sort((a, b) => {
          const dateA = a.last_action_time ? parse(a.last_action_time, 'M/d/yyyy', new Date()) : "";
          const dateB = b.last_action_time ? parse(b.last_action_time, 'M/d/yyyy', new Date()) : "";
          return compareAsc(dateB, dateA); // Sort in descending order
        });

        showingRecentChanges.value = true;
      } else {
        // Revert back to the original bill list
        filteredList = originalBillList.value;
        showingRecentChanges.value = false;
      }

      inputError.value = false; // resets inputError color
      resetPageToFirst();
      displayBills(filteredList);
      // call the display function again
    }


</script>






<style scoped>
.statusButton {
    @apply p-1.5 pt-2 mb-2 rounded-r-3xl hover:bg-slate-400 text-sm;
}

.pageButton {
    @apply p-2 mx-1 border-2 rounded-md hover:bg-slate-300 min-w-9 max-w-10 max-h-10 text-xs self-center bg-white;
}

.recentButton {
    @apply p-2 mx-1 border-2 rounded-xl hover:bg-slate-300 text-xs self-center bg-white mr-4 h-full;
}

.link {
    text-decoration: underline;
    @apply hover:text-rose-500
}
</style>