import {getErrorMessage, transformCurrentData} from '../helpers/utils';
        

describe("Test getErrorMessage function", () => {
    const errorWithBody = { body: {message: "No such place found" } };
 
    const errorWithOutBody = { message: "Please enter valid city" };

    const errorWithStatus = { statusText: "Request failed with status code 404 Service issue Please try again" };

    
    it('getErrorMessage with message body', () => {
        expect(getErrorMessage(errorWithBody)).toBe("No such place found");
        expect(getErrorMessage(errorWithBody)).not.toBeNull();
    }); 

    it('No error message', () => {
        expect(getErrorMessage()).toBeNull();
    });

    it('getErrorMessage without body', () => {
        expect(getErrorMessage(errorWithOutBody)).toBe("Please enter valid city");
    });

    it('getErrorMessage without status', () => {
        expect(getErrorMessage(errorWithStatus)).toBe("Request failed with status code 404 Service issue Please try again");
    });

});

describe("Test transformCurrentData function", () => {
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

    let returnedData = null;
    const expectedData = {
        dt: 1625717603,
        name: "Melbourne",
        temp: 12.24,
        temp_min: 9.98,
        temp_max: 14.19,
        humidity: 64,
        icon: "04d",
        desc: "broken clouds",
        clouds: 75,
        wind: 0.89,
    }

    it('transformCurrentData function should return null if no data', () => {
        returnedData = transformCurrentData();
        expect(returnedData).toBeNull();
    });

    it('transformCurrentData function should return expectedData', () => {
        returnedData = transformCurrentData(mockData);
        expect(returnedData).toEqual(expectedData);
    });
})