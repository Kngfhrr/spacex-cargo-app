import { getShipments } from '../api'

export const loadData = async () => {
    const res = await getShipments()
    localStorage.setItem('shipments', JSON.stringify(res))
    return res
}
