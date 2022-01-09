const { NovelType } = require('../models');

const novelType = [
    {
        novelType: "Literary",
        description: "Literary fiction novels are considered works with artistic value and literary merit. They often include political criticism, social commentary, and reflections on humanity. Literary fiction novels are typically character-driven, as opposed to being plot-driven, and follow a character's inner story."
    },
    {
        novelType: "Mystery",
        description: "Mystery novels, also called detective fiction, follow a detective solving a case from start to finish. They drop clues and slowly reveal information, turning the reader into a detective trying to solve the case, too. Mystery novels start with an exciting hook, keep readers interested with suspenseful pacing, and end with a satisfying conclusion that answers all of the reader's outstanding questions."
    },
    {
        novelType: "Thriller",
        description: "Horror novels are meant to scare, startle, shock, and even repulse readers. Generally focusing on themes of death, demons, evil spirits, and the afterlife, they prey on fears with scary beings like ghosts, vampires, werewolves, witches, and monsters."
    },
    {
        novelType: "Historical",
        description: "Historical fiction novels take place in the past. Written with a careful balance of research and creativity, they transport readers to another time and place—which can be real, imagined, or a combination of both. Many historical novels tell stories that involve actual historical figures or historical events within historical settings."
    },
    {
        novelType: "Romance",
        description: "Romantic fiction centers around love stories between two people. They're lighthearted, optimistic, and have an emotionally satisfying ending. Romance novels do contain conflict, but it doesn't overshadow the romantic relationship, which always prevails in the end."
    },
    {
        novelType: "Western",
        description: "Western novels tell the stories of cowboys, settlers, and outlaws exploring the western frontier and taming the American Old West. They're shaped specifically by their genre-specific elements and rely on them in ways that novels in other fiction genres don't."
    },
    {
        novelType: "Bildungsroman",
        description: "Bildungsroman is a literary genre of stories about a character growing psychologically and morally from their youth into adulthood. Generally, they experience a profound emotional loss, set out on a journey, encounter conflict, and grow into a mature person by the end of the story."
    },
    {
        novelType: "Speculative",
        description: "Speculative fiction is a supergenre that encompasses a number of different types of fiction, from science fiction to fantasy to dystopian. The stories take place in a world different from our own. Speculative fiction knows no boundaries; there are no limits to what exists beyond the real world."
    },
    {
        novelType: "Science Fiction",
        description: "Sci-fi novels are speculative stories with imagined elements that don't exist in the real world. Some are inspired by \"hard\" natural sciences like physics, chemistry, and astronomy; others are inspired by \"soft\" social sciences like psychology, anthropology, and sociology. Common elements of sci-fi novels include time travel, space exploration, and futuristic societies."
    },
    {
        novelType: "Fantasy",
        description: "Fantasy novels are speculative fiction stories with imaginary characters set in imaginary universes. They're inspired by mythology and folklore and often include elements of magic."
    },
    {
        novelType: "Dystopian",
        description: "Dystopian novels are a genre of science fiction. They're set in societies viewed as worse than the one in which we live. Dystopian fiction exists in contrast to utopian fiction, which is set in societies viewed as better than the one in which we live."
    },
    {
        novelType: "Magical Realism",
        description: "Magical realism novels depict the world truthfully, plus add magical elements. The fantastical elements aren't viewed as odd or unique; they're considered normal in the world in which the story takes place."
    },
    {
        novelType: "Realist",
        description: "Realist fiction novels are set in a time and place that could actually happen in the real world. They depict real people, places, and stories in order to be as truthful as possible. Realist works of fiction remain true to everyday life and abide by the laws of nature as we currently understand them."
    },
    { novelType: "Action" },
    { novelType: "Adventure" },
    { novelType: "Drama" },
    { novelType: "Detective" },
    { novelType: "Crime" },
];

const NovelTypeSeeder = async () => {
    await NovelType.bulkCreate(novelType);
};

NovelTypeSeeder();