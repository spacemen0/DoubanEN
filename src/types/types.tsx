type SearchOption = 'Music' | 'Movie' | 'Book';

type DropDownSearchOptionProps = {
    selectedOption: SearchOption;
    onOptionClick: (option: SearchOption) => void;
}

type ImageProps = {
    src: string; alt: string; href: string
}

type ListItemProps = {
    image: ImageProps;
    title: string;
    artist: string;
    releaseDate: string;
    genre: string;
    average: number;
    ratings: number;
    wants: number;
}