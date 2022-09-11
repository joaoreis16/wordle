import sys
import unidecode

def main(argv):
    filename = "allPortugueseWords.txt"
    number = argv

    f = open("ptWords_"+ number +".txt", "w+")

    with open(filename) as file:
        for line in file:
            word = line[:-1]    # remove \n

            if '-' not in word and len(word) == int(number): 
                line = unidecode.unidecode(line)
                f.write(str(line).upper())
            
    f.close()


if __name__ == "__main__":

    if len(sys.argv) > 2:
        print(">> Too many arguments! Only one numeric argument is aceptable")
        sys.exit(0)
    
    elif len(sys.argv) == 1:
        print(">> How to run this script\n\n\tpython3 filter.py [args]\n\n[args] must be the number of letters")
        sys.exit(0)

    main(sys.argv[1])