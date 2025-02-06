import axios from 'axios';


// functions to use axios and get the data from the public folder
const getBillData = async function(bill) {
    try {
    const response = await axios.get(`utahbills/bills/${bill}.json`)
    let data = parseList(response)
    
    return data
    
    } catch (error) {
        console.error(error)
        return [];
        //put very nice user message
    }
}


// simple error handling fot the data
const parseList = response => {
    if (response.status !== 200) throw Error(response.message
    )
    if (!response.data) return []

    if (typeof response.data !== 'object') throw Error('Invalid data')
        
    let list = response.data

    return list
}

const getBillList = async function() {
    try {
        const response = await axios.get('utahbills/billlist.json')
        let data = parseList(response)
        
        return data 
        
    } catch (error) {
        console.error(error)
        return [];
        //put very nice user message
    }
}



export const data = {
    getBillData,
    getBillList
}