import re
import argparse
from os import listdir


def read_file(filename: str) -> str:
    with open("./regex_labs/src/{}.txt".format(filename)) as f:
        return f.read()


def creditcards(content):
    """All creditcards numbers and their brand"""
    matches = re.findall(r"([0-9\s]+)\n([a-zA-Z\s]+)\n?", content)

    mylist = []
    for match in matches:
        number = match[0].replace(" ","")
        brand = match[1]
        mylist.append((number, brand))

    return mylist


def phonenumbers(content):
    """All phonenumbers"""
    matches = re.findall(r"\(([0-5]\d{2})\) (\d)[0-9-]{6}\2", content)
    # matches = re.findall(r"\(([0-5]\d{2})\) (\d)[0-9]{2}-\d{3}\2", content)

    mylist = []
    for match in matches:
        mylist.append(match)

    return mylist


def emails(content):
    """All emails except the ones containing: josem"""
    # matches = re.findall(r"(.+(?<!josem)(@.+))", content)
    matches = re.findall(r"(.+(?<!josem)(@[a-zA-Z]+.[a-zA-Z]+))", content)

    mylist = []
    for match in matches:
        mylist.append(match[0])

    return mylist


def urls(content):
    """All urls"""
    matches = re.finditer(r"https://(?P<domain>.+)\?(?P<args>.+)", content)

    mylist = []
    for match in matches:
        mylist.append((match.group("domain"), match.group("args")))

    return mylist


if __name__ == '__main__':
    """ python -m regex_labs.regex -r <filename> """
    examples = [f.replace(".txt", "") for f in listdir("./regex_labs/src/")]
    parser = argparse.ArgumentParser()
    parser.add_argument("--run", '-r', choices=examples, required=True)
    args = parser.parse_args()

    file_content = read_file(args.run)

    result = eval(args.run)(file_content)
    print(result)
