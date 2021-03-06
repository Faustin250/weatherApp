class Forecast {
    constructor() {
        this.key = 'yG08q0qa1Jnry053v0vVMw2bchmGdcb8'
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search'

    }

    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        return {
            cityDets,
            weather
        };
    };

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    };

    async getWeather(id) {

        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];

    }

};



const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();




const updateUI = (data) => {

    const {
        cityDets,
        weather
    } = data;
    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
    `;

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRw%0D%0AOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDE0IiBoZWlnaHQ9IjQxNSIgdmlld0Jv%0D%0AeD0iMCAwIDQxNCA0MTUiPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSJjbGlwLWRheSI+CiAg%0D%0AICAgIDxyZWN0IHdpZHRoPSI0MTQiIGhlaWdodD0iNDE1Ii8+CiAgICA8L2NsaXBQYXRoPgogIDwv%0D%0AZGVmcz4KICA8ZyBpZD0iZGF5IiBjbGlwLXBhdGg9InVybCgjY2xpcC1kYXkpIj4KICAgIDxyZWN0%0D%0AIHdpZHRoPSI0MTQiIGhlaWdodD0iNDE1IiBmaWxsPSIjZTZlY2Y2Ii8+CiAgICA8cGF0aCBpZD0i%0D%0AY2xvdWQiIGQ9Ik0xNzguMTE2LDUzLjczOWE0MS42NTMsNDEuNjUzLDAsMCwwLTguMjU4LjgyNiwz%0D%0ANC4wNTgsMzQuMDU4LDAsMCwwLTQ3LjctMjQuMjE0QTQ1LjQ1OSw0NS40NTksMCwwLDAsMzYuNyw2%0D%0AMS4zNzdhMzcuOSwzNy45LDAsMCwwLDEuMTM5LDc1Ljc3MmgxNDAuMjhhNDEuNyw0MS43LDAsMSww%0D%0ALDAtODMuNDFabTAsMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuMDAxIDMyLjYwOCkiIGZpbGw9%0D%0AIiNmZmYiLz4KICAgIDxwYXRoIGlkPSJjbG91ZC0yIiBkYXRhLW5hbWU9ImNsb3VkIiBkPSJNMTU2%0D%0ALjA3NSw0Ny4xMzdhMzYuNSwzNi41LDAsMCwwLTcuMjM2LjcyMywyOS44NDMsMjkuODQzLDAsMCww%0D%0ALTQxLjgtMjEuMjE4QTM5LjgzNCwzOS44MzQsMCwwLDAsMzIuMTU2LDUzLjgzYTMzLjIwNiwzMy4y%0D%0AMDYsMCwwLDAsMSw2Ni40SDE1Ni4wNzVhMzYuNTQ0LDM2LjU0NCwwLDEsMCwwLTczLjA4OFptMCww%0D%0AIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDQuMDAxIDMyLjUzMSkiIGZpbGw9IiNmZmYiIG9wYWNp%0D%0AdHk9IjAuNTIiLz4KICAgIDxwYXRoIGlkPSJjbG91ZC0zIiBkYXRhLW5hbWU9ImNsb3VkIiBkPSJN%0D%0AMjYuMjU0LDMzLjk3NWEyNi4yMjIsMjYuMjIyLDAsMCwxLDUuMi41MkEyMS40NDEsMjEuNDQxLDAs%0D%0AMCwxLDYxLjQ4MSwxOS4yNTFhMjguNjE4LDI4LjYxOCwwLDAsMSw1My44LDE5LjUzMiwyMy44NTYs%0D%0AMjMuODU2LDAsMCwxLS43MTcsNDcuN0gyNi4yNTRhMjYuMjU1LDI2LjI1NSwwLDEsMSwwLTUyLjUw%0D%0AOVptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTguMjYgMTU5LjYwOCkiIGZpbGw9IiNmZmYi%0D%0ALz4KICAgIDxwYXRoIGlkPSJjbG91ZC00IiBkYXRhLW5hbWU9ImNsb3VkIiBkPSJNMzMuNzYsNDMu%0D%0ANTc3YTMzLjcxOSwzMy43MTksMCwwLDEsNi42ODUuNjY4LDI3LjU3MSwyNy41NzEsMCwwLDEsMzgu%0D%0ANjEzLTE5LjZBMzYuOCwzNi44LDAsMSwxLDE0OC4yNDEsNDkuNzZhMzAuNjc3LDMwLjY3NywwLDAs%0D%0AMS0uOTIyLDYxLjMzOUgzMy43NmEzMy43NjEsMzMuNzYxLDAsMSwxLDAtNjcuNTIyWm0wLDAiIHRy%0D%0AYW5zZm9ybT0idHJhbnNsYXRlKC01Mi45OTkgMjExLjYwOCkiIGZpbGw9IiNmZmYiLz4KICA8L2c+%0D%0ACjwvc3ZnPgo=' :
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRw%0D%0AOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDE0IiBoZWlnaHQ9IjQxNSIgdmlld0Jv%0D%0AeD0iMCAwIDQxNCA0MTUiPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSJjbGlwLW5pZ2h0Ij4K%0D%0AICAgICAgPHJlY3Qgd2lkdGg9IjQxNCIgaGVpZ2h0PSI0MTUiLz4KICAgIDwvY2xpcFBhdGg+CiAg%0D%0APC9kZWZzPgogIDxnIGlkPSJuaWdodCIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtbmlnaHQpIj4KICAg%0D%0AIDxyZWN0IHdpZHRoPSI0MTQiIGhlaWdodD0iNDE1IiBmaWxsPSIjMjQzMDQ2Ii8+CiAgICA8cGF0%0D%0AaCBpZD0iY2xvdWQiIGQ9Ik0xNzguMTE2LDUzLjczOWE0MS42NTMsNDEuNjUzLDAsMCwwLTguMjU4%0D%0ALjgyNiwzNC4wNTgsMzQuMDU4LDAsMCwwLTQ3LjctMjQuMjE0QTQ1LjQ1OSw0NS40NTksMCwwLDAs%0D%0AMzYuNyw2MS4zNzdhMzcuOSwzNy45LDAsMCwwLDEuMTM5LDc1Ljc3MmgxNDAuMjhhNDEuNyw0MS43%0D%0ALDAsMSwwLDAtODMuNDFabTAsMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAxIDE5MC42MDgp%0D%0AIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjA2Ii8+CiAgICA8cGF0aCBpZD0iY2xvdWQtMiIgZGF0%0D%0AYS1uYW1lPSJjbG91ZCIgZD0iTTI4Ljc2NSwzNy4xODdhMjguNzMsMjguNzMsMCwwLDEsNS43LjU2%0D%0AOSwyMy40OTEsMjMuNDkxLDAsMCwxLDMyLjktMTYuNywzMS4zNTUsMzEuMzU1LDAsMSwxLDU4Ljk0%0D%0ANiwyMS40LDI2LjEzOCwyNi4xMzgsMCwwLDEtLjc4NSw1Mi4yNjNIMjguNzY1YTI4Ljc2NiwyOC43%0D%0ANjYsMCwxLDEsMC01Ny41MzFabTAsMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjA3LjAwMSA4My42%0D%0AMDgpIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjA0Ii8+CiAgICA8ZyBpZD0ibW9vbiIgdHJhbnNm%0D%0Ab3JtPSJ0cmFuc2xhdGUoMjc3IDIwLjk2NSkiPgogICAgICA8cGF0aCBpZD0iUGF0aF8xIiBkYXRh%0D%0ALW5hbWU9IlBhdGggMSIgZD0iTTMxLjM3LDgwLjIxYTQ4LjgxMyw0OC44MTMsMCwwLDAsMzcuNC04%0D%0AMC4yQTU0LjY3MSw1NC42NzEsMCwxLDEsMCw2OC43NzYsNDguNjEyLDQ4LjYxMiwwLDAsMCwzMS4z%0D%0ANyw4MC4yMVoiIGZpbGw9IiNmZmViOTgiLz4KICAgICAgPHBhdGggaWQ9IlBhdGhfMiIgZGF0YS1u%0D%0AYW1lPSJQYXRoIDIiIGQ9Ik0xMTkuNDg3LDQyLjc3NmE1NC42MTksNTQuNjE5LDAsMCwxLTc2Ljcs%0D%0ANzYuNyw1NC42MjgsNTQuNjI4LDAsMSwwLDc2LjctNzYuN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRl%0D%0AKC0zMy42NDYgLTMzLjYzNCkiIGZpbGw9IiNlZmNmNmUiLz4KICAgIDwvZz4KICAgIDxwYXRoIGlk%0D%0APSJjbG91ZC0zIiBkYXRhLW5hbWU9ImNsb3VkIiBkPSJNMzQuMTQxLDQ0LjA2NGEzNC4xLDM0LjEs%0D%0AMCwwLDEsNi43NjEuNjc2QTI3Ljg4MSwyNy44ODEsMCwwLDEsNzkuOTUxLDI0LjkxN2EzNy4yMTUs%0D%0AMzcuMjE1LDAsMCwxLDY5Ljk2MiwyNS40LDMxLjAyMywzMS4wMjMsMCwwLDEtLjkzMiw2Mi4wM0gz%0D%0ANC4xNDFhMzQuMTQyLDM0LjE0MiwwLDEsMSwwLTY4LjI4M1ptMCwwIiB0cmFuc2Zvcm09InRyYW5z%0D%0AbGF0ZSgyODcuMjYgNzguNjA4KSIgZmlsbD0iIzMzM2U1MyIvPgogICAgPHBhdGggaWQ9ImNsb3Vk%0D%0ALTQiIGRhdGEtbmFtZT0iY2xvdWQiIGQ9Ik0xMjQuMjE1LDM3LjU5NWEyOS4wNDgsMjkuMDQ4LDAs%0D%0AMCwwLTUuNzU5LjU3NkEyMy43NTEsMjMuNzUxLDAsMCwwLDg1LjE5MSwyMS4yODRhMzEuNywzMS43%0D%0ALDAsMCwwLTU5LjYsMjEuNjM4LDI2LjQyOCwyNi40MjgsMCwwLDAsLjc5NCw1Mi44NDJoOTcuODI5%0D%0AYTI5LjA4NCwyOS4wODQsMCwxLDAsMC01OC4xNjlabTAsMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUo%0D%0ALTUxLjk5OSAyMC42MDgpIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjA2Ii8+CiAgICA8ZyBpZD0i%0D%0AR3JvdXBfMSIgZGF0YS1uYW1lPSJHcm91cCAxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTUgMzEu%0D%0AOTkyKSIgb3BhY2l0eT0iMC45MiI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzQiIGRhdGEtbmFtZT0i%0D%0AUGF0aCA0IiBkPSJNMjM0LjEwOSw4Mi44NGwuNDU5LjkzLDEuMDI3LjE0OS0uNzQzLjcyNC4xNzYs%0D%0AMS4wMjItLjkxOC0uNDgyLS45MTguNDgyLjE3Ni0xLjAyMi0uNzQzLS43MjQsMS4wMjctLjE0OVoi%0D%0AIGZpbGw9IiNmZmY2ZDIiLz4KICAgIDwvZz4KICAgIDxnIGlkPSJHcm91cF8yIiBkYXRhLW5hbWU9%0D%0AIkdyb3VwIDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2IC0wLjAwOCkiIG9wYWNpdHk9IjAuNTEi%0D%0APgogICAgICA8cGF0aCBpZD0iUGF0aF80LTIiIGRhdGEtbmFtZT0iUGF0aCA0IiBkPSJNMjM0LjEw%0D%0AOSw4Mi44NGwuNDU5LjkzLDEuMDI3LjE0OS0uNzQzLjcyNC4xNzYsMS4wMjItLjkxOC0uNDgyLS45%0D%0AMTguNDgyLjE3Ni0xLjAyMi0uNzQzLS43MjQsMS4wMjctLjE0OVoiIGZpbGw9IiNmZmY2ZDIiLz4K%0D%0AICAgIDwvZz4KICAgIDxnIGlkPSJHcm91cF80IiBkYXRhLW5hbWU9Ikdyb3VwIDQiIHRyYW5zZm9y%0D%0AbT0idHJhbnNsYXRlKC0xOTAgNTIuOTkyKSIgb3BhY2l0eT0iMC4yNiI+CiAgICAgIDxwYXRoIGlk%0D%0APSJQYXRoXzQtMyIgZGF0YS1uYW1lPSJQYXRoIDQiIGQ9Ik0yMzQuMTA5LDgyLjg0bC40NTkuOTMs%0D%0AMS4wMjcuMTQ5LS43NDMuNzI0LjE3NiwxLjAyMi0uOTE4LS40ODItLjkxOC40ODIuMTc2LTEuMDIy%0D%0ALS43NDMtLjcyNCwxLjAyNy0uMTQ5WiIgZmlsbD0iI2ZmZjZkMiIvPgogICAgPC9nPgogICAgPGcg%0D%0AaWQ9Ikdyb3VwXzYiIGRhdGEtbmFtZT0iR3JvdXAgNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5%0D%0AMCAtNjcuMDA4KSIgb3BhY2l0eT0iMC45MiI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzQtNCIgZGF0%0D%0AYS1uYW1lPSJQYXRoIDQiIGQ9Ik0yMzQuMTA5LDgyLjg0bC40NTkuOTMsMS4wMjcuMTQ5LS43NDMu%0D%0ANzI0LjE3NiwxLjAyMi0uOTE4LS40ODItLjkxOC40ODIuMTc2LTEuMDIyLS43NDMtLjcyNCwxLjAy%0D%0ANy0uMTQ5WiIgZmlsbD0iI2ZmZjZkMiIvPgogICAgPC9nPgogICAgPGcgaWQ9Ikdyb3VwXzciIGRh%0D%0AdGEtbmFtZT0iR3JvdXAgNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTU4LjAwOCkiIG9wYWNp%0D%0AdHk9IjAuOTIiPgogICAgICA8cGF0aCBpZD0iUGF0aF80LTUiIGRhdGEtbmFtZT0iUGF0aCA0IiBk%0D%0APSJNMjM0LjEwOSw4Mi44NGwuNDU5LjkzLDEuMDI3LjE0OS0uNzQzLjcyNC4xNzYsMS4wMjItLjkx%0D%0AOC0uNDgyLS45MTguNDgyLjE3Ni0xLjAyMi0uNzQzLS43MjQsMS4wMjctLjE0OVoiIGZpbGw9IiNm%0D%0AZmY2ZDIiIG9wYWNpdHk9IjAuNDUiLz4KICAgIDwvZz4KICAgIDxnIGlkPSJHcm91cF85IiBkYXRh%0D%0ALW5hbWU9Ikdyb3VwIDkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MCAxMDIuOTkyKSIgb3BhY2l0%0D%0AeT0iMC40OCI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzQtNiIgZGF0YS1uYW1lPSJQYXRoIDQiIGQ9%0D%0AIk0yMzQuMTA5LDgyLjg0bC40NTkuOTMsMS4wMjcuMTQ5LS43NDMuNzI0LjE3NiwxLjAyMi0uOTE4%0D%0ALS40ODItLjkxOC40ODIuMTc2LTEuMDIyLS43NDMtLjcyNCwxLjAyNy0uMTQ5WiIgZmlsbD0iI2Zm%0D%0AZjZkMiIvPgogICAgPC9nPgogICAgPGcgaWQ9Ikdyb3VwXzEwIiBkYXRhLW5hbWU9Ikdyb3VwIDEw%0D%0AIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMCAxNjIuOTkyKSIgb3BhY2l0eT0iMC45MiI+CiAgICAg%0D%0AIDxwYXRoIGlkPSJQYXRoXzQtNyIgZGF0YS1uYW1lPSJQYXRoIDQiIGQ9Ik0yMzQuMTA5LDgyLjg0%0D%0AbC40NTkuOTMsMS4wMjcuMTQ5LS43NDMuNzI0LjE3NiwxLjAyMi0uOTE4LS40ODItLjkxOC40ODIu%0D%0AMTc2LTEuMDIyLS43NDMtLjcyNCwxLjAyNy0uMTQ5WiIgZmlsbD0iI2ZmZjZkMiIvPgogICAgPC9n%0D%0APgogICAgPGcgaWQ9Ikdyb3VwXzExIiBkYXRhLW5hbWU9Ikdyb3VwIDExIiB0cmFuc2Zvcm09InRy%0D%0AYW5zbGF0ZSg3MCAxMTIuOTkyKSIgb3BhY2l0eT0iMC40NiI+CiAgICAgIDxwYXRoIGlkPSJQYXRo%0D%0AXzQtOCIgZGF0YS1uYW1lPSJQYXRoIDQiIGQ9Ik0yMzQuMTA5LDgyLjg0bC40NTkuOTMsMS4wMjcu%0D%0AMTQ5LS43NDMuNzI0LjE3NiwxLjAyMi0uOTE4LS40ODItLjkxOC40ODIuMTc2LTEuMDIyLS43NDMt%0D%0ALjcyNCwxLjAyNy0uMTQ5WiIgZmlsbD0iI2ZmZjZkMiIvPgogICAgPC9nPgogICAgPGcgaWQ9Ikdy%0D%0Ab3VwXzEzIiBkYXRhLW5hbWU9Ikdyb3VwIDEzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTAgMjMy%0D%0ALjk5MikiIG9wYWNpdHk9IjAuOTIiPgogICAgICA8cGF0aCBpZD0iUGF0aF80LTkiIGRhdGEtbmFt%0D%0AZT0iUGF0aCA0IiBkPSJNMjM0LjEwOSw4Mi44NGwuNDU5LjkzLDEuMDI3LjE0OS0uNzQzLjcyNC4x%0D%0ANzYsMS4wMjItLjkxOC0uNDgyLS45MTguNDgyLjE3Ni0xLjAyMi0uNzQzLS43MjQsMS4wMjctLjE0%0D%0AOVoiIGZpbGw9IiNmZmY2ZDIiLz4KICAgIDwvZz4KICAgIDxnIGlkPSJHcm91cF8xNCIgZGF0YS1u%0D%0AYW1lPSJHcm91cCAxNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAgMjkyLjk5MikiIG9wYWNpdHk9%0D%0AIjAuOTIiPgogICAgICA8cGF0aCBpZD0iUGF0aF80LTEwIiBkYXRhLW5hbWU9IlBhdGggNCIgZD0i%0D%0ATTIzNC4xMDksODIuODRsLjQ1OS45MywxLjAyNy4xNDktLjc0My43MjQuMTc2LDEuMDIyLS45MTgt%0D%0ALjQ4Mi0uOTE4LjQ4Mi4xNzYtMS4wMjItLjc0My0uNzI0LDEuMDI3LS4xNDlaIiBmaWxsPSIjZmZm%0D%0ANmQyIi8+CiAgICA8L2c+CiAgICA8ZyBpZD0iR3JvdXBfMTUiIGRhdGEtbmFtZT0iR3JvdXAgMTUi%0D%0AIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNTAgMjcyLjk5MikiIG9wYWNpdHk9IjAuOTIiPgogICAg%0D%0AICA8cGF0aCBpZD0iUGF0aF80LTExIiBkYXRhLW5hbWU9IlBhdGggNCIgZD0iTTIzNC4xMDksODIu%0D%0AODRsLjQ1OS45MywxLjAyNy4xNDktLjc0My43MjQuMTc2LDEuMDIyLS45MTgtLjQ4Mi0uOTE4LjQ4%0D%0AMi4xNzYtMS4wMjItLjc0My0uNzI0LDEuMDI3LS4xNDlaIiBmaWxsPSIjZmZmNmQyIi8+CiAgICA8%0D%0AL2c+CiAgPC9nPgo8L3N2Zz4K';

    time.setAttribute('src', timeSrc);



    // remove the d-none class if present

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set local storage

    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}