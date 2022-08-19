
export interface CurrentRegionTypes {
    regionName: string;
    region: {
        abbreviation: string;
        client_ip: string;
        datetime: string;
        day_of_week: number;
        day_of_year: number;
        dst: boolean;
        dst_from: boolean | null;
        dst_offset: number;
        timezone: string;
        unixtime: number;
        utc_datetime: string;
        utc_offset: string;
        weeb_number: number;
    } | null;
}