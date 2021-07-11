import axios from 'axios';
import httpRequest from '../helpers/httpRequest';

jest.mock('axios');

describe("Test api call", () => {
    const mockData = {
        clouds: {all:75},
        dt: 1625717603,
        main: {
            feels_like: 11.19,
            humidity: 64,
            pressure: 1016,
            temp: 12.24,
            temp_max: 14.19,
            temp_min: 9.98,
        },
        name: "Melbourne",
        weather: [{
            description: "broken clouds",
            icon: "04d",
            id:803,
            main: "Clouds",
        }],
        wind: {
            speed: 0.89, deg: 79, gust: 1.79
        },
    };
    
    const resp = {data: mockData};
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=-37.821035699999996&lon=144.942097&units=metric&APPID=2c542f3625c7a2beb8381242afcd10a7";
    axios.get.mockResolvedValue(resp);

    it('Api should return mock data', async () => {
        const {data} = await httpRequest({url});
        expect(data).toEqual(mockData)
    })
});