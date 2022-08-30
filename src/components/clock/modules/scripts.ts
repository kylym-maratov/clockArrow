export const getFormatTime = (region: any) => {
    const time = region.datetime.split('T')[1].split('.')[0]
    const hours = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])
    const seconds = Number(time.split(':')[2])

    return { minutes, hours, seconds }
}