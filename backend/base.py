from flask import Flask, request
import random

api = Flask(__name__)

# check if the guess is valid
# invalid if:
# 1. different than expected length
# 2. invalid non-digit characters
# 3. repeats of a number
def check_valid(valid_len, guess):
    list = []
    # 1. different than expected length
    if len(guess) != int(valid_len):
        return False
    for i in range(valid_len):
        # 2. invalid non-digit characters
        if not guess[i].isdigit():
            return False
        # 3. repeats of a number
        for j in range(len(list)):
            if guess[i] == list[j]:
                return False
        list.append(guess[i])
    return True

# check against past answers for valid/invalid SB
def check_past (allGuesses, size, guess):
    for i in range(len(allGuesses)):
        checking = check_SB(size, guess, allGuesses[i]["guess"])
        if checking[0] != allGuesses[i]["strikes"] or checking[1] != allGuesses[i]["balls"]:
            return True
    return False

# Determine S and B for a guess + ans
def check_SB(size, guess, ans) :
    strikes = 0
    balls = 0
    for i in range(size):
        # 1. check strikes
        if int(guess[i]) == int(ans[i]):
            strikes += 1
        # 2. check balls
        for j in range(size):
            if i != j and int(guess[i]) == int(ans[j]):
                balls += 1
    return (strikes, balls)

def create_guess(list):
    ret = []
    for i in range(4):
        x = random.randint(0, len(list[i]) - 1)
        while list[i][x] in ret:
            x = random.randint(0, len(list[i]) - 1)
        ret.append(list[i][x])

    return ret


# cred:https://stackoverflow.com/questions/40126683/how-to-generate-effectively-a-random-number-that-only-contains-unique-digits-in
@api.route('/ans')
def gen_ans():
    args = request.args
    len = args.get("len")
    l = [ i for i in list(range(10))]
    random.shuffle(l)
    ret = l[:int(len)]
    return {"ans" : ret}


@api.route('/chkguess', methods=['POST'])
def check_guess():
    args = request.json
    guess = args["guess"]
    ans = args["ans"]
    size = len(ans)

    # check for a valid guess
    if not check_valid(size, guess):
        return {"valid":False}

    # compare numbers 
    checked = check_SB(size, guess, ans)

    res = {
        "strikes" : checked[0],
        "balls" : checked[1],
        "valid":True,
    }
    return res

# determine the cpu's guess
@api.route('/cpu', methods=['POST'])
def cpu_guess():
    body = request.json
    args = request.args
    allGuesses = body["allCPUGuesses"]
    size = int(args.get("len"))
    # easy or hard CPU
    mode = str(args.get("mode"))
    print(mode)
    guess = []

    # setup potential
    potential = [ [] for i in range(size) ]
    for i in range(4):
        for j in range(10):
            potential[i].append(j)

    # first guess
    if len(allGuesses) == 0:
        print("wtf")
        guess = create_guess(potential)
    else :
        # build background (based on 0/0 or 0B):
        for i in range(len(allGuesses)):
            s = allGuesses[i]["strikes"]
            b = allGuesses[i]["balls"]
            if s == 0 and b == 0:
                # check for 0/0
                # get rid of all 4 numbers in potential
                for j in range(size):
                    for k in range(size):
                        removals = int(allGuesses[i]["guess"][k])
                        if removals in potential[j]:
                            potential[j].remove(removals)
            elif s == 0 and b != 0:
                # check for only balls
                # get rid of given numbers in given positions
                for j in range(size):
                    removals = int(allGuesses[i]["guess"][j])
                    if removals in potential[j]:
                        potential[j].remove(int(allGuesses[i]["guess"][j]))
        
        # setup for randomness
        curridx = [ 0 for i in range(size) ]
        final_len = []
        for i in range(size):
            # randomize potential to randomize guesses
            final_len.append(len(potential[i]))
            random.shuffle(potential[i])

        up_idx  = size - 1
        reset = False
        cont = False

        # curate a guess
        while curridx[0] != final_len[0]:
            # pull #s from potential for a guess
            for i in range(size):
                if potential[i][curridx[i]] in guess:
                    reset = True
                    break
                guess.append(potential[i][curridx[i]])

            # iterating to next index combination
            curridx[up_idx] += 1
            while curridx[up_idx] == final_len[up_idx]:
                curridx[up_idx] = 0
                if up_idx - 1 != -1:
                    up_idx -= 1
                    curridx[up_idx] += 1
            up_idx = size - 1
            
            # if non-unique digits, retry
            if reset: 
                guess = []
                reset = False
                continue
            
            # for hard CPU
            # check against past answers & reject if invalid
            if mode == "hard":
                cont = check_past(allGuesses, size, guess)
            if cont or guess in allGuesses:
                guess = []
                cont = False
                continue
            break

    # change guess from list to string
    ret = ""
    for i in range(size):
        ret += str(guess[i])
    res = {
        "guess": ret,
    }
    return res
