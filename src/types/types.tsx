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
    content: string;
}


type ListItemProps = {
    image: ImageProps;
    music: MusicProps;
    releaseDate: string;
    wants: number;
}