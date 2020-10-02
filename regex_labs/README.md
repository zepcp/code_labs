# Code Labs

Meta sequences
----------
    . - any single char
    \s - any whitespace char (space, tab or newline)
    \d - any digit (0-9)
    $ - end of line
    \ - escape special chars 
Example [here](https://regex101.com/r/DU3lN1/1)

Quantifiers
----------
    ? - zero or one
    * - zero or more (greedy)
    *? - zero or more (lazy)
    + - one or more
    [a-z] - between a and z
    {3} - exactly 3
    {3,} - more than 3
    {3,6} - between 3 and 6
Example [here](https://regex101.com/r/DU3lN1/3)

Groups
----------
    (...) - capture anything between ()
    (?P<label>...) - capture anything between () and save it as group "label"
Example [here](https://regex101.com/r/DU3lN1/4)

Lookahead / Lookbehind
----------
    (?=...) - positive lookahead, match only if anything between () exists
    (?!...) - negative lookahead, don't match if anything between () exists
    (?<=...) - positive lookbehind, match only if anything between () exists
    (?<!...) - negative lookbehind, don't match if anything between () exists
Example [here](https://regex101.com/r/DU3lN1/6)

Exercises
----------
1. Credit Cards: cleanly store all credit card numbers and respective brands
2. Phone Numbers: cleanly store all Portuguese numbers and respective indicatives
3. Emails: cleanly store all emails except the ones with user "jose"
4. Urls: cleanly store all urls and respective query arguments
