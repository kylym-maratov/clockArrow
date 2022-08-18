import axios from "axios";

const regions: string = 'http://worldtimeapi.org/api/timezone'
const currentTime: string = 'http://worldtimeapi.org/api/timezone/'

export const useHttp = (setError: Function) => {
    const getRegions = async () => {
        try {
            setError('')
            const { data } = await axios.get<string[]>(regions)

            return data

        } catch (e) {
            setError((e as Error).message)
        }
    }

    const getCurrentTime = async (region: string) => {
        try {
            setError('')
            const { data } = await axios.get<any>(currentTime + region)

            return data

        } catch (e) {
            setError((e as Error).message)
        }
    }

    return { getRegions, getCurrentTime }
}