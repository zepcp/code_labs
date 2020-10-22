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

Modifiers (Flags)
----------
    g - global (doesn't return after first match)
    i - case-insensitive
    m - multi-line
    s - single-line (dot matches new line)
    
Example [here](https://regex101.com/r/DU3lN1/7)

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
2. Phone Numbers: cleanly store all Portuguese phone numbers
3. Emails: cleanly store all emails except the ones with username "jose"
4. Urls: cleanly store all urls and respective query arguments

Python Syntax
----------

    import re
    pattern = ""
    string = "any string"

    flags = [
        re.ASCII,  # assume ascii "locale" == A
        re.IGNORECASE,  # ignore case == I
        re.LOCALE,  # assume current 8-bit "locale" == L
        re.UNICODE,  # assume unicode "locale" == U
        re.MULTILINE,  # make anchors look for newline == M
        re.DOTALL,  # make dot match newline == S
        re.VERBOSE,  # ignore whitespace and comments == X
        re.TEMPLATE,  # disable backtracking == T
        re.DEBUG,  # dump pattern after compilation
    ]
    
    re.match(pattern, string, flags)  # Apply pattern at the start of the string
    re.fullmatch(pattern, string, flags)  # Apply pattern to all of the string
    re.findall(pattern, string, flags)  # Returns list of all non-overlapping matches in the string
    re.finditer(pattern, string, flags)  # Returns an iterator over all non-overlapping matches in the string
