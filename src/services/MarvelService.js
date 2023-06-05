class MarvelService {
    _apiBase = 'https://gateway.marvel.com/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=278e0e54fa95b0df4de571f10094d716';
    // _apiKey = 'apikey=278e0e54fa95b0df4de571f10094d71';
    _baseOffset = 210;


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?ts=1&limit=9&offset=${offset}&${this._apiKey}&hash=2ac24ca6f145959f9f5d3116bed5ab5b`);
        return res.data.results.map(this._transformCharacter);

    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}&hash=2ac24ca6f145959f9f5d3116bed5ab5b`);
   return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;