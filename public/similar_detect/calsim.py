import sys
import os
dir_path = os.path.dirname(os.path.realpath(__file__))
import operator
import numpy as np
import codecs, json 

FILE = "/Users/mac/Documents/Design_Gallery/public/data/widgets.json"
IMAGE_STORAGE = "/Users/mac/Documents/Design_Gallery/public/images/BIG_DATA/all_widgets/"
OUT = "./result.json"

def _sim_texture(r1, r2):
    return sum([min(a, b) for a, b in zip(r1["hist_t"], r2["hist_t"])])

def _sim_colour(r1, r2):
    return sum([min(a, b) for a, b in zip(r1["hist_c"], r2["hist_c"])])

def _calc_sim(r1, r2, imsize=None):
    return _sim_colour(r1, r2) + _sim_texture(r1, r2)

def loading():
    import pandas as pd
    # loading widgets information
    df = pd.read_json(FILE,orient='records')
    R = {}
    for i in df["name"].tolist():
        img = io.imread(IMAGE_STORAGE+i+".png") 
        imgg = io.imread(IMAGE_STORAGE+i+".png",as_gray=True)
        imgg = resize(imgg, (32,32), anti_aliasing=True, preserve_range=True)
        try:
            R[i] = {"hist_t": _calc_texture_hist(img).tolist(), "hist_c": _calc_colour_hist(img).tolist(), "img":imgg.tolist()}
        except:
            pass
    print('Finish loading........')
    print('-'*10)
    file_path = "./find_sims.json" ## your path variable
    json.dump(R, codecs.open(file_path, 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4) ### this saves the array in .json format

def read_R():
    obj_text = codecs.open("./find_sims.json", 'r', encoding='utf-8').read()
    tmp = json.loads(obj_text)
    R = {}
    for k,v in tmp.items():
        R[k] = {'hist_t': np.array(v['hist_t']), 'hist_c': np.array(v['hist_c']), 'img': np.array(v['img'])}
    return R

def calsim(R,image):
    img = io.imread(image) 
    imgg = io.imread(image,as_gray=True)
    imgg = resize(imgg, (32,32), anti_aliasing=True, preserve_range=True)
    this_img = {"hist_t": _calc_texture_hist(img), "hist_c": _calc_colour_hist(img), "img":imgg}
    S = {}
    for j in R.keys():
        # calculate similarity by colour and structure
        S[j] = _sim_colour(this_img,R[j])+_sim_structure(this_img,R[j])
    # top similar widgets
    sims = [j[0] for j in sorted(S.items(), key=lambda i: i[1],reverse=True) if j[1]>0.7]
    return sims

def main(argv):
    print(argv)
    # R = read_R()
    # image = "/Users/mac/Documents/Python/Data/Gallery_D.C./all_widgets/Button-149.png"
    # sims = calsim(R,image)
    # print(sims)

if __name__ == "__main__":
    # loading()
    main(sys.argv)
