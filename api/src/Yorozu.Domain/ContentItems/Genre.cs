#pragma warning disable CA1008 // Enums should have zero value

namespace Yorozu.Domain.ContentItems;

public enum Genre {
    // Demographics / Target audience
    Shounen = 1247,
    Shoujo = 5893,
    Seinen = 9024,
    Josei = 3761,
    Kids = 4582,
    Adult = 6730,

    // Anime-specific sub-genres / tropes
    Isekai = 2156,
    Mecha = 7849,
    MagicalGirl = 3418,
    Harem = 6295,
    ReverseHarem = 5073,
    CuteGirlsDoingCuteThings = 8932,
    Cyberpunk = 1460,

    // General fiction
    Action = 3578,
    Adventure = 9041,
    Comedy = 2385,
    Drama = 6712,
    Fantasy = 4829,
    Horror = 7653,
    Mystery = 3194,
    Romance = 8406,
    SciFi = 2971,
    SliceOfLife = 5137,
    Thriller = 6582,
    Historical = 4703,
    Supernatural = 8259,
    Psychological = 1928,
    Tragedy = 6340,
    Dystopian = 3891,
    Western = 7462,
    Crime = 5086,

    // Non-fiction / real-world
    NonFiction = 4203,
    SelfHelp = 9517,
    Biography = 6834,
    Memoir = 2795,
    Technology = 7348,
    Science = 8162,
    Philosophy = 4679,
    Art = 3915,
    Music = 5728,
    Cooking = 6483,
    Travel = 1059,
    Business = 7246,
    Health = 8374,
    Education = 2961,
    Sports = 5130,
    TrueCrime = 6482,
    History = 3897,
    Politics = 7921
}

