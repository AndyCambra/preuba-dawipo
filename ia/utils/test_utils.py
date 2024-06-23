import random
from collections import defaultdict

def save_unformatted_keys_to_file(unformatted_keys, file_path="ia/data/unformatted_keys.txt"):
    counter = defaultdict(int)
    try:
        with open(file_path, "r") as file:
            for line in file:
                key, count = line.strip().split(": ")
                counter[key] = int(count)
    except FileNotFoundError:
        pass
    
    for key in unformatted_keys:
        counter[key] += 1

    with open(file_path, "w") as file:
        for key, count in counter.items():
            file.write(f"{key}: {count}\n")

def sort_unformatted_keys(file_path="ia/data/unformatted_keys.txt"):
    counter = defaultdict(int)
    
    with open(file_path, "r") as file:
        for line in file:
            key, count = line.strip().split(": ")
            counter[key] = int(count)
    
    sorted_keys = sorted(counter.items(), key=lambda item: item[1], reverse=True)
    
    with open(file_path, "w") as file:
        for key, count in sorted_keys:
            file.write(f"{key}: {count}\n")

def get_random_key_value_for_target(target_key, training_examples):
    possible_examples = [ex for ex in training_examples if target_key in ex["output"].keys()]
    if not possible_examples:
        return None, None
    example = random.choice(possible_examples)
    input_key = list(example["input"].keys())[0]
    input_value = example["input"][input_key]
    return input_key, input_value

def generate_random_test_object(target_keys, training_examples):
    test_object = {}
    for target_key in target_keys.keys():
        origin_key, value = get_random_key_value_for_target(target_key, training_examples)
        if origin_key and value:
            test_object[origin_key] = value
    shuffled_test_object = dict(random.sample(test_object.items(), len(test_object)))
    return shuffled_test_object