import sys


def main(argv):
    filename = "words/allPortugueseWords.txt"
    number = argv

    f = open("words/ptWords_"+ number +".txt", "a")

    with open(filename) as file:
        for line in file:
            word = line[:-1]    # remove \n
        if len(word) == int(number): f.write(line)
            
    f.close()


if __name__ == "__main__":

    if len(sys.argv) > 2:
        print(">> Too many arguments! Only one numeric argument is aceptable")
        sys.exit(0)
    
    elif len(sys.argv) == 1:
        print(">> How to run this script\n\n\tpython3 filter.py [args]\n\n[args] must be the number of letters")
        sys.exit(0)

    main(sys.argv[1])