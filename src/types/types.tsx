type SearchOption = 'Music' | 'Movie' | 'Book';

type DropDownSearchOptionProps = {
    selectedOption: SearchOption;
    onOptionClick: (option: SearchOption) => void;
}

type ImageProps = {
    src: string; alt: string; href: string
}

type MusicProps = {
    title: string;
    artist: string;
    genre: string;
    average: number;
    ratings: number;
}

type ReviewProps = {
    username: string;
    userID: number;
    reviewDate: string;
    star: 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 | 3.5 | 4.0 | 4.5 | 5.0;
    content: string;
}


type ListItemProps = {
    image: ImageProps;
    music: MusicProps;
    releaseDate: string;
    wants: number;
}