import numpy
# from skimage.measure import compare_ssim

def _calc_colour_hist(img):
    BINS = 25
    hist = numpy.array([])

    for colour_channel in (0, 1, 2):
        c = img[:, colour_channel]
        hist = numpy.concatenate(
            [hist] + [numpy.histogram(c, BINS, (0.0, 255.0))[0]])
    hist = hist / len(img)

    return hist

def _calc_texture_hist(img):
    BINS = 10
    hist = numpy.array([])
    for colour_channel in (0, 1, 2):
        # mask by the colour channel
        fd = img[:, colour_channel]

        # calculate histogram for each orientation and concatenate them all
        # and join to the result
        hist = numpy.concatenate(
            [hist] + [numpy.histogram(fd, BINS, (0.0, 1.0))[0]])
    hist = hist / len(img)

    return hist

def _sim_colour(r1, r2):
    return sum([min(a, b) for a, b in zip(r1["hist_c"], r2["hist_c"])])


def _sim_texture(r1, r2):
    return sum([min(a, b) for a, b in zip(r1["hist_t"], r2["hist_t"])])


def _sim_size(r1, r2, imsize):
    return 1.0 - (r1["size"] + r2["size"]) / imsize


def _sim_fill(r1, r2, imsize):
    bbsize = (
        (max(r1["max_x"], r2["max_x"]) - min(r1["min_x"], r2["min_x"]))
        * (max(r1["max_y"], r2["max_y"]) - min(r1["min_y"], r2["min_y"]))
    )
    return 1.0 - (bbsize - r1["size"] - r2["size"]) / imsize


def _calc_sim(r1, r2, imsize=None):
    return _sim_colour(r1, r2) + _sim_texture(r1, r2)
    # return (_sim_colour(r1, r2) + _sim_texture(r1, r2)
    #         + _sim_size(r1, r2, imsize) + _sim_fill(r1, r2, imsize))

# def _sim_structure(r1, r2):
#     return compare_ssim(r1["img"], r2["img"], full=True)[0]*3

if __name__ == "__main__":
    None


