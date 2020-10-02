# Code Labs

Meta sequences
----------
    . - any single char
    \s - any whitespace char (space, tab or newline)
    \d - any digit (0-9)
    $ - end of line
Example [here](https://regex101.com/r/DU3lN1/1)

Quantifiers
----------
    ? - zero or one (lazy)
    * - zero or more (greedy)
    + - one or more
    [a-z] - between a and z
    {3} - exactly 3
    {3,} - more than 3
    {3,6} - between 3 and 6
Example [here](https://regex101.com/r/DU3lN1/2)

Groups
----------
    (...) - capture anything between ()
    (?...) - match anything between ()
    (?P<label>...) - capture anything between () and save it as group "label"

Lookahead / Lookbehind
----------
    (?=...) - positive lookahead, match only if anything between () exists
    (?!...) - negative lookahead, don't match if anything between () exists
    (?<=...) - positive lookbehind, match only if anything between () exists
    (?<!...) - negative lookbehind, don't match if anything between () exists

Flags / Modifiers
----------
    s (or RE.DOTALL) - transforms all whitespaces in dot (think of a single line output)

References
----------
    \1 - capturing group 1
