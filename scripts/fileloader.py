import os
import numpy as np

def load_files(dir):
    _, img, lab, _ = check_sub_directories(dir)  # remove the first _ for sen1 data and the last _ for ghs data
    assert len(img) == len(lab) 
    img.sort()
    lab.sort()
    seq = randomize_selection(dir, lab)

    # selection
    training = seq[0: int(len(lab) * 0.75)]  # 3/4 of the data
    validation = seq[int(len(lab) * 0.75): len(lab) ]

    img = np.array(img)
    lab = np.array(lab)

    return img[training], lab[training], img[validation], lab[validation]
    


def check_sub_directories(filepath):
    if os.path.exists(filepath):
        sen1 = [os.path.join(filepath, "sen1", folder) for folder in os.listdir(os.path.join(filepath, "sen1")) if not folder.startswith(".")]
        sen2 = [os.path.join(filepath, "sen2", folder) for folder in os.listdir(os.path.join(filepath, "sen2")) if not folder.startswith(".")]
        lab = [os.path.join(filepath, "lab", folder) for folder in os.listdir(os.path.join(filepath, "lab")) if not folder.startswith(".")]
        ghs = [os.path.join(filepath, "ghs", folder) for folder in os.listdir(os.path.join(filepath, "ghs")) if not folder.startswith(".")]

        return sen1, sen2, lab, ghs
    else:
        raise ValueError('Invalid folder')

def randomize_selection(filepath, lab):
    seqpath = os.path.join(filepath, 'seq.txt')
    if os.path.exists(seqpath):
        seq = np.loadtxt(seqpath, delimiter=',')
    else:
        seq = np.random.permutation(len(lab))
        np.savetxt(seqpath, seq, fmt='%d', delimiter=',')
    return np.array(seq, dtype='int32')