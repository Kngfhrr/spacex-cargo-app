const axios = require('axios');

export function getURL(path) {
    return `${process.env.REACT_APP_BASE_URL || 'http://localhost:3000'}${path}`
}

export async function fetchAPI(path) {
    const requestUrl = getURL(path)

    try {
        return await axios.get(requestUrl)
    } catch (error) {
       throw new Error(error)
    }
}

export async function getShipments() {
    const res = await fetchAPI(`/shipments.json`)
    return res.data
}
