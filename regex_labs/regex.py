import re
import argparse
from os import listdir


def read_file(filename: str) -> str:
    with open("./regex_labs/src/{}.txt".format(filename)) as f:
        return f.read()


def creditcards(content):
    """All credit card numbers and respective brands"""
    matches = re.findall(r"([0-9\s]+)\n?([a-zA-Z\s]+)\n?", content)

    mylist = []
    for match in matches:
        number = match[0].replace(" ", "").replace("\n", "")
        brand = match[1].replace("\n", "")
        mylist.append((number, brand))

    return mylist


def phonenumbers(content):
    """All Portuguese numbers"""
    matches = re.findall(r"\(\+?0?0?351\).?([0-9- ]*)", content)
    return [match.replace("-", "").replace(" ", "") for match in matches]


def emails(content):
    """All emails except the ones with username: jose"""
    matches = re.findall(r"(.*(?<!\njose)@.+)", content)
    return [match for match in matches]


def urls(content):
    """All urls and respective query arguments"""
    matches = re.finditer(r"https?://(?P<domain>.+)/(?P<args>\?.+)?", content)

    mylist = []
    for match in matches:
        args = match.group("args")
        args = args[1:].split("&") if args else []
        mylist.append((match.group("domain"), args))

    return mylist


if __name__ == '__main__':
    """ python -m regex_labs.regex -r <filename> """
    examples = [f.replace(".txt", "") for f in listdir("./regex_labs/src/")]
    parser = argparse.ArgumentParser()
    parser.add_argument("--run", '-r', choices=examples, required=True)
    args = parser.parse_args()

    file_content = read_file(args.run)

    [print(line) for line in eval(args.run)(file_content)]
