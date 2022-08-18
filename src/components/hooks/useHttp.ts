import axios from "axios";
import { urls } from "../../constants/urls";


export const useHttp = (setError: Function) => {
    const getRegions = async () => {
        try {
            setError('')
            const { data } = await axios.get<string[]>(urls.TIMEZONEAPI)

            return data

        } catch (e) {
            setError((e as Error).message)
        }
    }

    const getCurrentTime = async (region: string) => {
        try {
            setError('')
            const { data } = await axios.get<any>(urls.TIMEZONEAPI + region)

            return data

        } catch (e) {
            setError((e as Error).message)
        }
    }

    return { getRegions, getCurrentTime }
}