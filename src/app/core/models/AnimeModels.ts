
export class Anime {
    id: number = 0;
    english_title: string = '';
    japanese_title: string | undefined;
    trailer_url: string | undefined;
    image_url: string = '';
    synopsis: string = '';
    airing: boolean = true;
    episodes: number = 0;
    score: number = 0;
}

export function mapApiEntity(animeAPI: any): Anime {
    let result = new Anime();

    result.id = animeAPI.mal_id;

    let t_en = animeAPI.titles.find((title: any) => title.type === "English")
    result.english_title = t_en !== undefined ? t_en.title : '';

    let t_jap = animeAPI.titles.find((title: any) => title.type === "Japanese")
    result.japanese_title = t_jap !== undefined ? t_jap.title : undefined;

    result.trailer_url = animeAPI.trailer.embed_url !== null ? animeAPI.trailer.embed_url : undefined;
    result.image_url = animeAPI.images.webp.image_url;
    result.synopsis = animeAPI.synopsis
    result.airing = animeAPI.airing
    result.episodes = animeAPI.episodes
    result.score = animeAPI.score

    return result;
}